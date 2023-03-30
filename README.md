# Black Dot

## Descripción

Instituto Tecnológico de Estudios Superiores de Monterrey, Campus Querétaro

TC2005B.401 - Construcción de Software y Toma de Decisiones

## Profesores

Eduardo Daniel Juáres

Ricardo Cortés Espinosa

## Integrantes

| Nombre                            | Matrícula |
| --------------------------------- | --------- |
| Carlos Rodrigo Salguero Alcántara | A00833341 |
| Diego Ernesto Sandoval Vargas     | A01709113 |
| Iván Ricardo Paredes Avilez       | A01705083 |
| José Diego Llaca Castro           | A01704793 |
| Olimpia Helena García Huerta      | A01708462 |
| Yuna Chung .                      | A01709043 |

## Descripción del proyecto

### WebPage

a

### Data Base

La base de datos que se utiliza en este proyecto es una base de datos de MariaDB, la cual se encuentra alojada en un servidor de Amazon Web Services (AWS). La base de datos contiene las siguientes tablas:

#### Entidades

- **Empleado**: Contiene la información de los empleados de la empresa.
- **Rol**: Contiene la información de los roles de los empleados.
- **Privilegio**: Contiene la información de los privilegios de los empleados.
- **EquipoTrabajo**: Contiene la información de los equipos de trabajo de la empresa.
- **Epica**: Contiene la información de las epicas de los proyectos.
- **Sprint**: Contiene la información de los sprints de los proyectos.
- **Issue**: Contiene la información de los issues de los sprints.
- **Retroalimentacion**: Contiene la información de las retroalimentaciones de los sprints.
- **Reporte**: Contiene la información de los reportes de las métricas y retroalimentación.
- **Pregunta**: Contiene la información de las preguntas de las encuestas.
- **Cualitativa**: Contiene la información de las respuestas de las preguntas de tipo cualitativa.
- **Cuantitativa**: Contiene la información de las respuestas de las preguntas de tipo cuantitativa.
- **Accionable**: Contiene la información de las acciones de mejora de las retroalimentaciones.

#### Relaciones

- **EmpleadoRol**: Relación entre la tabla de Empleado y Rol.
- **RolPrivilegio**: Relación entre la tabla de Rol y Privilegio.
- **EmpleadoEquipoTrabajo**: Relación entre la tabla de Empleado y EquipoTrabajo.
- **EquipoTrabajoIssue**: Relación entre la tabla de EquipoTrabajo y Issue.
- **SprintIssue**: Relación entre la tabla de Sprint y Issue.
- **SprintEpica**: Relación entre la tabla de Sprint y Epica.
- **RetroalimentacionPregunta**: Relación entre la tabla de Retroalimentacion y Pregunta.
- **CualitativaAccionable**: Relación entre la tabla de Cualitativa y Accionable.
