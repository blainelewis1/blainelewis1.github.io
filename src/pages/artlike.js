import { Runtime, Inspector } from "@observablehq/runtime"
import { graphql, useStaticQuery } from "gatsby"
import React, { useLayoutEffect } from "react"

const Observables = () => {
  let notebooks = useStaticQuery(graphql`
    query Observables {
      allObservablesJson {
        nodes {
          url
        }
      }
    }
  `).allObservablesJson.nodes

  // This is very non-react like... Basically we make a bunch of divs then pass it off to observable to manage those divs.
  // No idea what happens if notebooks gets updated.

  // TODO: Support adding different nodenames, or multiples from the same file.
  // TODO: Pretty sure having this page open too long will melt your cpu.
  // JK I know exactly what happens, if it rerenders you end up with an extra copy of each one, hotreload taught my that. my legs hurt (laptop haha)
  useLayoutEffect(() => {
    notebooks.forEach(({ url }) => {
      const inspect = Inspector.into(`#observablehq-${url}`)

      import(
        /* webpackIgnore: true */ `https://api.observablehq.com/@blainelewis1/${url}.js?v=3`
      ).then(define => {
        define = define.default

        new Runtime().module(define, name => name === "svgNode" && inspect())
      })
    })
  }, [notebooks])
  return (
    <>
      {notebooks.map(({ url }) => (
        <div id={`observablehq-${url}`} />
      ))}
    </>
  )
}

export default Observables
