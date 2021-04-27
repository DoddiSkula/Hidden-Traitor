import React, { useEffect, useRef } from 'react';
import { Player } from '../Player/Player';
import { Controls } from '../Controls/Controls';
import { WaitingRoom } from '../WaitingRoom/WaitingRoom';
import { Action } from '../Action/Action';
import s from './GameRoom.module.scss';

export function GameRoom({ messages, info, id, start, playerTurn = 0, turn = 1, action }) {
    const messagesEndRef = useRef(null);

    const users = info.users || [];
    const room = info.room;
    const host = info.host || null;
    const player = users.find((user) => id === user.id);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    if(!start) {
        return (
            <WaitingRoom player={player} host={host} users={users} />
        );
    }

    if(users.length !== 1) {
        const players = users.filter((user) => user.inGame);
        return (
            <div className={s.background}>
                {/* Header */}
                <div className={s.header}>
                <h2>Game code: {room}</h2>
                    <a href={"/"} title={"Leave Game"}><div className={s.header__leave}/></a>
                </div>
    
                <div className={s.gameRoom}>
                    {/* Players */}
                    <div className={s.gameRoom__section}>
                        <h2>Players</h2>
                        <div>
                            {players.map((user) => {
                                if(user.id === id) {
                                return null;
                                }
                                return (<div className={s.gameRoom__player}><Player key={user.id} player={user} /></div>)
                            })}
                        </div>
                    </div>
    
                    {/* Board */}
                    <div className={s.gameRoom__section_middle}>
                        {(() => { 
                            if(action === "spy") return (
                                <Action users={players} id={id} action={action} />
                            );
                            if(players[playerTurn].id === player.id) { 
                                return <h1>It's your turn, choose action to play.</h1>
                            } else {
                                return <h1>Waiting for {players[playerTurn].name} to play.</h1> 
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
                        <Player key={player.id} player={player} color={player.role === 'Agent' ? "#55b0d3" : "#e36e5a"} />
                        <h3>Your role: <span className={`${s.bold} ${player.role === 'Agent' ? s.agent : s.traitor}`}>{player.role}</span></h3>
                    </div>
                    <div className={s.footer__section_middle}>
                        {(() => {
                            if(players[playerTurn].id === player.id) {
                                return <Controls player={player}/>
                            }
                        })()}
                    </div>
                    <div className={s.footer__section}>
                        <h2>Game Info</h2>
                        <p>Turn: <span className={s.bold}>{turn}</span></p>
                        <p>Player turn: <span className={s.bold}>{users[playerTurn].name}</span></p>
                    </div>
                </div>
            </div>
        );
    }
    
    return <WaitingRoom player={player} host={host} users={users} />
}