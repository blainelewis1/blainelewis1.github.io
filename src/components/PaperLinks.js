import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  & > * {
    margin-right: 10px;
  }
`

const InlineIcon = styled.span`
  vertical-align: middle;
`

export const markdownFrontmatterFragment = graphql`
  fragment PaperLinks on Mdx {
    fields {
      slug
    }
    frontmatter {
      talk
      preview
      video
      demo
      pdf {
        publicURL
      }
    }
  }
`

const PaperLinks = ({ frontmatter }) => {
  return (
    <Container>
      {frontmatter?.talk && (
        <a href={frontmatter.talk}>
          <InlineIcon className="material-icons">movie</InlineIcon> Talk
        </a>
      )}
      {frontmatter?.preview && (
        <a href={frontmatter.preview}>
          <InlineIcon className="material-icons">movie</InlineIcon> Preview
        </a>
      )}

      {frontmatter?.video && (
        <a href={frontmatter.video}>
          <InlineIcon className="material-icons">movie</InlineIcon> Video
        </a>
      )}

      {frontmatter?.demo && <Link to={frontmatter.demo}>DEMO</Link>}
      {frontmatter?.pdf?.publicURL && (
        <Link to={frontmatter.pdf.publicURL}>
          {/* <InlineIcon className="material-icons">picture_as_pdf</InlineIcon>  */}
          PDF
        </Link>
      )}
    </Container>
  )
}

export default PaperLinks
