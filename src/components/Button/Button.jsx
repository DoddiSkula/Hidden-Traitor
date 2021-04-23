import { NavLink } from 'react-router-dom';
import s from './Button.module.scss';

export function Button({link , text, color = "#55B0D3"}) {
    if (link) {
        return (
            <NavLink className={s.NavLink} to={link}>
                <button className={s.button} style={{background: color}}>{text}</button>
            </NavLink>
        );
    }

    return (
        <button className={s.button} style={{background: color}}>{text}</button>
    );

}