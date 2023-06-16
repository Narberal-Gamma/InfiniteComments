import axios from "axios"

const $host = axios.create({
    baseURL: 'http://a0830433.xsph.ru/',
    headers: { "Content-Type": "multipart/form-data" },
})

export {
    $host
}