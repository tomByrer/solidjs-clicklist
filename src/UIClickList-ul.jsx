import { For } from "solid-js";
import {
	getCSSID,
	getLocal,
	getSteps,
	setNewPos,
} from "./createClickList"

export function ClickListUlViews() {
  return (
    <section>
      <style>
        {`
li {cursor:pointer;padding:0.32em;border-radius:0.32em;background-color:#fdfbf9;}
li.viewed {color:#1e5938;background-color:transparent}
li.viewed::marker {content:'✔  ';font-size:0.8em;color:seagreen}
li.active {color:#22201e;background-color:#e3f0e9}
li#${getCSSID()} {color:linen;background-color:#2e8b57;}
li#${getCSSID()}::marker {content:'👉 ';font-size:0.8em;color:red}
`}
      </style>
      <ul>
        <For each={getSteps()}>
          {(step, getIdx) => {
            const thisTrail = getLocal.trails.find((x) => x.id === step.id);
            return (
              <li
                id={thisTrail.id}
                classList={{ active:thisTrail.isActive, viewed:thisTrail.views > 0 }}
                onClick={[setNewPos, getIdx()]}
                tabindex="0"
                type="button"
              >
                <var>{thisTrail.id}:</var> {step.name} <i>= {thisTrail.views}</i>
              </li>
            );
          }}
        </For>
      </ul>
    </section>
  );
}
