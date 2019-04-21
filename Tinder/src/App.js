import React, { Component } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
//import logo from './logo.svg';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Homepage from './pages/homepage';
import Chatpage from './pages/chatpage';
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path='/' render={() => {
            return (<Homepage />)
          }} />
          <Route path='/app' component={Chatpage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
