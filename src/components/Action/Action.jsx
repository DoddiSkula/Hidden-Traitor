import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
import s from './Action.module.scss';

dotenv.config();

const { REACT_APP_SERVER_URL: serverUrl } = process.env;

export function Action({ users, id, action }) {

    function handleSpyPlayer(user){
        const socket = openSocket(serverUrl);
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