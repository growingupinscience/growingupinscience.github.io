import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import "../css/style.css"
import "../css/mobile.css"
import { getLongDate } from "../utils/utils.js"

export default function UpcomingBanner() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {frontmatter: {tags: {in: "event"}}}
        sort: {frontmatter: {date: ASC}}
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              title
              date(formatString: "MMMM DD, YYYY")
              location
              time
            }
          }
        }
      }
    }
  `)

  const upcoming = data.allMarkdownRemark.edges.filter(({ node: post }) => {
    return new Date(post.frontmatter.date) >= new Date()
  })

  // the semester the next events would fall in: Spring starts after
  // August, otherwise Fall of the current year
  const now = new Date()
  const semester = now.getMonth() >= 8
    ? "Spring " + (now.getFullYear() + 1)
    : "Fall " + now.getFullYear()

  return (
    <div className="upcoming-banner">
      <h4>Upcoming Events</h4>
      { upcoming.length > 0 ?
        upcoming.map(({ node: post }) => (
          <p key={post.id}>
            <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
            {" — " + getLongDate(post.frontmatter.date)}
            {post.frontmatter.time ? ", " + post.frontmatter.time : ""}
            {post.frontmatter.location ? " · " + post.frontmatter.location : ""}
          </p>
        ))
        :
        <p>
          The NYU chapter of Growing up in Science is planning further
          events for the upcoming {semester} semester.
        </p>
      }
    </div>
  )
}
