import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
import { Player } from '../Player/Player';
import { Layout } from '../layout/Layout';

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
        {player ? <h1>Game Code: {host.room}</h1> : <p>Error, please restart the game! 😲</p>}
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
        <h2>Players</h2>
        <div>
            {users.map((user) => {
                return <Player key={user.id} player={user} />
            })}
        </div>
    </Layout>
    );
}