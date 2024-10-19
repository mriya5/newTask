export function isAuth() {
    try {
      const isLogin = localStorage.getItem('jwt');
      if (isLogin) {
        return isLogin;
      }
      return false;
    } catch (err) {
      return false;
    }
}