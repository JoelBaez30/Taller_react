
import { useState } from "react";

function Catalogo({
  juegos,
  categorias,
  favoritos,
  cambiarFavorito,
  pagina,
  mostrarEncabezado = true,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");

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
    <section className={pagina === "inicio" ? "" : "catalogo"}>
      {mostrarEncabezado && (
        <div className="encabezado-catalogo">
          <span className="etiqueta">
            {pagina === "favoritos"
              ? "TU COLECCIÓN PERSONAL"
              : "CATÁLOGO DE VIDEOJUEGOS"}
          </span>

          <h1>
            {pagina === "favoritos" ? (
              <>
                Mis <span className="texto-gradiente">favoritos.</span>
              </>
            ) : (
              <>
                Explora los{" "}
                <span className="texto-gradiente">juegos.</span>
              </>
            )}
          </h1>

          <p>
            {pagina === "favoritos"
              ? `Tienes ${favoritos.length} ${
                  favoritos.length === 1
                    ? "juego guardado"
                    : "juegos guardados"
                }.`
              : "Busca videojuegos por nombre, categoría o plataforma."}
          </p>
        </div>
      )}

      <input
        className="buscador"
        type="search"
        placeholder="Buscar videojuegos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        aria-label="Buscar videojuegos"
      />

      {pagina === "catalogo" && (
        <div className="filtros">
          {categorias.map((item) => (
            <button
              key={item}
              className={`filtro ${categoria === item ? "activo" : ""}`}
              onClick={() => setCategoria(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <p className="cantidad-resultados">
        {visibles.length}{" "}
        {visibles.length === 1 ? "juego encontrado" : "juegos encontrados"}
      </p>

      {visibles.length > 0 ? (
        <div className="rejilla-juegos">
          {visibles.map((juego) => {
            const guardado = favoritos.includes(juego.id);

            return (
              <article className="tarjeta-juego" key={juego.id}>
                <div className="imagen-juego">
                  <img
                    src={juego.imagen}
                    alt={`Imagen de ${juego.nombre}`}
                    loading="lazy"
                  />

                  <span className="etiqueta-juego">
                    {juego.categoria}
                  </span>

                  <button
                    className={`boton-corazon ${
                      guardado ? "seleccionado" : ""
                    }`}
                    onClick={() => cambiarFavorito(juego.id)}
                    aria-label={
                      guardado
                        ? `Quitar ${juego.nombre} de favoritos`
                        : `Agregar ${juego.nombre} a favoritos`
                    }
                    aria-pressed={guardado}
                  >
                    {guardado ? "♥" : "♡"}
                  </button>
                </div>

                <div className="informacion-juego">
                  <h3>{juego.nombre}</h3>

                  <p className="descripcion-juego">
                    {juego.descripcion}
                  </p>

                  <span className="titulo-plataformas">
                    PLATAFORMAS
                  </span>

                  <div className="lista-plataformas">
                    {juego.plataformas.map((plataforma) => (
                      <span key={plataforma}>{plataforma}</span>
                    ))}
                  </div>

                  <button
                    className={`boton-favorito ${
                      guardado ? "guardado" : ""
                    }`}
                    onClick={() => cambiarFavorito(juego.id)}
                  >
                    {guardado
                      ? "Quitar de favoritos"
                      : "Agregar a favoritos"}
                    <span>{guardado ? "✓" : "+"}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="estado-vacio">
          <span>♡</span>

          <h2>
            {pagina === "favoritos" && !busqueda
              ? "Todavía no tienes favoritos"
              : "No se encontraron juegos"}
          </h2>

          <p>
            {pagina === "favoritos" && !busqueda
              ? "Ve al catálogo y guarda los videojuegos que más te gusten."
              : "Prueba con otro nombre o selecciona una categoría diferente."}
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

export default Catalogo;
