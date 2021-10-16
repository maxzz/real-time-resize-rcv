/* eslint-disable jsx-a11y/accessible-emoji */
import { useState, forwardRef } from "react";
import useVirtual, { Item } from "react-cool-virtual";
import "./styles.scss";

type AccordionProps = {
  children: JSX.Element;
  width: number;
  expandedWidth: number;
} & React.HTMLAttributes<HTMLDivElement>;

const CollapsedSize = 120;

const AccordionItem = forwardRef(
  (
    { children, width, expandedWidth, ...rest }: AccordionProps, ref: React.MutableRefObject<HTMLDivElement>
  ) => {
    const [w, setW] = useState(width);
    const isExpanded = w !== CollapsedSize;

    return (
      <div
        {...rest}
        style={{
          flexBasis: `${w}px`,
          height: "125px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        ref={ref}
        onClick={() => setW(() => (isExpanded ? CollapsedSize : expandedWidth))}
      >
        <div>{`${CollapsedSize}`}<span style={{fontSize:'22px'}}>{` \u2386 `}</span><span>{expandedWidth}</span></div>
        <div>{`now: ${w}`}</div>
        <div className="">{isExpanded ? 'expanded' : 'collapsed'}</div>
        <div className="">{children}</div>
      </div>
    );
  }
);

const Column = (props: { colWidths: number[] }) => {
  //console.log("props", props);

  const { outerRef, innerRef, items }: { 
      outerRef: React.LegacyRef<HTMLDivElement>; 
      innerRef: React.LegacyRef<HTMLDivElement>; 
      items: Item[],
    } = useVirtual({
      horizontal: true,
      itemCount: props.colWidths.length,
      itemSize: CollapsedSize
  });
  //console.log('items', itemsToRenderNow);

  return (
    <div
      className="outer"
      style={{ 
        width: "400px",
        height: "155px",
        overflow: "auto",
        fontSize: '14px',
        backgroundColor: 'lightsteelblue',
        // display: 'flex',
        // alignItems: 'center',
      }}
      ref={outerRef}
    >
      <div ref={innerRef} style={{ display: "flex", alignItems: 'center', }}>
        {items.map((item) => {
          const { index, size, measureRef } = item;
          //console.log("item", item);

          return (
            <AccordionItem
              key={index}
              className={`item ${index % 2 ? "dark" : ""}`}
              width={size}
              expandedWidth={props.colWidths[index]}
              ref={measureRef}
            >
              <>{index} 👋🏻 Click Me</>
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
};

export default Column;
