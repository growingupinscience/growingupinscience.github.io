import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js";
import {Parallax, ParallaxProvider} from "react-scroll-parallax";
import YoutubeEmbed from "../components/youtubeembed.js";
import "../css/style.css"
import "../css/mobile.css"




export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  var date = ""
  if (frontmatter.date !== "Invalid date"){
    date = frontmatter.date
  }

  var mode = "light section"
  if (frontmatter.tags == "page"){
    mode = "dark section"
  }

  var video = null;
  if (frontmatter.video){
    video = <YoutubeEmbed embedId={frontmatter.video}/>
  }

  return (
    <Layout>
      <ParallaxProvider>
      <div className = "page">
      <div className = {mode} style = {{minHeight: "100vh"}}>
        <div>
        <h1>
            <span className="highlight">
            {frontmatter.title}
            </span>
          </h1>
        <h3>{date}</h3>
        </div>
          {video}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
      </div>
      </div>
      </ParallaxProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        video
      }
    }
  }
`