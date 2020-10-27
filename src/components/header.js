import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

let Nav = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: right;
`
let NavItem = styled.li`
  display: inline-block;
  margin-left: 10px;

  list-style-type: none;
  margin: 0;
  padding: 0;

  a {
    text-decoration: none;
    color: #d95204;
    font-weight: bold;
    border-bottom: 2px solid #8c3503;
    margin-left: 10px;
  }

  a:hover {
    color: #8c3503;
  }
`

let HeaderContainer = styled.header``
let Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <NavItem>
          <Link to="/#publications">publications</Link>
        </NavItem>
        <NavItem>
          <Link to="/artlike">artlike</Link>
        </NavItem>
      </Nav>
    </HeaderContainer>
  )
}

export default Header
