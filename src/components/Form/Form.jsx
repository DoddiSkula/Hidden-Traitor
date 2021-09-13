import React, { useState } from 'react';
import dotenv from 'dotenv';
import openSocket from 'socket.io-client';
import { Redirect } from 'react-router';
import { Button } from '../Button/Button';
import { generateCode } from '../../lib/utils.js';
import s from './Form.module.scss';

dotenv.config();

const { REACT_APP_SERVER_URL: serverUrl } = process.env;

export function Form({ buttonText, buttonColor, mode }) {
  const [data, setData] = useState({
    name: '',
    room: null,
  });
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    const socket = openSocket(serverUrl);

    const name = data.name;
    const room = data.room ? data.room : generateCode();

    setData({ name, room });

    if (mode === 'join') {
      socket.emit('form-join', { name, room });
    } else {
      socket.emit('form-create', { name, room });
    }

    socket.on('form-create-fail', (formData) => {
      console.info('Submit failed!');
    });

    socket.on('form-create-success', (formData) => {
      setData({
        name: formData.trimmedName,
        room: formData.trimmedRoom,
      });
      setSubmitted(true); 
    });

    socket.on('form-join-fail', (formData) => {
      console.info('Submit failed!');
    });

    socket.on('form-join-success', (formData) => {
      setData({
        name: formData.trimmedName,
        room: formData.trimmedRoom,
      });
      setSubmitted(true); 
    });

  };

  const handleInputChange = (e) => {
    const { target } = e;
    const value = target.value;
    const name = target.name;

    setData((prevState) => ({
      ...prevState,
      ...{ [name]: value },
    }));
  };

  if (submitted) {
    return (
      <Redirect
        push
        to={{
          pathname: '/game',
          state: {data},
        }}
      />
    );
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} autoComplete='off'>
      <div className={s.form__input_group}>
        <label className={s.form__label} htmlFor='name'>
          Your name{' '}
        </label>
        <input
          className={s.form__input}
          type='text'
          name='name'
          id='name'
          onChange={handleInputChange}
        ></input>
      </div>
      {mode === 'join' && (
        <div className={s.form__input_group}>
          <label className={s.form__label} htmlFor='room'>
            Game code{' '}
          </label>
          <input
            className={s.form__input}
            type='text'
            name='room'
            id='room'
            onChange={handleInputChange}
          ></input>
        </div>
      )}
      <Button text={buttonText} color={buttonColor} />
    </form>
  );
}
