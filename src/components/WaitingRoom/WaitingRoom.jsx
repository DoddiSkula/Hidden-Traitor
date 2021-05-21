import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
import { Player } from '../Player/Player';
import { Layout } from '../layout/Layout';
import { ExitButton } from '../ExitButton/ExitButton';
import s from './WaitingRoom.module.scss';

dotenv.config();

const { REACT_APP_SERVER_URL: serverUrl } = process.env;

export function WaitingRoom({ player, host, users }) {
    
    function handleStart(e) {
        const socket = openSocket(serverUrl);
        e.preventDefault();
        if (player) {
            socket.emit('start-game', player);
        }
        return () => socket.disconnect();
    }

    return (
        <Layout>
            <div className={s.exit}>
                <ExitButton/>
            </div>
            {player ? <h1>Game Code: <span className={s.code}>{host.room}</span></h1> : <p>Something went wrong, please restart the game! 😲</p>}
            <h2>Players ({users.length}/6)</h2>
            <div className={s.players}>
                {users.map((user, i) => {
                    return (
                        <Player key={user.id} player={user} vertical={true} agent={i} />
                    ) 
                })}
            </div>
            <div>
                {(() => {
                    if(player) {
                        <h1>Game Code: {host.room}</h1>
                        if(player.id === host.id && users.length > 1) {
                            return <button onClick={handleStart}>Start Game</button>
                        } else {
                            return player.id !== host.id ? <p>Waiting for {host.name} to start the game.</p> : <p>Waiting for more players.</p>
                        }
                    }
                })()}
            </div>
        </Layout>
    );
}