# 🌤️ Weather App Pro

<div align="center">

![Weather App Pro](https://images.piclumen.com/normal/20250107/08/fc647b856aa7457b9a5c9c224c9de334.webp)

[![Made with React](https://img.shields.io/badge/Made_with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)


**Una aplicación meteorológica elegante y moderna con temas dinámicos según la estación**

[🚀 Demo](#) | [📖 Documentación](#features) | [🤝 Contribuir](#contributing)

</div>

---

## 🌟 Características Destacadas

### 🎨 Diseño Adaptativo
- **Temas Estacionales**: Cambian automáticamente según la estación del año
- **Diseño Responsive**: Adaptado a todos los dispositivos
- **Animaciones Fluidas**: Transiciones suaves y efectos visuales elegantes
- **Interfaz Minimalista**: Diseño limpio y moderno

### 🌡️ Funcionalidades Meteorológicas
- **Geolocalización**: Detección automática de ubicación
- **Búsqueda Global**: Encuentra cualquier ciudad con autocompletado
- **Pronóstico Detallado**: Información horaria precisa
- **Gráficos Interactivos**: Visualización de temperatura y precipitación

### 🎯 Personalización
- **Multi-idioma**: 
  - 🇪🇸 Español
  - 🇬🇧 English
  - 🇩🇪 Deutsch
- **Ubicaciones Favoritas**: Guarda y gestiona tus lugares preferidos
- **Preferencias Persistentes**: Configuración guardada localmente

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **Chart.js** - Gráficos
- **Lucide Icons** - Iconografía

### APIs
- **Open-Meteo** - Datos meteorológicos
- **Geocoding** - Búsqueda de ubicaciones

## 🚀 Inicio Rápido

### Prerrequisitos

```bash
node >= 16.0.0
npm >= 7.0.0
```

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Rexyto/weather-app.git
   cd weather-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir navegador**
   ```
   http://localhost:5173
   ```

## 📦 Scripts Disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Vista previa
npm run lint     # Linting
```

## 🎯 Guía de Uso

### 📱 Primera Ejecución

1. **Permitir Ubicación**
   - Acepta el permiso de geolocalización
   - La app mostrará el clima de tu ubicación actual

2. **Búsqueda de Ciudades**
   - Usa la barra superior
   - Selecciona de los resultados

3. **Gestión de Favoritos**
   - ⭐ Marca ubicaciones
   - 🗑️ Elimina guardados

### ⚙️ Configuración

1. **Cambio de Idioma**
   - Abre ajustes (⚙️)
   - Selecciona idioma

2. **Tema Estacional**
   - Cambia automáticamente
   - Basado en hemisferio

## 🔧 Solución de Problemas

### Errores Comunes

1. **"Ubicación no encontrada"**
   - Verifica conexión
   - Intenta búsqueda manual

2. **"Error de permisos"**
   - Revisa configuración del navegador
   - Permite acceso a ubicación

3. **"Datos no actualizados"**
   - Recarga la aplicación
   - Verifica conexión

### Optimización

1. **Rendimiento**
   - Usa navegador moderno
   - Limpia caché si necesario

2. **Datos**
   - Actualización cada 30 min
   - Cache local 1 hora

## 🤝 Contribuir

### Proceso

1. Fork del proyecto
2. Crea rama (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add: feature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Pull Request

### Guías

- Sigue estilo existente
- Documenta cambios
- Añade tests
- Actualiza README si necesario

## 📝 Documentación API

### Endpoints

```typescript
GET /weather
  params: {
    lat: number,
    lon: number
  }
  response: WeatherData

GET /locations
  params: {
    query: string
  }
  response: Location[]
```

### Tipos

```typescript
interface WeatherData {
  temperature: number
  humidity: number
  wind: {
    speed: number
    direction: string
  }
  forecast: Forecast[]
}
```

## 🔒 Seguridad

- ✅ HTTPS obligatorio
- 🔒 Datos locales encriptados
- 🔑 API key rotación automática

## 📈 Rendimiento

- ⚡ Tiempo carga < 2s
- 📱 PWA ready
- 🗃️ Cache optimizado

## 🌐 Compatibilidad

### Navegadores

- Chrome ≥ 60
- Firefox ≥ 60
- Safari ≥ 12
- Edge ≥ 79

### Dispositivos

- 📱 iOS ≥ 12
- 🤖 Android ≥ 7
- 💻 Desktop todos

---

<div align="center">

### ⭐ ¡No olvides dar una estrella si te gusta el proyecto! ⭐

[![GitHub stars](https://img.shields.io/github/stars/Rexyto/weather-app?style=social)](https://github.com/Rexyto/weather-app)

**Made with ❤️ by [Rexyto](https://github.com/Rexyto)**

</div>
