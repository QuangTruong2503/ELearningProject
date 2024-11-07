const Cookies = require('js-cookie') ;

export default function setCookies(name, data){
    Cookies.set(name, data, {expires: 6});
}