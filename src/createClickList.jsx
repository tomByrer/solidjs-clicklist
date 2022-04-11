import { createSignal, createMemo, createRoot } from "solid-js";
import { createStore } from "solid-js/store";

// function createClickList() {
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
      { id: "step1", views: 0 },
      { id: "step2", views: 0 },
      { id: "step3", views: 0 },
      { id: "step4", views: 0 },
    ],
  });
  const [getCSSID, setCSSID] = createSignal("");

  let curPos = -1; // 0 is the first index ;)
  /*
  newPos() = next step, newPos(value) = jump to value
  */
  export const newPos = (pos = 1 + curPos) => {
    curPos = pos;
    const curTrail = getLocal.trails[curPos];
    setLocal("trails", curPos, "views", curTrail.views + 1);
    setCSSID(curTrail.id);
  };

  export const getStepByID = (lookupID = getCSSID()) => {
    const found = getSteps().find((x) => x.id === lookupID);
    return found;
  };

  export { getCSSID, getLocal, getSteps };


// export default createRoot(createClickList);
