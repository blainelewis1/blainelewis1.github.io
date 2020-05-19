import React from "react"
import styled from "styled-components"
import { MDXProvider } from "@mdx-js/react"
import "../styles/basic-post.css"
import Reference from "../components/Reference"
import { find } from "lodash"
import PaperLinks from "../components/PaperLinks"
import { graphql, useStaticQuery } from "gatsby"
import CopyOnClick from "../components/CopyOnClick"
import { Helmet } from "react-helmet"

// TODO: adding an outline to this page would be cool

// TODO: this creates invalid markup
const Figure = ({ data, caption }) => {
  return (
    <figure>
      <object data={data} type="image/svg+xml"></object>
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

let Bibtex = ({ children }) => {
  return (
    <BibtexContainer>
      <CopyOnClick content={children} />
      <code>{children}</code>
    </BibtexContainer>
  )
}

let References = () => (
  <section>
    <h2>References</h2>
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

// export const pageQuery = graphql`
//   query MdxBlogPost($id: String) {
//     mdx(id: { eq: $id }) {
//       id
//     }

//   }
// `

// TODO: add link to pdf, and videos, and etc.

export default ({ children, pageContext, ...props }) => {
  let data = useStaticQuery(graphql`
    query AllBibsForPub {
      allBib {
        nodes {
          key
          content
        }
      }
      allMdx {
        nodes {
          frontmatter {
            pdf {
              publicURL
            }
            key
            path
            preview
            title
            video
          }
          tableOfContents
        }
      }
    }
  `)

  const bib =
    find(data.allBib.nodes, {
      key: pageContext.frontmatter.key.toLowerCase(),
    }) || {}

  const frontmatter = (
    find(data.allMdx.nodes, {
      frontmatter: { title: pageContext.frontmatter.title },
    }) || { frontmatter: {} }
  ).frontmatter

  return (
    <MDXProvider components={{ ...shortcodes }}>
      <Helmet>
        <title>{pageContext.frontmatter.title} | Blaine Lewis</title>
      </Helmet>
      <Container>
        <h1>{pageContext.frontmatter.title}</h1>
        {children}
        <h2>Links + Info</h2>
        <PaperLinks frontmatter={frontmatter} />
        <br />
        <Reference referenceKey={pageContext.frontmatter.key} />

        <Bibtex>{bib.content}</Bibtex>
        <References />
      </Container>
    </MDXProvider>
  )
}
