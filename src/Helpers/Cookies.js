const Cookies = require('js-cookie') ;

export default function setCookies(name, data) {
    const hours = 3;
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (hours * 60 * 60 * 1000)); // Set expiry to 3 hours from now
    Cookies.set(name, data, { expires: expiryDate });
}