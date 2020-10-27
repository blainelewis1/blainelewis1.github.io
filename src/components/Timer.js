import React from "react"

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

const Timer = () => {
  let [guessedTime, setGuessedTime] = useState(undefined)
  let [delayTime, setDelayTime] = useState(getRandomArbitrary(333, 3000))
  let [state, setState] = useState("menu")

  return (
    <div>
      <Prompt>Click and hold anywhere to open menu.</Prompt>
    </div>
  )
}

export default Timer
