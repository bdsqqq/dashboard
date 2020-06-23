import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props:any) => (
  <ContentLoader 
    speed={6}
    width="100%" 
    height="100%" 
    viewBox="0 0 100% 100%" 
    style={{ width: "100%", height: "100%", margin: "20px auto"}}
    backgroundColor="#2b2b2b"
    foregroundColor="#3f3b3b"
    {...props}
  >
    <rect x="3%" y="0" rx="2" ry="2" width="90%" height="80%" /> 
    <rect x="13%" y="8%" rx="2" ry="2" width="90%" height="80%" />
  </ContentLoader>
)

export default Loader