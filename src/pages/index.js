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
                  {/* the namecard sits in flow inside the title strip, so the
                      hero grows with its text and the banner below can never
                      overlap it. The strip's bottom padding minus its negative
                      margin (see .title in style.css) keeps the illustration
                      carrying on behind the About section. */}
                  <div className = "title">
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