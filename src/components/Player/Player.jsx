import s from './Player.module.scss';
import Avatar from '../../images/agent001.svg';

export function Player({ player, color = "#fbfbfb" }) {
    return player ? (
        <div className={s.player} >
            <img src={Avatar} alt={"Avatar"} className={s.player__avatar} />
            <div className={s.player__name}>
                <p style={{color: color}}>{player.name}</p>
            </div>
        </div>
    ): <p>Waiting for player...</p>;
}