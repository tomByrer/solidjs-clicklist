import { For } from "solid-js"
import {
  getCSSID,
  getLocal,
  getSteps,
  newPos,
} from "./createClickList"

export function ClickListButton() {
  return (
    <section>
      <style>{`
fieldset button {all:unset;cursor:pointer;display:block;padding:0.32em;border-radius:0.32em;background-color:#fcf5ef;}
fieldset button:focus-visible {outline:2px dashed darkorange}
li.active {color:#22201e:background-color:#2e8b57}
fieldset button.viewed {color:#1e5938;background-color:transparent}
fieldset button#${getCSSID()} {color:linen;background-color:#2e8b57;}
`}
      </style>
      <fieldset>
        <legend>Click on your current step:</legend>
        <For each={getSteps()}>
          {(step, getIdx) => {
            const thisTrail = getLocal.trails.find((x) => x.id === step.id)
            return (
              <button
                classList={{ viewed: thisTrail.views > 0 }}
                id={thisTrail.id}
                onClick={[newPos, getIdx()]}
                type="button"
              >
                <var>{thisTrail.id}:</var> {step.name} <i>= {thisTrail.views}</i>
              </button>
            )
          }}
        </For>
      </fieldset>
    </section>
  )
}
