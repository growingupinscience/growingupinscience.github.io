import React, {Component, useState, useEffect, startTransition} from "react"
import { Link, StaticQuery, graphql } from 'gatsby'
import { Button, Row, Col, Card} from 'reactstrap';
import { getDateFormat } from '../utils/utils';
import Layout from '../components/layout'
import "../css/style.css"
import "../css/mobile.css"


class Events extends Component {
  constructor (data, props) {
    super(data, props);
    const { edges: eventdata } = data.allMarkdownRemark
    this.filters = ["story", "nyu", "oxford", "global", "mentorship", "antiracism"]
    this.filtermap = {
      "nyu": "NYU", 
      "story": "Story",
      "global": "Global",
      "oxford": "Oxford", 
      "mentorship": "Mentorship",
      "antiracism": "Anti-Racism",
    }

    this.state = {
      show_nyu: false, 
      show_global: false, 
      events: eventdata, 
      eventdata: eventdata
    };
    this.filters.forEach(e => this.state[e] = false)

    this.reset = this.reset.bind(this);
    this.refresh = this.refresh.bind(this)
    this.filterby = this.filterby.bind(this)
  }

  refresh(){
    this.setState(
      {events: 
        // for each element in the event data
        this.state.eventdata.filter(e=> {

          // if all the filters are off, return true
          var allFalse = true
          this.filters.forEach(j => 
            allFalse = allFalse && !this.state[j]
          )
          var someTrue = false
          // filter by each filter listed in this.filters
          this.filters.forEach(j => 
            {someTrue = someTrue || (this.state[j] && e.node.frontmatter.tags.includes(j))}
          )

          if (allFalse || someTrue){
            return true
          }
          return false
        }
        )
      }
    )
  }

  filterby(f){
    this.state[f] = !this.state[f]
    this.refresh()
  }

  reset(){
    this.filters.forEach(f => 
      this.state[f] = false
    )
    this.refresh()
  }

  render() {
    console.log(this.filters)
    var filterButtons = this.filters.map(e => {
      return <Button onClick={() => this.filterby(e)}
      style = {{backgroundColor: this.state[e] ? "var(--btn-select)" : "var(--btn)"}}
      >{this.filtermap[e]}</Button>
    })


    return (
      <Layout>
      <div className = "page">
      <div className = "section" style = {{paddingRight: "5vw"}}>
          <h1><span>GUIS Events</span></h1>
          <br/>
          <p style={{paddingRight:"15vw"}}>
          NYU events are held in Meyer Hall (4 Washington Place), Room 636, 
          from 17:00-18:00 ET, unless announced otherwise. 
          Graduate students, postdocs, research 
          assistants, undergraduates, faculty, and visitors are all 
          welcome (visitors need to be added to a security check list).  
          For questions please contact weijima dot nyu dot edu.
          </p>
          <h4>Filter by:
            {filterButtons}
            <Button size="lg" onClick={() => this.reset()}>Reset</Button>
          </h4>
          <div className="desktop-only">
          <Row style={{paddingTop: "50px"}}>
            <Col xs={2}><h4>Date</h4></Col>
            <Col xs={6}><h4>Event</h4></Col>
          </Row>
          </div>
          <hr style = {{height: 3}}/>
          {
            this.state.events.map(({node: post}) => {
              if (post.frontmatter.tags.includes("year"))
              {
                return (<Row>
                  <Col lg={3}>{post.frontmatter.title}</Col>
                </Row>
                )
              }
              else{
                // filter by tags
                var tags = post.frontmatter.tags.filter(e => this.filters.includes(e)).map(
                  e =>{
                    return <Button className="tagbtn" onClick={() => this.filterby(e)}
                    style = {{backgroundColor: this.state[e] ? "var(--btn-select)" : "var(--btn)"}}
                    >{this.filtermap[e]}</Button>
                  }
                )
                return (
                  <div>
                    <div>
                    <Card className = "event" style={{backgroundColor: "rgba(0, 0, 0, 0)", border: "none"}}>
                    <Row>
                      <Col lg={2} xs={12}><h4>{getDateFormat(post.frontmatter.date)}</h4></Col>
                      <Col lg={4} xs={12}><h4><Link className="event-link" to={post.frontmatter.slug}>{post.frontmatter.title}</Link></h4></Col>
                      <Col lg={6}>{tags}</Col>
                    </Row>
                    </Card>
                    </div>
                  </div>
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

const AllEvents = (props) => 
  <StaticQuery query={graphql`
  query{
    allMarkdownRemark(
        filter: {frontmatter: {tags : {in: "event"}}}
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
  render = {data => <Events{...data}{...props} />} 
  />

export default AllEvents;