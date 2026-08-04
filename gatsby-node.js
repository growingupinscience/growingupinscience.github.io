/**
 * Explicit frontmatter schema.
 *
 * Gatsby infers types from whatever the markdown files happen to contain, so an
 * optional field that no file currently uses disappears from the schema and any
 * query for it fails the build. `time` and `video` are only set on some events,
 * so they are declared here to keep the components' queries valid regardless of
 * the current content.
 */
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }

    type MarkdownRemarkFrontmatter {
      slug: String!
      title: String!
      date: Date @dateformat
      tags: [String]
      location: String
      time: String
      video: String
    }
  `)
}
