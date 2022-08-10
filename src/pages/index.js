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
              <div style={{backgroundColor: "#dce9fc"}}>
              <ParallaxProvider>
                  <Parallax translateY={['-200px', '200px']}>
                  <div className = "title" style={{color: "black", height: "130vh"}} />
                  </Parallax>
                  <div className = "namecard">
                    <Parallax className="desktop-only" translateY={['500px', '-500px']}>
                      <div>
                        <h1>growing up</h1>
                        <h1>
                          &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;in science
                          </h1><br/>
                      </div>
                    </Parallax>
                    <div className="mobile-only">
                        <h1>growing up</h1>
                        <h1>
                          in science
                        </h1><br/>
                    </div>
                    </div>
                  <RecentEvents/>
                  <About/>
              </ParallaxProvider>
              </div>
        </Layout>
      );
    }
  }

  export default Index;