import { useEffect } from "react";

function Navbar({
  pagina,
  favoritos,
  navegar,
  modoOscuro,
  cambiarTema,
}) {
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-tema",
      modoOscuro ? "oscuro" : "claro"
    );
  }, [modoOscuro]);

  return (
    <header className="navbar">
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

      <nav className="nav-links" aria-label="Navegación principal">
        <button
          className={`nav-link ${
            pagina === "inicio" ? "active" : ""
          }`}
          onClick={() => navegar("inicio")}
        >
          Inicio
        </button>

        <button
          className={`nav-link ${
            pagina === "catalogo" ? "active" : ""
          }`}
          onClick={() => navegar("catalogo")}
        >
          Catálogo
        </button>

        <button
          className={`nav-link ${
            pagina === "favoritos" ? "active" : ""
          }`}
          onClick={() => navegar("favoritos")}
        >
          Favoritos
          <span className="contador">{favoritos.length}</span>
        </button>
      </nav>

      <div className="acciones-nav">
        <button
          className="boton-tema"
          onClick={cambiarTema}
          aria-label={
            modoOscuro
              ? "Activar modo claro"
              : "Activar modo oscuro"
          }
          aria-pressed={!modoOscuro}
          title={
            modoOscuro
              ? "Cambiar a modo claro"
              : "Cambiar a modo oscuro"
          }
        >
          <span aria-hidden="true">
            {modoOscuro ? "☀️" : "🌙"}
          </span>

          <span>
            {modoOscuro ? "Modo claro" : "Modo oscuro"}
          </span>
        </button>

        <button
          className="boton boton-nav"
          onClick={() => navegar("catalogo")}
        >
          Explorar juegos ↗
        </button>
      </div>
    </header>
  );
}

export default Navbar;
