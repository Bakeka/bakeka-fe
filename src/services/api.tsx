import { Board, Filter, Numbers } from '../entities';

const BASE_URL = import.meta.env.VITE_BACKEND_ADDR;

export async function getBoard(boardId: String): Promise<Board> {
  const url = `${BASE_URL}/boards/${boardId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  if (!response.ok)
    throw "Error getting board";

  return response.json().then(parsed => parsed as Board);
}

export async function updateBoard(boardId: String, board: Board): Promise<void> {
  const url = `${BASE_URL}/boards/${boardId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board)
  });

  if (!response.ok)
    throw "Error getting board";
}

export async function filterBoards(filter: Filter): Promise<Board[]> {
  const url = `${BASE_URL}/boards`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter)
  });

  if (!response.ok)
    throw "Error filtering boards";

  return response.json().then(parsed => parsed as Board[]);
}

export async function getNumbers(): Promise<Numbers> {
  const url = `${BASE_URL}/boards/numbers`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    }
  });

  if (!response.ok)
    throw "Error fetching numbers";

  return response.json().then(parsed => parsed as Numbers);
}
