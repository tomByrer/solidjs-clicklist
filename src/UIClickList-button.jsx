import { For } from "solid-js"
import {
  getCSSID,
  getLocal,
  getSteps,
  setNewPos,
} from "./createClickList"

export function ClickListButton() {
  return (
    <section>
      <style>{`
fieldset button {all:unset;cursor:pointer;display:block;padding:0.32em;border-radius:0.32em;background-color:#fdfbf9;}
fieldset button:focus-visible {outline:2px dashed darkorange}
fieldset button.viewed {color:#1e5938;background-color:transparent}
fieldset button.active {color:#22201e;background-color:#e3f0e9}
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
                classList={{ active:thisTrail.isActive, viewed:thisTrail.views > 0 }}
                id={thisTrail.id}
                onClick={[setNewPos, getIdx()]}
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
