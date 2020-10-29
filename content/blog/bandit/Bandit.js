import React, { useState, useCallback } from "react"
import { randomInt } from "d3"

const Bandit = ({ min = 0, max = 10 }) => {
  // let mean = 0
  // let sd = 1

  // const random = useCallback(randomNormal(mean, sd), [mean, sd])

  const random = useCallback(randomInt(min, max))

  let [lastPull, setLastPull] = useState(null)

  return (
    <>
      <button onClick={() => setLastPull(random())}>Pull</button>
      <span>{lastPull}</span>
    </>
  )
}

export default Bandit
