import React, { useRef } from "react"
import styled from "styled-components"

import Icon from "./Icon"

const GreyClickingIcon = styled(Icon)`
  cursor: pointer;
  color: #777;
  user-select: none;
`

const FileCopyIcon = () => <GreyClickingIcon>file_copy</GreyClickingIcon>

const TopRight = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`

const CopyOnClick = ({ content }) => {
  const codeEl = useRef(null)

  return (
    <TopRight
      onClick={() => {
        codeEl.current.select()
        document.execCommand("copy")
      }}
    >
      <FileCopyIcon />
      <textarea
        aria-hidden="true"
        readOnly
        style={{ position: "absolute", left: "-9999px" }}
        ref={codeEl}
        value={content}
      />
    </TopRight>
  )
}

export default CopyOnClick
