import React from "react"
import styled from "styled-components"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "../styles/basic-post.css"

import { graphql } from "gatsby"
import SEO from "../components/seo"

let Container = styled.div`
  margin: auto;
  max-width: 800px;
`

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      excerpt
      body
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`

export default ({ data }) => {
  return (
    <MDXProvider>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        canonical={data.mdx.fields.slug}
      />
      <Container>
        <h1>{data.mdx.frontmatter.title}</h1>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Container>
    </MDXProvider>
  )
}
