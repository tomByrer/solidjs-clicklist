import { For } from "solid-js";
import {
	getCSSID,
	getLocal,
	getSteps,
	newPos,
} from "./createClickList"

export function ClickListUlViews() {
  return (
    <section>
      <style>
        {`
li {cursor:pointer}
li.viewed {color:seagreen}
li.viewed::marker {content:'✔  ';font-size:0.8em;color:seagreen}
li#${getCSSID()} {color:linen;background-color:seagreen;}
li#${getCSSID()}::marker {content:'👉 ';font-size:0.8em;color:red}
`}
      </style>
      <p>
        click on list items
        <br />
        <i>= # of views</i>
      </p>
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
                {step.id}: {step.name} <i>= {thisTrail.views}</i>
              </li>
            );
          }}
        </For>
      </ul>
    </section>
  );
}
