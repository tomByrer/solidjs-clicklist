/*
https://github.com/tomByrer/solidjs-clicklist v0.7.4
@TomByrer 2022, LGPL-3.0
SolidJS app that takes array of objects with `id` & highlights when clicked on or stepped.
*/
import { render } from "solid-js/web";
import { createSignal, For, mergeProps } from "solid-js";
import { createStore } from "solid-js/store";
import {
  getCSSID,
  getLocal,
  getStepByID,
  getSteps,
  newPos,
} from "./createClickList";

function App() {
  const Current = () => <p>Current: {getStepByID()?.name}</p>;

  return (
    <article>
      <style>{`
li.viewed {color:seagreen}
li.viewed::marker {content:'✔  ';font-size:0.8em;color:seagreen}
li#${getCSSID()} {color:linen;background-color:seagreen;}
`}
      </style>
      <p>click on list items</p>
      <button type="button" onClick={() => newPos()}>
        Next Step
      </button>
      <button type="button" onClick={() => newPos(2)}>
        Mix
      </button>
      <ul>
        <For each={getSteps()}>
          {(step, getIdx) => {
            const thisTrail = getLocal.trails.find((x) => x.id === step.id);
            return (
              <li
                id={thisTrail.id}
                classList={{ viewed: thisTrail.views > 0 }}
                onClick={[newPos, getIdx()]}
              >
                {step.id}: {step.name} = {thisTrail.views}
              </li>
            );
          }}
        </For>
      </ul>
      <Current />
    </article>
  );
}

render(() => <App />, document.getElementById("app"));
