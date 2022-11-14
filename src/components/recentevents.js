import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Parallax } from "react-scroll-parallax"
import "../css/style.css"
import "../css/mobile.css"


const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
    query{
      allMarkdownRemark(
          filter: {frontmatter: {tags : {in: "event"}}}
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 3
        ){
        edges {
          node {
            excerpt(pruneLength: 300 format:HTML)
            frontmatter {
              slug
              title
              date(formatString: "MMMM DD, YYYY")
              tags
              location
              time
            }
          }
        }
      }
    }
    `)

    const { edges: posts } = data.allMarkdownRemark
    console.log(posts)
    const filterposts = posts.filter(({node: post}) => {
      return new Date(post.frontmatter.date) > new Date()
    })
    console.log("filter posts", filterposts)
    const recentevents = posts
    // .slice(0, n) to get only the first n items
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

    return (
      <section id="recent-events" style={{marginTop: "-30vh"}}>
      <div className = "dark section" style={{paddingTop: "150px"}}>
        <Parallax translateY={["0px", "-200px"]}>
          <h1><span className="highlight">RECENT EVENTS</span></h1>
          <h3>
          <Link to={"/events/"}>See All Events &#8594;</Link>
          </h3>
          <br/>
          {recentevents}
          <br/><br/>
        </Parallax>
      </div>
      </section>
    )
  }
  export default Layout