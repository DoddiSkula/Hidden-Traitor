import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import { GameRoom } from '../components/GameRoom/GameRoom';
import Modal from "../components/Modal/Modal";
import s from "../Styles/Game.module.scss";

const SERVER_URL = 'http://localhost:4000';

export function Game() {
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState({});
  const [id, setId] = useState(null);
  const [start, setStart] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const room = urlParams.get('room');

  useEffect(() => {
    const socket = openSocket(SERVER_URL);

    // join room
    socket.emit('join', { name, room })

    // get room and users
    socket.on('room-info', (data) => {
      setInfo(data);
    });

    // set user id
    socket.on('connect', () => {
      setId(socket.id);
    });

    // message from server
    socket.on('message', (data) => {
      setMessages(msg => [...msg, data]);
    });

    // game starting
    socket.on('starting-game', (data) => {
      setStart(true);
      setInfo(data);
    });

    // confirm action response
    socket.on('action-confirm-response', (data) => {
      setInfo(data);
    });
    socket.on('message-confirm', (msg) => {
      setModalText(msg);
      toggleModal(true);
    });

    return () => socket.disconnect();
  }, [name, room]);

  return (
    <div>
      <GameRoom key={id} messages={messages} info={info} id={id} start={start} playerTurn={info.playerTurn} />
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <p className={s.modal_text}>{modalText}</p>
        <button className={s.modal_button} onClick={() => toggleModal(false)}>Confirm</button>
      </Modal>
    </div>

  );
}
