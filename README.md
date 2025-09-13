Mini Practica 3 - Introducción a Next.js
Requisitos de finalización
Introducción a Next.js con TypeScript

Next.js es un framework de desarrollo web basado en React. Su propósito es facilitar la creación de aplicaciones modernas, rápidas y escalables.
Mientras que React es una librería para construir interfaces de usuario, Next.js añade funcionalidades adicionales: enrutamiento, renderizado en servidor, manejo de APIs y optimización automática.

Next.js se considera fullstack porque permite manejar tanto el frontend (lo que el usuario ve) como el backend (lógica del servidor y APIs) dentro de un mismo proyecto.

Frontend: interfaz gráfica, HTML, CSS, interacción del usuario.

Backend: lógica de negocio, conexión a bases de datos, APIs.

Un framework fullstack (como Next.js) permite desarrollar ambas partes sin necesidad de separar los proyectos.

De acuerdo a lo anterior, es importante hacer la distincion:

React: librería para crear interfaces exclusivamente del lado del cliente.

Next.js: framework que amplía React con funcionalidades de servidor.

Node.js: entorno que permite ejecutar JavaScript fuera del navegador. Next.js se ejecuta sobre Node.js en el servidor para generar HTML antes de enviarlo al navegador.


Instalación de Next.js
El camino más simple es usar el generador oficial con TypeScript, utilizando la terminal desde el IDE:

npx create-next-app@latest mi-proyecto


Durante el asistente:

Responder Yes a la opción de TypeScript.

Elegir Yes a ESLint para mantener un estilo de código consistente (esto se va a profundizar mas adelante)

Habilitar Tailwind CSS para estilos.

Utilizar la carpeta src queda a criterio de cada uno. Es indistinto.

Utilizar "App router". Que se explicará en la proxima actividad.

Utilizar Turbopack y dejar el alias de importacion por default
Una vez finalizado, se genera un proyecto con:

Carpeta app/

Archivos de configuración (tsconfig.json, next.config.js).

Dependencias instaladas (react, react-dom, next).

Para iniciar el servidor de desarrollo, es decir, para poder iniciar el servidor y poder visualizar lo que estamos desarrollando:

npm run dev

El proyecto queda disponible en http://localhost:3000 (por default)

Al entrar a esa URL en el navegador, veremos una pagina generada. El código de esa pagina se encuentra en /app/page.tsx en el componente llamado "Home".

¿Qué es un componente en React?

Un componente es la unidad básica de construcción de interfaces.

Es una función de JavaScript o TypeScript que retorna JSX.

JSX es una sintaxis que combina HTML y JavaScript.

Los componentes son reutilizables y permiten dividir la interfaz en partes más pequeñas.


Props en React

Las props (abreviación de “properties”) son los parámetros que recibe un componente.
Permiten que un mismo componente se comporte de manera distinta dependiendo de la información que se le pase.
En el caso del componente "Home", no tiene props.

Ejemplo en TypeScript:

type Props = {
  nombre: string;
};

export default function Saludo({ nombre }: Props) {
  return <h1>Hola, {nombre}</h1>;
}

Uso del componente con props:

import Saludo from "@/components/Saludo";

export default function Home() {
  return (
    <main>
      <Saludo nombre="Estudiante" />
      <Saludo nombre="Profesor" />
    </main>
  );
}

Cada vez que se usa <Saludo />, se pasa un valor distinto a la prop nombre.

Introducción a Typescript

TypeScript es un superconjunto de JavaScript que agrega tipos al lenguaje.
Esto significa que se puede escribir JavaScript normalmente, pero con la posibilidad de especificar el tipo de cada variable o parámetro.

Ejemplos prácticos:

// Variables con tipo
const edad: number = 25;
let nombre: string = "Ana";
let activo: boolean = true;

// Arreglo
const numeros: number[] = [1, 2, 3];

// Objeto con tipo
type Usuario = {
  id: number;
  nombre: string;
};

const user: Usuario = { id: 1, nombre: "Pedro" };

// Función con tipos
function sumar(a: number, b: number): number {
  return a + b;
}

En el caso de los componentes, TypeScript permite definir los tipos de props, como vimos en el ejemplo de Saludo.


Exportación de componentes en Next.js

En el componente "Home" de la plantilla de Next, vimos que el componente esta exportado de la forma:

export default

Qué significa esto?

Hay varias formas de exportar en Javascript.

1. Exportación por defecto

Permite exportar un único valor o componente como contenido principal de un archivo.

export default function Saludo() {
  return <h1>Hola desde export default</h1>;
}

Uso:

import Saludo from "@/components/Saludo";

Solo puede haber una exportación por defecto por archivo.
Al importar, el nombre puede cambiar.
2. Exportación con nombre

Permite exportar varios valores o componentes desde un mismo archivo.

// src/components/Botones.tsx
export function BotonPrimario() {
  return <button>Primario</button>;
}

export function BotonSecundario() {
  return <button>Secundario</button>;
}

Uso:

import { BotonPrimario, BotonSecundario } from "@/components/Botones";

Pueden existir múltiples exportaciones por archivo.

El nombre debe coincidir exactamente al importar.


Ahora, sabiendo todo lo anterior:

¿Cómo se traduce un componente en Next.js al navegador?

Escritura del componente
El desarrollador crea un componente en TypeScript que retorna JSX.

Compilación y transpilación
Next.js transforma JSX y TypeScript en JavaScript estándar mediante SWC.

Renderizado en servidor o cliente

En SSR (Server-Side Rendering): Next.js ejecuta el componente en Node.js, genera HTML y lo envía al navegador.

En CSR (Client-Side Rendering): el navegador recibe un bundle de JavaScript y React monta el componente allí mismo.

Hidratación
El navegador recibe el HTML inicial y lo conecta con el JavaScript de React, volviéndolo interactivo.

Resultado final
El usuario ve HTML en el navegador, pero React controla la interfaz para actualizarla dinámicamente.


Diferencia de usar Next.js vs HTML, CSS y JS plano

Con HTML, CSS y JS se crean interfaces de manera separada y estática.

Con React/Next.js se definen componentes que integran HTML (estructura), CSS (estilos) y JS (lógica) en una unidad reutilizable.

Esto permite crear interfaces modulares, dinámicas y más fáciles de mantener.


Ejercicio propuesto

La idea ahora es, en una nueva rama llamada "actividad3": inicializar un proyecto de Next.js. Luego, crear un archivo dentro de la carpeta "app", llamado "page.tsx" y dentro de eso exportar un componente (por default), con el contenido que el alumno quiera. Tienen una lista de etiquetas en el siguiente link
https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements
Idealmente utilizar varios componentes.