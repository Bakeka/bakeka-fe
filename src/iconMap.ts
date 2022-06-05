import { IconCross, IconDots, IconGlass, IconMagnet, IconPinned, IconRecycle, IconSpeakerphone, IconTrees, IconUsers, TablerIcon } from "@tabler/icons";

/**
 * Maps common entities enum strings to Tabler Icons.
 */
export const IconMap: Map<string, TablerIcon> = new Map([
    ["OTHER", IconDots],

    ["OBITUARY", IconCross],
    ["POLITICS", IconSpeakerphone],
    ["NOTICE", IconPinned],
    ["PUBLIC", IconUsers],

    ["WOOD", IconTrees],
    ["METAL", IconMagnet],
    ["PLASTIC", IconRecycle],
    ["GLASS", IconGlass],
])