import s from './Layout.module.scss';

export function Layout({ children }) {
  return (
    <div>
      <div className={s.layout}>
        <h1 className={s.layout__header}>HIDDEN TRAITOR</h1>
        {children}
      </div>
      <footer className={s.layout__footer}>
        <p>A game by <a href="https://github.com/DoddiSkula">Doddi</a></p>
      </footer>
    </div>
  );
}