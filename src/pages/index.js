import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import SEO from "../components/seo"
import { map, sortBy } from "lodash"
import "../index.css"

import github from "../../static/GitHub-Mark-32px.png"
import twitter from "../../static/Twitter_Social_Icon_Circle_Color.png"
import scholar from "../../static/scholar.png"
import PaperLinks from "../components/PaperLinks"
import Authors from "../components/Authors"

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
          <a href="#publications">publications</a>{" "}
        </NavItem>
        <NavItem>
          <Link to="/artlike">artlike</Link>{" "}
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

export const query = graphql`
  query MyQuery {
    profile: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    publications: allFile(
      filter: { sourceInstanceName: { eq: "publications" } }
    ) {
      nodes {
        childMdx {
          frontmatter {
            preview
            video
            path
            demo

            bib {
              month
              key
              year
              title
              type
              authors
              url
            }

            pdf {
              publicURL
            }

            thumbnail {
              childImageSharp {
                fluid(maxWidth: 150, maxHeight: 150) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

// TODO: export to new component
let Thumbnail = styled.div`
  max-width: 150px;
  width: 100%;
`
const PublicationContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
`

const PublicationDescription = styled.div`
  margin-left: 30px;
`

const PublicationTitle = styled.div`
  font-size: 1.2em;
`

const Publication = ({ frontmatter }) => {
  return (
    <PublicationContainer>
      <Thumbnail>
        {frontmatter?.thumbnail?.childImageSharp && (
          <Img fluid={frontmatter.thumbnail.childImageSharp.fluid} />
        )}
      </Thumbnail>
      <PublicationDescription>
        <PublicationTitle>
          {frontmatter.path ? (
            <Link to={frontmatter.path}>{frontmatter.bib[0].title}</Link>
          ) : (
            frontmatter.bib[0].title
          )}
        </PublicationTitle>
        <div>
          <Authors authors={frontmatter.bib[0].authors}></Authors>
        </div>
        <a href={frontmatter.bib[0].url}>{frontmatter.bib[0].url}</a>

        <PaperLinks frontmatter={frontmatter} />
      </PublicationDescription>
    </PublicationContainer>
  )
}

// export const query = graphql``
const IndexPage = ({ data }) => {
  let publications = []

  publications = map(data.publications.nodes, "childMdx.frontmatter").filter(
    Boolean
  )

  publications.forEach(pub => {
    pub.yearInt = parseInt(pub.bib[0].year)
    pub.monthInt = months[pub.bib[0].month]
  })

  publications = sortBy(publications, ["yearInt", "monthInt"]).reverse()

  return (
    <>
      <SEO title="Home" />

      <Content>
        <Header />
        <About data={data} />
        <section id="publications">
          <h2>Publications</h2>
          {publications.map(frontmatter => (
            <Publication frontmatter={frontmatter} key={frontmatter.key} />
          ))}
        </section>
      </Content>
    </>
  )
}
let LinkItem = styled.a`
  padding: 10px;
`
let LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

let About = ({ data }) => {
  return (
    <div>
      <h1>Blaine Lewis</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <div style={{ padding: "10px" }}>
          <Img fluid={data.profile.childImageSharp.fluid} />
          <LinkContainer>
            <LinkItem href="/resume">CV</LinkItem>
            <LinkItem href="https://scholar.google.ca/citations?user=aDIlxvUAAAAJ&hl=en">
              <img width="32" src={scholar} />
            </LinkItem>
            <LinkItem href="https://github.com/blainelewis1">
              <img src={github} />
            </LinkItem>
            <LinkItem href="https://twitter.com/BlaineLewis15">
              <img width="32" src={twitter} />
            </LinkItem>
          </LinkContainer>
        </div>
        <div style={{ padding: "10px" }}>
          <p>
            I am a PhD student at the University of Toronto working with
            Professor <a href="https://tovigrossman.com">Tovi Grossman</a> in
            the{" "}
            <a herf="https://www.dgp.toronto.edu/">
              Digital Graphics Project (DGP)
            </a>
            . My main area of research is human computer interaction (HCI).
          </p>
          <p>
            My research interests vary widely depending on the week, but in
            general my research aims to solve problems users encounter when
            learning software. I mostly achieve this goal through designing new
            interaction techniques, like <Link to="/KeyMap">KeyMap</Link>. But
            more and more I've realised we don't truly understand why users fail
            to learn software so I seek to understand underlying breakdowns
            users experience while learning.
          </p>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
