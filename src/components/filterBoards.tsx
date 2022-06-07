import { Checkbox, useCheckboxState } from "pretty-checkbox-react";
import { Accessibility, Material, Size, Type } from "../entities";

const entities = [
  Object.keys(Type).map((type) => {
    return { name: type };
  }),

  Object.keys(Material).map((material) => {
    return { name: material };
  }),

  Object.keys(Accessibility).map((accessibility) => {
    return { name: accessibility };
  }),

  Object.keys(Size).map((size) => {
    return { name: size };
  }),

  Array.from({ length: 5 }, (_, i: number) => i + 1).map((traffic) => {
    return { name: traffic.toString() };
  }),
];

export function FilterBoard() {
  const checkbox = useCheckboxState();

  return (
    <>
      {entities[0].map((entity) => {
        <Checkbox {...checkbox}>{entity.name}</Checkbox>;
        {
          console.log(entity.name);
        }
      })}
    </>
  );
}
