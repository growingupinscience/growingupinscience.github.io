import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import "../css/style.css"
import "../css/mobile.css"
import { getMonthDayFormat } from "../utils/utils.js"

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

  // compare against midnight today, not the current moment — an event's
  // date parses to midnight, so it should stay "upcoming" through its
  // whole day rather than dropping off at 12:00 AM
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const upcoming = data.allMarkdownRemark.edges.filter(({ node: post }) => {
    return new Date(post.frontmatter.date) >= startOfToday
  })

  // the semester the next events would fall in: Spring starts after
  // August, otherwise Fall of the current year
  const now = new Date()
  const semester = now.getMonth() >= 8
    ? "Spring " + (now.getFullYear() + 1)
    : "Fall " + now.getFullYear()

  return (
    <div className="upcoming-banner">
      <h4 className="upcoming-eyebrow">Upcoming Events</h4>
      { upcoming.length > 0 ?
        <ul className="upcoming-list">
          {upcoming.map(({ node: post }) => (
            <li className="upcoming-item" key={post.id}>
              <span className="upcoming-rail">
                {getMonthDayFormat(post.frontmatter.date)}
              </span>
              <span className="upcoming-body">
                <Link className="upcoming-name" to={post.frontmatter.slug}>
                  {post.frontmatter.title}
                </Link>
                { (post.frontmatter.time || post.frontmatter.location) &&
                  <span className="upcoming-meta">
                    {[post.frontmatter.time, post.frontmatter.location]
                      .filter(Boolean).join(" · ")}
                  </span>
                }
              </span>
            </li>
          ))}
        </ul>
        :
        <p className="upcoming-empty">
          The NYU chapter of Growing up in Science is planning further
          events for the upcoming {semester} semester.
        </p>
      }
    </div>
  )
}
