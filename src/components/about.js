import React, { Component } from 'react';
import "../css/style.css"
import "../css/mobile.css"
import {Link, withPrefix, useStaticQuery, graphql} from "gatsby"

export default function About({children, style}) {
  // stories only (events without a story are tagged "event" but not "story")
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: {frontmatter: {tags: {in: "story"}}}) {
        totalCount
      }
    }
  `)
  const storyCount = data.allMarkdownRemark.totalCount
  const years = new Date().getFullYear() - 2014

  return (
    <section id = "about">
        <div className = "light section" style = {style}>
          {/* <Parallax translateY={["200px", "-200px"]}> */}
          <h1><span className="">About Us</span></h1>
          <div className="about-content">
          <div className="about-text">
          <h3>
            We highlight the human stories behind the science.
          </h3>
          <p>
          Have you ever wondered what your advisor struggled with as a graduate student? 
          What they struggle with now?
          Growing up in Science is a conversation series 
          featuring personal narratives of becoming and being a scientist.
          <br/><br/>
          Growing up in Science was started in 2014 at New York University by 
          professors Wei Ji Ma and Cristina Alberini, and is now worldwide. 
          <a href = "https://www.science.org/doi/10.1126/science.357.6354.942" target = "_blank">
            This article
          </a> describes the origin and impact of the series. 
          
          At a typical Growing up in Science event, one faculty member 
          shares their life story, with a focus on struggles, failures, doubts, 
          detours, and weaknesses. Common topics include dealing with expectations, 
          impostor syndrome, procrastination, luck, rejection, conflicts with advisors, 
          and work-life balance, but these topics are always embedded in the speaker's broader narrative.
          <br/><br/>
          Join us for a conversation about the human factors that are 
          universal undercurrents of working in academia but that 
          too often remain unspoken.
          </p>
          </div>
          <div className="about-stats">
            <div className="stat-circle stat-years">
              <span className="stat-number">{years}</span>
              <span className="stat-label">years</span>
            </div>
            <div className="stat-circle stat-chapters">
              <span className="stat-number">15+</span>
              <span className="stat-label">chapters</span>
            </div>
            <div className="stat-circle stat-stories">
              <span className="stat-number">{storyCount}+</span>
              <span className="stat-label">stories</span>
            </div>
          </div>
          </div>
          {/* </Parallax> */}
        </div>
    </section>
  )
}