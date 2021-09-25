import React from 'react';
import { useState } from "react";
import { useQuery} from '@apollo/client';
import {ALL_CHATS, CHATS_SUBSCRIPTION} from "./query";
import { useEffect } from "react";

export const Chats = () => {
    const { loading, error, data, subscribeToMore } = useQuery(ALL_CHATS);

    useEffect(() => {
        subscribeToMore({
            document: CHATS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newChat = subscriptionData.data.chats;
                //console.log("newChat id: ", newChat.map((chat: any) => chat.id));

                return {
                    chats: [...prev.chats, newChat],
                };
            },
        });
    }, []);

    if (loading) return <p>"Loading...";</p>;
    if (error) return <p>`Error! ${error.message}`</p>;

    return (
        <div>
            {data.chats.map((chat: any) => (
                <div key={chat.id}>
                   <p> {chat.id}: {chat.name}: {chat.message}</p>
                </div>
            ))}
        </div>
    );
};
