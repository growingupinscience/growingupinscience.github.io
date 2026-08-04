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
      // state lives in aria-pressed rather than an inline background colour, so
      // it is announced to screen readers and styleable from css
      return <button key={e} type="button" className="btn filterbtn"
      aria-pressed={this.state[e]} onClick={() => this.filterby(e)}
      >{this.filtermap[e]}</button>
    })


    return (
      <Layout>
      <div className = "page">
      <div className = "section">
          <h1><span>Events &amp; Stories</span></h1>
          <p>
          The full archive of Growing up in Science events. Most are personal
          stories from a single speaker; others are panels and workshops. Click
          any row for that event's page, with a video recording where one exists.
          </p>
          <p className="action-row">
            <Link className="btn" to="/stories/">Read all stories on one page</Link>
          </p>
          <div className="filter-bar">
            <span className="filter-label">Filter by</span>
            <div className="filter-options">
              {filterButtons}
              <button type="button" className="btn clearbtn" onClick={() => this.reset()}>Clear</button>
            </div>
          </div>
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
                    // a label first, a control second: chip styling, not a pill button
                    return <button key={e} type="button" className={"tagbtn tag-" + e}
                    aria-pressed={this.state[e]} onClick={() => this.filterby(e)}
                    >{this.filtermap[e]}</button>
                  }
                )
                return (
                  <div className="listing-row" key={post.id}>
                    <div className="listing-date">{getDateFormat(post.frontmatter.date)}</div>
                    <div className="listing-title"><Link className="event-link" to={post.frontmatter.slug}><span>{post.frontmatter.title}</span></Link></div>
                    <div className="listing-tags">{tags}</div>
                  </div>
                )
                }
              )
            }
          </div>
          {/* for the handful of chapter organisers, not the many readers:
              kept findable but out of the way of the listing */}
          <p className="listing-note">
            Running a GUIS chapter? Email maya dot malaviya at nyu dot edu to
            add your events.
          </p>
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