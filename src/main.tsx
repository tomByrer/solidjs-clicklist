/*
https://github.com/tomByrer/solidjs-clicklist v0.8.0
@TomByrer 2022, LGPL-3.0
SolidJS app that takes array of objects with `id` & highlights when clicked on or stepped.
*/
import { render } from "solid-js/web";
import {
  getStepByID,
  newPos,
} from "./createClickList";
import { ClickListUlViews } from "./UIClickList-ul"

function App() {
  const Current = () => <p>Current: {getStepByID()?.name}</p>;

  return (
    <article>
      <button type="button" onClick={() => newPos()}>
        Next Step
      </button>
      <button type="button" onClick={() => newPos(2)}>
        Mix
      </button>
      <ClickListUlViews />
      <Current />
    </article>
  );
}

render(() => <App />, document.getElementById("app"));
