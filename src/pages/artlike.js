import { Runtime, Inspector } from "@observablehq/runtime"
import { graphql } from "gatsby"
import React, { useLayoutEffect, useState } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"

export const pageQuery = graphql`
  query Observables {
    allObservablesJson {
      nodes {
        url
      }
    }
  }
`

let Player = styled.div`
  ${"" /* width: 80%; */}
  margin: auto;
`

let Canvas = styled.div`
  width: 100%;
`
let Controls = styled.div`
  width: 100%;
`

const Observables = ({ data }) => {
  let notebooks = data?.allObservablesJson?.nodes || []

  let [curNotebook, setCurNotebook] = useState(0)

  // This is very non-react like... Basically we make a bunch of divs then pass it off to observable to manage those divs.
  // No idea what happens if notebooks gets updated.

  // TODO: Support adding different nodenames, or multiples from the same file.
  // TODO: Pretty sure having this page open too long will melt your cpu.
  // JK I know exactly what happens, if it rerenders you end up with an extra copy of each one, hotreload taught my that. my legs hurt (laptop haha)
  let url = notebooks[curNotebook % notebooks.length].url

  useLayoutEffect(() => {
    const inspect = Inspector.into(`#observablehq-${url}`)

    import(
      /* webpackIgnore: true */ `https://api.observablehq.com/@blainelewis1/${url}.js?v=3`
    ).then(define => {
      define = define.default

      new Runtime().module(define, name => name === "svgNode" && inspect())
    })
  }, [url])

  return (
    <>
      <Helmet>
        <title>Artlike | Blaine Lewis</title>
      </Helmet>
      <div>
        <Player>
          <Canvas key={`observablehq-${url}`} id={`observablehq-${url}`} />
          <Controls>
            <button onClick={() => setCurNotebook(curNotebook - 1)}>
              Previous
            </button>
            <button onClick={() => setCurNotebook(curNotebook + 1)}>
              Next
            </button>
          </Controls>
        </Player>
      </div>
    </>
  )
}

export default Observables
