import React from "react"
import favicon from "./src/images/favicon.svg"

// Injected into every page's <head>. Gatsby's Head API only works from page
// files, so the favicon lives here to avoid repeating it in each one.
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="favicon" rel="icon" type="image/svg+xml" href={favicon} />,
  ])
}
