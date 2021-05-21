import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
import s from './Controls.module.scss';

dotenv.config();

const { REACT_APP_SERVER_URL: serverUrl } = process.env;

export function Controls({ player }) {

    function handleSpy(e) {
        const socket = openSocket(serverUrl);
        e.preventDefault();
        socket.emit('action-spy', player);
        return () => socket.disconnect();
    }

    function handleSwitch(e) {
        const socket = openSocket(serverUrl);
        e.preventDefault();
        socket.emit('action-switch', player);
        return () => socket.disconnect();
    }

    function handleConfirm(e) {
        const socket = openSocket(serverUrl);
        e.preventDefault();
        socket.emit('action-confirm', player);
        return () => {
            socket.disconnect();
        } 
    }

    return (
        <div>
            <button onClick={handleSpy} className={`${s.button} ${s.button__spy}`}>Spy</button>
            <button onClick={handleSwitch} className={s.button__switch}>Swap</button>
            <button onClick={handleConfirm} className={s.button__confirm}>Confirm</button>
            <p className={s.caption_spy}>Look at another player's role.</p>
            <p className={s.caption_switch}>Make two players swap roles.</p>
            <p className={s.caption_confirm}>Look at your own role (it might have changed!).</p>
        </div>
    );
}