import { Checkbox, useCheckboxState } from "pretty-checkbox-react";
import { Accessibility, Board, Material, Size, Type } from "../entities";
import { toTitleCase } from "../utils";

export function FilterBoard(props: { onChange: (patch: Partial<Board>) => void }) {
  const strings: string[] = [
    "Type",
    "Material",
    "Accessibility",
    "Size",
    "Traffic",
  ];

  const handleChange = (patch: Partial<Board>) => {
    return () => {
      // const target = e.target as HTMLInputElement
      props.onChange(patch)
    }
  }

  const entities = [
    Object.keys(Type).map((type) => {
      return {
        name: toTitleCase(type),
        value: useCheckboxState({ onChange: handleChange({ type: type as Type }) }),
      };
    }),

    Object.keys(Material).map((material) => {
      return {
        name: toTitleCase(material),
        value: useCheckboxState({ onChange: handleChange({ material: material as Material }) }),
      };
    }),

    Object.keys(Accessibility).map((accessibility) => {
      return {
        name: toTitleCase(accessibility),
        value: useCheckboxState({ onChange: handleChange({ accessibility: accessibility as Accessibility }) }),
      };
    }),

    Object.keys(Size).map((size) => {
      return {
        name: toTitleCase(size),
        value: useCheckboxState({ onChange: handleChange({ size: size as Size }) }),
      };
    }),

    Array.from({ length: 5 }, (_, i: number) => i + 1).map((traffic) => {
      return {
        name: traffic.toString(),
        value: useCheckboxState({ onChange: handleChange({ traffic: traffic }) }),
      };
    }),
  ];

  return (
    <>
      {entities.map((entity, i) => {
        return (
          <div className="flex flex-col bg-light-50 m-2 py-2 px-2 rounded-xl select-none shadow-xl">
            <b className="mx-1 my-1">{strings[i]}</b>
            {entity.map((data) => {
              return (
                <Checkbox
                  bigger
                  shape="rounded"
                  variant="thick"
                  {...data.value}
                  className="flex inline-flex flex-row mr-2 my-1"
                >
                  <span className="ml-1 select-none">{data.name}</span>
                </Checkbox>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
