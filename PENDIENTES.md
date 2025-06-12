# Endpoints para SoftVet

## 1. Dueños (Owners)
- **GET /owners** — Listar todos los dueños.
- **GET /owners/:id** — Obtener detalles de un dueño.
- **POST /owners** — Crear un nuevo dueño.
- **PUT /owners/:id** — Actualizar datos de un dueño.
- **DELETE /owners/:id** — Eliminar un dueño.

> Permite la gestión completa de los clientes del veterinario.

## 2. Mascotas (Pets)
- **GET /pets** — Listar todas las mascotas.
- **GET /pets/:id** — Detalles de una mascota.
- **POST /pets** — Registrar una nueva mascota.
- **PUT /pets/:id** — Actualizar datos de la mascota.
- **DELETE /pets/:id** — Eliminar una mascota.

> Esencial para el registro y seguimiento de los pacientes.

## 3. Visitas (Visits)
- **GET /visits** — Listar todas las visitas.
- **GET /visits/:id** — Detalles de una visita.
- **POST /visits** — Registrar una nueva visita.
- **PUT /visits/:id** — Actualizar información de la visita.
- **DELETE /visits/:id** — Eliminar una visita.

> Permite el seguimiento clínico de cada mascota.

## 4. Diagnósticos y Tratamientos
- **GET /visits/:id/diagnoses** — Diagnósticos de una visita.
- **POST /visits/:id/diagnoses** — Agregar diagnóstico a una visita.
- **GET /visits/:id/treatments** — Tratamientos de una visita.
- **POST /visits/:id/treatments** — Agregar tratamiento a una visita.

> Facilita la gestión de la información clínica detallada.

## 5. Vacunas y Desparasitaciones
- **GET /pets/:id/vaccines** — Vacunas administradas a una mascota.
- **POST /pets/:id/vaccines** — Registrar vacuna administrada.
- **GET /pets/:id/dewormers** — Desparasitaciones administradas.
- **POST /pets/:id/dewormers** — Registrar desparasitación.

> Importante para el control preventivo de la salud.

## 6. Citas (Appointments)
- **GET /appointments** — Listar todas las citas.
- **POST /appointments** — Crear una cita.
- **PUT /appointments/:id** — Actualizar cita.
- **DELETE /appointments/:id** — Eliminar cita.

> Permite la gestión de la agenda del consultorio.

## 7. Catálogos (Especies, Razas, Medicamentos, Procedimientos, etc.)
- **GET /species**
- **GET /breeds**
- **GET /medications**
- **GET /procedures**
- **GET /test-types**

> Para poblar formularios y mantener la integridad de los datos.