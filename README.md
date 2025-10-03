## Mini Practica 4 - Hooks

### Fundamentos de React en Next.js: Ciclo de vida, Hooks y Estado

En React, la unidad fundamental de construcción es el componente. Hasta ahora se explicó que un componente es una función que devuelve una porción de interfaz (escrita en JSX). Sin embargo, detrás de ese concepto hay más: los componentes siguen un ciclo de vida.

#### Ciclo de vida de un componente funcional

Cada vez que React necesita mostrar o actualizar la interfaz, ejecuta ciertas fases:


**1. Montaje (Mounting):**

Es el momento en que el componente aparece en pantalla por primera vez.

React ejecuta la función del componente y pinta el resultado en el navegador.

Aquí suele ser necesario inicializar datos o hacer llamadas a APIs.

**2. Actualización (Updating):**

Ocurre cada vez que cambian las props o el estado del componente.

React vuelve a ejecutar la función y compara el resultado nuevo con el anterior para decidir qué actualizar en el DOM.

**3. Desmontaje (Unmounting):**

Es el momento en que el componente desaparece de la pantalla (por ejemplo, si se navega a otra página).

Aquí se limpian recursos como timers, suscripciones o listeners de eventos.


En los componentes de clase existían métodos especiales (componentDidMount, componentDidUpdate, componentWillUnmount).
En los componentes de función modernos, estas fases se controlan con los hooks, principalmente useEffect.


#### ¿Qué son los hooks?

Los hooks son funciones especiales que permiten usar las capacidades internas de React (estado, ciclo de vida, contexto, etc.) dentro de componentes de función.

Todos los hooks empiezan con use.

Se deben llamar siempre en el nivel superior del componente (no dentro de condicionales o loops).

React ofrece hooks básicos como:

* **useState:** manejar valores dinámicos y re-renderizar cuando cambian.

* **useEffect:** manejar efectos secundarios (llamadas a APIs, timers, suscripciones, etc.).

* **useContext:** compartir datos globales sin necesidad de pasar props en cada nivel.

* **useRef:** guardar valores que persisten entre renders sin provocar re-render.

* **useReducer:** alternativa a useState cuando el estado es complejo.

Más adelante se pueden crear custom hooks, que combinan lógica reutilizable.


##### El hook useState

Se utiliza para manejar el estado interno de un componente. El estado es cualquier dato que cambia con el tiempo y que, al hacerlo, provoca que el componente se vuelva a renderizar.

``` javascript
import { useState } from "react";

export default function Contador() {
  // contador = valor actual
  // setContador = función que lo actualiza
  const [contador, setContador] = useState<number>(0);

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
```
Cada vez que se llama a setContador, React vuelve a ejecutar el componente y muestra el nuevo valor.

El estado es privado al componente; no puede ser modificado directamente desde fuera, solo mediante props o funciones.


##### El hook useEffect

Permite trabajar con efectos secundarios, es decir, con operaciones que afectan o dependen de algo externo al renderizado puro.

Su sintaxis es:

``` javascript
useEffect(() => {
  // Acción a ejecutar
  return () => {
    // Cleanup opcional
  };
}, [dependencias]);
```
El segundo parámetro, el array de dependencias, define cuándo se ejecuta el efecto:

**Array vacío []:** el efecto se ejecuta una sola vez, al montar el componente. Ideal para cargar datos iniciales desde una API.

**Dependencias [x, y]:** el efecto se ejecuta cada vez que cambien x o y. Útil cuando la acción depende de una variable de estado o de props.

Sin array: el efecto se ejecuta en cada renderizado. Esto rara vez es lo que se desea, ya que puede afectar el rendimiento.

**Ejemplo práctico:**
``` javascript
import { useEffect, useState } from "react";

export default function Reloj() {
  const [hora, setHora] = useState<string>("");

  // Solo al montar
  useEffect(() => {
    const ahora = new Date().toLocaleTimeString();
    setHora(ahora);
  }, []);

  return <p>Hora actual: {hora}</p>;
}
```

**Ejemplo con dependencia:**
``` javascript
import { useEffect, useState } from "react";

export default function DependenciaDemo() {
  const [contador, setContador] = useState<number>(0);

  useEffect(() => {
    console.log("El contador cambió:", contador);
  }, [contador]); // Se ejecuta cada vez que cambia contador

  return (
    <div>
      <p>{contador}</p>
      <button onClick={() => setContador(contador + 1)}>Sumar</button>
    </div>
  );
}
```

Renderizar listas y la importancia de key

Cuando se renderizan arrays en React con .map(), se debe asignar una propiedad key única a cada elemento.

La razón es que React utiliza un proceso llamado reconciliación para decidir qué partes del DOM deben actualizarse. Si los elementos no tienen una key clara, React no puede identificar cuál cambió, y terminará volviendo a renderizar toda la lista, lo que puede generar errores visuales y pérdida de rendimiento.

**Ejemplo incorrecto (sin key):**
``` javascript
<ul>
  {["A", "B", "C"].map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

**Ejemplo correcto (con key):**
``` javascript
<ul>
  {["A", "B", "C"].map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
```
Aunque se puede usar el index del array como key, lo más recomendable es usar un identificador único proveniente de los datos, como un id.


### Ejercicio propuesto

Construcción de un listado de Pokemons utilizando la API PokeAPI

Crear un componente PokemonList que, al montarse, realice una petición HTTP con axios para obtener los primeros 20 Pokemons (ver especificacion de la API en https://pokeapi.co). Estos Pokemons deben ser renderizados en la lista, en forma de componentes PokemonItem, y mostrar en cada uno sus propiedades utilizando un html básico. Ademas, cada item debe ser en si mismo un botón presionable, y también se debe mostrar en el componente la cantidad de veces que fue usado.

Puede utilizar el Network Inspector para verificar que no este esten haciendo llamadas infinitas a la API por algun error de codigo.
https://developer.chrome.com/docs/devtools/network?hl=es-419