import { Button } from "../Button/Button";
import s from './Form.module.scss';

export function Form({ buttonText, buttonColor }) {
    // const SERVER_URL = 'http://localhost:4000';

    return (
        <form className={s.form} autocomplete="off" action='/room'>
            <div className={s.form__input_group}>
                <label className={s.form__label} htmlFor='name'>Your name </label>
                <input className={s.form__input} type='text' name='name' id='name' required ></input>
            </div>
            <div className={s.form__input_group}>
                <label className={s.form__label} htmlFor='room'>Game code </label>
                <input className={s.form__input} type='text' name='room' id='room' required></input>
            </div>
            <Button text={buttonText} color={buttonColor}/>
        </form>
    );
}