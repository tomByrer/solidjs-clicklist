import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

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
  trails: getSteps().map((step) => {
    return {
      id: step.id,
      isActive: false,
      views: 0,
    };
  }),
});
const [getCSSID, setCSSID] = createSignal("");

let curPos = -1; // 0 is the first index ;)
/*
setNewPos() = next step, setNewPos(value) = jump to value
*/
const setNewPos = (pos = 1 + curPos) => {
  curPos = pos;
  const curTrail = getLocal.trails[curPos];
  setLocal("trails", curPos, "isActive", true);
  setLocal("trails", curPos, "views", curTrail.views + 1);
  setCSSID(curTrail.id);
};

const getStepByID = (lookupID = getCSSID()) => {
  const found = getSteps().find((x) => x.id === lookupID);
  return found;
};

// let's export minium, try not to allow direct writes
export {
  getCSSID,
  getLocal,
  getStepByID,
  getSteps,
  setNewPos,
  setLocal,
}
