import React, { Component } from 'react';
import Layout from "../components/layout.js";
import "../css/style.css"
import "../css/mobile.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import About from "../components/about.js"
import RecentEvents from "../components/recentevents.js"
import {Parallax, ParallaxProvider} from "react-scroll-parallax";


class Index extends Component {
    render() {
      return (
        <Layout>
              <div className = "page" style={{zIndex: "-1 !important"}}>
              <ParallaxProvider>
                  <Parallax className = "desktop-only" translateY={['-800px', '800px']}>
                  <div className = "title" style={{color: "black", height: "130vh", marginBottom:"-30vh"}} />
                  </Parallax>
                  <Parallax className = "mobile-only"translateY={['-500px', '300px']}>
                  <div className = "title" style={{color: "black", height: "80vh"}} />
                  </Parallax>
                  <div className = "namecard">
                    {/* <Parallax translateY={['500px', '-500px']}> */}
                      <div className="desktop-only">
                        <h1>Growing<br/>up in<br/>Science</h1>
                        {/* <br/><br/> */}
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
                    {/* </Parallax> */}
                    </div>
                  <Parallax translateY={['0px', '0px']}>
                  <RecentEvents/>
                  </Parallax>
                  <About/>
              </ParallaxProvider>
              </div>
        </Layout>
      );
    }
  }

  export default Index;