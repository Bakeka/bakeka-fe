import axios from "axios";
import { Filter } from "src/entities";

const BASE_URL = "https://cbb8f554df93ab.lhrtunnel.link/api/v1";

export function getBoard(boardId: String) {
  const url = `${BASE_URL}/boards/${boardId}`;
  return axios
    .get(url, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => console.log(response));
}

export function getBoards(filter: Filter) {
  const url = `${BASE_URL}/boards/${filter}`;
  return axios
    .post(url, filter, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => console.log(response));
}
