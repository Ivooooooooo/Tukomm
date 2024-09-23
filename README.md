# E-Commerce API

Este proyecto es una API para un sistema de e-commerce que permite gestionar productos y usuarios. Incluye características como validación de datos, gestión de errores, y valores predeterminados para diferentes atributos.

## Funcionalidades

- **Gestión de Productos**:
  - Crear, leer, actualizar y eliminar productos.
  - Validación de datos de productos.
  - Asignación de valores predeterminados para atributos que no se proporcionan.

- **Gestión de Usuarios**:
  - Validación de datos de usuarios.
  - Asignación de valores predeterminados para campos faltantes.

## Estructura del Código

### Validaciones

#### `isValidProduct.js`
La función `isValidProduct` valida la información de los productos. Verifica que se proporcionen ciertos campos y asigna valores predeterminados si faltan.
#### `isValidUser.js`
La función `isValidUser` valida la información de los usuarios. Verifica que se proporcionen ciertos campos y asigna valores predeterminados si faltan.

### Gestión de errores
#### `errorHandler.js`
Un manejador de errores para capturar y responder a los errores en la API.
#### `pathHandler.js`
Un manejador para las rutas no encontradas que responde con un mensaje apropiado.

## **Requisitos**:
  - Node.js.
  - Express.
