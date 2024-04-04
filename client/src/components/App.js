import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Game from './Game';

function App() {
    return(
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/game" component={Game} />
                <Route path="/" component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
