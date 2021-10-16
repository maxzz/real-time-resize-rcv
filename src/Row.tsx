/* eslint-disable jsx-a11y/accessible-emoji */

import { useState, forwardRef } from "react";
import useVirtual, {Item} from "react-cool-virtual";

import "./styles.scss";

const AccordionItem = forwardRef(
  (
    {
      children,
      height,
      ...rest
    }: { children: JSX.Element; height: number } & React.HTMLAttributes<
      HTMLDivElement
    >,
    ref: React.MutableRefObject<HTMLDivElement>
  ) => {
    const [h, setH] = useState(height);
    return (
      <div
        {...rest}
        style={{ height: `${h}px` }}
        ref={ref}
        onClick={() => setH((prevH) => (prevH === 50 ? 100 : 50))}
      >
        {children}
      </div>
    );
  }
);

const Row = (props: {rowHeights: number[]}) => {
  console.log("props", props);
  const {rowHeights} = props;

  const {
    outerRef,
    innerRef,
    items
  }: {
    outerRef: React.LegacyRef<HTMLDivElement>;
    innerRef: React.LegacyRef<HTMLDivElement>;
    items: Item[];
  } = useVirtual({
    itemCount: rowHeights.length
  });
  console.log('items', items);

  return (
    <div
      className="outer"
      style={{ width: "300px", height: "300px", overflow: "auto" }}
      ref={outerRef}
    >
      <div ref={innerRef}>
        {items.map((item) => {
          const { index, size, measureRef } = item;
          //console.log("item", item);

          return (
            <AccordionItem
              key={index}
              className={`item ${index % 2 ? "dark" : ""}`}
              height={size}
              ref={measureRef}
            >
              <>👋🏻 Click Me {index}</>
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
};

export default Row;
