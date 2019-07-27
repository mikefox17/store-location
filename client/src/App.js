import React, { Component } from "react";
import "./App.css";

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
      .then(response => console.log(response.json()))
      .then(({ response }) => this.setState({ stores: response.stores }))

      .catch(error => console.log(error));
  };

  showStores = stores => <div key={stores.id}>{stores.storeName}</div>;

  render() {
    const { stores } = this.state;
    return <div className="App"> {stores.map(this.showStores)}</div>;
  }
}

export default App;
