function Hero({ navegar, totalJuegos, totalFavoritos }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="etiqueta">TU PRÓXIMA AVENTURA EMPIEZA AQUÍ</span>

        <h1>
          Encuentra tu próximo{" "}
          <span className="texto-gradiente">juego favorito.</span>
        </h1>

        <p>
          Explora videojuegos, descubre nuevas aventuras y guarda los títulos
          que quieras jugar después.
        </p>

        <div className="hero-buttons">
          <button className="boton" onClick={() => navegar("catalogo")}>
            Explorar ahora ↗
          </button>

          <button
            className="boton boton-secundario"
            onClick={() => navegar("favoritos")}
          >
            ♡ Mis favoritos
          </button>
        </div>

        <div className="estadisticas">
          <div>
            <strong>{totalJuegos}</strong>
            <span>Videojuegos</span>
          </div>

          <div>
            <strong>5</strong>
            <span>Categorías</span>
          </div>

          <div>
            <strong>{totalFavoritos}</strong>
            <span>Favoritos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;