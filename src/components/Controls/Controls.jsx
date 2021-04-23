import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import s from './Controls.module.scss';

const SERVER_URL = 'http://localhost:4000';

export function Controls({ player }) {

    function handleSpy(e) {
        const socket = openSocket(SERVER_URL);
        e.preventDefault();
        socket.emit('action-spy', player);
        return () => socket.disconnect();
    }

    function handleSwitch(e) {
        const socket = openSocket(SERVER_URL);
        e.preventDefault();
        socket.emit('action-switch', player);
        return () => socket.disconnect();
    }

    function handleConfirm(e) {
        const socket = openSocket(SERVER_URL);
        e.preventDefault();
        socket.emit('action-confirm', player);
        return () => {
            socket.disconnect();
        } 
    }

    return (
        <div>
            <button onClick={handleSpy} className={s.button__spy}>Spy</button>
            <button onClick={handleSwitch} className={s.button__switch}>Switch</button>
            <button onClick={handleConfirm} className={s.button__confirm}>Confirm</button>
            <p className={s.caption_spy}>Look at another players role.</p>
            <p className={s.caption_switch}>Make two players switch roles.</p>
            <p className={s.caption_confirm}>Look at your own role (it might have changed!).</p>
        </div>
    );
}