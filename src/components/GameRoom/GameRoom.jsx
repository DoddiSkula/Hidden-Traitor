import React, { useEffect, useRef } from 'react';
import openSocket from 'socket.io-client';
import { Player } from '../Player/Player';
import { Controls } from '../Controls/Controls';
import { Layout } from '../layout/Layout';
import { Button } from '../Button/Button';
import s from './GameRoom.module.scss';

const SERVER_URL = 'http://localhost:4000';

export function GameRoom({ messages, info, id, start, playerTurn }) {
    const messagesEndRef = useRef(null);

    const users = info.users || [];
    const room = info.room;
    const host = info.host || null;
    const player = users.find((user) => id === user.id);

    const playerTurnIndex = playerTurn || 0;
    let turn = 1;

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    function handleStart(e) {
        const socket = openSocket(SERVER_URL);
        e.preventDefault();
        if (player) {
            socket.emit('start-game', player);
            console.info("Game started!");
        }
        return () => socket.disconnect();
    }

    if(!start) {
        return (
            <Layout>
                {(() => {
                    if(player) {
                        if(player.id === host.id) {
                            return  <button onClick={handleStart}>Start Game</button>
                        } else {
                            return <p>Waiting for {host.name} to start the game.</p>
                        }
                    }
                })()}
                <h2>Players</h2>
                <div>
                    {users.map((user) => {
                        return <Player key={user.id} player={user} />
                    })}
                </div>
            </Layout>
        );
    }
    
    return users.length !== 0 ? (
        <div className={s.background}>
            
            {/* Header */}
            <div className={s.header}>
            <h2>Game code: {room}</h2>
                <Button link={'/'} text={'Leave Game'} />
            </div>

            <div className={s.gameRoom}>
                {/* Players */}
                <div className={s.gameRoom__section}>
                    <h2>Players</h2>
                    <div>
                        {users.map((user) => {
                            if(user.id === id) {
                            return null;
                            }
                            return <Player key={user.id} player={user} />
                        })}
                    </div>
                </div>

                {/* Board */}
                <div className={s.gameRoom__section_middle}>
                    {(() => { 
                        if(users[playerTurnIndex].id === player.id) { 
                            return <h1>It's your turn, choose action to play.</h1>
                        } else {
                            return <h1>Waiting for {users[playerTurnIndex].name} to play.</h1> 
                        }})()}
                </div>

                {/* Info */}
                <div className={s.gameRoom__section}>
                    <h2>Event Log</h2>
                    <div className={s.logs}>
                        {messages.map((msg, i) => {
                            return (
                            <div>
                                <p key={i}>{msg}</p>
                                <div ref={messagesEndRef} />
                            </ div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className={s.footer}>
                <div className={s.footer__section}>
                    <h2>You</h2>
                    <span className={s.divider}></span>
                    <Player key={player.id} player={player} />
                    <h3>Your role: {player.role}</h3>
                </div>
                <div className={s.footer__section_middle}>
                    {(() => {
                        if(users[playerTurnIndex].id === player.id) {
                            return <Controls player={player}/>
                        }
                    })()}
                </div>
                <div className={s.footer__section}>
                    <h2>Game Info</h2>
                    <span className={s.divider}></span>
                    <p>Turn: {turn}</p>
                    <p>Player turn: {users[playerTurnIndex].name}</p>
                </div>
            </div>
        </div>
    ) : <p>Waiting for players...</p>;
}