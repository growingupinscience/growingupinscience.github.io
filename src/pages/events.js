import React, {Component, useState, useEffect, startTransition} from "react"
import { Link, StaticQuery, graphql } from 'gatsby'
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
      "mentorship": "Mentorship",
      "antiracism": "Anti-Racism",
      "global": "Global",
      "oxford": "Oxford", 
    }

    this.eventdata = eventdata

    // one boolean per filter; the visible list is derived from these at render
    this.state = {}
    this.filters.forEach(e => this.state[e] = false)

    this.reset = this.reset.bind(this);
    this.filterby = this.filterby.bind(this)
  }

  // events matching the active filters; with none active, everything shows
  visibleEvents(){
    const active = this.filters.filter(f => this.state[f])
    if (active.length === 0){
      return this.eventdata
    }
    return this.eventdata.filter(e =>
      active.some(f => e.node.frontmatter.tags.includes(f))
    )
  }

  filterby(f){
    this.setState(prev => ({[f]: !prev[f]}))
  }

  reset(){
    const cleared = {}
    this.filters.forEach(f => cleared[f] = false)
    this.setState(cleared)
  }

  render() {
    var events = this.visibleEvents()

    var filterButtons = this.filters.map(e => {
      return <button key={e} type="button" className="btn" onClick={() => this.filterby(e)}
      style = {{backgroundColor: this.state[e] ? "var(--btn-select)" : "var(--btn)"}}
      >{this.filtermap[e]}</button>
    })


    return (
      <Layout>
      <div className = "page">
      <div className = "section" style = {{paddingRight: "5vw"}}>
          <h1><span>GUIS Event List</span></h1>
          <br/>
          <p style={{paddingRight:"15vw"}}>
          This page is an archive of past Growing up in Science events. 
          While many follow the typical story format, some are panel discussions
          and workshops on related themes that can be found by filtering for "mentorship" or "antiracism".
          
          <p><b>Many have video recordings linked on their event pages, which you can reach by 
          clicking on the title page to reach the event-specific page.</b>  </p>
        
          If you are part of a GUIS chapter and would like to post your 
          event in this archive, please contact maya dot malaviya at nyu dot edu.
          </p>
          <h4>Filter by:
            {filterButtons}
            <button type="button" className="btn" onClick={() => this.reset()}>Reset</button>
          </h4>
          <div className="listing">
            <div className="listing-row listing-head">
              <div>Date</div>
              <div>Event</div>
              <div className="listing-tags"></div>
            </div>
            {
              events.map(({node: post}) => {
                // filter by tags
                var tags = post.frontmatter.tags.filter(e => this.filters.includes(e)).map(
                  e =>{
                    return <button key={e} type="button" className="btn tagbtn" onClick={() => this.filterby(e)}
                    style = {{backgroundColor: this.state[e] ? "var(--btn-select)" : "var(--btn)"}}
                    >{this.filtermap[e]}</button>
                  }
                )
                return (
                  <div className="listing-row" key={post.id}>
                    <div className="listing-date">{getDateFormat(post.frontmatter.date)}</div>
                    <div className="listing-title"><Link className="event-link" to={post.frontmatter.slug}>{post.frontmatter.title}</Link></div>
                    <div className="listing-tags">{tags}</div>
                  </div>
                )
                }
              )
            }
          </div>
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
  render = {data => <Events{...data}{...props} />} 
  />

export default AllEvents;