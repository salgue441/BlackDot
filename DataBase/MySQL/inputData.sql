-- file: inputData.sql
-- brief: File used for inputting data into the database
-- author: Carlos Salguero
-- author: Yuna Chung
-- author: Olimpia Garcia
-- author: Diego Llaca
-- author: Diego Sandoval
-- author: Ivan Paredes
-- version: 1.0
-- date: 2023-03-11
-- copyrigth: Copyright (c) 2023 - MIT License

-- Insertando datos en la tabla Rol
insert into Rol
    (nombreRol)
values
    ('Administrador'),
    ('Squad Member');

-- Insertando datos en la tabla de Issue
insert into Issue
    (nombreIssue, storyPoints, prioridadIssue, estadoIssue, fechaCreacion, fechaFinalizacion)
values
    ('Arreglar error en el sistema de pagos', 5, 'Alta', 'To-Do', '2023-03-11 14:30:00', '2023-03-13 10:45:00'),
    ('Agregar soporte para notificaciones push', 8, 'Alta', 'To-Do', '2023-03-10 09:25:00', '2023-03-15 16:50:00'),
    ('Optimizar la velocidad de carga de la página de inicio', 5, 'Media', 'In Progress', '2023-03-11 12:30:00', '2023-03-14 18:15:00'),
    ('Corregir errores en el proceso de pago', 10, 'Alta', 'Done', '2023-03-08 16:00:00', '2023-03-11 20:35:00'),
    ('Agregar filtros de búsqueda avanzados', 6, 'Media-Baja', 'To-Do', '2023-03-09 10:45:00', '2023-03-16 12:20:00'),
    ('Solucionar problemas de compatibilidad con Internet Explorer', 4, 'Media', 'In Progress', '2023-03-12 08:30:00', '2023-03-17 14:45:00'),
    ('Agregar funcionalidad para compartir contenido en redes sociales', 3, 'Media-Baja', 'To-Do', '2023-03-10 14:15:00', '2023-03-13 09:30:00'),
    ('Mejorar el diseño y la usabilidad de la página de registro', 7, 'Media-Alta', 'In Progress', '2023-03-11 11:00:00', '2023-03-15 17:20:00'),
    ('Solucionar problemas de seguridad en la gestión de contraseñas', 9, 'Alta', 'Done', '2023-03-09 15:30:00', '2023-03-12 21:00:00'),
    ('Agregar soporte para múltiples idiomas', 6, 'Media', 'In Progress', '2023-03-13 09:00:00', '2023-03-19 14:30:00'),
    ('Optimizar el rendimiento de la aplicación en dispositivos móviles', 8, 'Media-Alta', 'To-Do', '2023-03-12 13:45:00', '2023-03-16 19:10:00'),
    ('Agregar funcionalidad de chat en vivo para atención al cliente', 7, 'Media-Alta', 'In Progress', '2023-03-08 10:00:00', '2023-03-13 15:40:00'),
    ('Solucionar problemas de rendimiento en la búsqueda de productos', 6, 'Media-Baja', 'Done', '2023-03-09 14:00:00', '2023-03-11 19:25:00'),
    ('Agregar soporte para pagos con tarjeta de crédito', 9, 'Alta', 'To-Do', '2023-03-14 11:30:00', '2023-03-18 17:50:00'),
    ('Optimizar el proceso de carga de imágenes en la galería', 4, 'Media-Baja', 'In Progress', '2023-03-11 08:15:00', '2023-03-16 13:30:00'),
    ('Agregar funcionalidad de sugerencias de productos relacionados', 5, 'Media', 'To-Do', '2023-03-10 16:00:00', '2023-03-13 21:15:00'),
    ('Solucionar problemas de rendimiento en la carga de la página de detalles del producto', 8, 'Media-Alta', 'In Progress', '2023-03-12 10:30:00', '2023-03-17 16:40:00'),
    ('Agregar soporte para compartir imágenes en redes sociales', 6, 'Media-Baja', 'Done', '2023-03-09 12:45:00', '2023-03-12 18:55:00'),
    ('Optimizar la búsqueda de productos por categoría', 7, 'Media-Alta', 'To-Do', '2023-03-13 14:00:00', '2023-03-18 19:30:00'),
    ('Solucionar problemas de compatibilidad con dispositivos Apple', 9, 'Alta', 'In Progress', '2023-03-11 09:00:00', '2023-03-16 14:20:00'),
    ('Agregar funcionalidad de seguimiento de envíos', 8, 'Media-Alta', 'Done', '2023-03-10 13:15:00', '2023-03-13 18:45:00'),
    ('Optimizar el rendimiento de la página de búsqueda avanzada', 6, 'Media-Baja', 'To-Do', '2023-03-08 11:30:00', '2023-03-14 15:50:00'),
    ('Agregar soporte para autenticación con Google', 7, 'Media-Alta', 'In Progress', '2023-03-13 09:45:00', '2023-03-19 14:10:00'),
    ('Solucionar problemas de seguridad en el proceso de recuperación de contraseña', 10, 'Alta', 'To-Do', '2023-03-11 14:00:00', '2023-03-14 19:20:00'),
    ('Agregar funcionalidad de sugerencias de búsqueda', 5, 'Media-Baja', 'In Progress', '2023-03-09 16:30:00', '2023-03-15 21:40:00'),
    ('Optimizar la velocidad de carga de la página de resultados de búsqueda', 8, 'Media-Alta', 'Done', '2023-03-12 12:00:00', '2023-03-16 17:15:00'),
    ('Agregar soporte para pagos con PayPal', 9, 'Alta', 'To-Do', '2023-03-10 10:15:00', '2023-03-14 15:30:00'),
    ('Solucionar problemas de compatibilidad con navegadores antiguos', 4, 'Media-Baja', 'In Progress', '2023-03-11 09:00:00', '2023-03-17 13:25:00'),
    ('Agregar funcionalidad de búsqueda por voz', 6, 'Media', 'Done', '2023-03-08 14:30:00', '2023-03-10 19:40:00');


