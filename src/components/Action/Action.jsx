import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
import { Player } from '../Player/Player';
import s from './Action.module.scss';

dotenv.config();

const { REACT_APP_SERVER_URL: serverUrl } = process.env;

export function Action({ users, id, action }) {
    const players = [];
    users.forEach(user => {
        players.push(
            {
                id: user.id,
                name: user.name,
                selected: false,
            }
        );
    });

    function handleSpyPlayer(user){
        const socket = openSocket(serverUrl);
        socket.emit('action-spy-on-player', { id, user});
        return () => socket.disconnect();
    }

    function handleSwitch(e) {
        e.preventDefault();
        const selectedPlayers = players.filter(({selected}) => selected === true);
        if(selectedPlayers.length !== 2 ) return;
        const socket = openSocket(serverUrl);
        socket.emit('action-switch-roles', { id, selectedPlayers });
        return () => socket.disconnect();
    }

    function handleToggle(e) {
        const player = players.find(({id}) => e.target.name === id);
        if(e.target.checked) {
            player.selected = true;
        } else {
            player.selected = false;
        }
    }

    function handleVote(user) {
        const socket = openSocket(serverUrl);
        socket.emit('action-vote', { id, user});
        return () => socket.disconnect();
    }

    if (!action) return <p>OOPS! something went wrong, please restart the game.</p>

    if(action === "spy") {
        return (
            <div>
                <h1>Choose a player to spy on.</h1>
                <div className={s.list}>
                    {users.map((user, i) => {
                        if(user.id === id) {
                        return null;
                        }
                        return (
                            <div key={user.id} className={s.list__selection}>
                                <Player key={user.id} player={user} agent={i} vertical={true}/>
                                <button className={`${s.btn} ${s.red}`} onClick={() => handleSpyPlayer(user)}>Spy</button>
                            </div>
                        ); 
                    })}
                </div>
            </div>
        );
    }

    if(action === "switch") {
        return (
            <div className={s.container}>
                <h1>Choose two players to swap roles.</h1>
                <form onSubmit={(e) => handleSwitch(e)} id="form1">
                    <div className={s.list}>
                        {users.map((user, i) => {
                            
                            return (
                                <div key={user.id} className={`${s.list__selection} ${s.flex}`}>
                                    <label htmlFor={user.id}><Player key={user.id} player={user} agent={i} vertical={true}/></label>
                                    <input className={s.checkbox} id={user.id} name={user.id} type="checkbox" onChange={(e) => handleToggle(e)}/>
                                </div>
                            ); 
                        })}
                    </div>
                </form>
                <button className={`${s.btn} ${s.blue}`} type="submit" form="form1">Swap</button>
            </div>
        ); 
    }

    if(action === "vote") {
        return (
            <div>
                <h1>Vote who you think the traitor is.</h1>
                <div className={s.list}>
                    {users.map((user, i) => {
                        if(user.id === id) {
                        return null;
                        }
                        return (
                            <div key={user.id} className={s.list__selection}>
                                <Player key={user.id} player={user} agent={i} vertical={true}/>
                                <button className={`${s.btn} ${s.red}`} onClick={() => handleVote(user)}>Vote</button>
                            </div>
                        ); 
                    })}
                </div>
            </div>
        );
    }

}