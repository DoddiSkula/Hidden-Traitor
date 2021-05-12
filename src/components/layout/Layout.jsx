import s from './Layout.module.scss';

export function Layout({ children }) {
  return (
    <div>
      <header className={s.layout__header}>
        <h1>HIDDEN TRAITOR</h1>
      </header>
      <div className={s.layout}>
        {children}
      </div>
      <footer className={s.layout__footer}>
        <p>A game by <a href="https://github.com/DoddiSkula">Doddi</a></p>
      </footer>
    </div>
  );
}