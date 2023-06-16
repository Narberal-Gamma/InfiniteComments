import axios from "axios";

const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'http://a0830433.xsph.ru';

const $host = axios.create({
    baseURL: corsProxyUrl + apiUrl,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

$host.interceptors.request.use(config => {
    config.headers['Origin'] = 'https://pt2cpt-5173.csb.app/';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
});

export { $host };
