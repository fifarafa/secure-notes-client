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
    const [isLoading, setIsLoading] = useState(false);
    const [expirationOptionSelected, setExpirationOptionSelected] = useState(0);

    async function handleSave() {
        setIsLoading(true);

        let apiName = 'notes';
        let path = '/notes';
        let init = {
            body: {
                text: text,
                password: secret,
                lifeTimeSeconds: expirationOptions[expirationOptionSelected].seconds
            }
        };

        await API.post(apiName, path, init).then(response => {
            props.history.push("/share", {noteId: response.id});
        }, error => {
            alert.error("Oops! Something went wrong. Please try again.");
        });

        setIsLoading(false)
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

                    <Button variant="primary" size="lg" disabled={isLoading} onClick={!isLoading ? handleSave : null}>
                        {isLoading ? "Creating..." : "Create new note"}
                    </Button>
                </FormGroup>
            </form>
        </div>
    );
}

//TODO adjust layout to screen
