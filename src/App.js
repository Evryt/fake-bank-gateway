import React from "react";
import "./App.css";
import queryString from "query-string";
import sha256 from "sha256";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      debug: null,
      clientid: "",
      password: ""
    };
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
        <div className="App-container">
          <h1>{this.options.name}</h1>
          <h2>SAFE OPENID GATEWAY 100% LEGIT</h2>
          {this.state.loggedIn ? (
            <div className="App-result">
              success <i>you may close this window</i>
            </div>
          ) : (
            <div className="App-centered">
              <form>
                <input
                  type="text"
                  value={this.state.clientid}
                  onChange={evt =>
                    this.setState({ clientid: evt.target.value })
                  }
                  placeholder="Client id"
                />
                <input
                  type="password"
                  value={this.state.password}
                  onChange={evt =>
                    this.setState({ password: evt.target.value })
                  }
                  placeholder="Password"
                />
                <input
                  type="button"
                  value="Sign in"
                  onClick={() => {
                    this.auth();
                  }}
                />
              </form>
            </div>
          )}
          <div>
            <img src={this.securedImage} className="App-secure" alt="secured" />
          </div>
          <div>
            Friendly reminder: watch out for fake Fake Bank phishing sites, they
            often look 100% like this one, so be prepared
          </div>
        </div>
      </div>
    );
  }
  async auth() {
    const response = await fetch(
      this.options.endpoint + "/openapipl/sb/v2_1_1.1/customers/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientID: this.state.clientid,
          passwordHash: sha256(this.state.password)
        })
      }
    ).then(res => res.json());
    if (!response.error) {
      this.setState({ loggedIn: true });
    } else {
      alert("Error: " + JSON.stringify(response));
    }
  }
}

export default App;
