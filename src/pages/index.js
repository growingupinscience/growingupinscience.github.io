import React, { Component } from 'react';
import Layout from "../components/layout.js";
import "../css/style.css"
import "../css/mobile.css"
import About from "../components/about.js"
import RecentEvents from "../components/recentevents.js"
import UpcomingBanner from "../components/upcomingbanner.js"


class Index extends Component {
    render() {
      return (
        <Layout>
              <div className = "page" style={{zIndex: "-1 !important"}}>
                  {/* taller than the viewport and pulled back up, so the
                      illustration carries on behind the About section */}
                  <div className = "title" style={{color: "black", height: "150vh", marginBottom:"-85vh"}} />
                  <div className = "namecard">
                      <div className="desktop-only">
                        <h1>Growing<br/>up in<br/>Science</h1>
                        <h2>
                          Sharing the unofficial, untold, and<br/>unconventional stories of people<br/>in science.
                        </h2>
                      </div>
                      <div className="mobile-only">
                        <h1>Growing<br/>up in<br/>Science</h1>
                        <br/><br/>
                        <h2>
                          Sharing the unofficial, untold, and<br/>unconventional stories of people<br/>in science.
                        </h2>
                      </div>
                    </div>
                  <UpcomingBanner/>
                  <About/>
                  <RecentEvents/>
              </div>
        </Layout>
      );
    }
  }

  export default Index;