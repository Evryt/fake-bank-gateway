import React from "react";
import "./App.css";
import queryString from "query-string";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.securedImages = [
      "https://cdn.weka-fachmedien.de/thumbs/fileadmin/images/2012/04/Norton_Secured_Seal_Logo.jpg.774x420.jpg",
      "https://thecomputerfriend.net/wp-content/uploads/2015/05/virus.png"
    ];
    this.securedImage = this.securedImages[
      Math.round(Math.random() * (this.securedImages.length - 1))
    ];
    this.options = queryString.parse(window.location.search);
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1>{this.options.name}</h1>
          <div className="App-centered">
            <form>
              <input type="text" placeholder="Client id" />
              <input type="password" placeholder="Password" />
              <input type="submit" value="Sign in" />
            </form>
          </div>
          <img src={this.securedImage} class="App-secure" />
          <div className="App-debug">{JSON.stringify(this.options)}</div>
        </div>
      </div>
    );
  }
}

export default App;
