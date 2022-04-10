import { createSignal, createMemo, createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import createClickList from "./createClickList";
	const { getCSSID, getLocal, newPos } = createClickList;

function createSteps() {
  // 'remote' data
  const [getSteps, setSteps] = createSignal([
    { id: "info", name: "basic coooking instructions" },
    { id: "step1", name: "Collect ingreadiants & tools" },
    { id: "step2", name: "Mix" },
    { id: "step3", name: "Cook" },
    { id: "step4", name: "Eat!" },
  ]);

  const getStepByID = (lookupID = getCSSID()) => {
    const found = getSteps().find((x) => x.id === lookupID);
    return found;
  };

	const Current =()=> <p>Current: {getStepByID()?.name}</p>


  return { getSteps, Current };
}

export default createRoot(createSteps);
