import React, {useState} from "react";
import {API} from "aws-amplify";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import './UnlockNote.css'
import {FaLock, FaLockOpen} from "react-icons/fa";
import {useAlert} from "react-alert";

export default function UnlockNote(props) {

    const [secret, setSecret] = useState('');
    const [isLocked, setIsLocked] = useState(true);
    const [text, setText] = useState("");

    const alert = useAlert();

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
            setIsLocked(false);
            setText(response.text)

        }, error => {
            switch (error.response.status) {
                case 401:
                    alert.error("Wrong secret. Try again.");
                    break;
                case 404:
                    props.history.push("/oops");
                    break;
                default:
                    alert.error("Oops! Something went wrong. Please try again.");
            }
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