import { Link } from 'react-router-dom';
import s from './ExitButton.module.scss';

export function ExitButton() {
    return (
        <div>
            <Link to={"/"} title={"Leave Game"}><div className={s.exit}/></Link>
        </div>
    );
}