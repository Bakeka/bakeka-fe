import { useReducer } from "preact/compat";

const types = ["board1", "board2", "board3", "board4"];
const material = ["wood", "metal", "glass"];

function reducer(state: number, action: string) {
  switch (action) {
    case "reset":
      return 0;
    case "next":
      return state + 1;
    case "back":
      if (state > 0) {
        return state - 1;
      }
    default:
      return state;
  }
}

export function NewBoard() {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
      {state === 0 ? (
        <div class="grid grid-cols-2 gap-4">
          {types.map((type) => {
            return (
              <div class="col-span-1">
                <button
                  class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded"
                  onClick={() => dispatch("next")}
                >
                  {type}
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
      {state === 1 ? (
        <div class="grid grid-cols-2 gap-4">
          <button
            class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded"
            onClick={() => dispatch("next")}
          >
            {state}
          </button>
          <button class="px-6 py-2 bg-blue-500 font-medium text-sm hover:bg-blue-600 text-blue-100 rounded">
            Button
          </button>
          <button class="px-6 py-2 bg-green-500 font-medium text-sm hover:bg-green-600 text-green-100 rounded">
            Button
          </button>
          <button class="px-6 py-2 bg-indigo-500 font-medium text-sm hover:bg-indigo-600 text-indigo-100 rounded">
            Button
          </button>
        </div>
      ) : null}
      <button
        class="px-6 py-2 bg-blue-500 font-medium text-sm hover:bg-blue-600 text-blue-100 rounded"
        onClick={() => dispatch("back")}
      >
        Back
      </button>
    </>
  );
}
