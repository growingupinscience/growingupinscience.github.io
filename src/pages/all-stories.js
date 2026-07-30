import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "../css/style.css"
import "../css/mobile.css"

export default function AllStories({ data }) {
  const stories = data.allMarkdownRemark.edges

  return (
    <Layout>
      <div className="page">
        <div className="section story-archive">
          <h1><span className="highlight">All Stories</span></h1>
          <br/>
          <p>
            All {stories.length} recorded unofficial stories are listed on this page, newest
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
