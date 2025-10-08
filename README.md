# Mini Practica 5 - Routing y archivos reservados en Next.js

## Routing en Next.js

La navegación (routing) es el mecanismo que permite presentar diferentes pantallas en una aplicación web según la URL. Existen enfoques distintos: recarga completa de documentos (sitios tradicionales), SPA con un router del lado cliente (por ejemplo React + react-router) y routing basado en archivos como el que ofrece Next.js (App Router). Cada enfoque tiene implicaciones en experiencia de usuario, rendimiento y arquitectura.

### Conocimiento necesario previo: app router y pages router

App Router en Next.js

En Next.js hoy en día existen dos formas de organizar y manejar las rutas de una aplicación:

* Pages Router (el sistema antiguo)
* App Router (el sistema nuevo, introducido en Next.js 13)
**1. Pages Router (antiguo)**

* Se usaba la carpeta pages/.
* Cada archivo dentro de pages/ se convertía en una ruta automáticamente.
* pages/index.tsx → /
* pages/about.tsx → /about
* pages/users/[id].tsx → /users/:id
* Todo era Client Components por defecto.
* Se necesitaba usar librerías como getServerSideProps o getStaticProps para cargar datos en el servidor.

**2. App Router (nuevo, recomendado)**
* Se usa la carpeta app/ en lugar de pages/.
* Cada carpeta dentro de app/ representa una ruta.
* Se introducen los Server Components por defecto, lo que hace más fácil cargar datos directamente desde el servidor.
* Aparecen archivos reservados como layout.tsx, loading.tsx, not-found.tsx, etc.
* Permite anidar layouts, segmentación de rutas, y manejo más flexible de datos.

**TODOS los ejemplos, código y explicaciones que veamos, fueron, son y serán para el app router, por lo que estos items son solo a modo informativo**

#### Conocimiento necesario previo: client components y server components

En Next.js 13+ (con la carpeta app/), cada archivo de React puede ser tratado de dos formas distintas:

* Server Component (por defecto)
* Client Component (cuando lo indicamos explícitamente)

Esto es importante porque define dónde se ejecuta el código React: en el servidor o en el navegador.

**1. Server Components (por defecto)**

Se ejecutan en el servidor antes de enviar el HTML al navegador.

Son ideales para cargar datos desde una API, base de datos o archivo.

Mejoran la performance porque el navegador recibe HTML ya procesado.

No pueden usar hooks que dependen del navegador (useState, useEffect, useRef).

Sí pueden ser async, y hacer await a promesas sin problemas.

Ejemplo:
``` javascript
// app/users/[id]/page.tsx
export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Llamada a una API en el servidor
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();

  return <div>Nombre: {user.name}</div>;
}

```
En este caso:

* El servidor de Next.js pide los datos de la API.
* Renderiza el HTML con el nombre del usuario.
* El navegador recibe ese HTML ya listo (rápido y eficiente).

**2. Client Components**

Se ejecutan en el navegador.

Necesarios cuando queremos interactividad: usar useState, useEffect, manejar eventos del usuario, etc.

Se declaran agregando "use client" al inicio del archivo.

No pueden ser async en la definición del componente.

Para acceder a parámetros de la ruta se usa el hook useParams de next/navigation.

Ejemplo:
``` javascript
"use client";

import { useParams } from "next/navigation";

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <p>Página del usuario con ID: {id}</p>
      <button onClick={() => alert("Botón clickeado")}>Click</button>
    </div>
  );
}

```
En este caso:

* El HTML inicial ya vino del servidor.
* Pero este componente se hidrata en el navegador y puede manejar clicks o estado.

#### Comparación conceptual (Vanilla JS, React + librería, Next.js)

