import axios from "axios";

const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'http://a0830433.xsph.ru';
const currentUrl = window.location.href;

const $host = axios.create({
    baseURL: corsProxyUrl + apiUrl,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

$host.interceptors.request.use(config => {
    config.headers['Origin'] = currentUrl;
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
});

export { $host };
