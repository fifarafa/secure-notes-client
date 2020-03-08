import React, {useState} from "react";
import {API} from "aws-amplify";
import {Badge, Button, Dropdown, DropdownButton, FormControl, FormGroup} from "react-bootstrap";
import './NewNote.css'

const expirationOptions = [
    {
        durationText: "1 hour",
        seconds: 60 * 60
    },
    {
        durationText: "1 day",
        seconds: 60 * 60 * 24
    },
    {
        durationText: "1 week",
        seconds: 60 * 60 * 24 * 7
    }
];

export default function NewNote(props) {

    const [text, setText] = useState("");
    const [secret, setSecret] = useState("");
    const [expirationOptionSelected, setExpirationOptionSelected] = useState(0);

    function handleSave() {
        let apiName = 'notes';
        let path = '/notes';
        let init = {
            body: {
                text: text,
                password: secret,
                lifeTimeSeconds: expirationOptions[expirationOptionSelected].seconds
            }
        };
        //TODO set button loading while waiting for response https://react-bootstrap.github.io/components/buttons/
        API.post(apiName, path, init).then(response => {
            console.log(response);
            props.history.push("/share", {noteId: response.id});
        }, error => {
            console.log(error);
            alert.error("Oops! Something went wrong. Please try again.");
        });
    }

    function handleSelect(ek, e) {
        setExpirationOptionSelected(ek)
    }

    return (
        <div className="NewNote">
            <form>
                <FormGroup className="NoteContent" controlId="content">

                    <div className="NoteDetails">
                        <FormControl
                            className="NoteInput"
                            value={text}
                            as="textarea"
                            placeholder="Type your note here"
                            maxLength="140"
                            rows="3"
                            onChange={e => setText(e.target.value)}
                        />
                        <Badge variant={140 - text.length > 50 ? "light" : "danger"}>
                            Length limit: {140 - text.length}</Badge>
                    </div>

                    <FormControl type="password" placeholder="Your secret phrase"
                                 onChange={e => setSecret(e.target.value)}
                    />

                    <DropdownButton
                        drop="down"
                        variant="secondary"
                        title={'Expire in ' + expirationOptions[expirationOptionSelected].durationText}
                    >
                        {expirationOptions.map((o, index) => (
                            <Dropdown.Item eventKey={index} onSelect={handleSelect}>{o.durationText}</Dropdown.Item>
                        ))
                        }
                    </DropdownButton>

                    <Button variant="primary" size="lg" onClick={handleSave}>Create new note</Button>
                </FormGroup>
            </form>
        </div>
    );
}

//TODO validate form password
//TODO loading button
//TODO adjust layout to screen
//TODO make UnlockNote note screen wider