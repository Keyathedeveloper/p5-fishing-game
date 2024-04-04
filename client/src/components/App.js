import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import FishGame from './FishGame';
import "../index.css";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/game" component={FishGame} />
                /<Route exact path="/" component={Login} /> {/* Added exact to match only the root path */}
            </Switch>
        </Router>
    );
}

export default App;
