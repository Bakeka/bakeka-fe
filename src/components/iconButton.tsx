import { useState } from "preact/hooks"
import { toTitleCase } from "../utils"
import { IconMap } from "../iconMap"

export interface ButtonData {
  name: string
  data: any
}

export function IconButton(props: { data: ButtonData, buttonId: string, selected?: boolean, onButtonSelected?: (data: any, key: string) => void }) {
  const [selected, setSelected] = useState(false)
  const Icon = IconMap.get(props.data.name) || IconMap.get("OTHER")

  console.log(`${props.data.name} (key ${props.buttonId}) selected: ${selected}`)
  if (props.selected) setSelected(() => true)

  return <button
    className={`
      h-64 w-64 <md:h-48 <md:w-48 px-6 py-2 md:m-4 font-medium text-md rounded-4xl
      ${selected ? "bg-blue-600 hover:bg-blue-500 text-light-200" : "bg-light-400 hover:bg-light-500 text-neutral-700"}
    `}
    autoComplete="off"
    onClick={() => {
      setSelected(prevSelected => !prevSelected)
      if (!selected && props.onButtonSelected) {
        props.onButtonSelected(props.data.data, props.buttonId)
        setSelected(false)
      }
    }}
  >
    <Icon size={64} />
    <p class="md:mt-8 <md:mt-4">{toTitleCase(props.data.name)}</p>
  </button>
}