import './App.css';
import React from "react";
import './main.css';
import './Content.css';
import Routs from "./Routs";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
        <div>
          <Routs/>
        </div>
    );
  }
}

export default App;
