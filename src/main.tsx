/*
ClickListSelector v0.5.1
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

  const [getCSSID, setCSSID] = createSignal('');

  let curPos = 0; // _Local's 1st item in arr will be info
  const newPos = (pos = 1 + curPos) => {
    curPos = pos;
    const curTrail = getLocal.trails[curPos];
    setLocal("trails", curPos, "views", curTrail.views + 1);
    setCSSID(curTrail.id);
  };

  const Styles = () => {
    return (
      <style>li#{getCSSID() + ` {color:black;background-color:yellow;}
li.viewed {background-color:gray}`}</style>
    );
  };

  const getStepByID = (lookupID = getCSSID()) => {
    const found = getSteps().find((x) => x.id === lookupID);
    return found;
  };

  return (
    <article>
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
              <li
                id={thisTrail.id}
                classList={{ viewed: thisTrail.views > 0 }}
                onClick={[newPos, getIdx()]
              }>
                {step.id}: {step.name} = {thisTrail.views}
              </li>
            );
          }}
        </For>
      </ul>
      <p>Current: {getStepByID()?.name}</p>
    </article>
  );
}

render(() => <App />, document.getElementById("app"));
