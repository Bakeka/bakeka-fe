import { IconCross, IconDots, IconForbid2, IconGlass, IconMagnet, IconPinned, IconRectangle, IconRecycle, IconSpeakerphone, IconSquare, IconSquareToggleHorizontal, IconTallymark1, IconTallymark2, IconTallymark3, IconTallymark4, IconTallymarks, IconTrees, IconUserOff, IconUsers, TablerIcon } from "@tabler/icons";

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