# Tests para SoftVet Backend

Este directorio contiene los tests automatizados para el backend de SoftVet.

## Estructura de Tests

- `database.test.js` - Tests de configuración de base de datos
- `owners.test.js` - Tests completos para la creación y validación de dueños
- `setup.js` - Configuración global de Jest

## Configuración

### 1. Instalar dependencias de testing

```bash
npm install --save-dev jest supertest
```

### 2. Configurar base de datos de testing

Asegúrate de tener una base de datos de testing configurada. Puedes crear una base de datos separada para testing:

```sql
CREATE DATABASE softvet_test;
```

### 3. Configurar variables de entorno

Crea un archivo `.env.test` con las credenciales de la base de datos de testing:

```env
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=softvet_test
NODE_ENV=test
```

## Ejecutar Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch (desarrollo)
```bash
npm run test:watch
```

### Ejecutar tests con cobertura
```bash
npm run test:coverage
```

### Ejecutar un test específico
```bash
npm test -- --testNamePattern="debería crear un dueño válido"
```

## Cobertura de Tests

Los tests cubren:

### Validación de Datos
- ✅ Validación de datos correctos
- ✅ Rechazo de datos inválidos
- ✅ Manejo de datos undefined/null
- ✅ Validación de campos obligatorios
- ✅ Validación de formato de email
- ✅ Validación de formato de teléfono

### Creación en Base de Datos
- ✅ Creación exitosa de dueños válidos
- ✅ Rechazo de datos inválidos
- ✅ Prevención de emails duplicados
- ✅ Manejo de errores de validación

### API REST
- ✅ POST /owners - Crear dueño individual
- ✅ POST /owners/bulk - Crear múltiples dueños
- ✅ GET /owners - Obtener todos los dueños
- ✅ GET /owners/:id - Obtener dueño específico
- ✅ Validación de requests sin body
- ✅ Validación de arrays vacíos

### Base de Datos
- ✅ Conexión a base de datos
- ✅ Sincronización de modelos
- ✅ Operaciones CRUD básicas

## Casos de Prueba Incluidos

### Datos Válidos
```javascript
{
    firstName: 'Juan',
    lastName: 'Pérez',
    primaryPhone: '1234567890',
    email: 'juan.perez@example.com',
    address: 'Calle Principal 123',
    city: 'Ciudad de México',
    state: 'CDMX',
    postalCode: '12345',
    secondaryPhone: '0987654321',
    additionalNotes: 'Cliente frecuente',
    status: 'Active'
}
```

### Casos de Error Verificados
- ❌ Nombre vacío
- ❌ Teléfono inválido (muy corto)
- ❌ Email inválido
- ❌ Campos obligatorios faltantes
- ❌ Datos undefined/null
- ❌ Objetos vacíos
- ❌ Emails duplicados

## Notas Importantes

1. **Base de Datos de Testing**: Los tests usan una base de datos separada para no afectar datos de producción.

2. **Limpieza Automática**: Los tests limpian automáticamente los datos de prueba después de cada test.

3. **Timeout**: Los tests tienen un timeout de 30 segundos para operaciones de base de datos.

4. **Logs Silenciados**: Durante los tests, los logs de console están silenciados para mantener la salida limpia.

## Agregar Nuevos Tests

Para agregar nuevos tests:

1. Crea un archivo `*.test.js` en el directorio `tests/`
2. Importa los módulos necesarios
3. Usa `describe()` para agrupar tests relacionados
4. Usa `test()` o `it()` para casos de prueba individuales
5. Usa `beforeEach()` y `afterAll()` para setup y cleanup

### Ejemplo de Test
```javascript
describe('Mi nuevo test', () => {
    beforeEach(async () => {
        // Setup antes de cada test
    });

    test('debería hacer algo específico', async () => {
        // Lógica del test
        expect(result).toBe(expected);
    });

    afterAll(async () => {
        // Cleanup después de todos los tests
    });
});
``` 