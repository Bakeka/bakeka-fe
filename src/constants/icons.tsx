import { IconCross, IconDots, IconForbid2, IconGlass, IconMagnet, IconPinned, IconRectangle, IconRecycle, IconSpeakerphone, IconSquare, IconSquareToggleHorizontal, IconTallymark1, IconTallymark2, IconTallymark3, IconTallymark4, IconTallymarks, IconTrees, IconUserOff, IconUsers, TablerIcon, TablerIconProps } from "@tabler/icons";
import { DivIcon, divIcon } from "leaflet";
import render from "preact-render-to-string";
import { Type } from "../entities";

/**
 * Maps common entities enum strings to Tabler Icons, for use in buttons.
 */
export const ButtonIcons: Map<string, TablerIcon> = new Map([
  ["OTHER", IconDots],

  ["OBITUARY", IconCross],
  ["POLITICS", IconSpeakerphone],
  ["NOTICE", IconPinned],
  ["PUBLIC", IconUsers],

  ["WOOD", IconTrees],
  ["METAL", IconMagnet],
  ["PLASTIC", IconRecycle],
  ["GLASS", IconGlass],

  ["PRIVATE", IconUserOff],
  ["INACCESSIBLE", IconForbid2],

  ["SMALL", IconSquareToggleHorizontal],
  ["MEDIUM", IconSquare],
  ["LARGE", IconRectangle],

  ["1", IconTallymark1],
  ["2", IconTallymark2],
  ["3", IconTallymark3],
  ["4", IconTallymark4],
  ["5", IconTallymarks],
])

/**
 * Custonm markers (icons + className) for the various board types
 */
type MarkerData = {
  [T in Type]: {
    icon: TablerIcon,
    classes: string
  }
}

const markerData: MarkerData = {
  NOTICE: {
    icon: IconPinned,
    classes: "text-dark-900 bg-lime-300"
  },
  OBITUARY: {
    icon: IconCross,
    classes: "text-dark-900 bg-fuchsia-300"
  },
  PUBLIC: {
    icon: IconUsers,
    classes: "text-dark-900 bg-sky-300"
  },
  POLITICS: {
    icon: IconSpeakerphone,
    classes: "text-dark-900 bg-green-300"
  },
  OTHER: {
    icon: IconDots,
    classes: "text-dark-900 bg-red-300"
  },
}

function tablerToLeaflet(icon: TablerIcon, classes?: string, props?: TablerIconProps): DivIcon {
  const IconNode = icon

  return divIcon({
    className: `bg-white rounded-full min-w-7 min-h-7 border-2 border-dark-900 ${classes}`,
    html: render(<IconNode {...props} />)
  })
}

export const MarkerIcons: Map<Type, DivIcon> = new Map(
  Object.keys(Type)
    .map(key => [
      key as Type,
      tablerToLeaflet(markerData[key as Type].icon, markerData[key as Type].classes)
    ])
)
