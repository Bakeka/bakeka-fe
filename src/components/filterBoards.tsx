import { Checkbox, useCheckboxState } from "pretty-checkbox-react";
import { Accessibility, Material, Size, Type } from "../entities";

export function FilterBoard() {
  const strings: string[] = [
    "Type",
    "Material",
    "Accessibility",
    "Size",
    "Traffic",
  ];

  const entities = [
    Object.keys(Type).map((type) => {
      return {
        name: type,
        value: useCheckboxState(),
      };
    }),

    Object.keys(Material).map((material) => {
      return {
        name: material,
        value: useCheckboxState(),
      };
    }),

    Object.keys(Accessibility).map((accessibility) => {
      return {
        name: accessibility,
        value: useCheckboxState(),
      };
    }),

    Object.keys(Size).map((size) => {
      return {
        name: size,
        value: useCheckboxState(),
      };
    }),

    Array.from({ length: 5 }, (_, i: number) => i + 1).map((traffic) => {
      return {
        name: traffic.toString(),
        value: useCheckboxState(),
      };
    }),
  ];

  return (
    <>
      {entities.map((entity, i) => {
        return (
          <div className="flex inline-flex flex-row bg-indigo-300 m-2 rounded-2xl">
            <b className="mx-2 my-1">{strings[i]}:</b>
            {entity.map((data) => {
              return (
                <Checkbox
                  {...data.value}
                  className="flex inline-flex flex-row mx-2 my-1"
                >
                  <span className="ml-1">{data.name}</span>
                </Checkbox>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
