
# Job Recommendations Chat - Frontend

Aplicación web interactiva basada en React, TypeScript y Tailwind CSS que ofrece una interfaz de chat en tiempo real adaptada para recomendaciones de empleos alimentada por Inteligencia Artificial.

## Herramientas y Tecnologías

- **Core:** React 19, TypeScript (~6.0.2), Vite (^8.2.0)
- **Estilos:** Tailwind CSS (^4.3.3) mediante el plugin oficial `@tailwindcss/vite`
- **Peticiones HTTP:** Axios (^1.19.0)
- **Visualización & UI:** Lucide React (Iconos), React Markdown, Remark GFM
- **Calidad de Código / Linter:** Oxlint (^1.75.0) para un análisis estático ultrarrápido

---

## Configuración del Entorno (.env)

Crea un archivo `.env` en la raíz del proyecto frontend con la siguiente variable para establecer la conexión con la API del backend:

```env
VITE_BACKEND_API_BASE_URL=http://localhost:3000/api
```

## Cómo correr el proyecto localmente

Asegúrate de contar con Node.js y pnpm instalados.

Instalar dependencias:

```env
pnpm install
```

Iniciar servidor de desarrollo:

```env
pnpm run dev
```

La aplicación se ejecutará por defecto en http://localhost:5173.

Compila el código TypeScript y genera la build optimizada con Vite.

```env
pnpm run build
```

Ejecuta las reglas de linter utilizando Oxlint.

```env
pnpm run lint
```

Previsualiza la versión de producción localmente.

```env
pnpm run preview
```

## Decisiones de Diseño

1. **Arquitectura de Componentes Jerárquica y Especializada**:
  Organización modular en `src/components/` dividida por dominio y responsabilidad (`chat/`, `layout/`, `modals/`, `sidebar/`, `ui/`). Esto separa claramente los elementos globales de estructura visual de los componentes atómicos de UI reusables (dropdowns, modales).

2. **Abstracción de Lógica con Custom Hooks (`use-chat.ts`)**:
  Encapsulamiento del manejo de estado del chat, historial de mensajes, estado de carga y comunicación remota dentro del custom hook `useChat` (`src/hooks/use-chat.ts`). Esto mantiene los componentes de interfaz (`App.tsx`, `ChatArea`) orientados puramente a la presentación.

3. **Capa del Cliente HTTP Centralizada (`src/services/API`)**:
  Abstracción de las peticiones mediante un cliente Axios modularizado en `src/services/API/`. Facilita la configuración centralizada de la `BASE_URL` obtenida de variables de entorno, manejo estandarizado de errores e interceptores globales.

4. **Layout Responsivo Adaptable a Pantallas Ultrawide**:
  Diseño responsivo utilizando Tailwind CSS v4. Se implementó un contenedor principal con restricción de ancho máximo (`max-w-[1600px]`) y centrado automático para garantizar una experiencia óptima tanto en dispositivos móviles como en monitores de alta resolución (2K, 4K y pantallas ultrapanorámicas).

5. **Formateo de Respuestas e Integración de Herramientas de Vanguardia**:
   - Integración de `react-markdown` y `remark-gfm` para la renderización enriquecida de tablas, bloques de código y viñetas provenientes de las respuestas del modelo.
   - Entorno optimizado mediante Vite para recarga en caliente (HMR) ultrarrápida y Oxlint para análisis estático de código sin impactar el rendimiento del proceso de compilación.

## Próximos Pasos

1. **Migración a Next.js**: Migrar el proyecto a Next.js para aprovechar Server Components, optimización nativa de rutas, SEO y Server Actions.

2. **Ampliar Modos de Chat y Procesamiento**: Implementar modos de chat adicionales (más allá de las recomendaciones de empleo) y soporte multimodal para procesar archivos de cv (PDF, Word, imágenes) directamente en el área del chat.

3. **Persistencia y CRUD Completo**: Reemplazar la persistencia parcial basada en localStorage por una solución completa con CRUD directo a la base de datos (historiales, perfiles de candidatos, favoritos).

4. **Funcionalidades de Organización Avanzada**: Agregar herramientas de búsqueda global de chats pasados, clasificación automática de conversaciones similares y agrupamiento de candidatos por grupos de trabajo.

5. **Completar Temas de Color y Responsividad**: Conectar globalmente el interruptor de cambio de tema (Dark/Light mode) y refinar aún más las adaptaciones para pantallas de resolución ultra-ancha.
