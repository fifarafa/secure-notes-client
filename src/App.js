import React from 'react';
import './App.css';
import UnlockNote from "./UnlockNote";
import {Route, Switch} from "react-router-dom";
import NewNote from "./NewNote";
import ShareNote from "./ShareNote";
import {Navbar} from "react-bootstrap";


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
            <Route path="/note/:id" exact component={UnlockNote}/>
            <Route path='/new' component={NewNote}/>
            <Route path='/share' component={ShareNote}/>
            <Route component={NotFound}/>
        </Switch>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function NotFound() {
    return (
        <div className="NotFound">
            <h3>Sorry, page not found!</h3>
        </div>
    );
}

export default App;