-- Insertando datos en la tabla de Privilegios
insert into Privilegio
    (nombrePrivilegio, descripcionPrivilegio)
values
    ('GetTeamDashboard', 'Gets the data corresponding to the team data'),
    ('getAdminDashboard', 'Gets the data corresponding to the admin data'),
    ('addRole', 'Allows the admin to add roles to the employees'),
    ('removeRole', 'Allows the admin to remove the roles to the employees'),
    ('addEmployee', 'Allows the admin to add employees to the company'),
    ('removeEmployee', 'Allows the admin to remove employees from the company'),
    ('addSquad', 'Allows the admin to add squads to the company'),
    ('removeSquad', 'Allows the admin to remove squads from the company'),
    ('addProject', 'Allows the admin to add projects to the company'),
    ('removeProject', 'Allows the admin to remove projects from the company'),
    ('addTask', 'Allows the admin to add tasks to the company'),
    ('removeTask', 'Allows the admin to remove tasks from the company'),
    ('addSprint', 'Allows the admin to add sprints to the company'),
    ('removeSprint', 'Allows the admin to remove sprints from the company'),
    ('addUserStory', 'Allows the admin to add user stories to the company'),
    ('removeUserStory', 'Allows the admin to remove user stories from the company'),
    ('addTaskToSprint', 'Allows the admin to add tasks to the sprints'),
    ('removeTaskFromSprint', 'Allows the admin to remove tasks from the sprints'),
    ('addUserStoryToSprint', 'Allows the admin to add user stories to the sprints'),
    ('removeUserStoryFromSprint', 'Allows the admin to remove user stories from the sprints'),
    ('addTaskToUserStory', 'Allows the admin to add tasks to the user stories'),
    ('removeTaskFromUserStory', 'Allows the admin to remove tasks from the user stories'),
    ('addUserStoryToProject', 'Allows the admin to add user stories to the projects'),
    ('removeUserStoryFromProject', 'Allows the admin to remove user stories from the projects'),
    ('addSprintToProject', 'Allows the admin to add sprints to the projects'),
    ('removeSprintFromProject', 'Allows the admin to remove sprints from the projects'),
    ('addSquadToProject', 'Allows the admin to add squads to the projects'),
    ('removeSquadFromProject', 'Allows the admin to remove squads from the projects'),
    ('addEmployeeToSquad', 'Allows the admin to add employees to the squads'),
    ('removeEmployeeFromSquad', 'Allows the admin to remove employees from the squads'),
    ('addEmployeeToProject', 'Allows the admin to add employees to the projects'),
    ('removeEmployeeFrmProject', 'Allows the admin to remove employees from the projects');

insert into Epica
    (nombreEpica)
