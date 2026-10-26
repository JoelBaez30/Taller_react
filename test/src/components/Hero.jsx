
function Hero({
  navegar,
  totalJuegos,
  totalFavoritos,
  totalCategorias,
}) {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="etiqueta">
          VIDEOJUEGOS PARA TODOS LOS GUSTOS
        </span>

        <h1>
          Encuentra tu próximo{" "}
          <span className="texto-gradiente">juego favorito.</span>
        </h1>

        <p>
          Explora nuevos mundos, descubre aventuras y encuentra videojuegos
          que se adapten a tus gustos. Guarda tus favoritos y tenlos siempre
          a mano.
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
            <strong>{String(totalJuegos).padStart(2, "0")}</strong>
            <span>Videojuegos</span>
          </div>

          <div>
            <strong>{String(totalCategorias).padStart(2, "0")}</strong>
            <span>Categorías</span>
          </div>

          <div>
            <strong>{String(totalFavoritos).padStart(2, "0")}</strong>
            <span>Favoritos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
