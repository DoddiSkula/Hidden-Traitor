import s from './Player.module.scss';
import Avatar from '../../images/agent.png';

export function Player({ player }) {
    return player ? (
        <div className={s.player} >
            <img src={Avatar} alt={"Avatar"} className={s.player__avatar} />
            <div className={s.player__name}>
                <p>{player.name}</p>
            </div>
        </div>
    ): <p>Waiting for player...</p>;
}