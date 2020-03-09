import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import {Navbar} from "react-bootstrap";
import Home from "./Home";
import UnlockNote from "./UnlockNote";
import NewNote from "./NewNote";
import ShareNote from "./ShareNote";
import NotFound from "./NotFound";


function App() {
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/new">Secret Notes</Navbar.Brand>
            </Navbar>
            <Routes/>
        </div>
    );
}

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path='/new' component={NewNote}/>
            <Route path='/share' component={ShareNote}/>
            <Route path="/note/:id" exact component={UnlockNote}/>
            <Route component={NotFound}/>
        </Switch>
    );
}

export default App;
