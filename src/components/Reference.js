import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { find } from "lodash"
import styled from "styled-components"
import Authors from "./Authors"

export const query = graphql`
  fragment Reference on Bib {
    key
    year
    title
    type
    series
    publisher
    url
    booktitle
    authors
    pages
    address
    numpages
  }
`

let ReferenceView = styled.div`
  margin-bottom:10px;
  
  &::before {
    content: "${({ index }) => (index ? `[${index}]` : "")}";
    position: relative;
    left: -1.5em;
    display: inline-block;
    width: 0;
    white-space: nowrap;
  }
`

const Reference = ({ referenceKey, index }) => {
  let query = useStaticQuery(graphql`
    query AllBibsAndAuthors {
      allBib {
        nodes {
          ...Reference
        }
      }

      allAuthorsJson {
        nodes {
          name
          site
        }
      }
    }
  `)
  const bib = find(query.allBib.nodes, { key: referenceKey.toLowerCase() })

  let authorData = (query.allAuthorsJson.nodes || []).reduce(
    (prev, { name, site }) => ({ ...prev, [name]: site }),
    {}
  )

  let {
    year,
    title,
    authors,
    booktitle,
    series,
    publisher,
    address,
    pages,
    url,
    numpages,
  } = bib

  //TODO: style the link nicer
  // let Author = ({ author }) => {
  //   let authorText = author
  //   if (author.toLowerCase() === "blaine lewis") {
  //     authorText = <i>{author}</i>
  //   }

  //   if (authorData[author]) {
  //     return <a href={authorData[author]}>{authorText}</a>
  //   } else {
  //     return authorText
  //   }
  // }

  // authors = authors.map((author, i) => {
  //   let isLastAuthor = i === authors.length - 1
  //   let suffix = !isLastAuthor ? ", " : ""
  //   let prefix = isLastAuthor ? "and " : ""

  //   return (
  //     <>
  //       {prefix}
  //       <Author author={author} />
  //       {suffix}
  //     </>
  //   )
  // })

  // TODO: bold title and link to pub anytime my name shows up.

  let referenceString = `. ${year}. ${title}. ${booktitle} (${series}). ${publisher}, ${address}, ${
    pages || `1-${numpages}`
  }. DOI: `

  return (
    <ReferenceView index={index} id={referenceKey}>
      <Authors authors={authors} />
      {referenceString}
      <a href={url}>{url}</a>
    </ReferenceView>
  )
}

export default Reference