values
    ('Rovin en Mappa'),
    ('Nutrition Paraphernalia'),
    ('First Aid Kit'),
    ('Bedding Device'),
    ('Makeup Thingamajig'),
    ('Biking Supplies'),
    ('Engine Rig'),
    ('Hair Care Apparatus'),
    ('Storage Apparatus'),
    ('First Aid Equipment'),
    ('Game Paraphernalia'),
    ('Swimming Gizmo'),
    ('Baby Thingamajig'),
    ('Bedding Apparatus'),
    ('Camera Apparatus'),
    ('Car Apparatus'),
    ('Vitamin Rig'),
    ('Tire Kit'),
    ('Fitness Kit'),
    ('Movie Implement');

insert into Reporte
    (fechaCreacion)
values
    ('2023/03/01'),
    ('2022/01/20'),
    ('2021/02/28'),
    ('2012/12/20'),
    ('2016/05/25'),
    ('2017/03/25'),
    ('2012/03/25'),
    ('2020/04/26'),
    ('2015/01/27'),
    ('2011/08/04'),
    ('2019/07/24'),
    ('2014/01/14'),
    ('2013/02/14'),
    ('2016/02/25'),
    ('2014/02/11'),
    ('2011/05/23'),
    ('2012/01/13'),
    ('2017/12/08'),
    ('2013/05/24'),
    ('2019/01/14'),
    ('2021/07/26'),
    ('2019/02/14');

-- Accionable
insert into Accionable
    (nombreAccionable, storyPoints, prioridadAccionable, estadoAccionable, estadoJira, fechaCreacion, fechaFinalizacion)
values
    ('Martes de Tacos', 2, 'Baja', 'No aprobado', 'To-Do', '2023-02-03', '2023-02-25'),
    ('Mantenimiento Página Web', 5, 'Alta', 'Aprobado', 'In Progress', '2023-02-20', '2023-02-23'),
    ('Mantenimiento Base de Datos', 4, 'Media-Alta', 'Aprobado', 'Done', '2023-01-21', '2023-02-22'),
    ('Actualización Productos', 3, 'Media', 'No aprobado', 'To-Do', '2023-03-10', '2023-03-05'),
    ('Venta Fin de Año', 7, 'Alta', 'Aprobado', 'Done', '2022-12-15', '2022-12-31'),
    ('Buen Fin', 7, 'Alta', 'Aprobado', 'Done', '2022-11-18', '2022-11-21'),
    ('Mantenimiento Servidores', 4, 'Media-Baja', 'Aprobado', 'In Progress', '2023-03-05', '2023-03-07'),
    ('Agregar Easter Eggs', 2, 'Alta', 'No aprobado', 'To-Do', '2023-03-03', '2023-03-11'),
    ('Productos Luuna', 6, 'Media-Alta', 'Aprobado', 'In Progress', '2023-03-06', '2023-03-12'),
    ('Productos Nooz', 4, 'Media-Baja', 'Aprobado', 'Done', '2023-01-02', '2023-01-07'),
    ('Aplicación Móvil', 5, 'Media', 'No aprobado', 'To-Do', '2023-03-01', '2023-03-08'),
    ('Actualización de Cuentas', 3, 'Media-Baja', 'Aprobado', 'In Progress', '2023-03-10', '2023-03-11'),
    ('Migración de Datos', 7, 'Media', 'Aprobado', 'Done', '2023-02-27', '2023-03-01'),
    ('Promociones Especiales', 4, 'Media-Baja', 'No aprobado', 'To-Do', '2023-01-17', '2023-01-19'),
    ('Cambio Paleta de Colores', 1, 'Baja', 'Aprobado', 'Done', '2023-02-01', '2023-02-04'),
    ('Compatibilidad Android', 3, 'Alta', 'No aprobado', 'To-Do', '2023-01-14', '2023-01-22'),
    ('Realidad Aumentada', 1, 'Baja', 'Aprobado', 'In progress', '2023-02-09', '2023-02-11'),
    ('Datos de Envío', 3, 'Alta', 'Aprobado', 'To-Do', '2023-01-11', '2023-01-13'),
    ('Traducción a Portugués', 2, 'Media-Baja', 'No aprobado', 'To-Do', '2023-03-01', '2023-03-12'),
    ('Nuevos anuncios', 5, 'Media', 'Aprobado', 'In progress', '2023-03-05', '2023-03-08')