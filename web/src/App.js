import React, { Component } from 'react';
import './App.css';
import {Appbar, NewPolicy, DownloadPage, AddPolicy, AddRules, AddConditions, PredicateConstants, Home } from './components/index.js';
import {
  Route,
  HashRouter
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
      <HashRouter>
        <div>
          <Appbar/>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/newPolicy" component={NewPolicy}/>
            <Route path="/download" component={DownloadPage}/>
            <Route path="/addPolicy" component={AddPolicy}/>
            <Route path="/addRules" component={AddRules}/>
            <Route path="/addConditions" component={AddConditions}/>
            <Route path="/predicateConstants" component={PredicateConstants}/>
          </div>
        </div>
      </HashRouter>
      </div>
    );
  }
}

export default App;
