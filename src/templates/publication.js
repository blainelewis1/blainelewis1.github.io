import React from "react"
import styled from "styled-components"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "../styles/basic-post.css"
import Reference from "../components/Reference"
import PaperLinks from "../components/PaperLinks"
import { graphql } from "gatsby"
import CopyOnClick from "../components/CopyOnClick"
import SEO from "../components/seo"

// TODO: adding an outline to this page would be cool

// TODO: this creates invalid markup
const Figure = ({ data, caption }) => {
  return (
    <figure>
      <object aria-label={caption} data={data} type="image/svg+xml"></object>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

let Container = styled.div`
  margin: auto;
  max-width: 800px;
`

let references = []

let Cite = ({ referenceKey }) => {
  let index = references.indexOf(referenceKey)
  if (index === -1) {
    references.push(referenceKey)
    index = references.length - 1
  }
  index += 1
  return <a href={`#${referenceKey}`}>[{index}]</a>
}

let BibtexContainer = styled.div`
  background-color: #eee;
  white-space: pre-wrap;
  padding: 20px;
  border-color: #ccc;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  margin: 20px;
  position: relative;
  line-height: 100%;
`

// TODO: An improvement would be to make this a styled textarea, then it will select on click
// TODO: a copied indicator thing would be good.

// TODO: set user-select all better.

let Bibtex = ({ children }) => {
  return (
    <BibtexContainer>
      <CopyOnClick content={children} />
      <code style={{ userSelect: "all" }}>{children}</code>
    </BibtexContainer>
  )
}

let References = () => (
  <section>
    {references.length > 0 && <h2>References</h2>}
    {references.map((key, index) => (
      <Reference index={index + 1} referenceKey={key} key={key} />
    ))}
  </section>
)

let Image = styled.img`
  max-height: 100px;
`

let ImageList = ({ images }) => {
  return Object.entries(images).map(([image, url]) => {
    return <Image src={url} alt={image} />
  })
}

let shortcodes = { Cite, Figure, ImageList }

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      excerpt
      body
      ...PaperLinks
      frontmatter {
        key
        title
        bib {
          content
        }
      }
      fields {
        slug
      }
    }
  }
`

export default ({ data }) => {
  console.log("yo", data)
  return (
    <MDXProvider components={{ ...shortcodes }}>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        canonical={data.mdx.fields.slug}
      />
      <Container>
        <h1>{data.mdx.frontmatter.title}</h1>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
        <h2>Links + Info</h2>
        <PaperLinks frontmatter={data.mdx.frontmatter} />
        <br />
        <Reference referenceKey={data.mdx.frontmatter.key} />

        <Bibtex>{data.mdx.frontmatter.bib[0].content}</Bibtex>
        <References />
      </Container>
    </MDXProvider>
  )
}
