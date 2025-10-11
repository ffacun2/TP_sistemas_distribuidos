# Práctica 6 – Data Fetching en Next.js

## Conocimiento previo necesario: React Contexts

¿Qué es un contexto en React?

En React, un contexto es una forma de compartir información entre componentes sin tener que pasar props manualmente a través de múltiples niveles. Es decir, cuando varios componentes necesitan acceder a los mismos datos (por ejemplo, un tema de color, el idioma de la aplicación o el estado de autenticación), en lugar de pasar esos datos de padre a hijo constantemente, podemos usar un contexto para que estén disponibles directamente donde se necesiten.

El contexto se crea con React.createContext() y luego se usa un Provider para “proveer” los datos, y los componentes hijos pueden acceder a esos datos con el hook useContext.

¿Cómo funciona?
- Crear un contexto con createContext.
- Proveer el valor desde un componente padre usando ```<Context.Provider>.```
- Consumir el valor en los hijos con useContext.

Esto evita el prop drilling (pasar props innecesariamente por muchos niveles).

Ejemplo básico
``` javascript
import React, { createContext, useContext, useState } from "react";

// 1. Crear el contexto
const ThemeContext = createContext();

// 2. Crear un proveedor
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
// 3. Usar el contexto en un componente hijo
function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Tema actual: {theme}
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  );
}
```

Una buena practica seria:

dentro de app/contexts -> tener en un archivo unico el contexto + el provider + un hook que permita usarlo (exportar directamente el **useContext(ThemeContext)**; como una funcion). Esto es, para luego en el componente que lo consume, importar directamente esta funcion.
Tambien es importante inicializar los contextos con valores iniciales, pero esto lo veremos en otra actividad.

#### Data Fetching

En cualquier aplicación web moderna necesitamos traer datos de algún lado: una API, un archivo externo o incluso una base de datos propia. A este proceso se lo llama Data Fetching. Next.js nos ofrece distintas formas de hacerlo, y elegir la adecuada depende de qué tipo de datos queremos mostrar y qué experiencia queremos para el usuario.

Los dos enfoques principales son:

**Client-side Data Fetching** (desde el navegador del usuario).

**Server-side Data Fetching** (desde el servidor antes de enviar la página).

Además, veremos cómo mostrar estados de carga, cómo funciona React Query (una librería muy usada), y cómo aprovechar nuevas capacidades del App Router como Suspense.

#### Client-side Data Fetching

Es cuando los datos se piden después de que la página ya se renderizó en el navegador. Esto significa que al entrar a la página, inicialmente puede aparecer vacía (o con un “Loading…”), y luego se rellenan los datos.

Ejemplo básico con useState y useEffect
```javascript
"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```
Basicamente es lo que se vino haciendo las actividades pasadas.


**Ventajas:**

- Permite mostrar datos dinámicos que cambian seguido.
- Ideal para dashboards o contenido personalizado.

**Desventajas:**

- La primera carga puede estar vacía.
- Peor SEO, porque los buscadores ven una página sin contenido inicial.

#### Un mejor enfoque: TanStack React Query

React Query (ahora TanStack Query) es una librería que simplifica muchísimo el manejo de datos en cliente.

Ofrece:

- Cache automático: guarda los resultados y evita pedir los mismos datos varias veces.
- Refetch automático: actualiza datos cada cierto tiempo o al reenfocar la pestaña.
- Control de estados: loading, error, success.
- Mutaciones (PATCH, POST, DELETE) con manejo de cache.
Configuración básica

Primero instalamos:

```npm install @tanstack/react-query```

Creamos un QueryClientProvider en nuestro layout.tsx:
```javascript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```
Hacer un GET con useQuery
```javascript
"use client";

import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
};

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

export default function UserList() {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"], // clave del cache
    queryFn: fetchUsers, // función que trae los datos
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar</p>;

  return (
    <ul>
      {data?.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```
Hacer un PATCH con useMutation
```javascript
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateUser(id: number, name: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export default function UpdateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateUser(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // refresca la lista
    },
  });

  return (
    <button
      onClick={() => mutation.mutate({ id: 1, name: "Nuevo Nombre" })}
    >
      Actualizar Usuario 1
    </button>
  );
}
```

Puntos clave de React Query:

**queryKey:** identifica cada request en la cache.

**queryFn**: la función que trae los datos.

**useMutation**: para crear, actualizar o eliminar datos.

**invalidateQueries**: refresca datos en cache después de una mutación.


Una buena practica cuando utilizamos este enfoque, es tener 2 carpetas dentro de app:
/services -> donde estan las funciones que llaman a la api (sea nuestra o externa)

/hooks -> donde estan los hooks en distintos archivos (agrupados segun nuestro criterio) que consumen los servicios

y luego importar esos hooks dentro de cada componente donde los necesitemos. Los errores los podemos manejar en distintos lugares de acuerdo a su naturaleza. Esto lo veremos mas adelante.

#### Server-side Data Fetching

Aquí los datos se cargan en el servidor antes de mandar el HTML al navegador.

En el App Router, los componentes son Server Components por defecto, lo que facilita mucho esto.

Ejemplo básico
```javascript

// app/products/page.tsx

type Product = {
  id: number;
  title: string;
};

export default async function ProductsPage() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}

```

En este caso, el navegador recibe ya la lista de productos renderizada en el HTML.

**Ventajas**:

- Mejor SEO.
- Experiencia inicial más rápida.
- Mayor seguridad (las API keys no viajan al cliente).

**Desventajas**:

- Los datos se cargan solo al render inicial.
- Si el usuario interactúa mucho, puede ser necesario combinar con client-side fetching.

Usando una route.ts (API Route en Next.js) podemos crear un endpoint interno para encapsular la lógica:

```javascript
// app/api/products/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return NextResponse.json(data);
}
```

Y consumirlo desde un componente de servidor:
```javascript
// app/products/page.tsx

export default async function ProductsPage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store", // evita cache si queremos datos frescos
  });
  const products = await res.json();

  return (
    <div>
      <h1>Productos</h1>
      {products.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  );
}
```
Esto es una buena practica para manejar los errores de forma personalizada, con codigos de error propios que luegos seran manejados en el frontend con mensajes o flujos especificos.


#### Loading states y Suspense

Cuando los datos tardan en llegar, es buena práctica mostrar un estado de carga.

En Client-side:

```javascript
if (!data) return <p>Cargando...</p>;
```


En Server-side con App Router, podemos usar loading.tsx:
```javascript
// app/products/loading.tsx
export default function Loading() {
  return <p>Cargando productos...</p>;
}
```
Next.js mostrará este archivo automáticamente mientras carga los datos.

### Ejercicio propuesto

Modificación de la actividad anterior para:

- Que la lista de Pokemons ahora sea un client side component que utilice la libreria TanStack Query para pedir los datos. Utilizar alguna libreria externa a eleccion para mostrar un skeleton mientras la pagina carga. Ademas, desarrollar un componente de páginacion para poder cambiar de pagina, simplemente un boton de "cargar mas" que amplie la cantidad de elementos por pagina (puede utilizar un state para esto, y pasarselo como argumento al hook de React Query).
- Que el detalle de un Pokemon, sea completamente renderizado del lado del servidor. Utilizar las herramientas que da Next.js para que la experiencia sea agradable para el usuario, como el archivo loading.