* Vanilla JS (navegación tradicional / SPA con History API)
En páginas estáticas con enlaces ```<a href="/ruta">``` el navegador solicita al servidor un HTML nuevo y recarga la página completa.
En SPAs implementadas con JavaScript "a mano", la navegación se gestiona internamente: se interceptan clicks, se modifica la URL con history.pushState() y se responde a popstate para renderizar las vistas sin recarga. Esa técnica evita recargas completas pero requiere implementar por cuenta propia el enrutador, la gestión del estado y las transiciones.
En este <a href="https://github.com/casasmartinignacio/ejemplo-frontend-vanilla-js">repositorio de ejemplo en Vanilla JS</a> se puede ver un ejemplo. Basicamente se utiliza Express, una libreria de Node.js pero para desarrollar APIs, y se sirve una ruta "/*", donde para cualquier ruta se "sirve" el archivo index.js con todo el código Javascript necesario para la app web, y luego la navegación se maneja utilizando las APIs del navegador (mencionadas en la primera clase presencial).

<br>

* React con librería de routing (por ejemplo react-router-dom)
React proporciona la renderización de UI; para navegación cliente se instala una librería que expone componentes y hooks (```<BrowserRouter>, <Routes>, <Route>, <Link>, useNavigate```).
**Ventaja:** control fino, extensibilidad (guards, nested routes, programmatic navigation). Necesita configuración (instalación, wrappers).
**Comportamiento:** la librería intercepta clicks y usa History API para cambiar la URL y renderizar el componente correspondiente sin recarga. Lo hace con una intervención minima del desarrollador, a diferencia del item anterior donde todo debia hacerse manualmente.

* Next.js (File-based routing — App Router)
Next.js crea rutas a partir de la estructura de archivos en app/. Cada carpeta/archivo con page.tsx corresponde a una ruta.
Soporta rutas estáticas y dinámicas ([id]), además de varios archivos especiales (layouts, loading, error, not-found, middleware, route handlers).
**Ventaja:** se reduce el boilerplate de routing, hay optimizaciones automáticas (splitting, prefetching, streaming) y se integra renderizado en servidor y API handlers dentro del mismo proyecto. La navegación interna se realiza sin recarga completa y Next.js prefetches y gestiona transiciones. 


### Cómo funciona la navegación en Next.js

Cuando un usuario cambia de página en una aplicación web existen dos maneras fundamentales en que puede ocurrir esto:

1. Recarga completa (comportamiento tradicional): el navegador solicita al servidor un nuevo documento HTML y vuelve a cargar toda la página. Esto es lo que sucede si se hace clic en un enlace ```<a href="/otra-pagina">``` y no hay nada que lo intercepte. Se pierde el estado en memoria (variables en JavaScript, formularios no reseteados, etc.).

2. Navegación cliente (Single Page Application - SPA): la aplicación intercepta el clic y cambia lo que se muestra sin recargar todo el documento. Para eso se usan dos piezas clave:

* History API del navegador: es una API nativa del navegador. Permite cambiar la URL sin recargar la página mediante history.pushState() y reaccionar cuando el usuario usa atrás/adelante con el evento popstate. Es la base para que una SPA modifique la URL y al mismo tiempo mantenga la aplicación cargada en memoria.
* Renderizado dinámico en el cliente: el código JavaScript de la app decide qué mostrar según location.pathname. Al interceptar clicks y usar pushState, la app renderiza la nueva vista sin solicitar todo el HTML al servidor.

##### Qué hace Next.js para mejorar la navegación cliente

Cuando se usa ```<Link href="/ruta">``` Next.js intercepta el clic y hace una navegación cliente (usa History API internamente). Esto evita la recarga completa y mantiene el estado de los componentes que permanecen montados.

Next.js evita enviar al navegador todo el código de la aplicación de una vez: en vez de eso, divide la aplicación en piezas más pequeñas (cada página/parte tiene su propio código). Cuando el usuario navega, Next.js pide solo la pieza que hace falta y la ejecuta. Piensa en esto como traer solo la página que vas a ver en vez de descargar la aplicación entera en el primer acceso. Esto reduce el tiempo de espera para empezar a usar la app.

