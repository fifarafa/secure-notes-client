import React, {useState} from "react";
import { Button, Jumbotron, Badge} from "react-bootstrap";


export default function ShareNote(props) {

    const [isCopied, setIsCopied] = useState(false);

    const url = window.location.host + '/note/' + props.location.state.noteId;

    return (
        <div className="ShareNote">
            <form>
                <Jumbotron>
                    <h2>Congratulations!</h2>
                    <p>
                       Your note is ready for sharing.
                    </p>
                    <Button variant={isCopied ? 'secondary' : 'primary'}
                            onClick={() => {navigator.clipboard.writeText(url); setIsCopied(true)}}>
                        Copy to clipboard <Badge variant="light">{url}</Badge>
                    </Button>
                </Jumbotron>
            </form>
        </div>
    );
}