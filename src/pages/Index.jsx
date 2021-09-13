import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/Button/Button';
import { GameRules } from '../components/GameRules/GameRules';
import Modal from "../components/Modal/Modal";
import s from "../Styles/Game.module.scss";

export function Index() {
    const [isModalOpen, toggleModal] = useState(false);

    return (
        <div>
            <Layout>
                <Button link={'/join'} text={'Join game'} color={'#61ca70'}/>
                <Button link={'/create'} text={'Create game'} color={'#f0b448'}/>
                <button className={s.gameRules} onClick={() => toggleModal(true)}>Game Rules</button>
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <GameRules/>
                    <button className={s.modal_button} onClick={() => toggleModal(false)}>Confirm</button>
                </Modal>
            </Layout>
        </div>
    );
}