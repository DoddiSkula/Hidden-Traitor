import openSocket from 'socket.io-client';
import s from './Action.module.scss';

const SERVER_URL = 'http://localhost:4000';

export function Action({ users, id, action }) {

    function handleSpyPlayer(user){
        const socket = openSocket(SERVER_URL);
        socket.emit('action-spy-on-player', { id, user});
        return () => socket.disconnect();
    }

    return (
        <div>
            <h1>Choose player to spy on.</h1>
            <div className={s.list}>
                {users.map((user) => {
                    if(user.id === id) {
                    return null;
                    }
                    return (
                        <div className={s.list__selection}>
                            <p className={s.list__name}>{user.name}</p>
                            <button className={s.btn} onClick={() => handleSpyPlayer(user)}>Spy</button>
                        </div>
                    ); 
                })}
            </div>
        </div>
    );
}