function Navbar({ pagina, favoritos, navegar }) {
  return (
    <header className="navbar">
      <button className="logo" onClick={() => navegar("inicio")}>
        <span className="logo-icon">G</span>
        <span>
          Game<span className="logo-accent">Hub</span>
        </span>
      </button>

      <nav className="nav-links">
        <button
          className={pagina === "inicio" ? "nav-link active" : "nav-link"}
          onClick={() => navegar("inicio")}
        >
          Inicio
        </button>

        <button
          className={pagina === "catalogo" ? "nav-link active" : "nav-link"}
          onClick={() => navegar("catalogo")}
        >
          Catálogo
        </button>

        <button
          className={pagina === "favoritos" ? "nav-link active" : "nav-link"}
          onClick={() => navegar("favoritos")}
        >
          Favoritos <span className="contador">{favoritos.length}</span>
        </button>
      </nav>

      <button className="boton boton-nav" onClick={() => navegar("catalogo")}>
        Explorar juegos ↗
      </button>
    </header>
  );
}

export default Navbar;