/* eslint-disable jsx-a11y/accessible-emoji */
//https://codesandbox.io/s/rcv-real-time-resize-fixvr?fontsize=14&hidenavigation=1&theme=dark&file=/Row.js

import { render } from "react-dom";

import Row, { getRandomSizes } from "./Row";
import Column from "./Column";
// import Grid from "./Grid";
import "./styles.scss";

const App = () => (
  <div className="app">
    {/* <p>
      💡 CodeSandbox might be <b>caching the old version</b> of React Cool
      Virtual. You can <b>manually specify to the latest version</b> to see the
      examples.
    </p>
    <br /> */}
    <h4>Row</h4>
    <Row />
    <br />
    <h4>Column</h4>
    <Column colWidths={getRandomSizes(20, 75, 100)} />
    {/* <br />
    <h4>Grid</h4>
    <Grid
      rowHeights={getRandomSizes(10, 35, 100)}
      colWidths={getRandomSizes(10, 100, 200)}
    />
    <br /> */}
  </div>
);

render(<App />, document.getElementById("root"));
