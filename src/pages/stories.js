import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "../css/style.css"
import "../css/mobile.css"

export default function Stories({ data }) {
  // stub entries (event happened, but no written story yet) have an
  // empty markdown body — keep them off this page until text is added
  const stories = data.allMarkdownRemark.edges.filter(
    ({ node }) => node.html && node.html.trim().length > 0
  )

  return (
    <Layout>
      <div className="page">
        <div className="section story-archive">
          <h1><span className="highlight">All Stories</span></h1>
          <br/>
          <p>
          In lieu of abstracts, we ask speakers for "unofficial" stories. The following unofficial stories are shared here with the speakers' permission.
          GUIS also partners with the Journal of Stories in Science, which publishes stories about science from students, postdocs, faculty and the
          public from around the world. With the speakers' help, several of the stories below have now been republished in the journal.
          </p>
          <p>
            You can find all official and unofficial stories on this page, newest
            first. You may click a speaker's name to visit their story's own page
            (with the video recording where available).
          </p>
          {
            stories.map(({ node: post }) => (
              <article className="story-entry" key={post.id}>
                <h2><Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link></h2>
                <div className="story-entry-date">{post.frontmatter.date}</div>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              </article>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {frontmatter: {tags: {in: "story"}}}
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
