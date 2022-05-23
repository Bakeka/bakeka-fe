import { Route } from "wouter-preact";

export function NewBoard() {
  return (
    <>
      <Route path="/new">
        <div class="grid grid-cols-2 gap-4">
          <button class="px-6 py-2 bg-gray-500 font-medium text-sm hover:bg-gray-600 text-gray-100 rounded">
            Button
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
      </Route>
    </>
  );
}
