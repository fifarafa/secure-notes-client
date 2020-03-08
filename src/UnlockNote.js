import React, {useState} from "react";
import {API} from "aws-amplify";
import {Button, FormControl, FormGroup, InputGroup} from "react-bootstrap";
import './UnlockNote.css'
import {FaLock, FaLockOpen} from "react-icons/fa";

export default function UnlockNote(props) {

    const [secret, setSecret] = useState('');
    const [isLocked, setIsLocked] = useState(true);
    const [text, setText] = useState("");

    function getNote() {
        let apiName = 'notes';
        let path = '/notes/' + props.match.params.id;
        let init = {
            headers: {
                'note-secret': secret
            }
        };
        return API.get(apiName, path, init);
    }

    //TODO set button loading while waiting for response https://react-bootstrap.github.io/components/buttons/
    function handleUnlock() {
        console.log(props);
        getNote().then(response => {
            console.log(response);
            setIsLocked(false);
            setText(response.text)
            // props.history.push("/note/0594df27-d1d8-4188-a4ed-cca3aca93712", {response: response.text});
            // if 401 then cos tam
            // if 200 then setIsLocked(false) i ponowny renering

        }, error => {
            // console.log(error.response.status);
            // props.history.push("/");
        })
    }

    return (
        isLocked ?
            (<div className="Authorization">
                <FaLock size="7em"/>
                <form>
                    <FormControl type="password" placeholder="Your note secret phrase"
                                 onChange={e => setSecret(e.target.value)}
                    />
                    <Button variant="primary" size="lg" block onClick={handleUnlock}>
                        Unlock
                    </Button>
                </form>
            </div>) :
            (<div className="Note">
                    <FaLockOpen size="7em"/>
                    <form>
                        <FormGroup controlId="content">
                            <FormControl
                                disabled="true"
                                value={text}
                                as="textarea"
                                onChange={e => setText(e.target.value)}
                            />
                        </FormGroup>
                    </form>
                </div>
            )
    );
}
