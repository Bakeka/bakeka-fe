import { useState } from "preact/hooks"
import { toTitleCase } from "../utils"
import { IconMap } from "../iconMap"
import { Board } from "../entities"

export interface BoardFragment {
  key: keyof Board
  value: any
}

export interface ButtonData {
  name: string
  data: BoardFragment
}

export function IconButton(props: { data: ButtonData, buttonId: string, selected?: boolean, onButtonSelected?: (data: any, key: string) => void }) {
  const [selected, setSelected] = useState(false)
  if (props.selected) setSelected(() => true)
  
  const Icon = IconMap.get(props.data.name) || IconMap.get("OTHER")

  return <button
    className={`
      h-64 w-64 <md:h-48 <md:w-48 px-6 py-2 md:m-4 font-medium text-md rounded-4xl md:hover:shadow-md transition-all
      ${selected ? "bg-blue-600 md:hover:bg-blue-500 text-light-200 shadow-md" : "bg-light-400 md:hover:bg-light-500 text-neutral-700"}
    `}
    autoComplete="off"
    onClick={() => {
      setSelected(!selected)
      if (!selected && props.onButtonSelected)
        props.onButtonSelected(props.data.data, props.buttonId)
    }}
  >
    <Icon size={64} />
    <p class="md:mt-8 <md:mt-4">{toTitleCase(props.data.name)}</p>
  </button>
}