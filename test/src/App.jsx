import { useEffect, useState } from "react";
import juegos, { categorias } from "./data/juegos";
import "./App.css";

function leerFavoritos() {
  try {
    const guardados = JSON.parse(
      localStorage.getItem("gamehub-favoritos")
    );

    return Array.isArray(guardados) ? guardados : [];
  } catch {
    return [];
  }
}

function App() {
  const [pagina, setPagina] = useState("inicio");
  const [favoritos, setFavoritos] = useState(leerFavoritos);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  useEffect(() => {
    localStorage.setItem(
      "gamehub-favoritos",
      JSON.stringify(favoritos)
    );
  }, [favoritos]);

  function navegar(seccion) {
    setPagina(seccion);
    setBusqueda("");
    setCategoria("Todos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cambiarFavorito(id) {
    setFavoritos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((favorito) => favorito !== id)
        : [...actuales, id]
    );
  }

  const juegosVisibles = juegos.filter((juego) => {
    const coincideCategoria =
      categoria === "Todos" || juego.categoria === categoria;

    const texto = busqueda.trim().toLowerCase();

    const coincideBusqueda = [
      juego.nombre,
      juego.categoria,
      juego.descripcion,
      ...juego.plataformas,
    ].some((dato) => dato.toLowerCase().includes(texto));

    return (
      coincideCategoria &&
      coincideBusqueda &&
      (pagina !== "favoritos" || favoritos.includes(juego.id))
    );
  });

  return (
    <div className="app">
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
          {[
            ["inicio", "Inicio"],
            ["catalogo", "Catálogo"],
            ["favoritos", "Favoritos"],
          ].map(([seccion, texto]) => (
            <button
              key={seccion}
              className={`nav-link ${
                pagina === seccion ? "active" : ""
              }`}
              onClick={() => navegar(seccion)}
            >
              {texto}

              {seccion === "favoritos" && (
                <span className="contador">{favoritos.length}</span>
              )}
            </button>
          ))}
        </nav>

        <button
          className="boton boton-nav"
          onClick={() => navegar("catalogo")}
        >
          Explorar juegos ↗
        </button>
      </header>

      <main>
        {pagina === "inicio" ? (
          <>
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
                  Explora nuevos mundos, descubre aventuras y encuentra
                  videojuegos que se adapten a tus gustos. Guarda tus
                  favoritos y tenlos siempre a mano.
                </p>

                <div className="hero-buttons">
                  <button
                    className="boton"
                    onClick={() => navegar("catalogo")}
                  >
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
                    <strong>
                      {String(juegos.length).padStart(2, "0")}
                    </strong>
                    <span>Videojuegos</span>
                  </div>

                  <div>
                    <strong>
                      {String(categorias.length - 1).padStart(2, "0")}
                    </strong>
                    <span>Categorías</span>
                  </div>

                  <div>
                    <strong>
                      {String(favoritos.length).padStart(2, "0")}
                    </strong>
                    <span>Favoritos</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="seccion-juegos">
              <div className="titulo-seccion">
                <div>
                  <span className="etiqueta">SELECCIÓN DE JUEGOS</span>
                  <h2>
                    Juegos destacados<span>.</span>
                  </h2>
                  <p>
                    Echa un vistazo a algunos de los juegos del catálogo.
                  </p>
                </div>

                <button
                  className="enlace"
                  onClick={() => navegar("catalogo")}
                >
                  Ver catálogo →
                </button>
              </div>

              <div className="rejilla-juegos">
                {juegos.slice(0, 3).map((juego) => (
                  <Tarjeta
                    key={juego.id}
                    juego={juego}
                    esFavorito={favoritos.includes(juego.id)}
                    cambiarFavorito={cambiarFavorito}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="catalogo">
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
                    Explora los <span className="texto-gradiente">juegos.</span>
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
                  : "Encuentra juegos por nombre, categoría o plataforma."}
              </p>
            </div>

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
                    className={`filtro ${
                      categoria === item ? "activo" : ""
                    }`}
                    onClick={() => setCategoria(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            <p className="cantidad-resultados">
              {juegosVisibles.length}{" "}
              {juegosVisibles.length === 1
                ? "juego encontrado"
                : "juegos encontrados"}
            </p>

            {juegosVisibles.length > 0 ? (
              <div className="rejilla-juegos">
                {juegosVisibles.map((juego) => (
                  <Tarjeta
                    key={juego.id}
                    juego={juego}
                    esFavorito={favoritos.includes(juego.id)}
                    cambiarFavorito={cambiarFavorito}
                  />
                ))}
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
                  className="boton"
                  onClick={() => {
                    if (pagina === "favoritos" && !busqueda) {
                      navegar("catalogo");
                    } else {
                      setBusqueda("");
                      setCategoria("Todos");
                    }
                  }}
                >
                  {pagina === "favoritos" && !busqueda
                    ? "Ir al catálogo"
                    : "Limpiar búsqueda"}
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <button className="logo" onClick={() => navegar("inicio")}>
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
    </div>
  );
}

function Tarjeta({ juego, esFavorito, cambiarFavorito }) {
  return (
    <article className="tarjeta-juego">
      <div className="imagen-juego">
        <img
          src={juego.imagen}
          alt={`Imagen ilustrativa de ${juego.nombre}`}
          loading="lazy"
        />

        <span className="etiqueta-juego">{juego.categoria}</span>

        <button
          className={`boton-corazon ${
            esFavorito ? "seleccionado" : ""
          }`}
          onClick={() => cambiarFavorito(juego.id)}
          aria-label={
            esFavorito
              ? `Quitar ${juego.nombre} de favoritos`
              : `Agregar ${juego.nombre} a favoritos`
          }
          aria-pressed={esFavorito}
        >
          {esFavorito ? "♥" : "♡"}
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
          className={`boton-favorito ${
            esFavorito ? "guardado" : ""
          }`}
          onClick={() => cambiarFavorito(juego.id)}
        >
          {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          <span>{esFavorito ? "✓" : "+"}</span>
        </button>
      </div>
    </article>
  );
}

export default App;