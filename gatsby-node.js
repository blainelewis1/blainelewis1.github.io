/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const bibtex = require("bibtex")
const _ = require("lodash")

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

  let entryObject = {
    ...fields,
    authors,
    type: entry.type,
    key: entry._id,
  }

  return entryObject
}

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) =>
  // options
  {
    const { createNode, createParentChildLink } = actions

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

    if (node.extension !== `bib`) {
      return
    }

    const content = await loadNodeContent(node)
    const bib = bibtex.parseBibFile(content)

    const parsedContent = Object.values(bib.entries$).map(bibToJson)

    parsedContent.forEach((obj, i) => {
      transformObject(
        obj,
        obj.id ? obj.id : createNodeId(`${node.id} ${obj.key} >>> BIBTEX`),
        _.upperFirst(_.camelCase(`Bib`)),
        content
      )
    })
  }

exports.createSchemaCustomization = ({ actions, schema }) => {
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

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@blainelewis1\/keymap/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
