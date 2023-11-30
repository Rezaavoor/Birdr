import {BASE_URL , API_KEY } from "./apiConfig";

export function getBirdDetail(id){

    const url = BASE_URL + "birds/" +id; 
    const options = {
        method: 'GET',
        headers: {
            'API-Key': API_KEY,
        }
    }
    function birdDataACB(data){
        return data;
    }

    function responseACB(response){
        if(response.status !== 200){
            throw new Error("Response = " + response);
        }
        return response.json();
    }

    return fetch(url, options).then(responseACB).then(birdDataACB);

}

export function searchBird(searchParams){

    const queryParams = new URLSearchParams(searchParams);

    const url = BASE_URL + "v2/birds?page=1&pageSize=25&" + queryParams + "&hasImg=true&operator=AND"; 

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
        return data.results;
    }

    return fetch(url, options).then(responseSearchACB).then(getBirdACB);
}
