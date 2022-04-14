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
fieldset button {all:unset;display:block;cursor:pointer}
fieldset button:focus-visible {outline:2px dashed darkorange}
fieldset button.viewed {color:seagreen}
fieldset button#${getCSSID()} {color:linen;background-color:seagreen;}
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