Además, Next.js puede precargar (descargar en segundo plano) la pieza de la página a la que apunta un enlace cuando detecta que el usuario está a punto de hacer clic (por ejemplo, cuando el enlace entra en la pantalla o cuando el usuario pasa el mouse por encima). Si luego el usuario hace clic, esa pieza ya está disponible localmente y la transición es casi instantánea. 

Los layouts (envoltorios persistentes) en Next.js se mantienen montados al navegar entre páginas que los comparten. Esto significa que un navbar o un menú que esté en un layout.tsx no se destruye y vuelve a crear en cada navegación; acelera la experiencia y preserva estados (por ejemplo, un menú desplegado permanece desplegado).

Por qué ```<Link>``` es más eficiente que un ```<a>``` normal:

* ```<a>``` normal provoca recarga completa del documento.
* ```<Link>``` activa la navegación cliente (sin recarga) y permite prefetch/precarga y reutilización de layouts, por lo que la transición es más rápida y consume menos recursos del cliente.

##### Rutas dinámicas y cómo usarlas

En Next.js (App Router) el sistema de routing está basado en archivos. 

app/users/page.tsx → ruta estática /users

Para crear rutas dinámicas se usa la sintaxis con corchetes:

app/users/[id]/page.tsx → ruta dinámica /users/1, /users/abc, etc.

¿Cómo recibe datos la ruta dinámica?

Cuando colocas app/users/[id]/page.tsx, Next.js invoca el componente de esa página pasando un objeto params. Ejemplo en TypeScript:
``` javascript
// app/users/[id]/page.tsx
export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <div>Usuario con id: {id}</div>
}
```
Es decir, los parametros deben "esperarse" utilizando un await. PERO esto es solo cierto en server components. Para los client components, los cuales no pueden ser async, se resuelve utilizando un hook de Next:
``` javascript
"use client";

import { useParams } from "next/navigation";

export default function UserProfile() {
  const params = useParams<{ id: string }>();
  // acá params SIEMPRE es sincrónico
  return <div>User id: {params.id}</div>;
}
```
##### Enlaces hacia rutas dinámicas

Para generar un enlace hacia esa ruta desde otra página:
``` javascript
import Link from "next/link";

function UsersList() {
  const users = [{ id: "1", name: "Ana" }, { id: "2", name: "Luis" }];

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          <Link href={`/users/${u.id}`}>{u.name}</Link>
        </li>
      ))}
    </ul>
  );
}
```
También se puede navegar programáticamente desde código:
``` javascript
"use client";
import { useRouter } from "next/navigation";

function IrUsuario({ id }: { id: string }) {
  const router = useRouter();
  return <button onClick={() => router.push(`/users/${id}`)}>Ver</button>;
}
```

#### Recomendaciones de buenas prácticas

Si necesitas usar useState o useEffect en esa página, hazla cliente colocando "use client" al inicio del archivo; en ese caso ya no recibirás params como argumento de la función componente (las páginas cliente pueden leer params si el padre se los pasa como prop), por lo que el patrón común es:

Mantener la página como server component que recibe params, luego renderizar un componente cliente hijo pasándole los datos o el id para que el componente cliente ejecute lógica con hooks.

Para rutas con varios segmentos dinámicos se usa app/[...slug]/page.tsx (catch-all) y se recibe params.slug como array de strings.


##### Archivos reservados (App Router) y ejemplos en TypeScript

A continuación se explican los archivos especiales que pueden aparecer en app/, con ejemplos de uso y para qué sirve cada uno. Todos los ejemplos están en TypeScript/TSX.

**page.tsx**

Es el archivo que representa la ruta. Cada carpeta que contiene page.tsx es una ruta accesible.

Ejemplo (ruta raíz app/page.tsx):
``` javascript
// app/page.tsx
import UserList from '@/components/UserList'

export default function HomePage() {
  return (
    <main>
      <h1>Inicio — Listado de usuarios</h1>
      <UserList />
    </main>
  );
}
```

