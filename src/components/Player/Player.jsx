import s from './Player.module.scss';
import agent001 from '../../images/agent001.svg';
import agent002 from '../../images/agent002.svg';

export function Player({ player, color = "#fbfbfb", agent = 1 ,vertical = false }) {
    return player ? (
        <div className={vertical ? s.playerLobby : s.player} >
            <img src={agent001} alt={"Avatar"} className={vertical ? s.playerLobby__avatar : s.player__avatar} />
            <div className={vertical ? s.playerLobby__name : s.player__name}>
                <p style={{color: color}}>{player.name}</p>
            </div>
        </div>
    ): <p>Waiting for player...</p>;
}