/* eslint-disable jsx-a11y/accessible-emoji */

import { useState, forwardRef } from "react";
import useVirtual, {Options, Item} from "react-cool-virtual";

import "./styles.scss";

export function getRandomSizes(n: number, min: number, max: number) {
  return new Array(n).fill(0).map(() => min + Math.round(Math.random() * max));
}
//console.log(getRandomSizes(43));

type AccordionProps = {
  children: JSX.Element;
  height: number;
  expandedHeigh: number,
} & React.HTMLAttributes<HTMLDivElement>;

const itemStyles: React.CSSProperties = {};

const CollapsedHeight = 50;

const AccordionItem = forwardRef((props: AccordionProps, ref: React.MutableRefObject<HTMLDivElement>) => {
    const { children, height, expandedHeigh, ...rest } = props;
    const [h, setH] = useState(height);
    const isExpanded = h !== CollapsedHeight;
    //console.log('h', h, isExpanded);
    
    return (
      <div
        {...rest}
        style={{...itemStyles,  height: `${h}px` }}
        ref={ref}
        //onClick={() => setH((prevH) => (prevH === CollapsedHeight ? expandedHeigh : 50))}
        onClick={() => setH(() => isExpanded ? CollapsedHeight : expandedHeigh)}
      >
        {isExpanded ? 'expanded' : 'collapsed'}
        {children}
      </div>
    );
  }
);

const Row = () => {

  const [rowHeights, setRowHeights] = useState(getRandomSizes(100, 35, 100));
  const [itemCount, setItemCount] = useState(rowHeights.length);
  //console.log(rowHeights);

  const {
    outerRef,
    innerRef,
    items: itemsToRenderNow
  }: {
    outerRef: React.LegacyRef<HTMLDivElement>;
    innerRef: React.LegacyRef<HTMLDivElement>;
    items: Item[];
  } = useVirtual({
    itemCount: itemCount,
    resetScroll: true,
  } as Options & {resetScroll: boolean} );
  //console.log('items', itemsToRenderNow);

  return (
    <>
    <select onChange={({ target }) => {
      const n = +target.value;
      setRowHeights(getRandomSizes(n, 35, 100));
      setItemCount(n);
    }}>
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="25">25</option>
      <option value="10">10</option>
      <option value="1">1</option>
      <option value="0">0</option>
    </select>

    <div
      className="outer"
      style={{ width: "400px", height: "200px", overflow: "auto" }}
      ref={outerRef}
    >
      <div ref={innerRef}>
        {itemsToRenderNow.map((item) => {
          const { index, size, measureRef } = item;
          //console.log("item", item);

          return (
            <AccordionItem
              key={index}
              className={`item ${index % 2 ? "dark" : ""}`}
              height={size}
              expandedHeigh={rowHeights[index]}
              ref={measureRef}
            >
              <>👋🏻 Click Me: {index}</>
            </AccordionItem>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Row;
