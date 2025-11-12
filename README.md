# TP Sistemas Distribuidos
## Descripción general del proyecto

Este proyecto es una aplicación web desarrollada como parte de los Trabajos Prácticos de la materia Sistemas Distribuidos. Implementada con Next.js y TypeScript, la app sirve como una "Wiki Pokédex", permitiendo explorar, consultar, marcar y gestionar información de Pokémon utilizando la PokéAPI.

Está organizada en módulos y páginas para facilitar la usabilidad y el aprendizaje de conceptos distribuidos y de desarrollo web moderno.

---
## Tecnologías utilizadas
- **Next.js** 
- **React** 
- **TypeScript**
- **Tailwind CSS**
- **JavaScript** 
---
## Características principales (Features)

- **Página de bienvenida (Home):** Presenta la app y guía al usuario dentro de la plataforma.
- **Pokédex interactiva:** Muestra una lista paginada de Pokémon, obtenidos directamente desde la PokéAPI, permitiendo consultar información relevante como tipo, habilidades, stats, imagen oficial, etc.
- **Detalle de Pokémon:** Visualiza información completa de cada Pokémon, accediendo a su perfil mediante rutas dinámicas.
- **Gestión de Favoritos:** Permite al usuario marcar y guardar como favoritos sus Pokémon preferidos, mostrando un listado dedicado.
- **Explorador de Evoluciones:** Accede a las cadenas evolutivas de los Pokémon, permitiendo navegar entre diferentes familias de criaturas.
- **Navegación rápida y moderna:** Barra de navegación para acceder fácilmente a las secciones principales: Inicio, Pokédex, Evoluciones, Favoritos.
- **Interfaz responsiva y visual:** Uso de componentes visuales optimizados, imágenes de alta calidad, scroll hacia arriba, avisos y feedback interactivo.
- **Persistencia de datos local:** Guarda algunos datos localmente para la gestión de favoritos.
- **Integración con la PokéAPI:** Todo el contenido relevante (Pokédex y evoluciones) es obtenido en tiempo real desde la API pública.
- **Carga y feedback visual:** Indicadores de carga, feedback visual y notificaciones para mejorar la experiencia de usuario.
---

## Estructura de carpetas principal
```
/
├── public/          # Archivos estáticos (imágenes, fuentes, etc.)
├── src/          
│   ├── app/             # Rutas y componentes de página
│   ├── components/      # Componentes reutilizables de React
│   ├── hooks/           # Hooks personalizados de React
│   ├── lib/             # Funciones de utilidad y librerías
│   ├── services/        # Módulos para interactuar con APIs/servicios externos
│   ├── types/           # Definiciones de tipos de TypeScript
│   └── validations/     # Esquemas de validación con Zod
├── package.json     # Declaración de dependencias y scripts
└── tsconfig.json    # Configuración de TypeScript
```
---
## Instrucciones para clonar y desplegar el proyecto

1. **Clonar el repositorio**
    ```bash
    git clone https://github.com/ffacun2/TP_sistemas_distribuidos.git
    cd TP_sistemas_distribuidos
    ```
2. **Instalar dependencias**
    ```bash
    npm install
    ```
3. **Ejecutar el proyecto en modo desarrollo**
    ```bash
    npm run dev
    ```
    Luego accede a [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Construir para producción**
    ```bash
    npm run build
    npm start
    ```

---

## Conceptos fundamentales utilizados
1. **Routing basado en el sistema de archivos**
   - Las rutas se definen automáticamente a partir de la estructura y archivos en `/src/app/`. Cada archivo o subcarpeta representa una ruta accesible desde la web.

2. **Server Components y Client Components**
   - Se utiliza `"use client"` en componentes que requieren interacción con el navegador, estados o hooks. Otros componentes y páginas funcionan como Server Components por defecto.

3. **Server-Side Rendering (SSR)**
   - Las páginas utilizan funciones asíncronas para obtener datos en el servidor antes de renderizar (`page.tsx` en `/pokemones/`, `/evolutions/`, etc.), aprovechando la capacidad SSR de Next.

4. **Routing Dinámico**
   - Implementación de rutas con parámetros dinámicos como `/pokemones/[id]/page.tsx`, permitiendo renderizar páginas según ID u otros parámetros en la URL.

5. **API Routes**
   - Endpoints de backend en `/src/app/api/` aprovechando la nueva convención de Next.js para definir funciones de servidor y lógica backend directamente en el proyecto.

7. **Layouts y metadatos**
   - Uso de `src/app/layout.tsx` para definir el layout común de la app (header, footer, estructura visual) y metadatos de cada página.

8. **Optimización de imágenes**
   - Uso del componente `next/image` para optimizar imágenes internas y externas (sprites, fondos, etc.).

9. **Fuentes y estilos globales**
   - Integración de fuentes personalizadas con `next/font/google` y estilos gestionados a través de archivos CSS globales y modulares.

10. **Hooks de Next y React**
    - Uso de hooks como `usePathname`, `useRouter` (Next), y los clásicos de React (`useState`, `useEffect`). Integración de react-query para la gestión de datos.

11. **Client Side Rendering (CSR)**
    - Componentes interactivos (listados, paginación, carruseles, botones, navegación, etc.) que usan lógica y estado del lado del cliente.

12. **Navegación e interactividad**
    - Navegación cliente usando `next/link` y hooks de navegación, junto con componentes interactivos de UI.

13. **Separación de componentes y lógica**
    - Organización clara de componentes reutilizables en `/components/` y separación entre lógica de datos y presentación.

---