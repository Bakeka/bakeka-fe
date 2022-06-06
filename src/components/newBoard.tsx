import { IconBackspace, IconChevronLeft } from "@tabler/icons";
import { useReducer, useState } from "preact/compat";
import { BoardFragment, ButtonData, IconButton } from "./iconButton";
import { Accessibility, Board, Material, Size, Type } from "../entities";

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
        key: "type",
        value: type
      }
    }
  }),

  Object.keys(Material).map(material => {
    return {
      name: material,
      data: {
        key: "material",
        value: material
      }
    }
  }),

  Object.keys(Accessibility).map(accessibility => {
    return {
      name: accessibility,
      data: {
        key: "accessibility",
        value: accessibility
      }
    }
  }),

  Object.keys(Size).map(size => {
    return {
      name: size,
      data: {
        key: "size",
        value: size
      }
    }
  }),

  Array.from({ length: 5 }, (_, i: number) => i + 1).map(traffic => {
    return {
      name: traffic.toString(),
      data: {
        key: "traffic",
        value: traffic
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
  const titles: string[] = [
    "Type",
    "Material",
    "Accessibility",
    "Size",
    "Traffic"
  ]

  const maxPage = titles.length - 1

  const baseButtonsState = Array.from({ length: maxPage }, () => "")

  const [state, dispatch] = useReducer(reducerWithCap(maxPage), 0);

  const [selected, setSelected] = useState(baseButtonsState)

  const [finalObject, setFinalObject] = useState({} as Board)

  const handleButtonSelect = (data: BoardFragment, key: string) => {
    console.log(data)
    setSelected(prevSelected => {
      prevSelected[state] = key
      return prevSelected
    })
    setFinalObject(prev => {
      prev[data.key] = data.value
      return prev
    })
    setTimeout(() => dispatch(BoardAction.NEXT), 600)
  }

  const handleConfirm = () => {
    const geo: Geolocation = navigator.geolocation
    geo.getCurrentPosition(position => {
      setFinalObject(prev => {
        prev.modified = new Date(position.timestamp)
        prev.location = {
          type: "Point",
          coordinates: [
            position.coords.longitude,
            position.coords.latitude
          ]
        }
        return prev
      })
      console.log(finalObject)
    }, reset) 
    // ^^^ reset if the user does not allow geolocation
  }

  const reset = () => {
    setSelected(() => baseButtonsState)
    dispatch(BoardAction.RESET)
  }

  return (
    <>
      <h1 class="my-16 <md:mb-12 font-bold text-3xl">{titles[state]}</h1>
      <div className="container mx-auto px-4 <md:grid <md:grid-cols-2 <md:gap-4 justify-items-center">
        {buttons[state].map((data, index) => {
          const key: string = `${state}_${index}`
          return <IconButton data={data} key={key} buttonId={key} selected={selected[state] === key} onButtonSelected={handleButtonSelect} />
        })}
      </div>
      <div class="mt-16 container mx-auto grid grid-cols-2 grid-rows-2 gap-4 md:px-128 <md:px-16">
        {(state == maxPage) &&
          <button 
            className={`
              col-span-full px-6 py-2 font-medium text-sm bg-blue-600 hover:bg-blue-500 text-light-200 rounded
              ${(selected.find(s => s === "")) && "invisible"}
            `}
            onClick={handleConfirm}
          >
            Conferma
          </button>
        }
        <button
          className={`
            px-6 py-2 font-medium text-sm bg-light-400 hover:bg-light-500 text-red-600 rounded
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
          onClick={reset}
        >
          <IconBackspace />
        </button>
      </div>
    </>
  );
}
