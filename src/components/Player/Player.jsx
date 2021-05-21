import s from './Player.module.scss';
import agent001 from '../../images/agent001.svg';
import agent002 from '../../images/agent002.svg';
import agent003 from '../../images/agent003.svg';
import agent004 from '../../images/agent004.svg';
import agent005 from '../../images/agent005.svg';
import agent006 from '../../images/agent006.svg';

export function Player({ player, color = "#fbfbfb", agent = 0 ,vertical = false }) {
    if (agent > 5) agent = 0;
    const agents = [agent001, agent002, agent003, agent004, agent005, agent006];
    return player ? (
        <div className={vertical ? s.playerLobby : s.player} >
            <img src={agents[agent]} alt={"Avatar"} className={vertical ? s.playerLobby__avatar : s.player__avatar} />
            <div className={vertical ? s.playerLobby__name : s.player__name}>
                <p style={{color: color}}>{player.name}</p>
            </div>
        </div>
    ): <p>Waiting for player...</p>;
}