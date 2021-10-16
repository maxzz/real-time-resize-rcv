/* eslint-disable jsx-a11y/accessible-emoji */
//https://codesandbox.io/s/rcv-real-time-resize-fixvr?fontsize=14&hidenavigation=1&theme=dark&file=/Row.js

import { render } from "react-dom";

import Row from "./Row";
//import Column from "./Column";
//import Grid from "./Grid";
import "./styles.scss";

const getRandomSizes = (min) => new Array(10).fill().map(() => min + Math.round(Math.random() * 1000));
//console.log(getRandomSizes(43));

const App = () => (
  <div className="app">
    <p>
      💡 CodeSandbox might be <b>caching the old version</b> of React Cool
      Virtual. You can <b>manually specify to the latest version</b> to see the
      examples.
    </p>
    <br />
    <h4>Row</h4>
    <Row rowHeights={getRandomSizes(35)} />
    {/* <br />
    <br />
    <h4>Column</h4>
    <Column colWidths={getRandomSizes(75)} />
    <br />
    <br />
    <h4>Grid</h4>
    <Grid rowHeights={getRandomSizes(35)} colWidths={getRandomSizes(100)} />
    <br />
    <br /> */}
  </div>
);

render(<App />, document.getElementById("root"));
