import { createSignal, createMemo, createRoot } from "solid-js";
import { createStore } from "solid-js/store";

function createClickList() {
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
  const newPos = (pos = 1 + curPos) => {
    curPos = pos;
    const curTrail = getLocal.trails[curPos];
    setLocal("trails", curPos, "views", curTrail.views + 1);
    setCSSID(curTrail.id);
  };

  return { getCSSID, getLocal, newPos };
}

export default createRoot(createClickList);
