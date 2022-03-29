/*
ClickListSelector v0.5.0
@TomByrer 2022, LGPL-3.0
SolidJS app that takes array of objects with `id` & highlights when clicked on or stepped.
*/
import { render } from "solid-js/web";
import { createSignal, For, mergeProps } from "solid-js";
import { createStore } from "solid-js/store";

function App() {
  // 'remote' data
  const [getSteps, setSteps] = createSignal([
    { id: "info", name: "basic coooking instructions" },
    { id: "step1", name: "Collect ingreadiants & tools" },
    { id: "step2", name: "Mix" },
    { id: "step3", name: "Cook" },
    { id: "step4", name: "Eat!" },
  ]);

  // per-user/local data
  const [getLocal, setLocal] = createStore({
    trails: [
      { id: "info", views: 0 },
      { id: "step1", views: 3 },
      { id: "step2", views: 2 },
      { id: "step3", views: 0 },
      { id: "step4", views: 5 },
    ],
  });

  const [getCSSID, setCSSID] = createSignal("step1");
  let curPos = null; // number
  // let
  const newPos = (pos = 1 + curPos) => {
    curPos = pos;
    const curTrail = getLocal.trails[curPos];
    setLocal("trails", curPos, "views", curTrail.views + 1);
    setCSSID(curTrail.id);
    console.log("new posistion:", curTrail);
    console.log("style:", getCSSID());
  };

const Styles = () => {
  return (
    <style>li#{getCSSID() + ` {color:black;background-color:yellow;}`}</style>
  );
};

  return (
    <div>
      <p>click on list items</p>
      <Styles />
      <button type="button" onClick={() => newPos()}>
        Next Step
      </button>
      <button type="button" onClick={() => newPos(1)}>
        Step=2
      </button>
      <ul>
        <For each={getSteps()}>
          {(step, getIdx) => {
            const thisTrail = getLocal.trails.find((x) => x.id === step.id);
            return (
              <li id={thisTrail.id} onClick={[newPos, getIdx()]}>
                {step.id}: {step.name} = {thisTrail.views}
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
}

render(() => <App />, document.getElementById("app"));
