# Frontend-DWE

Aplicación web frontend para la gestión de actividades. Construida con React, TypeScript y Vite.

## Requisitos Previos

- **Node.js 18+**
- **npm 9+** o **yarn 3.6+**
- **Backend API en ejecución** (`http://localhost:8080`)

## Instalación

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd Frontend-DWE
```

### 2. Configurar Variables de Entorno

Copiar el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Editar `.env` con tus valores:

```env
VITE_API_URL=http://localhost:8080
VITE_MODE=development
VITE_DEBUG_MODE=false
```

### 3. Instalar Dependencias

```bash
npm install
```

o con yarn:

```bash
yarn install
```

## Ejecución

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build Producción

```bash
npm run build
```

El archivo estará en la carpeta `dist/`

### Preview Build

```bash
npm run preview
```

## Estructura del Proyecto

```
Frontend-DWE/
├── src/
│   ├── api/                  # Llamadas a la API
│   │   ├── auth.ts          # Endpoints de autenticación
│   │   ├── http.ts          # Cliente HTTP configurado
│   │   ├── customers.ts     # Endpoints de clientes
│   │   ├── menu.ts          # Endpoints de menú
│   │   └── *.queries.ts     # React Query hooks
│   ├── components/           # Componentes reutilizables
│   │   └── SidebarMenu.tsx  # Menú lateral dinámico
│   ├── context/              # Context API
│   │   └── AuthContext.tsx  # Contexto de autenticación
│   ├── hooks/                # Hooks personalizados
│   │   ├── useCurrentMenu.ts
│   │   └── useDebouncedValue.ts
│   ├── layouts/              # Layouts
│   │   └── MainLayout.tsx   # Layout principal
│   ├── pages/                # Páginas de la aplicación
│   │   ├── LoginPage.tsx
│   │   ├── CustomersPage.tsx
│   │   ├── DepartamentPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── TestMenuOptionPage.tsx
│   ├── App.tsx               # Componente raíz
│   ├── main.tsx              # Punto de entrada
│   ├── index.css             # Estilos globales
│   └── App.css               # Estilos de App
├── public/                   # Archivos estáticos
├── .env                      # Variables de entorno (NO INCLUIR EN GIT)
├── .env.example              # Template de variables de entorno
├── vite.config.ts            # Configuración de Vite
├── tsconfig.json             # Configuración de TypeScript
├── tailwind.config.js        # Configuración de Tailwind CSS
├── eslint.config.js          # Configuración de ESLint
├── postcss.config.js         # Configuración de PostCSS
└── package.json              # Dependencias y scripts

```

## Configuración

### Archivo `.env`

Variables de entorno para la aplicación:

```env
# URL de la API backend
VITE_API_URL=http://localhost:8080

# Modo de la aplicación (development, production, staging)
VITE_MODE=development

# Modo de debugging
VITE_DEBUG_MODE=false

# Configuración de almacenamiento local
VITE_TOKEN_KEY=auth_token
VITE_USER_KEY=current_user
```

### Cliente HTTP

El cliente HTTP está configurado en `src/api/http.ts` y automáticamente:
- Añade el token JWT a todas las peticiones
- Maneja errores de autenticación
- Reintentos en caso de error

## Autenticación

### Flujo de Login

1. Usuario ingresa credenciales en LoginPage
2. Se envía petición a `/api/auth/login`
3. Backend retorna token JWT y datos del usuario
4. Token se almacena en localStorage
5. Contexto de autenticación se actualiza
6. Usuario es redirigido al dashboard

### Protección de Rutas

Las rutas protegidas requieren un token válido. Si el token expira:
- Se muestra mensaje de error
- Usuario es redirigido a LoginPage
- Token se limpia del almacenamiento local

### Menú Dinámico

El menú se carga automáticamente desde `/api/menu` basado en los roles del usuario autenticado.

## Scripting

### Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Lint con ESLint
npm run lint

# Lint y fix
npm run lint -- --fix
```

## Dependencias Principales

- **React 18+** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Utilidades de CSS
- **React Router** - Navegación
- **React Query** - State management de async data
- **Axios** - Cliente HTTP

## Desarrollo

### Crear un Nuevo Endpoint

1. Crear función en `src/api/`:

```typescript
// src/api/nuevo.ts
import { http } from './http';

export async function fetchNuevo() {
  const { data } = await http.get('/api/nuevo');
  return data;
}
```

2. Crear hook React Query:

```typescript
// src/api/nuevo.queries.ts
import { useQuery } from '@tanstack/react-query';
import { fetchNuevo } from './nuevo';

export function useNuevo() {
  return useQuery({
    queryKey: ['nuevo'],
    queryFn: fetchNuevo,
  });
}
```

3. Usar en componente:

```typescript
const { data, isLoading, error } = useNuevo();
```

### Mejores Prácticas

- Usar TypeScript para todos los archivos
- Componentes funcionales con hooks
- Separar lógica de presentación
- Usar React Context para estado global
- Mantener componentes pequeños y reutilizables
- Documentar funciones complejas

## Debugging

### Variables de Entorno de Debug

Editar `.env`:
```env
VITE_DEBUG_MODE=true
```

Luego en la consola del navegador tendrás logs detallados.

### DevTools React

Instalar [React DevTools](https://react-devtools-tutorial.vercel.app/) para inspeccionar componentes.

## Testing

Para agregar tests:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Crear archivo `src/App.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Welcome/)).toBeDefined();
  });
});
```

Ejecutar tests:
```bash
npm run test
```

## Producción

### Build Optimizado

```bash
npm run build
```

Genera archivos optimizados en `dist/`

### Desplegar

```bash
# En un servidor web
cp -r dist/* /ruta/servidor/

# O con Docker
docker build -t frontend-dwe:latest .
docker run -p 3000:80 frontend-dwe:latest
```

## Contribuir

1. Crear una rama: `git checkout -b feature/nombre`
2. Hacer cambios y commit: `git commit -am 'Agregar feature'`
3. Push: `git push origin feature/nombre`
4. Abrir un Pull Request

## Licencia

MIT License
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# Frontend-DWE
