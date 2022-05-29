import { useReducer } from "preact/compat";
import { board } from "../app";

const types = ["board1", "board2", "board3", "board4"];
const sizes = ["small", "medium", "big", "giant"];
const accessibilityRange = ["1", "2", "3", "4", "5"];
const flows = ["1", "2", "3", "4", "5"];
const materials = ["wood", "metal", "glass", "plastic"];

let newBoard: board = {
  lat: 31,
  lng: 31,
  type: "",
  size: "",
  accessibility: "",
  flow: "",
  material: "",
};

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

function setState(input: any, state: number) {
  switch (state) {
    case 0:
      newBoard.type = input;
      break;
    case 1:
      newBoard.size = input;
      break;
    case 2:
      newBoard.accessibility = input;
      break;
    case 3:
      newBoard.flow = input;
      break;
    case 4:
      newBoard.material = input;
      break;
  }

  console.log(newBoard);
}

export function NewBoard() {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
      {state === 0 ? (
        <div class="grid grid-cols-2 gap-4">
          {types.map((type) => {
            return (
              <button
                class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded"
                onClick={() => {
                  dispatch("next"), setState(type, state);
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      ) : null}
      {state === 1 ? (
        <div class="grid grid-cols-2 gap-4">
          {sizes.map((size) => {
            return (
              <button
                class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded"
                onClick={() => {
                  dispatch("next"), setState(size, state);
                }}
              >
                {size}
              </button>
            );
          })}
        </div>
      ) : null}
      {state === 2 ? (
        <div class="grid grid-cols-2 gap-4">
          {accessibilityRange.map((accessibility) => {
            return (
              <button
                class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded"
                onClick={() => {
                  dispatch("next"), setState(accessibility, state);
                }}
              >
                {accessibility}
              </button>
            );
          })}
        </div>
      ) : null}
      {state === 3 ? (
        <div class="grid grid-cols-2 gap-4">
          {flows.map((flow) => {
            return (
              <button
                class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded"
                onClick={() => {
                  dispatch("next"), setState(flow, state);
                }}
              >
                {flow}
              </button>
            );
          })}
        </div>
      ) : null}
      {state === 4 ? (
        <div class="grid grid-cols-2 gap-4">
          {materials.map((material) => {
            return (
              <button
                class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded"
                onClick={() => {
                  dispatch("next"), setState(material, state);
                }}
              >
                {material}
              </button>
            );
          })}
        </div>
      ) : null}
      {state === 5 ? (
        <div class="container mx-auto py-8 w-md bg-gradient-to-tl from-blue-500/50 to-blue-500 shadow rounded">
          <span>New Board: </span>
          <ul>
            <li class="text-sm">Lat: {newBoard.lat}</li>
            <li class="text-sm">Lng: {newBoard.lng}</li>
            <li class="text-sm">Type: {newBoard.type}</li>
            <li class="text-sm">Size: {newBoard.size}</li>
            <li class="text-sm">Accessibility: {newBoard.accessibility}</li>
            <li class="text-sm">Flow: {newBoard.flow}</li>
            <li class="text-sm">Material: {newBoard.material}</li>
          </ul>
        </div>
      ) : null}

      {state != 0 ? (
        <div>
          <button
            class="px-6 py-2 mr-8 my-4 bg-blue-500 font-medium text-sm hover:bg-blue-600 text-blue-100 rounded"
            onClick={() => dispatch("back")}
          >
            Back
          </button>
          <button
            class="px-6 py-2 my-4 bg-red-500 font-medium text-sm hover:bg-red-600 text-red-100 rounded"
            onClick={() => dispatch("reset")}
          >
            Reset
          </button>
        </div>
      ) : null}
    </>
  );
}
