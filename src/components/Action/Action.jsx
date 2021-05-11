import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
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

    if (!action) return <p>OOPS! something went wrong, please restart the game.</p>

    if(action === "spy") {
        return (
            <div>
                <h1>Choose a player to spy on.</h1>
                <div className={s.list}>
                    {users.map((user) => {
                        if(user.id === id) {
                        return null;
                        }
                        return (
                            <div key={user.id} className={s.list__selection}>
                                <p className={s.list__name}>{user.name}</p>
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
                        {users.map((user) => {
                            if(user.id === id) {
                                return (
                                    <div key={user.id} className={`${s.list__selection} ${s.flex}`}>
                                        <label htmlFor={user.id} className={`${s.list__name} ${s.label}`}>You</label>
                                        <input className={s.checkbox} id={user.id} name={user.id} type="checkbox" onChange={(e) => handleToggle(e)}/>
                                    </div>
                                ); 
                            }
                            return (
                                <div key={user.id} className={`${s.list__selection} ${s.flex}`}>
                                    <label htmlFor={user.id} className={`${s.list__name} ${s.label}`}>{user.name}</label>
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
}