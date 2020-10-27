import React from "react"
import Header from "../components/header"
import styled from "styled-components"

let Content = styled.div`
  max-width: 800px;
  margin: auto;
`

const Layout = ({ children }) => {
  return (
    <Content>
      <Header />
      {children}
    </Content>
  )
}

export default Layout
