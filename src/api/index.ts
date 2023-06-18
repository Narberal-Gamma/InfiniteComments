import axios from "axios";

const apiUrl = 'http://a0830433.xsph.ru';

const $host = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export { $host };
