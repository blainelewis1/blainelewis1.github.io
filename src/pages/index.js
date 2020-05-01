import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import SEO from "../components/seo"
import Reference from "../components/Reference"

let Content = styled.div`
  max-width: 800px;
  margin: auto;
`

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
          <Link to="/artlike">artlike</Link>{" "}
        </NavItem>
        <NavItem>
          <a href="#publications">publications</a>{" "}
        </NavItem>
      </Nav>
    </HeaderContainer>
  )
}

let months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
].reduce((obj, cur, i) => ({ ...obj, [cur]: i }), {})

// only my pubs
let test = `{
  allFile(filter: {sourceInstanceName: {eq: "publications"}}) {
    nodes {
      children {
        ... on Bib {
          key
          month
          year
        }
      }
    }
  }
}
`

export const query = graphql`
  query {
    profile: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    publications: allFile(
      filter: {
        sourceInstanceName: { eq: "publications" }
        childBib: { key: { ne: null } }
      }
    ) {
      nodes {
        childBib {
          key
          month
          year
        }
      }
    }
  }
`
const IndexPage = ({ data }) => {
  let publications = data.publications.nodes.map(
    ({ childBib = {} }) => childBib
  )

  // TODO: use the keys and mdx frontmatter to pull in the rest of my information....

  return (
    <>
      <SEO title="Home" />

      <Content>
        <Header />
        <About />
        <section id="publications">
          <h2>Publications</h2>
          {publications.map(({ key }) => (
            <Reference referenceKey={key} />
          ))}
        </section>
      </Content>
    </>
  )
}

let About = () => {
  return (
    <div>
      <h1>Blaine Lewis</h1>scholar, blah, blah, blah.
    </div>
  )
}

export default IndexPage
