import { API_KEY, BASE_URL } from "./apiConfig";



export function getBirdDetails(id) {
    const url = BASE_URL + "birds/" + id;

    return fetch(url, {
        headers: {
            'api-key': API_KEY,  
        }
    }).then(responseACB)

    function responseACB(res) {
        //console.log(res)
        if(res.ok) {
            return res;
        }
        return Promise.reject(res)
    }
}

