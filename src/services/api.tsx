import axios from 'axios';



const BASE_URL = 'https://cbb8f554df93ab.lhrtunnel.link/api/v1';



export function getBoard(boardId: String){
    const url = `${BASE_URL}/boards/${boardId}`;
    return axios.get(url, {
        headers: {
            "Accept": "application/json"
        }
    }).then(response => console.log(response));
}



