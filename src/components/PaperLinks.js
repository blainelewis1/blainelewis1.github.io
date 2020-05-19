import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Container = styled.div`
  & > * {
    margin-right: 10px;
  }
`

const InlineIcon = styled.span`
  vertical-align: middle;
`

const PaperLinks = ({ frontmatter }) => {
  return (
    <Container>
      {frontmatter?.preview && (
        <Link to={frontmatter.preview}>
          <InlineIcon className="material-icons">movie</InlineIcon> Preview
        </Link>
      )}

      {frontmatter?.preview && (
        <Link to={frontmatter.video}>
          <InlineIcon className="material-icons">movie</InlineIcon> Video
        </Link>
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
