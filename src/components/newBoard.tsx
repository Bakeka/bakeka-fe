import { IconBackspace, IconChevronLeft } from "@tabler/icons";
import { useReducer, useState } from "preact/compat";
import { ButtonData, IconButton } from "./iconButton";
import { Accessibility, Material, Size, Type } from "../entities";

enum BoardAction {
  RESET,
  NEXT,
  BACK
}

const buttons: ButtonData[][] = [
  Object.keys(Type).map(type => {
    return {
      name: type,
      data: {
        "type": type
      }
    }
  }),

  Object.keys(Material).map(material => {
    return {
      name: material,
      data: {
        "material": material
      }
    }
  }),

  Object.keys(Accessibility).map(accessibility => {
    return {
      name: accessibility,
      data: {
        "accessibility": accessibility
      }
    }
  }),

  Object.keys(Size).map(size => {
    return {
      name: size,
      data: {
        "size": size
      }
    }
  }),

  Array.from({ length: 5 }, (_, i: number) => i + 1).map(traffic => {
    return {
      name: traffic.toString(),
      data: {
        "traffic": traffic
      }
    }
  }),
]

function reducerWithCap(cap: number) {
  return (state: number, action: BoardAction) => {
    switch (action) {
      case BoardAction.RESET:
        return 0;
      case BoardAction.NEXT:
        if (state < cap) {
          return state + 1;
        }
        break
      case BoardAction.BACK:
        if (state > 0) {
          return state - 1;
        }
    }
    return state
  }
}

export function NewBoard() {
  const strings: string[] = [
    "Type",
    "Material",
    "Accessibility",
    "Size",
    "Traffic"
  ]

  const maxPage = strings.length-1

  const baseButtonsState = Array.from({ length: maxPage }, () => "")

  const [state, dispatch] = useReducer(reducerWithCap(maxPage), 0);

  const [selected, setSelected] = useState(baseButtonsState)

  const handleButtonSelect = (data: any, key: string) => {
    console.log(data)
    console.log(state)
    setSelected(prevSelected => {
      prevSelected[state] = key
      console.log(prevSelected)
      return prevSelected
    })
    dispatch(BoardAction.NEXT)
  }

  return (
    <>
      <h1 class="mb-16">{strings[state]}</h1>
      <div className="container mx-auto px-4 <md:grid <md:grid-cols-2 <md:gap-4 justify-items-center">
        {buttons[state].map((data, index) => {
          const key: string = `${state}_${index}`
          // FIXME: going back retains selected buttons
          return <IconButton data={data} buttonId={key} selected={selected[state] === key} onButtonSelected={handleButtonSelect} />
        })}
      </div>
      <div class="mt-16">
        <button
          className={`
            px-6 py-2 mr-8 font-medium text-sm bg-light-400 hover:bg-light-500 text-red-600 rounded
            ${state === 0 ? "invisible" : ""}
          `}
          title="Back"
          onClick={() => dispatch(BoardAction.BACK)}
        >
          <IconChevronLeft />
        </button>
        <button
          class="px-6 py-2 font-medium text-sm bg-light-400 hover:bg-light-500 text-blue-600 rounded"
          title="Reset"
          onClick={() => {
            setSelected(() => baseButtonsState)
            dispatch(BoardAction.RESET)
          }}
        >
          <IconBackspace />
        </button>
      </div>
    </>
  );
}
