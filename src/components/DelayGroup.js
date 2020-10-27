import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { max } from "lodash"

const DelayGroup = ({ delays, framerate = 20, padding = 500 }) => {
  let [timeStarted, setTimeStarted] = useState(Date.now())
  let [, setFrame] = useState(0)

  useEffect(() => {
    let id = setInterval(() => setFrame(frame => frame + 1), 1000 / framerate)

    return () => clearInterval(id)
  })
  console.log("render")
  let timePassed = Date.now() - timeStarted

  if (timePassed >= max(delays) + padding) {
    setTimeStarted(Date.now())
  }

  return (
    <div>
      {delays.map(delay => (
        <Delay delay={delay} timePassed={timePassed} />
      ))}
    </div>
  )
}

let DelayBar = styled.div`
  width: 100%;
  ${"" /* ${({ width }) => width}%; */}
  background-color: blue;
  height: 20px;
  transition: width ${({ delay }) => delay} linear;
`

const Delay = ({ delay, timePassed }) => {
  return <DelayBar width={Math.min(100, (timePassed / delay) * 100)} />
}

export default DelayGroup
