/*
https://github.com/tomByrer/solidjs-clicklist v0.8.1
@TomByrer 2022, LGPL-3.0
SolidJS app that takes array of objects with `id` & highlights when clicked on or stepped.
*/
import { render } from "solid-js/web";
import {
  getStepByID,
  setNewPos,
  setLocal, //FIX rmeove in dproduction
} from "./createClickList";
import { ClickListUlViews } from "./UIClickList-ul"
import { ClickListButton } from "./UIClickList-button"

function App() {
  setLocal("trails", 1, "isActive", true); //DEMO only //FIX removee in prod

  const Current = () => <p>Current: {getStepByID()?.name}</p>;

  return (
    <article>
      <style>{`
h3 {margin:1em 0 0.618em 0}
`}
      </style>
      <button type="button" onClick={() => setNewPos()}>
        Next Step
      </button>
      <button type="button" onClick={() => setNewPos(2)}>
        Mix
      </button>
      <h3>Buttons, unstyled</h3>
      <var>= # of views</var>
      <ClickListButton />
      <h3>Unordered List, custom markers</h3>
      <var>= # of views</var>
      <ClickListUlViews />
      <Current />
    </article>
  );
}

render(() => <App />, document.getElementById("app"));
