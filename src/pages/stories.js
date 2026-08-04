import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "../css/style.css"
import "../css/mobile.css"

// slug fragments are derived from the frontmatter slug so the anchor and the
// story's own page URL stay in step
function anchorFor(slug) {
  return slug.replace(/^\/+|\/+$/g, "").split("/").pop()
}

// surname particles stay attached to the name that follows, so "Wei Ji Ma"
// sorts under M and "Andre Marques Smith" under M rather than S
const PARTICLES = ["van", "von", "de", "del", "della", "di", "da", "du",
                   "la", "le", "den", "der", "ten", "ter", "bin", "al"]

function lastNameKey(title) {
  const parts = title.trim().split(/\s+/)
  if (parts.length === 1) return title.toLowerCase()

  // walk back from the end past any particles to find where the surname starts
  let i = parts.length - 1
  while (i > 0 && PARTICLES.includes(parts[i - 1].toLowerCase())) {
    i -= 1
  }
  const surname = parts.slice(i).join(" ")
  const rest = parts.slice(0, i).join(" ")
  return (surname + " " + rest).toLowerCase()
}

// localeCompare so accented names (Ripollés, Pylkkänen) file next to their
// unaccented equivalents rather than after Z
function byLastName(a, b) {
  return lastNameKey(a.node.frontmatter.title)
    .localeCompare(lastNameKey(b.node.frontmatter.title), "en")
}

// highlights whichever story is currently in view so the sidebar tracks
// the reader's position
function useActiveStory(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return

    const seen = new Map()
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => seen.set(e.target.id, e.isIntersecting))
        // the topmost visible story wins, so scrolling up and down agree
        const current = ids.find(id => seen.get(id))
        if (current) setActive(current)
      },
      { rootMargin: "-120px 0px -65% 0px" }
    )

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function Stories({ data }) {
  const stories = [...data.allMarkdownRemark.edges].sort(byLastName)
  const ids = stories.map(({ node }) => anchorFor(node.frontmatter.slug))
  const active = useActiveStory(ids)
  const listRef = useRef(null)

  // keep the active entry scrolled into view within the sidebar itself
  useEffect(() => {
    if (!active || !listRef.current) return
    const el = listRef.current.querySelector(`[data-for="${active}"]`)
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: "nearest" })
    }
  }, [active])

  return (
    <Layout>
      <div className="page">
        <div className="section story-archive">
          <h1><span className="highlight">Unofficial Stories</span></h1>
          <p>
            In lieu of abstracts, we ask speakers for "unofficial" stories. All
            {" " + stories.length} of them are collected here, listed alphabetically by
            surname and shared with the speakers' permission. Click a speaker's name
            to open their own page, with the video recording where one exists.
          </p>
          <p>
            GUIS also partners with the Journal of Stories in Science, which publishes
            stories about science from students, postdocs, faculty and the public
            around the world. With the speakers' help, several of the stories below
            have been republished there.
          </p>
          <p className="action-row">
            <Link className="btn" to="/events/">Browse the event archive</Link>
            <a className="btn btn-external"
               href="https://storiesinscience.org/"
               target="_blank" rel="noopener noreferrer">
              Journal of Stories in Science
            </a>
          </p>

          <div className="story-layout">
            <nav className="story-toc" aria-label="Stories">
              <div className="story-toc-inner">
                <div className="story-toc-label">
                  {stories.length} stories
                </div>
                <ol className="story-toc-list" ref={listRef}>
                  {stories.map(({ node: post }) => {
                    const id = anchorFor(post.frontmatter.slug)
                    return (
                      <li key={post.id} data-for={id}>
                        <a href={"#" + id}
                           className={active === id ? "is-active" : undefined}
                           aria-current={active === id ? "true" : undefined}>
                          <span className="story-toc-name">{post.frontmatter.title}</span>
                          <span className="story-toc-date">{post.frontmatter.date}</span>
                        </a>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </nav>

            <div className="story-stream">
              {stories.map(({ node: post }) => {
                const id = anchorFor(post.frontmatter.slug)
                return (
                  <article className="story-entry" id={id} key={post.id}>
                    <div className="story-entry-date">{post.frontmatter.date}</div>
                    <h2>
                      <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
                    </h2>
                    <div className="blog-post-content"
                         dangerouslySetInnerHTML={{ __html: post.html }} />
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {frontmatter: {tags: {in: "story"}}}
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
