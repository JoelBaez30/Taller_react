function Footer({ navegar }) {
  return (
    <footer className="footer">
      <button className="logo" onClick={() => navegar("inicio")}>
        <span className="logo-icon">G</span>
        <span>
          Game<span className="logo-accent">Hub</span>
        </span>
      </button>

      <p>Descubre nuevos mundos, un juego a la vez.</p>

      <small className="creditos">Proyecto académico · GameHub · 2026</small>
    </footer>
  );
}

export default Footer;