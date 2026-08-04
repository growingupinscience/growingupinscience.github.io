import React from "react"
import { Link, StaticQuery, graphql } from 'gatsby'
import { getDateFormat } from '../utils/utils';
import Layout from '../components/layout'
import "../css/style.css"
import "../css/mobile.css"


function Stories(data) {
    const { edges: stories } = data.allMarkdownRemark

    return (
      <Layout>
      <div className = "page">
      <div className = "section dark" style = {{paddingRight: "5vw"}}>
          <h1><span className="highlight">Unofficial Stories</span></h1>
          <br/>
          <p style={{paddingRight:"15vw"}}>
          In lieu of abstracts, we ask speakers for "unofficial" stories. 
          The following unofficial stories are shared here with 
          the speakers' permission. GUIS is also partnering with
          the <a href="https://storiesinscience.org/" target="__blank">
            Journal of Stories in Science
          </a>, 
          which publishes stories about science from students, postdocs, 
          faculty and the public from around the world. With the speakers' help, 
          several of the stories below have now been republished in the journal.
          </p>
          <p>
            <Link className="btn" to="/all-stories/">You may also read all stories on one page by clicking here.</Link>
          </p>
          <div className="listing">
            <div className="listing-row listing-head">
              <div>Date</div>
              <div>Name</div>
            </div>
            {
              stories.map(({node: post}) => (
                <div className="listing-row" key={post.id}>
                  <div className="listing-date">{getDateFormat(post.frontmatter.date)}</div>
                  <div className="listing-title"><Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link></div>
                </div>
              ))
            }
          </div>
      </div>
      </div>
      </Layout>
    )
}

const AllStories = (props) =>
  <StaticQuery query={graphql`
  query{
    allMarkdownRemark(
        filter: {frontmatter: {tags : {in: "story"}}}
        sort: {frontmatter: {date: DESC}}
      ){
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            location
          }
        }
      }
    }
  }
  `}
  render = {data => <Stories{...data}{...props} />} 
  />

export default AllStories;