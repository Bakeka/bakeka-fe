/**
 * Type Board represents a bulletin board.
 */
export class Board {
    /**
     * Board position as GeoJSON Point (see
     * [geospatial queries](https://www.mongodb.com/docs/upcoming/geospatial-queries/)
     * and [type definition](https://www.mongodb.com/docs/manual/reference/geojson/)).
     * Longitude is the first element and latitude follows.
     */
    location?: Point;
    /**
     * Board accessibility.
     */
    accessibility?: Accessibility;
    /**
     * Board material.
     */
    material?: Material;
    /**
     * Board size.
     */
    size?: Size;
    /**
     * Board traffic amount.
     *
     * @isInt
     * @minimum 1
     * @maximum 5
     */
    traffic?: number;
    /**
     * Board type.
     */
    type?: Type;
    /**
     * Board creation date.
     */
    created?: Date;
    /**
     * Board last modification date.
     */
    modified?: Date;
}
/**
 * Enum Accessibility represents a board's physical environment and reachability.
 */
export enum Accessibility {
    /**
     * A public and freely accessible space.
     */
    PUBLIC = "PUBLIC",
    /**
     * An accessible space but on private grounds.
     */
    PRIVATE = "PRIVATE",
    /**
     * A hardly reachable or otherwise inaccessible (to the public) space.
     */
    INACCESSIBLE = "INACCESSIBLE"
}
/**
 * Enum Material describes a board's surface material.
 */
export enum Material {
    WOOD = "WOOD",
    METAL = "METAL",
    PLASTIC = "PLASTIC",
    GLASS = "GLASS",
    OTHER = "OTHER"
}
/**
 * Enum Size describes a boards's general physical size.
 */
export enum Size {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}
/**
 * Enum Type represents a board's purpose.
 */
export enum Type {
    /**
     * An obituary for the deceased.
     */
    OBITUARY = "OBITUARY",
    /**
     * A politics-oriented bulletin board.
     */
    POLITICS = "POLITICS",
    /**
     * A board for notices and advisories.
     */
    NOTICE = "NOTICE",
    /**
     * A board for the public with a variety of postable media.
     */
    PUBLIC = "PUBLIC",
    /**
     * A board which does not fit in any of the other categories.
     */
    OTHER = "OTHER"
}

/**
 * Type Filter represents a transient object used to query the API for boards.
 */
export interface Filter {
    /**
     * Filter the results' accessibility, if defined.
     *
     * @isArray
     * @maxItems 3
     * @uniqueItems true
     * @example ["PUBLIC", "PRIVATE"]
     */
    accessibility?: Accessibility[];
    /**
     * Filter the results' material, if defined.
     *
     * @isArray
     * @maxItems 5
     * @uniqueItems true
     * @example ["GLASS", "WOOD", "OTHER"]
     */
    material?: Material[];
    /**
     * Filter the results' size, if defined.
     *
     * @isArray
     * @maxItems 3
     * @uniqueItems true
     * @example ["SMALL", "LARGE"]
     */
    size?: Size[];
    /**
     * Filter the results' traffic amount, if defined.
     *
     * @isArray
     * @minimum 1
     * @maximum 5
     * @uniqueItems true
     * @example [2, 5]
     */
    traffic?: number[];
    /**
     * Filter the results' type, if defined.
     *
     * @isArray
     * @maxItems 5
     * @uniqueItems true
     * @example ["OBITUARY", "PUBLIC"]
     */
    type?: Type[];
    /**
     * Longitude and latitude "box" for the results. All boards returned will be
     * located inside this box. Each of the array items is the tuple
     * `[longitude, latitude]`, akin to GeoJSON points.
     *
     * @isArray
     * @minItems 2
     * @maxItems 2
     * @items array
     * @example [[-103.4, -45.7], [95.8, 23.2]]
     */
    box?: number[][];
}

/**
 * Type Numbers contains the total number of board registered for each `Type`.
 */
export type Numbers = {
    [T in Type]: number;
};
/**
 * Type Point represents a [GeoJSON point](https://www.mongodb.com/docs/manual/reference/geojson/#point).
 */
export class Point {
    /**
     * GeoJSON type. Is always "Point".
     */
    readonly type: string = "Point";
    /**
     * GeoJSON coordinates. Longitude is the first element and latitude follows.
     *
     * @isArray
     * @items float
     * @minItems 2
     * @maxItems 2
     * @example [-103.4, -45.7]
     */
    coordinates: number[] = [];
}