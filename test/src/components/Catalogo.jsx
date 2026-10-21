function Catalogo({
  juegos,
  categorias,
  favoritos,
  cambiarFavorito,
  pagina,
}) {
  const [busqueda, setBusqueda] = React.useState("");
  const [categoria, setCategoria] = React.useState("Todos");

  const visibles = juegos.filter((juego) => {
    const coincideCategoria =
      categoria === "Todos" || juego.categoria === categoria;

    const texto = busqueda.trim().toLowerCase();

    const coincideTexto = [
      juego.nombre,
      juego.categoria,
      juego.descripcion,
      ...juego.plataformas,
    ].some((dato) => dato.toLowerCase().includes(texto));

    const coincideFavorito =
      pagina !== "favoritos" || favoritos.includes(juego.id);

    return coincideCategoria && coincideTexto && coincideFavorito;
  });

  return (
    <section className="catalogo">
      <div className="encabezado-catalogo">
        <span className="etiqueta">
          {pagina === "favoritos" ? "TU COLECCIÓN" : "DESCUBRE TU PRÓXIMO JUEGO"}
        </span>

        <h1>
          {pagina === "favoritos" ? (
            <>Mis <span className="texto-gradiente">favoritos.</span></>
          ) : (
            <>Explora el <span className="texto-gradiente">catálogo.</span></>
          )}
        </h1>

        <p>
          {pagina === "favoritos"
            ? `Tienes ${favoritos.length} juegos guardados.`
            : "Busca por nombre, categoría o plataforma."}
        </p>
      </div>

      <input
        className="buscador"
        type="search"
        placeholder="Buscar videojuegos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {pagina === "catalogo" && (
        <div className="filtros">
          {categorias.map((item) => (
            <button
              key={item}
              className={categoria === item ? "filtro activo" : "filtro"}
              onClick={() => setCategoria(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <p className="cantidad-resultados">
        {visibles.length} {visibles.length === 1 ? "juego" : "juegos"}
      </p>

      {visibles.length > 0 ? (
        <div className="rejilla-juegos">
          {visibles.map((juego) => {
            const guardado = favoritos.includes(juego.id);

            return (
              <article className="tarjeta-juego" key={juego.id}>
                <div className="imagen-juego">
                  <img src={juego.imagen} alt={juego.nombre} loading="lazy" />
                  <span className="etiqueta-juego">{juego.categoria}</span>

                  <button
                    className={guardado
                      ? "boton-corazon seleccionado"
                      : "boton-corazon"}
                    onClick={() => cambiarFavorito(juego.id)}
                    aria-label={guardado
                      ? `Quitar ${juego.nombre} de favoritos`
                      : `Agregar ${juego.nombre} a favoritos`}
                  >
                    {guardado ? "♥" : "♡"}
                  </button>
                </div>

                <div className="informacion-juego">
                  <h3>{juego.nombre}</h3>
                  <p className="descripcion-juego">{juego.descripcion}</p>

                  <span className="titulo-plataformas">PLATAFORMAS</span>

                  <div className="lista-plataformas">
                    {juego.plataformas.map((plataforma) => (
                      <span key={plataforma}>{plataforma}</span>
                    ))}
                  </div>

                  <button
                    className={guardado
                      ? "boton-favorito guardado"
                      : "boton-favorito"}
                    onClick={() => cambiarFavorito(juego.id)}
                  >
                    {guardado ? "Quitar de favoritos" : "Agregar a favoritos"}
                    <span>{guardado ? "✓" : "+"}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="estado-vacio">
          <h2>
            {pagina === "favoritos" && !busqueda
              ? "Aún no tienes favoritos"
              : "No encontramos juegos"}
          </h2>

          <p>
            {pagina === "favoritos" && !busqueda
              ? "Explora el catálogo y guarda los juegos que te gusten."
              : "Prueba con otro término o categoría."}
          </p>

          <button
            className="boton boton-secundario"
            onClick={() => {
              setBusqueda("");
              setCategoria("Todos");
            }}
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </section>
  );
}

import React from "react";

export default Catalogo;