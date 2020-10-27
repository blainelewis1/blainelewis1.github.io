import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

let MenuItem = styled.span`
  border: solid 1px;
  padding: 8px;
  user-select: none;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;

  &:hover {
    background-color: #64b5f6;
  }
`

let Guide = ({ menuItems, radius = 150 }) => {
  let theta = (Math.PI * 2) / menuItems.length

  return (
    <g>
      {menuItems.map((menuItem, i) => (
        <g
          transform={`translate(${Math.cos(theta * i) * radius},${
            Math.sin(theta * i) * radius
          })`}
        >
          <foreignObject width={1} height={1} style={{ overflow: "visible" }}>
            <MenuItem>{menuItem}</MenuItem>
          </foreignObject>
          {/* <text
            // x={Math.cos(theta * i) * radius}
            // y={Math.sin(theta * i) * radius}
            textAnchor="middle"
          >
            {menuItem}
          </text> */}
          {/* <rect width="100%" height="100%" /> */}
        </g>
      ))}
    </g>
  )
}

const MarkingMenu = ({
  menuItems = ["hello", "world", "here", "is", "a", "menu", "item", "thing"],
  delay = 500,
}) => {
  let ref = useRef()
  let [showGuide, setShowGuide] = useState(false)

  let [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let refValue = ref.current
    let timeout

    let displayGuide = e => {
      timeout = setTimeout(() => setShowGuide(true), delay)
      setCurrentPos({ x: e.clientX, y: e.clientY })
    }

    let hideGuide = () => setShowGuide(false)

    if (refValue) {
      refValue.parentElement.addEventListener("mousedown", displayGuide)
      refValue.parentElement.addEventListener("mouseup", hideGuide)
    }

    return () => {
      clearTimeout(timeout)

      if (refValue) {
        refValue.parentElement.removeEventListener("mousedown", displayGuide)
        refValue.parentElement.removeEventListener("mouseup", hideGuide)
      }
    }
  }, [ref.current])

  let radius = 150
  let width, height
  width = height = radius * 2 + 200

  return (
    <svg
      style={{
        position: "absolute",
        left: currentPos.x - width / 2,
        top: currentPos.y - height / 2,
      }}
      ref={ref}
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
    >
      {showGuide && <Guide radius={radius} menuItems={menuItems} />}
    </svg>
  )
}

export default MarkingMenu
