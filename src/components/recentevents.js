import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Parallax } from "react-scroll-parallax"
import { Row, Col } from "reactstrap"
import "../css/style.css"
import "../css/mobile.css"
import YoutubeEmbed from "../components/youtubeembed.js";


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
            excerpt(pruneLength: 500 format:HTML)
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
    console.log(posts)

    //filter for future posts
    const futureposts = posts.filter(({node: post}) => {
      return new Date(post.frontmatter.date) >= new Date()
    })

    // filter for past posts
    const pastposts = posts.filter(({node: post}) => {
      return new Date(post.frontmatter.date) < new Date()
    })

    const upcomingevents = futureposts
    // .slice(0, 3) //to get only the first n items
    .map(({node: post}) => {
    return (
        <div className="post-preview" key={post.id} style={{paddingTop:"10px", paddingBottom:"10px"}}>
        <h3>
            <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
        </h3>
        <h4>
        <i>{post.frontmatter.date} &nbsp;&nbsp;&nbsp;  {post.frontmatter.time} &nbsp;&nbsp;&nbsp; {post.frontmatter.location} </i>
        </h4>
        <div className="snippetblock" dangerouslySetInnerHTML={{ __html: post.excerpt}} />
        </div>
    )
    })

    const recentevents = pastposts
    // .slice(0, 3) //to get only the first n items
    .map(({node: post}) => {

    if (post.frontmatter.video){
      return (
        <Row>
          <Col md={5}>
          <div className="post-preview" key={post.id} style={{paddingTop:"10px", paddingBottom:"10px"}}>
          <h3>
              <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
          </h3>
          <h4>
          <i>{post.frontmatter.date} &nbsp;&nbsp;&nbsp;  {post.frontmatter.time} &nbsp;&nbsp;&nbsp; {post.frontmatter.location} </i>
          </h4>
          <div className="recent" dangerouslySetInnerHTML={{ __html: post.excerpt}} />
          </div>
          </Col>
          <Col md={7}>
            <YoutubeEmbed embedId={post.frontmatter.video} width={300} height={300}/>
          </Col>
        </Row>
        
      )
    }
    else{
      return (
        <div className="post-preview" key={post.id} style={{paddingTop:"10px", paddingBottom:"10px"}}>
        <h3>
            <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
        </h3>
        <h4>
        <i>{post.frontmatter.date} &nbsp;&nbsp;&nbsp;  {post.frontmatter.time} &nbsp;&nbsp;&nbsp; {post.frontmatter.location} </i>
        </h4>
        <div className="recent" dangerouslySetInnerHTML={{ __html: post.excerpt}} />
        </div>
    )

    }
    })

    return (
      <section id="recent-events" style={{marginTop: "-30vh"}}>
      <div className = "dark section" style={{paddingTop: "150px"}}>

        <Parallax translateY={["0px", "-200px"]}>
          <h1><span className="">EVENTS</span></h1>
          <h3>
          <Link to={"/events/"}>See All Events &#8594;</Link>
          </h3>
          <br/><br/>

          <h2><span className="">UPCOMING</span></h2>
          {upcomingevents}
          <br/><br/>

          <h2><span className="">RECENT</span></h2>
          {recentevents}
          <br/><br/>
        </Parallax>
      </div>
      </section>
    )
  }
  export default Layout