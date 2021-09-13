import s from './NotFound.module.scss';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
      <div>
            <div className={s.background}></div>
            <Link to={'/'} className={s.btn}>Go back</Link>
      </div>

  );
}
