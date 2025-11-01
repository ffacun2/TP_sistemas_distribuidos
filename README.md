## Mini Práctica 8 – Formularios en Next.js

#### ¿Cómo funcionan los formularios en HTML?
Un formulario HTML es una estructura que permite al usuario ingresar datos y enviarlos a un servidor. En su forma más básica, un formulario tiene:

Campos de entrada (``<input>, <textarea>, <select>``) donde el usuario escribe o selecciona información.
Etiquetas (``<label>``) que describen cada campo.
Un botón de envío (``<button type="submit">``) que dispara el envío del formulario.
Una acción (atributo action) que indica a dónde enviar los datos.
Un método (atributo method) que indica cómo enviarlos (GET o POST).
``` html
Ejemplo básico en HTML:

<form action="/api/usuarios" method="POST">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" required />
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />
  
  <button type="submit">Enviar</button>
</form>
```

Cuando el usuario hace clic en "Enviar", el navegador:

- Recopila todos los valores de los campos.
- Los envía a la URL especificada en action.
- Recarga la página con la respuesta del servidor.

El problema: Este comportamiento tradicional recarga toda la página, lo cual no es ideal para aplicaciones modernas donde queremos mantener el estado y ofrecer una experiencia más fluida.

##### Formularios en React: El enfoque "Controlled Components"
En React, manejamos los formularios de manera diferente. En lugar de dejar que el navegador maneje el estado de los campos, nosotros controlamos ese estado usando useState.
``` javascript
"use client";

import { useState } from "react";

export default function FormularioBasico() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita la recarga de la página
    console.log({ nombre, email });
    // Aquí enviaríamos los datos a una API
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

Ventajas de este enfoque:

- Tenemos control total sobre los valores en todo momento.
- Podemos validar en tiempo real mientras el usuario escribe.
- No hay recarga de página.
- Podemos manipular los datos antes de enviarlos.

Desventajas:

- Mucho código repetitivo (useState, onChange para cada campo).
- Validaciones manuales que pueden volverse complejas.
- Difícil de mantener cuando hay muchos campos.

##### Librerías para facilitar el manejo de formularios
Para resolver los problemas del enfoque manual, existen varias librerías especializadas:

**1. Formik**
La librería más popular y madura para formularios en React. Simplifica el manejo de estado, validaciones y envío de datos.

Ventajas:

- API simple y clara.
- Excelente integración con librerías de validación como Yup.
- Maneja errores automáticamente.
- Reduce significativamente el código boilerplate.
- Muy bien documentada y con gran comunidad.


**2. React Hook Form**
Una alternativa moderna y performante que utiliza refs en lugar de re-renders.

Ventajas:

- Muy rápida (menos re-renders).
- API basada en hooks.
- Menos código que Formik.

Desventajas:

- Curva de aprendizaje un poco más pronunciada.
- Menos intuitiva para validaciones complejas.


**3. React Final Form**
Similar a Formik pero con un enfoque más modular.

Entre otros.


**¿Por qué elegir Formik + Yup?**

Para este curso, vamos a usar Formik + Yup por las siguientes razones:

1. Formik es intuitivo y fácil de aprender para principiantes.
2. Yup permite definir validaciones de forma declarativa y legible.
3. La integración entre ambas es perfecta y está muy bien documentada.
4. Es el estándar de la industria, lo encontrarán en muchos proyectos reales.
5. La sintaxis es muy similar al enfoque manual, facilitando la transición.

**Validaciones con Yup**
Yup es una librería de validación de esquemas que nos permite definir reglas de validación de forma clara y reutilizable.
Instalación

``npm install yup``

Ejemplo básico de esquema (en un archivo aparte, por ejemplo dentro de /validations/users.ts)
``` typescript
import * as Yup from "yup";

const usuarioSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre es obligatorio"),
  
  email: Yup.string()
    .email("Debe ser un email válido")
    .required("El email es obligatorio"),
  
  edad: Yup.number()
    .min(18, "Debes ser mayor de edad")
    .max(100, "Edad inválida")
    .required("La edad es obligatoria"),
  
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .required("La contraseña es obligatoria"),
  
  confirmarPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debes confirmar la contraseña"),
  
  terminos: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones")
    .required(),
});
```

Yup ofrece muchos tipos y validaciones:

- String: min(), max(), email(), url(), matches() (regex)
- Number: min(), max(), positive(), integer()
- Boolean: oneOf()
- Date: min(), max()
- Array: min(), max(), of() (tipo de elementos)
- Object: shape() (estructura del objeto)

También soporta validaciones personalizadas con .test().

**Formularios con Formik + Yup**

Instalación

``npm install formik yup``

Ejemplo completo: Formulario de registro
``` typescript

"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// 1. Definir el esquema de validación
const registroSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "Muy corto")
    .max(50, "Muy largo")
    .required("Requerido"),
  email: Yup.string()
    .email("Email inválido")
    .required("Requerido"),
  edad: Yup.number()
    .min(18, "Debes ser mayor de edad")
    .required("Requerido"),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .required("Requerido"),
});

// 2. Definir el tipo de los valores del formulario
interface FormValues {
  nombre: string;
  email: string;
  edad: number | "";
  password: string;
}

