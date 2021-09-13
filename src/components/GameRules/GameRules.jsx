import s from '../../Styles/Game.module.scss';

export function GameRules() {
    return (
        <div className={s.modal}>
            <h2 className={s.modal_header}>Game Rules</h2>
            <div>
                <p className={s.modal_text}>
                    At the start of a game one player is randomly assigned the <span className={`${s.bold} ${s.red}`}>traitor</span> role while the other players get the <span className={`${s.bold} ${s.blue}`}>agent</span> role. <br/>
                    Each player gets to choose one of three actions each turn:
                </p>
                <ul className={s.modal_text}>
                    <li><span className={`${s.bold} ${s.red}`}>Spy</span>: look at another player's role.</li>
                    <li><span className={`${s.bold} ${s.blue}`}>Swap</span>: swap the roles of two players.</li>
                    <li><span className={`${s.bold} ${s.green}`}>Confirm</span>: look at your own role (it might have changed).</li>
                </ul>
                <p className={s.modal_text}>
                    At the end of turn 3 a voting starts where players vote on who they think the traitor is. If the traitor is the most voted player then the agents win, otherwise the traitor wins.
                </p>
            </div>
        </div>
    );
}