import React from 'react';
import axios from "axios";

class RioData extends React.Component {

    constructor() {
        super();
        this.endPoint = "https://opendata.arcgis.com/datasets/dbc9ca70fe4046e5946526f07bb63857_4.geojson"
    }

    //GET METHOD
  get = async function () {
    let getRes = null;
    
    getRes = axios.get(this.endPoint)
      .then(response => {
        // handle success
        console.log('Get Method: ');
        console.log(response);
        return response.data.features;
      })
      .catch(error => {
        // handle error
        console.log('Get Method: ' + error);
        return false;
      })
    return getRes;
  }

}

export default RioData