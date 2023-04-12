import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Parallax } from "react-scroll-parallax"
import { Row, Col } from "reactstrap"
import "../css/style.css"
import "../css/mobile.css"
import YoutubeEmbed from "../components/youtubeembed.js";
import { getDayofWeek, getMonthDayFormat } from "../utils/utils.js";


function formatEvents(posts){
    return posts
    // .slice(0, 3) //to get only the first n items
    .map(({node: post}) => {
      var youtubevid = ""
      if (post.frontmatter.video){
        youtubevid = <Col md={6}>
          <YoutubeEmbed embedId={post.frontmatter.video}/>
        </Col>
      }
      console.log(post.frontmatter.date)
      return (
        <Row>
          <Col md={2} style={{paddingTop: "2px", textAlign: "center"}}>
            <h2>
              {getDayofWeek(post.frontmatter.date)}
            </h2>
            <h3>
            {getMonthDayFormat(post.frontmatter.date)}<br/>
            </h3>
            <h4>
            {post.frontmatter.time}
            </h4>

          </Col>
          <Col md={4}>
          <div className="post-preview" key={post.id} style={{paddingBottom:"10px"}}>
          <h2>
              <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
          </h2>
          <h4>
          <i>{post.frontmatter.location}</i>
          </h4>

          <div className="recent" dangerouslySetInnerHTML={{ __html: post.excerpt}} />

          </div>
          </Col>
          {youtubevid}
        </Row>
        
      )
    })
}


const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
    query{
      allMarkdownRemark(
          filter: {frontmatter: {tags : {in: "event"}}}
          sort: { order: DESC, fields: [frontmatter___date] }
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

    const upcomingevents = formatEvents(futureposts)
    const recentevents = formatEvents(pastposts)

    return (
      <section id="recent-events" style={{marginTop: "-30vh"}}>
      <div className = "section" style={{paddingTop: "150px"}}>

        <Parallax translateY={["0px", "-200px"]}>
          
          <h1><span className="">COMING SOON</span></h1>
          {upcomingevents}
          <br/><br/>

          <h1><span className="">PAST EVENTS</span></h1>
          <h3>
          <Link to={"/events/"}>See All Events &#8594;</Link>
          </h3>
          <br/><br/>
          {recentevents}
          <br/><br/>
        </Parallax>
      </div>
      </section>
    )
  }
  export default Layout