page.tsx puede ser un componente server (por defecto) o un componente cliente si contiene "use client".

**layout.tsx**

Define un layout persistente para todas las páginas dentro del mismo segmento de carpetas. Aquí van navbars, footers, wrappers globales. El children contiene la página o layout anidado. Al navegar, los layout.tsx que se mantienen no se remountan (conservan estado). 
nextjs.org
``` javascript
// app/layout.tsx
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header>
          <nav>
            <Link href="/">Lista</Link> | <Link href="/about">About</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>Texto de relleno: Lorem ipsum dolor sit amet...</p>
        </footer>
      </body>
    </html>
  );
}
```
**loading.tsx**

Archivo opcional para mostrar UI inmediata mientras se carga el contenido del segmento (Loading state usando Suspense). Se utiliza para skeletos o spinners. 
``` javascript
// app/users/loading.tsx
export default function UsersLoading() {
  return <p>Cargando usuarios...</p>;
}
```
**not-found.tsx**

Para manejar 404s a nivel de segmento; también existe global-not-found (opcional) para 404 global. Se puede invocar notFound() desde next/navigation para mostrar este UI. 
``` javascript
// app/users/not-found.tsx
export default function UsersNotFound() {
  return <h2>No se encontraron usuarios</h2>;
}
```
**error.tsx**

Define un boundary de error para ese segmento. Es un componente client (debe usar "use client") y recibe error y reset. Permite mostrar fallback UI y recuperar la renderización. 
``` javascript
// app/error.tsx
"use client";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Ocurrió un error</h2>
      <button onClick={() => reset()}>Intentar otra vez</button>
    </div>
  );
}
```
**middleware.ts**

Middleware que corre antes de que la ruta sea renderizada (Edge Runtime). Útil para autenticación, redirecciones y reescrituras. Se define en la raíz (solo un middleware por proyecto). Lo usaremos en actividades futuras.
``` javascript
// middleware.ts
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();

  // ejemplo: redirigir si no hay token y la ruta empieza por /dashboard
  if (!token && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
```
**route.ts (Route Handlers — API dentro app/)**

Define handlers HTTP (GET, POST, etc.) para crear endpoints desde app/. Útil cuando se quiere un API endpoint cercano a la lógica de la app. Lo usaremos en actividades futuras.
``` javascript
// app/api/users/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const users = [{ id: 1, name: "María" }, { id: 2, name: "Juan" }];
  return NextResponse.json(users);
}
```

### Ejercicio propuesto

Modificación de la actividad anterior para ahora permitir la navegación al detalle de un Pokemon concreto (sumado a la utilización de layout global).

Crear/usar app/layout.tsx que envuelva todas las páginas. El layout debe contener:

* Un navbar con un Link a la lista principal.
* Un footer con texto de relleno
* En la página principal (la lista):
  * Obtener la lista desde pokeapi.co usando axios.
  * Guardar resultados en estado y renderizar
  * Cada item debe ser una card clickeable que navegue a la ruta dinámica /pokemon/[id]
  * Utilizar componentes siempre que se pueda
  * Implementar skeleton para cuando la lista este cargando (puede usar una libreria externa)

En app/pokemon/[name]/page.tsx:

* Recibir param y obtener información del Pokémon con axios.
* Mostrar nombre y propiedades básicas (sprites, tipos) en la vista de detalle.
* Incluir enlace para volver a la lista.

Nota (informativa) sobre la API y paginación:

El endpoint usa paginación con limit y offset. Por ejemplo ?limit=30&offset=0 devuelve los primeros 30; para la siguiente página usar offset=30, luego offset=60, etc.

En esta práctica solo soliciten la primera página (limit=30&offset=0). En una actividad futura se trabajará la paginación con botones “Siguiente”/“Anterior” y el uso de offset.