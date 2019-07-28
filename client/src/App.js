import React, { Component } from "react";
import "./App.css";
//import Results from "./Results";

class App extends Component {
  state = {
    stores: []
  };
  //runs the call to get the stores in mysql
  componentDidMount() {
    this.getStoreLocations();
  }
  //fetch to grab the stores
  getStoreLocations = _ => {
    fetch("http://localhost:5500/getDB")
      .then(res => res.json())
      .then(stores =>
        this.setState({ stores }, () =>
          console.log("STORES FETCHED...", stores)
        )
      )

      .catch(err => console.log(err));
  };

  //showStores = stores => <div key={stores.id}>{stores.storeName}</div>;

  render() {
    const { stores } = this.state;
    return (
      <div className="App">
        {" "}
        {stores.map(stores => (
          <p key={stores.id}>
            {stores.storeName}
            {" ,"}
            {stores.storeAddress}
            {" ,"}
            {stores.latitude}
            {" ,"}
            {stores.longitude}
          </p>
        ))}
      </div>
    );
  }
}

export default App;
