import { API_KEY, BASE_URL } from "./apiConfig";



export function getBirdDetails(id) {

    const url = BASE_URL + "birds/" + id;

   return fetch(url, {
        headers: {
            'api-key': API_KEY,  
        }
    }).then(responseACB)

    function responseACB(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(res)
    }
}


export function searchBird(searchParams){

    //const queryParams = new URLSearchParams(searchParams);

    const url = BASE_URL + "v2/birds?page=1&pageSize=10&name=" + searchParams + "&hasImg=true&operator=AND"; 


    const options = {
        method: 'GET',
        headers: {
            'API-Key': API_KEY,
        }
    }
    function responseSearchACB(response){
        if(response.status !== 200){
            throw new Error("Response = " + response);
        }
        return response.json();
    }

    function getBirdACB(data){
        return data.entities;
    }

    return fetch(url, options).then(responseSearchACB).then(getBirdACB);
}


