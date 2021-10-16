/* eslint-disable jsx-a11y/accessible-emoji */

import { useState, forwardRef } from "react";
import useVirtual, {Item} from "react-cool-virtual";

import "./styles.scss";

type AccordionProps = {
  children: JSX.Element;
  height: number;
  expandedHeigh: number,
} & React.HTMLAttributes<HTMLDivElement>;

const itemStyles: React.CSSProperties = {};

const AccordionItem = forwardRef((props: AccordionProps, ref: React.MutableRefObject<HTMLDivElement>) => {
    const { children, height, expandedHeigh, ...rest } = props;
    const [h, setH] = useState(height);
    const isExpanded = h !== 50;
    return (
      <div
        {...rest}
        style={{...itemStyles,  height: `${h}px` }}
        ref={ref}
        //onClick={() => setH((prevH) => (prevH === 50 ? expandedHeigh : 50))}
        onClick={() => setH((prevH) => (prevH === 50 ? expandedHeigh : 50))}
      >
        {isExpanded ? 'expanded' : 'collapsed'}
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
    items: itemsToRenderNow
  }: {
    outerRef: React.LegacyRef<HTMLDivElement>;
    innerRef: React.LegacyRef<HTMLDivElement>;
    items: Item[];
  } = useVirtual({
    itemCount: rowHeights.length
  });
  console.log('items', itemsToRenderNow);

  return (
    <div
      className="outer"
      style={{ width: "300px", height: "300px", overflow: "auto" }}
      ref={outerRef}
    >
      <div ref={innerRef}>
        {itemsToRenderNow.map((item) => {
          const { index, size, measureRef } = item;
          console.log("item", item);

          return (
            <AccordionItem
              key={index}
              className={`item ${index % 2 ? "dark" : ""}`}
              height={size}
              expandedHeigh={rowHeights[index]}
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
