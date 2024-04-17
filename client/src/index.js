import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Register from './components/Register';
import PenguinFishGame from './components/PenguinFishGame';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/penguinfishgame" component={PenguinFishGame} />
    </Switch>
  </Router>
);
