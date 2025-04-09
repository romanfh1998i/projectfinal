# AudiVista E-commerce

AudiVista es una aplicación e-commerce desarrollada en React y Node.js, diseñada específicamente para personas con problemas auditivos. La plataforma ofrece una experiencia de compra accesible para audífonos y productos relacionados con la salud auditiva.

## Características

- **Catálogo de Productos**: Visualización de audífonos, implantes cocleares y accesorios
- **Filtrado por Categorías**: Facilita la búsqueda de productos específicos
- **Detalles de Producto**: Información detallada con especificaciones y características
- **Carrito de Compras**: Gestión de productos seleccionados
- **Proceso de Checkout**: Flujo completo de compra con validación de formularios
- **Diseño Responsivo**: Experiencia optimizada para dispositivos móviles y de escritorio
- **Accesibilidad**: Diseñado pensando en usuarios con discapacidad auditiva

## Tecnologías Utilizadas

### Frontend
- React
- TypeScript
- React Router
- Context API para gestión de estado
- CSS para estilos

### Backend
- Node.js
- Express
- RESTful API

## Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/app-auditiva-ecommerce.git
cd app-auditiva-ecommerce
```

2. Instalar dependencias del frontend:
```bash
cd frontend
npm install
```

3. Instalar dependencias del backend:
```bash
cd ../backend
npm install
```

## Ejecución

### Iniciar el Backend
```bash
cd backend
npm start
```
El servidor se ejecutará en http://localhost:5000

### Iniciar el Frontend
```bash
cd frontend
npm start
```
La aplicación se abrirá en http://localhost:3000

## Estructura del Proyecto

```
app-auditiva-ecommerce/
├── frontend/                # Aplicación React
│   ├── public/              # Archivos públicos
│   └── src/                 # Código fuente
│       ├── components/      # Componentes reutilizables
│       ├── context/         # Contextos para gestión de estado
│       ├── pages/           # Componentes de página
│       ├── App.tsx          # Componente principal
│       └── index.tsx        # Punto de entrada
│
└── backend/                 # Servidor Node.js
    └── src/
        ├── server.js        # Punto de entrada del servidor
        └── routes/          # Rutas de la API
```

## Uso

1. Navega por el catálogo de productos desde la página principal
2. Filtra productos por categoría (audífonos, implantes, accesorios)
3. Haz clic en un producto para ver sus detalles
4. Añade productos al carrito
5. Procede al checkout para completar la compra
6. Completa el formulario con tus datos personales y de envío
7. Selecciona el método de pago
8. Confirma tu pedido

## Características de Accesibilidad

- Contraste de colores optimizado para facilitar la lectura
- Textos claros y concisos
- Botones y elementos interactivos de tamaño adecuado
- Navegación intuitiva
- Representaciones visuales de información auditiva

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## Contacto

Para cualquier consulta o sugerencia, por favor contacta a través de:
- Email: info@audivista.com
- Web: www.audivista.com