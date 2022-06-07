import { IconBackspace, IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { useEffect, useReducer, useState } from "preact/compat";
import { Accessibility, Board, Material, Size, Type } from "../entities";
import { updateBoard } from "../services/api";
import { ButtonData, IconButton } from "./iconButton";

enum BoardAction {
  RESET,
  NEXT,
  BACK
}

const buttonData: ButtonData[][] = [
  Object.keys(Type).map((type, index) => {
    return {
      name: type,
      id: `type_${index}`,
      selected: false,
      data: {
        key: "type",
        value: type
      }
    }
  }),

  Object.keys(Material).map((material, index) => {
    return {
      name: material,
      id: `material_${index}`,
      selected: false,
      data: {
        key: "material",
        value: material
      }
    }
  }),

  Object.keys(Accessibility).map((accessibility, index) => {
    return {
      name: accessibility,
      id: `access_${index}`,
      selected: false,
      data: {
        key: "accessibility",
        value: accessibility
      }
    }
  }),

  Object.keys(Size).map((size, index) => {
    return {
      name: size,
      id: `size_${index}`,
      selected: false,
      data: {
        key: "size",
        value: size
      }
    }
  }),

  Array.from({ length: 5 }, (_, i: number) => i + 1).map(traffic => {
    return {
      name: traffic.toString(),
      id: `traffic_${traffic}`,
      selected: false,
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

export function NewBoard(props: { boardId: string }) {
  const titles: string[] = [
    "Type",
    "Material",
    "Accessibility",
    "Size",
    "Traffic"
  ]

  const maxPage = titles.length - 1

  const [pagination, dispatch] = useReducer(reducerWithCap(maxPage), 0);

  const [finalObject, setFinalObject] = useState({} as Board)

  const [showConfirm, setShowConfirm] = useState(false)

  const [state, setState] = useState(buttonData)

  useEffect(
    () => setShowConfirm(pagination === maxPage),
    [pagination]
  )

  const handleButtonSelect = (data: ButtonData) => {
    setState(prev => {
      prev[pagination] = prev[pagination].map(button => button.id === data.id
        ? {...button, selected: true}
        : {...button, selected: false})
      return prev
    })

    setFinalObject(prev => {
      prev[data.data.key] = data.data.value
      return prev
    })

    setTimeout(() => dispatch(BoardAction.NEXT), 600)
  }

  const handleConfirm = () => {
    setFinalObject(prev => {
      state.forEach(subState => {
        subState
          .filter(data => data.selected == true)
          .forEach(data => prev[data.data.key] = data.data.value)
      })

      return prev
    })

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

      updateBoard(props.boardId, finalObject)
    }, reset)
    // ^^^ reset if the user does not allow geolocation
  }

  const reset = () => {
    setState(buttonData)
    dispatch(BoardAction.RESET)
  }

  return (
    <>
      <h1 class="my-16 <md:mb-12 font-bold text-3xl">{titles[pagination]}</h1>
      <div className="container mx-auto px-4 <md:grid <md:grid-cols-2 <md:gap-4 justify-items-center">
        {state[pagination].map(data => {
          return <IconButton
            name={data.name}
            key={data.id}
            selected={data.selected}
            onClick={() => handleButtonSelect(data)} />
        })}
      </div>
      <div class="mt-16 container mx-auto grid grid-cols-3 grid-rows-2 gap-4 md:px-128 <md:px-16">
        <button
          className={`
              col-span-full px-6 py-2 font-medium text-sm rounded
              ${showConfirm ? "bg-blue-600 hover:bg-blue-500 text-light-200" : "invisible"}
            `}
          onClick={handleConfirm}
        >
          Conferma
        </button>
        <button
          className={`
            px-6 py-2 font-medium text-sm bg-light-400 hover:bg-light-500 text-red-600 rounded
            ${pagination === 0 ? "invisible" : ""}
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
        <button
          className={`
            px-6 py-2 font-medium text-sm bg-light-400 hover:bg-light-500 rounded
            ${pagination === maxPage ? "invisible" : ""}
          `}
          title="Skip"
          onClick={() => dispatch(BoardAction.NEXT)}
        >
          <IconChevronRight />
        </button>
      </div>
    </>
  );
}
