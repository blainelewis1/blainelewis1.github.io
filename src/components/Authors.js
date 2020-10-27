//TODO: style the link nicer

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Authors = ({ authors }) => {
  let query = useStaticQuery(graphql`
    query AllAuthors {
      allAuthorsJson {
        nodes {
          name
          site
        }
      }
    }
  `)

  let authorData = (query.allAuthorsJson.nodes || []).reduce(
    (prev, { name, site }) => ({ ...prev, [name]: site }),
    {}
  )

  let Author = ({ author }) => {
    let authorText = author

    if (author.toLowerCase() === "blaine lewis") {
      authorText = <i>{author}</i>
    }

    if (authorData[author.replace("*")]) {
      return <a href={authorData[author]}>{authorText}</a>
    } else {
      return authorText
    }
  }

  return (
    <span>
      {authors.map((author, i) => {
        let isLastAuthor = i === authors.length - 1
        let suffix = !isLastAuthor ? ", " : ""
        let prefix = isLastAuthor ? "and " : ""

        return (
          <span key={author}>
            {prefix}
            <Author author={author} />
            {suffix}
          </span>
        )
      })}
    </span>
  )
}

export default Authors
