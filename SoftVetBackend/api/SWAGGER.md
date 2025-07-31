# Documentación de la API con Swagger

## 📚 Descripción

SoftVet API incluye documentación completa generada con Swagger/OpenAPI 3.0. Esta documentación proporciona una interfaz interactiva para explorar y probar todos los endpoints de la API.

## 🚀 Acceso a la Documentación

### Interfaz Web Interactiva
```
http://localhost:3000/api-docs
```

### Especificación JSON
```
http://localhost:3000/api-docs.json
```

## 📋 Endpoints Documentados

### 🏠 Dueños (Owners)
- `GET /owners` - Obtener todos los dueños
- `GET /owners/{id}` - Obtener un dueño por ID
- `POST /owners` - Crear un nuevo dueño
- `POST /owners/bulk` - Crear múltiples dueños

### 👥 Empleados (Staff)
- `GET /staff` - Obtener todos los empleados
- `GET /staff/{id}` - Obtener un empleado por ID
- `POST /staff` - Crear un nuevo empleado
- `POST /staff/bulk` - Crear múltiples empleados

### 🐾 Mascotas (Pets)
- `GET /pets` - Obtener todas las mascotas
- `GET /pets/{id}` - Obtener una mascota por ID
- `POST /pets` - Crear una nueva mascota
- `POST /pets/bulk` - Crear múltiples mascotas

## 🔧 Esquemas de Datos

### Owner (Dueño)
```json
{
  "id": "uuid",
  "firstName": "string",
  "lastName": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "primaryPhone": "string (10-15 dígitos)",
  "secondaryPhone": "string (opcional)",
  "email": "string (formato email)",
  "additionalNotes": "string (opcional)",
  "status": "Active | Inactive",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Staff (Empleado)
```json
{
  "id": "uuid",
  "firstName": "string",
  "lastName": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "primaryPhone": "string (10-15 dígitos)",
  "secondaryPhone": "string (opcional)",
  "email": "string (formato email)",
  "additionalNotes": "string (opcional)",
  "status": "Active | Inactive | On Leave",
  "role": "Veterinarian | Technician | Receptionist | Admin",
  "licenseNumber": "string (opcional)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Pet (Mascota)
```json
{
  "id": "uuid",
  "name": "string",
  "ownerId": "uuid",
  "speciesId": "uuid",
  "breedId": "uuid",
  "originId": "uuid (opcional)",
  "environmentId": "uuid (opcional)",
  "activityLevelId": "uuid (opcional)",
  "birthDate": "date",
  "weight": "number",
  "color": "string",
  "microchipNumber": "string (opcional)",
  "additionalNotes": "string (opcional)",
  "status": "Active | Inactive | Deceased",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## 🧪 Probar la API

### 1. Usando Swagger UI
1. Abre `http://localhost:3000/api-docs`
2. Selecciona el endpoint que quieres probar
3. Haz clic en "Try it out"
4. Completa los parámetros requeridos
5. Haz clic en "Execute"

### 2. Ejemplos de Uso

#### Crear un Dueño
```bash
curl -X POST http://localhost:3000/owners \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Juan",
    "lastName": "Pérez",
    "primaryPhone": "1234567890",
    "email": "juan.perez@example.com",
    "address": "Calle Principal 123",
    "city": "Ciudad de México",
    "state": "CDMX",
    "postalCode": "12345",
    "status": "Active"
  }'
```

#### Crear un Empleado
```bash
curl -X POST http://localhost:3000/staff \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "María",
    "lastName": "García",
    "primaryPhone": "5551234567",
    "email": "maria.garcia@example.com",
    "role": "Veterinarian",
    "status": "Active"
  }'
```

#### Crear una Mascota
```bash
curl -X POST http://localhost:3000/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luna",
    "ownerId": "123e4567-e89b-12d3-a456-426614174000",
    "speciesId": "456e7890-e89b-12d3-a456-426614174001",
    "breedId": "789e0123-e89b-12d3-a456-426614174002",
    "birthDate": "2020-03-15",
    "weight": 4.5,
    "color": "Negro y blanco",
    "status": "Active"
  }'
```

## 🔍 Filtros Disponibles

### Dueños
- `firstName` - Filtrar por nombre
- `lastName` - Filtrar por apellido
- `email` - Filtrar por email
- `primaryPhone` - Filtrar por teléfono

### Empleados
- `firstName` - Filtrar por nombre
- `lastName` - Filtrar por apellido
- `email` - Filtrar por email
- `primaryPhone` - Filtrar por teléfono
- `role` - Filtrar por rol (Veterinarian, Technician, Receptionist, Admin)

### Mascotas
- `name` - Filtrar por nombre de mascota
- `ownerId` - Filtrar por ID del dueño
- `speciesId` - Filtrar por especie
- `breedId` - Filtrar por raza
- `status` - Filtrar por estado (Active, Inactive, Deceased)

## ⚠️ Validaciones

### Campos Obligatorios
- **Dueños**: firstName, lastName, primaryPhone, email
- **Empleados**: firstName, lastName, primaryPhone, email, role
- **Mascotas**: name, ownerId, speciesId, breedId

### Formatos de Validación
- **Email**: Debe ser un formato de email válido
- **Teléfono**: Solo dígitos, longitud 10-15 caracteres
- **UUID**: Para IDs de referencias (ownerId, speciesId, etc.)
- **Fecha**: Formato YYYY-MM-DD para fechas de nacimiento

## 🚨 Códigos de Respuesta

- `200` - Operación exitosa (GET)
- `201` - Recurso creado exitosamente (POST)
- `400` - Error de validación o datos inválidos
- `404` - Recurso no encontrado
- `500` - Error interno del servidor

## 📝 Notas Importantes

1. **Autenticación**: Actualmente la API no requiere autenticación
2. **CORS**: Configurado para permitir solicitudes desde cualquier origen
3. **Validación**: Todos los endpoints incluyen validación de datos
4. **Bulk Operations**: Los endpoints `/bulk` permiten crear múltiples registros en una sola operación
5. **Filtros**: Los filtros son insensibles a mayúsculas/minúsculas y usan búsqueda parcial

## 🔧 Configuración

### Variables de Entorno
```env
PORT=3000
NODE_ENV=development
```

### Servidores Configurados
- **Desarrollo**: `http://localhost:3000`
- **Producción**: `https://api.softvet.com`

## 📚 Recursos Adicionales

- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [Express.js Documentation](https://expressjs.com/) 