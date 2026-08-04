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
        <div className="event-row" key={post.id}>
          <div className="event-content">
            <div className="event-details">
            <div className="post-preview">
            {/* plain text: the "Read more" button below is the only
                affordance, so the whole block does not read as a link */}
            <h2>{post.frontmatter.title}</h2>
            <h4 className="event-when">
              {getLongDate(post.frontmatter.date)}
              { upcoming && post.frontmatter.time ? ", " + post.frontmatter.time : "" }
            </h4>
            { upcoming && post.frontmatter.location ?
              <h4 className="event-where"><i>{post.frontmatter.location}</i></h4>
              : null
            }

            <div className="recent" dangerouslySetInnerHTML={{ __html: post.excerpt}} />

            <p className="action-row">
              <Link className="btn btn-readmore" to={post.frontmatter.slug}>
                Read more
              </Link>
            </p>

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

    // filter for past posts
    const pastposts = posts.filter(({node: post}) => {
      return new Date(post.frontmatter.date) < new Date()
    })

    const recentevents = formatEvents(pastposts, false)

    return (
      <section id="recent-events">
      <div className = "section">
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