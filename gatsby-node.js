/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const bibtex = require("bibtex")
const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const bibToEntry = entry => {
  let bibJson = bibToJson(entry)

  return {
    ...bibJson,
    type: entry.type,
    key: entry._id,
  }
}

const bibToJson = entry => {
  let fields = Object.keys(entry.fields).reduce(
    (obj, field) => ({
      ...obj,
      [field]: bibtex.normalizeFieldValue(entry.getField(field)),
    }),
    {}
  )

  let authors = entry
    .getAuthors()
    .authors$.map(author =>
      author.firstNames
        .concat(author.vons)
        .concat(author.lastNames)
        .concat(author.jrs)
        .join(" ")
    )

  return { ...fields, authors }
}

const onCreateMdxNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  const value = createFilePath({ node, getNode })
  const parent = getNode(node.parent)

  createNodeField({
    // Individual MDX node
    node,
    // Name of the field you are adding
    name: "slug",
    // Generated value based on filepath with "blog" prefix. you
    // don't need a separating "/" before the value because
    // createFilePath returns a path with the leading "/".
    value: `${parent.sourceInstanceName}${value}`,
  })
}

let onCreateBibtexNode = async ({
  node,
  actions: { createNode, createParentChildLink },
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) =>
  // options
  {
    function transformObject(obj, id, type) {
      const bibtexNode = {
        ...obj,
        id,
        content,
        children: [],
        parent: node.id,
        internal: {
          contentDigest: createContentDigest(obj),
          type,
        },
      }

      createNode(bibtexNode)
      createParentChildLink({ parent: node, child: bibtexNode })
    }

    const content = await loadNodeContent(node)
    const bib = bibtex.parseBibFile(content)

    const parsedContent = Object.values(bib.entries$).map(bibToEntry)

    parsedContent.forEach((obj, i) => {
      transformObject(
        obj,
        obj.id ? obj.id : createNodeId(`${node.id} ${obj.key} >>> BIBTEX`),
        _.upperFirst(_.camelCase(`Bib`)),
        content
      )
    })
  }
exports.onCreateNode = async (...args) => {
  let { node } = args[0]

  if (node.internal.type === "Mdx") {
    return onCreateMdxNode(...args)
  }
  if (node.extension === `bib`) {
    return onCreateBibtexNode(...args)
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = [
    `
      type Mdx implements Node {
        frontmatter: Frontmatter
      }
      type Frontmatter implements Node {
        bib: [Bib] @link(by: "key", from: "key")
      }

      type Bib implements Node{
        key: String
      }
      `,
  ]
  createTypes(typeDefs)
}

exports.createPages = async (...args) => {
  await createMdxPages(...args)
}

let templates = {
  publications: `./src/templates/publication.js`,
  blog: `./src/templates/blog.js`,
}

const createMdxPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            parent {
              ... on File {
                sourceInstanceName
              }
            }
            id
            fields {
              slug
            }
            frontmatter {
              alias
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query')
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges
  // you'll call `createPage` for each result
  posts.forEach(({ node }) => {
    if (node.fields.slug) {
      ;[
        node.fields.slug,
        node.frontmatter.alias,
        // node.fields.slug?.toLowerCase(),
        // node.frontmatter.alias?.toLowerCase(),
      ]
        .filter(Boolean)
        .forEach(thePath =>
          createPage({
            // This is the slug you created before
            // (or `node.frontmatter.slug`)
            path: thePath,
            //TODO: need to pick template better, use the name
            // This component will wrap our MDX content
            component: path.resolve(templates[node.parent.sourceInstanceName]),
            // You can use the values in this context in
            // our page layout component
            context: { id: node.id },
          })
        )
    }
  })
}
