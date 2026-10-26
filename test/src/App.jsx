
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalogo from "./components/Catalogo";
import Footer from "./components/Footer";
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

function leerTema() {
  try {
    return localStorage.getItem("gamehub-tema") !== "claro";
  } catch {
    return true;
  }
}

function App() {
  const [pagina, setPagina] = useState("inicio");
  const [favoritos, setFavoritos] = useState(leerFavoritos);
  const [modoOscuro, setModoOscuro] = useState(leerTema);

  useEffect(() => {
    try {
      localStorage.setItem(
        "gamehub-favoritos",
        JSON.stringify(favoritos)
      );
    } catch {
      // La aplicación sigue funcionando si el almacenamiento está bloqueado.
    }
  }, [favoritos]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "gamehub-tema",
        modoOscuro ? "oscuro" : "claro"
      );
    } catch {
      // El tema sigue funcionando durante la sesión.
    }
  }, [modoOscuro]);

  function navegar(seccion) {
    setPagina(seccion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cambiarFavorito(id) {
    setFavoritos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((favorito) => favorito !== id)
        : [...actuales, id]
    );
  }

  function cambiarTema() {
    setModoOscuro((actual) => !actual);
  }

  return (
    <div className={modoOscuro ? "app" : "app light"}>
      <Navbar
        pagina={pagina}
        favoritos={favoritos}
        navegar={navegar}
        modoOscuro={modoOscuro}
        cambiarTema={cambiarTema}
      />

      <main>
        {pagina === "inicio" ? (
          <>
            <Hero
              navegar={navegar}
              totalJuegos={juegos.length}
              totalFavoritos={favoritos.length}
              totalCategorias={categorias.filter(
                (categoria) => categoria !== "Todos"
              ).length}
            />

            <section className="seccion-juegos">
              <div className="titulo-seccion">
                <div>
                  <span className="etiqueta">
                    SELECCIÓN DE JUEGOS
                  </span>
                  <h2>
                    Juegos destacados<span>.</span>
                  </h2>
                  <p>
                    Echa un vistazo a algunos juegos del catálogo.
                  </p>
                </div>

                <button
                  className="enlace"
                  onClick={() => navegar("catalogo")}
                >
                  Ver catálogo →
                </button>
              </div>

              <Catalogo
                juegos={juegos.slice(0, 3)}
                categorias={categorias}
                favoritos={favoritos}
                cambiarFavorito={cambiarFavorito}
                pagina="inicio"
                mostrarEncabezado={false}
              />
            </section>
          </>
        ) : (
          <Catalogo
            juegos={juegos}
            categorias={categorias}
            favoritos={favoritos}
            cambiarFavorito={cambiarFavorito}
            pagina={pagina}
          />
        )}
      </main>

      <Footer navegar={navegar} />
    </div>
  );
}

export default App;
