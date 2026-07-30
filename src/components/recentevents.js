import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import "../css/style.css"
import "../css/mobile.css"
import YoutubeEmbed from "../components/youtubeembed.js";
import { getLongDate } from "../utils/utils.js";


function formatEvents(posts, upcoming){
    return posts
    // .slice(0, 3) //to get only the first n items
    .map(({node: post}) => {
      var youtubevid = ""
      if (post.frontmatter.video){
        youtubevid = <div className="video-container">
          <YoutubeEmbed embedId={post.frontmatter.video}/>
        </div>
      }
      return (
        <div className="event-row" style={{paddingTop: "2px"}} key={post.id}>
          <div className="event-content">
            <div className="event-details">
            <div className="post-preview" style={{paddingBottom:"10px"}}>
            <h2>
                <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
            </h2>
            <h4 className="event-when">
              {getLongDate(post.frontmatter.date)}
              { upcoming && post.frontmatter.time ? ", " + post.frontmatter.time : "" }
            </h4>
            { upcoming ?
              <h4>
              <i>{post.frontmatter.location}</i>
              {post.frontmatter.snippet}
              </h4> : <div/>
            }

            <div className="recent" dangerouslySetInnerHTML={{ __html: post.excerpt}} />

            </div>
            </div>
          </div>

          {youtubevid}
        </div>

      )
    })
}


const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
    query{
      allMarkdownRemark(
          filter: {frontmatter: {tags : {in: "event"}}}
          sort: {frontmatter: {date: DESC}}
          limit: 5
        ){
        edges {
          node {
            excerpt(pruneLength: 350 format:HTML)
            frontmatter {
              slug
              title
              date(formatString: "MMMM DD, YYYY")
              tags
              location
              time
              video
            }
          }
        }
      }
    }
    `)

    const { edges: posts } = data.allMarkdownRemark

    //filter for future posts
    const futureposts = posts.filter(({node: post}) => {
      return new Date(post.frontmatter.date) >= new Date()
    })

    // filter for past posts
    const pastposts = posts.filter(({node: post}) => {
      return new Date(post.frontmatter.date) < new Date()
    })

    const upcomingevents = formatEvents(futureposts, true)
    const recentevents = formatEvents(pastposts, false)

    // the semester the next events would fall in: Spring starts after
    // August, otherwise Fall of the current year
    const now = new Date()
    const semester = now.getMonth() >= 8
      ? "Spring " + (now.getFullYear() + 1)
      : "Fall " + now.getFullYear()

    return (
      <section id="recent-events">
      <div className = "section">
          <h1><span className="">Upcoming Events</span></h1>
          { upcomingevents.length > 0 ? upcomingevents :
            <p>
              The NYU chapter of Growing up in Science is planning further
              events for the upcoming {semester} semester.
            </p>
          }
          <br/>

          <h1><span className="">Recent Events</span></h1>
          {/* <h3>
          <Link to={"/events/"}>See All Events &#8594;</Link>
          </h3> */}
          {recentevents}
      </div>
      </section>
    )
  }
  export default Layout