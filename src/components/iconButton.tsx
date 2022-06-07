import { useEffect, useState } from "preact/hooks"
import { toTitleCase } from "../utils"
import { ButtonIcons } from "../constants/icons"
import { Board } from "../entities"

export interface BoardFragment {
  key: keyof Board
  value: any
}

export interface ButtonData {
  name: string
  selected: boolean
  id: string
  data: BoardFragment
}

export function IconButton(props: {
  name: string,
  selected: boolean,
  onClick: () => void
}) {
  const [selected, setSelected] = useState(false)

  useEffect(() => setSelected(props.selected), [props.selected])

  // if (selected) console.log("selected")

  const Icon = ButtonIcons.get(props.name) || ButtonIcons.get("OTHER")

  return <button
    className={`
      h-64 w-64 <md:h-48 <md:w-48 px-6 py-2 md:m-4 font-medium text-md rounded-4xl md:hover:shadow-md transition-all
      ${selected ? "bg-blue-600 md:hover:bg-blue-500 text-light-200 shadow-md" : "bg-light-400 md:hover:bg-light-500 text-neutral-700"}
    `}
    autoComplete="off"
    onClick={() => {
      setSelected(!selected)
      if (!selected)
        props.onClick()
    }}
  >
    <Icon size={64} />
    <p class="md:mt-8 <md:mt-4">{toTitleCase(props.name)}</p>
  </button>
}
