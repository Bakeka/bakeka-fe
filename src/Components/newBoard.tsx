import { useReducer } from "preact/compat";

type StateType = {
  count: number;
};

function reducer(state: StateType, action: string) {
  switch (action) {
    case "reset":
      return 0;
    case "next":
      return { count: state.count + 1 };
    case "back":
      if (state.count > 0) {
        return { count: state.count - 1 };
      }
    default:
      return state;
  }
}

export function NewBoard() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      {state.count === 0 ? (
        <div class="grid grid-cols-2 gap-4">
          <button
            class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded"
            onClick={() => dispatch("next")}
          >
            {state.count}
          </button>
          <button class="px-6 py-2 bg-blue-500 font-medium text-sm hover:bg-blue-600 text-blue-100 rounded">
            gianni
          </button>
          <button class="px-6 py-2 bg-green-500 font-medium text-sm hover:bg-green-600 text-green-100 rounded">
            Button
          </button>
          <button class="px-6 py-2 bg-indigo-500 font-medium text-sm hover:bg-indigo-600 text-indigo-100 rounded">
            Button
          </button>
        </div>
      ) : null}
      {state.count === 1 ? (
        <div class="grid grid-cols-2 gap-4">
          <button
            class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded"
            onClick={() => dispatch("next")}
          >
            {state.count}
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