export default function FormularioRegistro() {
  // 3. Valores iniciales
  const initialValues: FormValues = {
    nombre: "",
    email: "",
    edad: "",
    password: "",
  };

  // 4. Función que se ejecuta al enviar
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      // Aquí enviaríamos los datos a nuestra API
    } catch (error) {
      alert("Error al registrar usuario");
    } finally {
      setSubmitting(false); // Desactiva el estado de "enviando"
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      
      <Formik
        initialValues={initialValues}
        validationSchema={registroSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
              />
              <ErrorMessage name="nombre" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="edad">Edad</label>
              <Field
                type="number"
                id="edad"
                name="edad"
                placeholder="18"
              />
              <ErrorMessage name="edad" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="********"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
```

**Componentes clave de Formik**

``<Formik>:`` El contenedor principal. Recibe initialValues, validationSchema y onSubmit.
``<Form>:`` Reemplaza al ``<form>`` nativo y maneja automáticamente el onSubmit.
``<Field>:`` Un campo de entrada que se conecta automáticamente al estado de Formik.
``<ErrorMessage>:`` Muestra el mensaje de error del campo especificado.

**Props útiles del render prop de Formik**

```
{({ 
  values,        // Valores actuales del formulario
  errors,        // Errores de validación
  touched,       // Campos que el usuario ha tocado
  isSubmitting,  // Si el formulario se está enviando
  isValid,       // Si el formulario es válido
  setFieldValue, // Función para cambiar un valor manualmente
  resetForm,     // Función para resetear el formulario
}) => (
  <Form>
    {/* ... */}
  </Form>
)}
```

**Formularios en Next.js: Client vs Server**
Hasta ahora, lo que vimos de Formik + Yup es aplicable para React, pero Next.js ofrece dos enfoques para manejar formularios, dependiendo de dónde queremos que se procese la lógica.

**1. Formularios del lado del cliente (Client-side)**
Este es el enfoque que hemos visto hasta ahora. El formulario se renderiza en el navegador y usa JavaScript para manejar el envío.

Cuándo usarlo:

- Cuando necesitas validaciones en tiempo real.
- Para formularios con lógica compleja del lado del cliente.
- Cuando el formulario es parte de una interfaz altamente interactiva.

Ejemplo básico:
``` javascript
"use client";

import { useState } from "react";

export default function FormularioCliente() {
  const [resultado, setResultado] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const response = await fetch("/api/contacto", {
      method: "POST",
      body: JSON.stringify({
        nombre: formData.get("nombre"),
        mensaje: formData.get("mensaje"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setResultado(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" required />
      <textarea name="mensaje" required />
      <button type="submit">Enviar</button>
      {resultado && <p>{resultado}</p>}
    </form>
  );
}
```

**2. Formularios del lado del servidor (Server-side) con Server Actions**
Next.js 14+ introduce Server Actions, que permiten ejecutar código del servidor directamente desde un formulario sin necesidad de crear una API Route.


Cuándo usarlo:

- Para formularios simples sin mucha interactividad.
- Cuando queremos mejor SEO (el formulario funciona sin JavaScript).
- Para reducir el JavaScript enviado al cliente.
- Cuando trabajamos principalmente con Server Components.

Ejemplo con Server Actions:
``` javascript

// app/actions/contacto.ts
"use server";

import { db } from "@/app/lib/database";

export async function enviarContacto(formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const email = formData.get("email") as string;
  const mensaje = formData.get("mensaje") as string;

  // Validaciones básicas
  if (!nombre || !email || !mensaje) {
    return { success: false, error: "Todos los campos son obligatorios" };
  }

  if (!email.includes("@")) {
    return { success: false, error: "Email inválido" };
  }

  try {
    // Guardar en la base de datos
    await db.create({
      nombre,
      email,
      mensaje,
      fecha: new Date().toISOString(),
    });

    return { success: true, message: "Mensaje enviado correctamente" };
  } catch (error) {
    return { success: false, error: "Error al enviar el mensaje" };
  }
}


// app/contacto/page.tsx
import { enviarContacto } from "@/app/actions/contacto";

export default function FormularioServidor() {
  return (
    <form action={enviarContacto}>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div>
        <label htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" required />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}
```

**Server Actions con useFormState (para mostrar errores)**
Para tener feedback visual en un Server Action, usamos el hook useFormState:
``` javascript
// app/actions/contacto.ts
"use server";

export async function enviarContacto(prevState: any, formData: FormData) {
  const nombre = formData.get("nombre") as string;
  const email = formData.get("email") as string;

  if (!nombre || nombre.length < 2) {
    return { success: false, error: "El nombre debe tener al menos 2 caracteres" };
  }

  if (!email.includes("@")) {
    return { success: false, error: "Email inválido" };
  }

  // Guardar...
  
  return { success: true, message: "¡Mensaje enviado!" };
}


// app/contacto/page.tsx
"use client";

import { useFormState } from "react-dom";
import { enviarContacto } from "@/app/actions/contacto";

export default function FormularioConEstado() {
  const [state, formAction] = useFormState(enviarContacto, null);

  return (
    <form action={formAction}>
      <input type="text" name="nombre" required />
      <input type="email" name="email" required />
      <button type="submit">Enviar</button>
      
      {state?.success && <p style={{ color: "green" }}>{state.message}</p>}
      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
}
```

**Validaciones en Server Actions con Zod**
Para validaciones más robustas en Server Actions, podemos usar Zod (similar a Yup pero optimizado para TypeScript):
``npm install zod``

``` typescript
// app/actions/contacto.ts
"use server";

import { z } from "zod";

const contactoSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres").max(50),
  email: z.string().email("Email inválido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export async function enviarContacto(prevState: any, formData: FormData) {
  // Parsear y validar
  const validacion = contactoSchema.safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    mensaje: formData.get("mensaje"),
  });

  if (!validacion.success) {
    return {
      success: false,
      errors: validacion.error.flatten().fieldErrors,
    };
  }

  // Si es válido, usar los datos
  const { nombre, email, mensaje } = validacion.data;

  // Guardar en DB...
  
  return { success: true, message: "Mensaje enviado" };
}
```

**Comparación: Client-side vs Server-side**
![alt text](/TP/public/image.png)


Recomendación:

- Usar Formik + Yup para formularios complejos con mucha interactividad.
- Usar Server Actions para formularios simples donde la progresividad es importante.

#### Ejercicio propuesto

Modificar el ejercicio de la actividad anterior, para ahora al momento de agregar a favoritos los Pokemons, poder ponerle un nombre y una descripcion al item favorito, a traves de un formulario que aparecera dentro de un modal (usar una libreria a eleccion para esto). Hacer validaciones razonables para cada campo, y mostrar errores en los campos si lo hubiera, que impidan el submit del formulario (puede utilizar las flags dirty y isValid).