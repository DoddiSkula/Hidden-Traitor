import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
import { GameRoom } from '../components/GameRoom/GameRoom';
import Modal from "../components/Modal/Modal";
import s from "../styles/Game.module.scss";

dotenv.config();

const { REACT_APP_SERVER_URL: serverUrl } = process.env;

export function Game() {
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState({});
  const [id, setId] = useState(null);
  const [start, setStart] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [action, setAction] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const room = urlParams.get('room');

  useEffect(() => {
    const socket = openSocket(serverUrl);

    // join room
    socket.emit('join', { name, room })

    // get room and users
    socket.on('room-info', (data) => {
      if(data.users.length < 2) {
        setStart(false);
      }
      setInfo(data);
    });

    // set user id
    socket.on('connect', () => {
      setId(socket.id);
    });

    // game starting - all players
    socket.on('starting-game', (data) => {
      setMessages([]);
      setInfo(data);
      setStart(true);
    });

    // message from server - all players
    socket.on('message', (data) => {
      setMessages(msg => [...msg, data]);
    });

    // action response - all players
    socket.on('action-response', (data) => {
      setInfo(data);
    });

    // CONFIRM action response - player
    socket.on('message-confirm', (msg) => {
      setAction("");
      setModalText(msg);
      toggleModal(true);
    });

    // SPY action selected response - player
    socket.on('message-spy', () => {
      setAction("spy");
    });
    
    // SPY action response - player
    socket.on('message-spy-on-player', (player) => {
      setAction("");
      const role = player.newRole ? player.newRole : player.role;
      setModalText(`${player.name} is ${role}.`);
      toggleModal(true);
    });

    // SWITCH action selected response - player
    socket.on('message-switch', () => {
      setAction("switch");
    });

    // SWITCH action response - player
    socket.on('message-switch-roles', (selectedPlayers) => {
      setAction("");
      setModalText(`You swapped the roles of ${selectedPlayers[0].name} and ${selectedPlayers[1].name}.`);
      toggleModal(true);
    });

    return () => socket.disconnect();
  }, [name, room]);

  return (
    <div>
      <GameRoom key={id} messages={messages} info={info} id={id} start={start} playerTurn={info.playerTurn} turn={info.turn} action={action} />
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <p className={s.modal_text}>{modalText}</p>
        <button className={s.modal_button} onClick={() => toggleModal(false)}>Confirm</button>
      </Modal>
    </div>

  );
}
