
function Footer({ navegar }) {
  return (
    <footer className="footer">
      <button
        className="logo"
        onClick={() => navegar("inicio")}
        aria-label="GameHub, inicio"
      >
        <span className="logo-icon">G</span>
        <span>
          Game<span className="logo-accent">Hub</span>
        </span>
      </button>

      <p>Un espacio para descubrir tu próximo videojuego.</p>

      <small className="creditos">
        Proyecto académico · GameHub · 2026
      </small>
    </footer>
  );
}

export default Footer;
