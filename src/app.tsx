import { Route } from "wouter-preact";
import { Map } from "./components/map";
import { NewBoard } from "./components/newBoard";

export function App() {
  return (
    <>
      <Route path="/new/:boardId">
        {params => <NewBoard boardId={params.boardId} />}
      </Route>
      <Route path="/">
        <Map />
      </Route>
    </>
  );
}
