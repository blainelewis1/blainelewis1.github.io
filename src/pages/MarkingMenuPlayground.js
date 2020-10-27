import React from "react"
import MarkingMenu from "../components/MarkingMenu"
import DelayGroup from "../components/DelayGroup"

const MarkingMenuPlayground = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <MarkingMenu />
      <DelayGroup delays={[200, 333, 500, 1000, 2000]} />
    </div>
  )
}

export default MarkingMenuPlayground
