
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validataSignUpData(data) {
    if(!data.fname) {
        return "Please Enter your first name"
    }
    else if(!data.lname) {
        return "Please Enter your last name"
    }
    else if(!data.email) {
        return "Please Enter your email"
    }
    else if(!validateEmail(data.email)) {
        return "Please Enter your valid email"
    }
    else if(!data.age) {
        return "Please Enter your age"
    }
    else{
        return "confirm"
    }
}

export function validataloginData(data) {
    console.log(data.password.length >= 8)
    if(!data.email) {
        return "Please Enter your email"
    }
    else if(!validateEmail(data.email)) {
        return "Please Enter your valid email"
    }
    else if(!data.password) {
        return "Please Enter your Password"
    }
    else if(data.password.length < 8) {
        return "Password should atleast 8 character long"
    }
    else{
        return "confirm"
    }
}
