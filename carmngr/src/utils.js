// import origFetch from 'node-fetch';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const fetchx = (url, ...params) => {
    if (url.startsWith('/')) {
        // console.log(`${API_BASE_URL}${url.startsWith('/') ? url : '/' + url}`)
        return fetch(`${API_BASE_URL}${url.startsWith('/') ? url : '/' + url}`, ...params)
    } else {
        return fetch(url, ...params);
    }
}

// export const fetcher = (url) => fetchx(url).then((res) => res.json());

export const fetcher = async (url) => {
    const response = await fetchx(url);
    const data = await response.json();
    return data;
};
