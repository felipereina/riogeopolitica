import React from "react"
import Layout from "../components/myLayout"
import Map from "../components/Map/Map"
import SEO from "../components/SEO"
import { useCSV } from '../components/Map/ReadCSV'


export default () => {
    const data = useCSV()
  
  return (
    <>
     <Layout>
        <SEO title="Contact"/>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: "10rem",
            marginTop: "3rem",
          }}
        >
          <Map data={data}/>
        </div>
      </Layout>
     </>
  )
}
