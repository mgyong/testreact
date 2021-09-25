import React from 'react';
import { useState } from "react";
import { useQuery} from '@apollo/client';
import {Chats} from "./Chats";
import {SendMessage} from "./SendMessage";

export const ChatContainer = () => {
    const [name, setName] = useState<string>("");
    const [entered, setEntered] = useState<boolean>(false);

    // @ts-ignore
    return (
        <div>
            {!entered && (
                <div>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <button onClick={() => setEntered(true)}>Enter chat</button>
                </div>
            )}

            {name !== "" && entered && (
                <div>
                    <Chats />
                    <SendMessage name={name} />
                </div>
            )}
        </div>
    );

}
