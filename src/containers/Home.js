import {Button, Jumbotron} from "react-bootstrap";
import React from "react";

export default function Home(props) {

    function handleCreateNote() {
        props.history.push("/new")
    }

    return (
        <div>
            <Jumbotron>
                <h1>Hi!</h1>
                <p>
                    This is a simple note taking app that cares about your privacy. It let's you create secure, time-based self-destructing
                    notes.
                </p>
                <p>
                    <Button variant="primary" onClick={handleCreateNote}>Create your note</Button>
                </p>
            </Jumbotron>
        </div>
    );
}