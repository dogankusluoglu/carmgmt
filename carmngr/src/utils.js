// import origFetch from 'node-fetch';

export const fetchx = (url, ...params) => {
    if (url.startsWith('/')) return fetch('http://localhost:8000' + url, ...params)
    else return fetch(url, ...params);
}

export const fetcher = (url) => fetchx(url).then((res) => res.json());
