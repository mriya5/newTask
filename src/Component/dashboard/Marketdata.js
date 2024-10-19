import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Circles } from 'react-loader-spinner'

export default function Marketdata() {

    const [showError, setShowError] = useState(false)
    const [exchanges, setExchanges] = useState([])
    const [cryptoData, setCryptoData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [volumeRange, setVolumeRange] = useState([0, 10000000000]) // Default range
    const itemsPerPage = 10 // Number of items per page

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const [exchangesResponse, cryptoResponse] = await Promise.all([
                    axios.get('https://rest.coinapi.io/v1/exchanges/icons/32', {
                        headers: {
                            'X-CoinAPI-Key': '4cfdcc86-6e98-409c-8ac6-1f89c6c9460f'
                        }
                    }),
                    axios.get('https://rest.coinapi.io/v1/exchanges', {
                        headers: {
                            'X-CoinAPI-Key': '4cfdcc86-6e98-409c-8ac6-1f89c6c9460f'
                        }
                    })
                ])
                console.log(exchangesResponse)
                setExchanges(exchangesResponse.data)
                setCryptoData(cryptoResponse.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchExchanges()
    }, [])

    // Handle search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase())
        setCurrentPage(1) // Reset to first page after search
    }

    // Filter exchanges by search term and volume
    const filteredExchanges = exchanges.filter((exchange, index) => {
        const volume = cryptoData[index]?.volume_1day_usd || 0
        const matchesSearch = exchange.exchange_id.toLowerCase().includes(searchTerm)
        const withinVolumeRange = volume >= volumeRange[0] && volume <= volumeRange[1]
        return matchesSearch && withinVolumeRange
    })

    // Paginated exchanges
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentExchanges = filteredExchanges.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredExchanges.length / itemsPerPage)

    const getPageNumbers = () => {
        const maxPageButtons = 4;
        let startPage = Math.max(1, currentPage - 1); // Start page around the current one
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        // Adjust startPage if there aren't enough pages at the end
        if (endPage - startPage + 1 < maxPageButtons && totalPages >= maxPageButtons) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };
    const pageNumbers = getPageNumbers();

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    return (
        <div className='stockexchange'>
            <h1 style={{ fontSize: '25px' }}>Top Crypto exchange</h1>
            <p style={{ fontSize: '15px', marginTop: '20px' }}>Compare all 190 top crypto exchanges. The list is ranked by trading volume.</p>
            <div className="tabs">
                {/* <span className="tab"></span> */}
                <span className="tab active">Exchanges</span>
                {/* <span className="tab"></span> */}
            </div>
        
            {/* Search Input */}
            <div className='searchfilter'>
                <img src='https://cdn-icons-png.flaticon.com/128/916/916771.png' />
                <input
                    type="text"
                    placeholder="Find an exchange"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ marginBottom: '10px', padding: '5px', width: '300px', border: 'none', outline: 'none' }}
                />
                <img src='https://cdn-icons-png.flaticon.com/128/149/149852.png' />
            </div>
        {currentExchanges?.length > 0 ? <>
            {/* Data Table */}
            <table>
                <thead>
                    <tr>
                        <th>Sno.</th>
                        <th>Exchange Logo</th>
                        <th>Exchange Name</th>
                        <th>24 Hr Trade Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {currentExchanges.map((exchange, index) => (
                        <tr key={indexOfFirstItem + index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td><img src={exchange.url} alt={''} width="32" height="32" /></td>
                            <td>{exchange.exchange_id}</td>
                            <td>{cryptoData[indexOfFirstItem + index]?.volume_1day_usd? `$${(cryptoData[indexOfFirstItem + index].volume_1day_usd / 1e9).toFixed(2)} Billion`: 'N/A'}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                {/* Previous Button */}
                <button
                    className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        className={`page-number ${currentPage === num ? 'active' : ''}`}
                        onClick={() => handlePageChange(num)}
                    >
                        {num}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
        :
        showError ? 
        <>No Data Found</>
        :
        <div style={{marginTop: '10px'}}>
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>    
        }
        </div>
    )
}
