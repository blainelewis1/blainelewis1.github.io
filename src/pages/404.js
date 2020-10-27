import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"

let Text = styled.h1`
  margin-top: 50px;
  text-align: center;
`

const Error404 = () => {
  return (
    <Layout>
      <Text>Page not found!</Text>
    </Layout>
  )
}

export default Error404
