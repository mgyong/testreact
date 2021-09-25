import { useState, FC } from "react";
import { gql, useMutation } from "@apollo/client";
import {SEND_MESSAGE} from "./query";
import {handleErrors} from "../../utils/utils";

interface SendMessageProps {
    name: string;
}

    export const SendMessage: FC<SendMessageProps> = ({ name }) => {
    const [input, setInput] = useState<string>("");
    const [sendMessage] = useMutation(SEND_MESSAGE);
    console.log("name: ", name);
    const handleSend = async () => {

        try {
            const res = await sendMessage({
                variables: {"data": {name: name, "message": input}},
            })
            res.data.chats.map(chat => (console.log("chat details: ", chat)))
        } catch (e) {
            const errors = handleErrors(e)
            console.log("errors: ", errors)
        }
        ;
    };
        return (
            <div>
                <input
                    type="text"
                    id="message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></input>
                <button onClick={handleSend}>Send message</button>
            </div>
            );
    };
