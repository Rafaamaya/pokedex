# Pokédex

Aplicación móvil que lista Pokémon desde la [PokéAPI](https://pokeapi.co/), con scroll infinito, búsqueda por nombre, detalle de cada Pokémon y favoritos persistentes. Desarrollada como challenge técnico mobile para deCampoaCampo.

## Funcionalidades

- **Listado con scroll infinito**: carga de a 20 Pokémon y pide la página siguiente al llegar al final de la lista.
- **Imágenes progresivas**: placeholder mientras carga y transición suave, con caché en memoria y disco.
- **Búsqueda por nombre**: la PokéAPI no tiene búsqueda por nombre, así que se descarga una sola vez el índice de nombres (unos 91 KB, ~12 KB comprimido) cuando el usuario enfoca el buscador, y se filtra de forma local.
- **Detalle**: tipos, habilidades, estadísticas base, altura y peso.
- **Favoritos**: se marcan desde la lista y se guardan en el dispositivo, así que persisten al cerrar la app.
- **Caché de la lista**: se guarda la última lista cargada para mostrarla de inmediato al volver a abrir la app.
- **Estados de carga y vacíos**: skeletons mientras carga y mensajes claros cuando no hay favoritos o no hay resultados de búsqueda.

## Tecnologías

| Área | Herramienta |
| --- | --- |
| Framework | Expo SDK 54, React Native 0.81, React 19 |
| Lenguaje | TypeScript (modo `strict`) |
| Navegación | React Navigation v6 (native stack + bottom tabs) |
| Red | Axios |
| Estado global | Zustand con middleware `persist` |
| Almacenamiento local | `@react-native-async-storage/async-storage` |
| Imágenes | `expo-image` |
| Tests | Jest (`jest-expo`) y React Native Testing Library |

## Requisitos

- Node.js 20 o superior
- npm
- La app **Expo Go** en el celular, o un emulador de Android / simulador de iOS

## Cómo ejecutar el proyecto

```bash
git clone https://github.com/Rafaamaya/pokedex.git
cd pokedex
npm install
npm start
```

Después, escaneá el código QR con Expo Go, o presioná `a` (Android) o `i` (iOS) en la terminal para abrirlo en un emulador.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo de Expo |
| `npm run android` | Abre la app en un emulador de Android |
| `npm run ios` | Abre la app en el simulador de iOS |
| `npm run web` | Abre la app en el navegador |
| `npm test` | Ejecuta los tests |

## Tests

```bash
npm test
```

Cubren los helpers (formato, imágenes y búsqueda), el componente `EmptyState` y la navegación desde `FavoritesScreen` hacia el detalle.

## Estructura del proyecto

```
src/
├── api/          Cliente Axios y llamadas a la PokéAPI
├── cache/        Caché local de la lista de Pokémon
├── components/   Componentes reutilizables (PokemonCard, SearchBar, Skeleton, EmptyState...)
├── helpers/      Funciones puras (formato de nombres, URLs de imágenes, filtro de búsqueda)
├── hooks/        Lógica de datos (lista paginada, índice de búsqueda, detalle)
├── navigation/   Navegador de tabs y stack
├── screens/      Pantallas: lista, detalle y favoritos
├── stores/       Estado global de favoritos (Zustand)
└── types/        Tipos de TypeScript
```

La lógica está separada de la interfaz: las pantallas solo componen componentes y usan *hooks*; las llamadas HTTP viven en `api/` y las funciones sin efectos secundarios en `helpers/`, lo que las hace fáciles de testear.

## Decisiones técnicas

- **Paginación manual con `limit` y `offset`**: la API devuelve la página y un `next`; el hook guarda el offset en una `ref` para no depender de renders.
- **Índice de nombres descargado una sola vez**: dado que no existe un endpoint de búsqueda, es mejor una sola petición liviana y filtrar localmente que lanzar una petición por cada tecla. Por eso no hace falta *debounce*.
- **Patrón Compound Components en `PokemonCard`** (`Root`, `Image`, `Title`, `Number`, `FavoriteButton`): permite componer la tarjeta sin acumular props y reutilizarla en la lista y en favoritos.
- **`memo` y selectores granulares de Zustand**: cada tarjeta solo se vuelve a renderizar si cambia su propio estado de favorito.
- **Zustand con `persist`** en vez de guardar a mano: el middleware se encarga de la serialización y la rehidratación, y con `partialize` se guarda solo la lista de favoritos.
- **`expo-image`** con `cachePolicy="memory-disk"`: reduce las descargas repetidas de las imágenes.
- **Caché de la lista en AsyncStorage**: la app muestra contenido al instante y respeta la política de uso justo de la PokéAPI, que pide cachear.
- **React Navigation v6**, versión estable y compatible con el resto del stack.

## Limitaciones y mejoras futuras

- **Manejo de errores**: todavía no hay mensajes diferenciados para fallas de red, timeout o errores del servidor, ni botón de reintento. Es la próxima mejora prevista.
- Faltan ESLint y Prettier.
- Ampliar los tests a hooks y a la pantalla de detalle.

## Créditos

Datos e imágenes provistos por la [PokéAPI](https://pokeapi.co/) y su repositorio de [sprites](https://github.com/PokeAPI/sprites).
