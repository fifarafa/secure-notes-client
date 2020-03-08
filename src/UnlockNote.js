import React, {useState} from "react";
import {API} from "aws-amplify";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import './UnlockNote.css'
import {FaLock, FaLockOpen} from "react-icons/fa";
import {useAlert} from "react-alert";

export default function UnlockNote(props) {

    const [password, setPassword] = useState('');
    const [isLocked, setIsLocked] = useState(true);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const alert = useAlert();

    function getNote() {
        let apiName = 'notes';
        let path = '/notes/' + props.match.params.id;
        let init = {
            headers: {
                'password': password
            }
        };
        return API.get(apiName, path, init);
    }

    async function handleUnlock() {
        setIsLoading(true);
        await getNote().then(response => {
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
        });
        setIsLoading(false);
    }

    return (
        isLocked ?
            (<div className="Authorization">
                <FaLock size="7em"/>
                <form>
                    <FormControl type="password" placeholder="Your note secret phrase"
                                 onChange={e => setPassword(e.target.value)}
                    />
                    <Button variant="primary" size="lg" disabled={isLoading} onClick={handleUnlock}>
                        {isLoading ? "Please wait..." : "Unlock"}
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
                                rows="5"
                                onChange={e => setText(e.target.value)}
                            />
                        </FormGroup>
                    </form>
                </div>
            )
    );
}
