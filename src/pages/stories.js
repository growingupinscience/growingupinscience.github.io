import React, {Component, useState, useEffect, startTransition} from "react"
import { Link, StaticQuery, graphql } from 'gatsby'
import { Button, Row, Col } from 'reactstrap';
import Layout from '../components/layout'
import "../css/style.css"
import "../css/mobile.css"


class Stories extends Component {
  constructor (data, props) {
    super(data, props)
    const { edges: eventdata } = data.allMarkdownRemark
    this.state = {
      events: eventdata, 
      eventdata: eventdata
    };

    this.showNYU = this.showNYU.bind(this);
    this.reset = this.reset.bind(this);
  }

  showNYU(){
    this.setState({events: this.state.events.filter(p => p.node.frontmatter.tags.includes("nyu"))})
  }

  reset(){
    this.setState({events: this.state.eventdata})
  }

  render() {
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
          <h4>Filter by: 
          <Button size="lg" onClick={() => this.showNYU()}>NYU Events</Button>
          <Button size="lg" onClick={() => this.reset()}>Reset</Button>
          </h4>

          <Row style={{paddingTop: "50px"}}>
            <Col lg={4} xs={6}><h4>Date</h4></Col>
            <Col lg={7} xs={6}><h4>Name</h4></Col>
          </Row>
          <hr style = {{height: 3}}/>
          {
            this.state.events.map(({node: post}) => {
              if (post.frontmatter.tags.includes("year"))
              {
                return (<Row>
                  <Col xs={3}>{post.frontmatter.title}</Col>
                </Row>
                )
              }
              else{
                return (
                  <Row>
                    <Col lg={4} xs={6}><h4>{post.frontmatter.date}</h4></Col>
                    <Col lg={7} xs={6}><h4><Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link></h4></Col>
                  </Row>
                )
                }
              }
            )
          }
      </div>
      </div>
      </Layout>
    )
    
  }
}

const AllStories = (props) => 
  <StaticQuery query={graphql`
  query{
    allMarkdownRemark(
        filter: {frontmatter: {tags : {in: "story"}}}
        sort: { order: DESC, fields: [frontmatter___date] }
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