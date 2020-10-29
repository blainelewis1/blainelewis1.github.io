import React from "react"

import { VegaLite } from "react-vega"

import styled from "styled-components"

import LeverIcon from "./noun_lever_2176903.inline.svg"

const BanditWrapper = styled.div`
  text-align: center;
  display: inline-block;
`

const Lever = styled.button.attrs({ children: <LeverIcon /> })`
  cursor: pointer;

  /* outline: none; */
  /* padding: 0; */
  /* background: none; */
  /* border: none; */

  & > svg {
    width: 2em;
    height: 2em;
  }
`

let density = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  data: { name: "pulls" },
  transform: [
    {
      density: "data",
      bandwidth: 0.3,
    },
  ],
  mark: "area",
  encoding: {
    x: {
      field: "value",
      type: "quantitative",
    },
    y: {
      field: "density",
      type: "quantitative",
    },
  },
}

let histogram = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",

  mark: "bar",
  data: { name: "pulls" },
  encoding: {
    x: {
      bin: true,
      field: "data",
    },
    y: { aggregate: "count" },
  },
}

const GraphBandit = ({
  pulls,
  onPull,
  history = true,
  pullLots = true,
  graphs = true,
}) => {
  return (
    <BanditWrapper>
      <div>
        {pulls.length ? Math.round(pulls[pulls.length - 1]) : "Pull the lever!"}
      </div>
      <div>
        <Lever onClick={onPull} />
      </div>
      {history && (
        <div>
          <center>
            [
            {`${pulls.length > 5 ? "..." : ""} ${pulls
              .slice(Math.max(pulls.length - 5, 0))
              .map(Math.round)
              .join(", ")}
      `}
            ]
          </center>
        </div>
      )}
      {graphs && (
        <div>
          <VegaLite spec={histogram} data={{ pulls }} />
        </div>
      )}
      {pullLots && (
        <button
          style={{ visibility: pulls.length >= 5 ? "visible" : "hidden" }}
          onClick={() => onPull(100)}
        >
          Pull 100 times.
        </button>
      )}
    </BanditWrapper>
  )
}

export default GraphBandit
