import React from "react"
import { randomNormal } from "d3"

const Bandit = () => {
  let [random, setRandom] = useState(randomNormal(0, 1))
  let [lastPull, setLastPull] = useState(null)

  return (
    <>
      <button onClick={() => setLastPull(random())}>Pull</button>
      <span>{lastPull</span>
    </>
  )
}
