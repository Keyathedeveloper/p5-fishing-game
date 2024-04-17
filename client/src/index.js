import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Register from './components/Register';
import PenguinFishGame from './components/PenguinFishGame';
import AccountSettings from './components/AccountSettings'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/penguinfishgame" component={PenguinFishGame} />
      <Route path="/accountsettings" component={AccountSettings} />
    </Switch>
  </Router>
);
