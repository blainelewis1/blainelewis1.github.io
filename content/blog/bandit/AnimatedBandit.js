import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { randomBernoulli } from "d3"

import { PlayFill } from "@styled-icons/bootstrap/PlayFill"
import { PauseFill } from "@styled-icons/bootstrap/PauseFill"
import { SkipForwardFill } from "@styled-icons/bootstrap/SkipForwardFill"
import GraphBandit from "./GraphBandit"

const Control = styled.button`
  /* width: 1em; */
`
const Bandits = styled.div`
  /* width: 1em; */
  text-align: center;
`

const AnimatedBandit = ({
  algorithm,
  bandits = [randomBernoulli(0.5)],
  controls = true,
  playSpeed: initialPlaySpeed = 100,
  ...props
}) => {
  let [pulls, setPulls] = useState(new Array(bandits.length).fill([]))
  let [playing, setPlaying] = useState(false)
  let [playSpeed, setPlaySpeed] = useState(initialPlaySpeed)

  let runAlgorithm = useCallback(() => {
    let i = algorithm(pulls)

    setPulls(
      pulls.map((currentCurrentPulls, j) =>
        j === i ? [...currentCurrentPulls, bandits[i]()] : currentCurrentPulls
      )
    )
  }, [pulls])

  useEffect(() => {
    if (algorithm && playing) {
      var id = setInterval(runAlgorithm, playSpeed)
    }

    return () => clearInterval(id)
  }, [playing, runAlgorithm])

  return (
    <div>
      <Bandits>
        {pulls.map((currentPulls, i) => (
          <GraphBandit
            {...props}
            onPull={(times = 1) => {
              setPulls(
                pulls.map((currentCurrentPulls, j) =>
                  j === i
                    ? [
                        ...currentCurrentPulls,
                        ...new Array(times).fill(1).map(bandits[i]),
                      ]
                    : currentCurrentPulls
                )
              )
            }}
            pulls={currentPulls}
          />
        ))}
      </Bandits>

      {controls && (
        <div>
          <Control onClick={() => setPlaying(!playing)}>
            {playing ? <PauseFill size="1.5em" /> : <PlayFill size="1.5em" />}
          </Control>
          <Control onClick={runAlgorithm}>
            <SkipForwardFill size="1.5em" />
          </Control>
        </div>
      )}
    </div>
  )
}

export default AnimatedBandit
