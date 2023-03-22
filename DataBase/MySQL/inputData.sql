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

-- Insertando datos en Empleado
INSERT INTO empleado (primerNombre
, segundoNombre, apellidoPaterno, apellidoMaterno, idGoogleAuth, googleEmail) VALUES
('Saúl', 'Carmen', 'Armendáriz', NULL, 0xdba6a8c07b84449894cc524f047b42e1, 'saúl.armendáriz@gmail.com'),
('Micaela', 'Ivanna', 'Acosta', NULL, 0x26e98e8aee12416a842d05cba4ea2454, 'micaela.acosta@gmail.com'),
('Reina', NULL, 'Olivera', 'Montaño', 0x043128a38b7e4e488945afc64134796e, 'reina.olivera@gmail.com'),
('Agustín', 'Ximena Guadalupe', 'Moya', 'Colunga', 0xb070dfd57f3040668a75bbed0ad78aec, 'agustín.moya@gmail.com'),
('Alicia', NULL, 'Corrales', NULL, 0x2ae9aed35f5b488d8f2dd7cfb8aa7e1e, 'alicia.corrales@gmail.com'),
('Juan Manuel', 'Jerónimo', 'Riojas', NULL, 0x6d11115f1b3144adb5e2e12489209424, 'juan manuel.riojas@gmail.com'),
('Dolores', 'Ángel Daniel', 'Velázquez', 'Salcedo', 0x2e0806fafacc43d69b65ac68d432d01a, 'dolores.velázquez@gmail.com'),
('Berta', 'María de los Ángeles', 'Malave', 'Márquez', 0x50d56b9188544ebc8a96564aef938bcb, 'berta.malave@gmail.com'),
('Manuela', NULL, 'Serrato', 'Kyra', 0x288459f41939430abcc6a962d84f02db, 'manuela.serrato@gmail.com'),
('Francisco Javier', 'Yolanda', 'Menchaca', 'Aparicio', 0x314b8c27b6734f218a76895bf07c9baf, 'francisco javier.menchaca@gmail.com'),
('Manuel', 'Israel', 'Arevalo', NULL, 0x485b3fbdf10743c0b0054d21297322f2, 'manuel.arevalo@gmail.com'),
('José Emilio', 'Lourdes', 'Krasnova', 'Cordero', 0xeeb78b5378684fb4b80ca9f5b261b26e, 'josé emilio.krasnova@gmail.com'),
('Santiago', 'Manuela', 'Casillas', NULL, 0xd5e277fcb25f492285ce59ff7eb90ebf, 'santiago.casillas@gmail.com'),
('Jennifer', NULL, 'Montemayor', NULL, 0x2d183d2c0f66468aa41973b1cbfa6ae3, 'jennifer.montemayor@gmail.com'),
('Manuel', 'Ramona', 'Pagan', NULL, 0x761c94851e564335b2e9f922a9b1dc2f, 'manuel.pagan@gmail.com'),
('Alfredo', 'José Eduardo', 'Vigil', 'Acuña', 0xc0889a4516ec45c78a7ad5af8aeb5ec6, 'alfredo.vigil@gmail.com'),
('Germán', NULL, 'Villarreal', NULL, 0xa24e5ea89481468eb14ef78e4d65454d, 'germán.villarreal@gmail.com'),
('Ximena', 'Victor Manuel', 'Maldonado', 'Canales', 0x53b4c2f78f6a439f88182dd839293ec0, 'ximena.maldonado@gmail.com'),
('Yolanda', NULL, 'Abrego', 'Solorzano', 0xbe99d323a5e3409f8dc252583f8bf21b, 'yolanda.abrego@gmail.com'),
('Federico', 'Lorenzo', 'Beltrán', 'Covarrubias', 0x356a9ff0bea348649f8be2d39efde866, 'federico.beltrán@gmail.com'),
('Eduardo', NULL, 'Agosto', 'Palomo', 0x941d3eb568a24ad59e698b311f3cfb82, 'eduardo.agosto@gmail.com'),
('Patricio', 'Berta', 'Garica', 'Casares', 0x1fd0bb7829754a2d95e6c0c098bba4d0, 'patricio.garica@gmail.com'),
('Jorge Luis', 'Mariano', 'Gastélum', 'Espinal', 0xae5b6389f4764c0db44cacba808ec9a8, 'jorge luis.gastélum@gmail.com'),
('Pedro', 'Maricarmen', 'Contreras', 'Mota', 0x86bfd67b082a4983b55c29df50e42a36, 'pedro.contreras@gmail.com'),
('Marcos', 'Jose Daniel', 'Balderas', 'Mateo', 0xbeb8b06427404ad58ab1e85754103f91, 'marcos.balderas@gmail.com'),
('Juan Carlos', NULL, 'Santillán', NULL, 0x5fa51fcc5f5941de984cf1aebd2be6e8, 'juan carlos.santillán@gmail.com'),
('Germán', 'Esteban', 'Salinas', NULL, 0x855af815a12548e9afc46d5e76d47be7, 'germán.salinas@gmail.com'),
('Ana María', 'Florencia', 'Montalvo', 'Vázquez', 0xf5560c3193f1467f96d904991d5d8f9c, 'ana maría.montalvo@gmail.com'),
('David', NULL, 'Vaca', NULL, 0x0dd5d7250ac24d068d88d9ed7a500bee, 'david.vaca@gmail.com'),
('David', 'Mariano', 'Ramón', 'Baca', 0x5579274d8fc74d94ae660eb52bd28f38, 'david.ramón@gmail.com'),
('Ernesto', 'Rosalia', 'Cotto', 'Arteaga', 0x30225b9c306647e49a11b5aa39d6b90e, 'ernesto.cotto@gmail.com'),
('Nicolás', 'José Luis', 'Mesa', 'Trejo', 0x31bea5e51e7e4aef95e151c91bfa2d2d, 'nicolás.mesa@gmail.com'),
('Leonardo', NULL, 'Acevedo', NULL, 0x999ec79fe8d04d1592d556b351c18bb2, 'leonardo.acevedo@gmail.com'),
('Hugo', NULL, 'Batista', NULL, 0xcfad81e9330f406da0c73706549e44a2, 'hugo.batista@gmail.com'),
('Catalina', 'Juan Carlos', 'Quintana', 'Varela', 0xa117d3fdd64549c1b8631be87790e5d6, 'catalina.quintana@gmail.com'),
('Ricardo', NULL, 'Rincón', 'Luna', 0xe1f5799660614961a2a564819964332d, 'ricardo.rincón@gmail.com'),
('Virginia', NULL, 'Ledesma', 'Figueroa', 0xeab66bc042e547a3a58ef1dfe88c0eed, 'virginia.ledesma@gmail.com'),
('Alfonso', 'Manuela', 'Zepeda', 'Lucero', 0x38a14b57dd094675bc5cf886102f1ae1, 'alfonso.zepeda@gmail.com'),
('Saúl', 'Esperanza', 'Caraballo', NULL, 0xad05b7dae93245e2bd39314063738947, 'saúl.caraballo@gmail.com'),
('José Miguel', 'Guillermo', 'Rosas', NULL, 0x36739f88015d4742a8312cbbad241051, 'josé miguel.rosas@gmail.com'),
('Manuela', 'Bernardo', 'Bahena', NULL, 0x5c80014060684bec8dc4ee5164bfecc4, 'manuela.bahena@gmail.com'),
('Concepción', 'Lucia', 'Balderas', 'Delarosa', 0x7b12920f116a4bacbc64e98300757ce4, 'concepción.balderas@gmail.com'),
('Soledad', 'Liliana', 'Gurule', 'Preciado', 0x2c5ebacd36344d9c80b5da77ca262b1c, 'soledad.gurule@gmail.com'),
('Rosa María', NULL, 'Delgado', 'Ceballos', 0x1fd1ad4254b9453cac26030bef6bb1f0, 'rosa maría.delgado@gmail.com'),
('Leticia', NULL, 'Curiel', 'Vaca', 0x8ffa3d9284da4cb2ab4ad77313c3d4e4, 'leticia.curiel@gmail.com'),
('Federico', 'Ana Victoria', 'Rentería', 'Cardenas', 0x4fbd61df38454068a4801348906985dc, 'federico.rentería@gmail.com'),
('Ivanna', 'Erick', 'Mendoza', NULL, 0xe9bc8aed2c29466fb79d9aed112aea54, 'ivanna.mendoza@gmail.com'),
('Juan', NULL, 'Agosto', 'Murillo', 0xe2a4878d03aa46c19e7e3dc0d317db52, 'juan.agosto@gmail.com'),
('David', 'José Miguel', 'Karam', 'Atencio', 0x2aab4a236bdc4aad913d6c30a72c17c8, 'david.karam@gmail.com'),
('Fernando', 'Damián', 'Nevárez', NULL, 0xa0be3009aebf44ce857573d983b88968, 'fernando.nevárez@gmail.com');

-- Insertando datos en la tabla Rol
insert into Rol
    (nombreRol)
values
    ('Administrador'),
    ('Squad Member');
    ('Squad Member');

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

-- Insertando datos en la tabla de Epica
-- Insertando datos en la tabla de Epica
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

-- Insertando datos en la tabla de Sprint
-- Falta IdEpica Xampp da error. 
insert into Sprint
    (fechaCreacion, fechaFinalizacion, numeroSprint)
values
    ('2021-03-22', '2021-04-05', 2)
    ('2021-04-05', '2021-04-19', 3)
    ('2021-04-19', '2021-05-03', 4)
    ('2021-05-03', '2021-05-17', 5)
    ('2021-05-17', '2021-05-31', 6)
    ('2021-05-31', '2021-06-14', 7)
    ('2021-06-14', '2021-06-28', 8)
    ('2021-06-28', '2021-07-12', 9)
    ('2021-07-12', '2021-07-26', 10)
    ('2021-07-26', '2021-08-09', 11)
    ('2021-08-09', '2021-08-23', 12)
    ('2021-08-23', '2021-09-06', 13)
    ('2021-09-06', '2021-09-20', 14)
    ('2021-09-20', '2021-10-04', 15)
    ('2021-10-04', '2021-10-18', 16)
    ('2021-10-18', '2021-11-01', 17)
    ('2021-11-01', '2021-11-15', 18)
    ('2021-11-15', '2021-11-29', 19)
    ('2021-11-29', '2021-12-13', 20)
    ('2021-12-13', '2021-12-27', 21)
    ('2021-12-27', '2022-01-10', 22)
    ('2022-01-10', '2022-01-24', 23)
    ('2022-01-24', '2022-02-07', 24)
    ('2022-02-07', '2022-02-21', 25)
    ('2022-02-21', '2022-03-07', 26)

-- Insertando datos en la tabla de Issue
insert into Issue
    (nombreIssue, storyPoints, labelIssue, prioridadIssue, estadoIssue, fechaCreacion, fechaFinalizacion)
values
    ('Arreglar error en el sistema de pagos', 5,'Front', 'Alta', 'To-Do', '2021-04-01 09:00:00', '2021-04-03 17:00:00'),
    ('Agregar soporte para notificaciones push', 8, 'Back','Alta', 'To-Do', '2021-03-23 12:00:00', '2021-03-26 16:00:00'),
    ('Optimizar la velocidad de carga de la página de inicio', 5,'Front', 'Media', 'In Progress', '2021-03-30 14:00:00', '2021-04-02 18:00:00'),
    ('Implementar nuevas funciones en el panel de administración', 6, 'Back', 'Media', 'To-Do', '2021-04-05 10:00:00', '2021-04-08 16:00:00'),
    ('Actualizar la interfaz de usuario', 7, 'Front', 'Media', 'In Progress', '2021-04-02 13:00:00', '2021-04-06 18:00:00'),
    ('Corregir errores en el proceso de registro', 4, 'Back', 'Baja', 'To-Do', '2021-03-28 11:00:00', '2021-03-30 15:00:00'),
    ('Realizar pruebas de rendimiento en el servidor', 5, 'Back', 'Alta', 'To-Do', '2021-04-02 09:00:00', '2021-04-05 13:00:00'),
    ('Desarrollar una API para integración con otros sistemas', 8, 'Back', 'Alta', 'In Progress', '2021-03-25 10:00:00', '2021-03-31 ,16:00:00')
    ('Revisar la seguridad del sitio web', 6, 'Security', 'Alta', 'To-Do', '2021-03-27 09:00:00', '2021-03-30 12:00:00'),
    ('Diseñar una nueva plantilla para correos electrónicos', 3, 'Front', 'Baja', 'To-Do', '2021-03-23 14:00:00', '2021-03-25 18:00:00'),
    ('Crear un sistema de seguimiento de tareas', 5, 'Back', 'Media', 'In Progress', '2021-03-30 10:00:00', '2021-04-02 14:00:00'),
    ('Mejorar la integración con el servicio de pagos', 7, 'Back', 'Media', 'In Progress', '2021-04-04 12:00:00', '2021-04-07 16:00:00'),
    ('Rediseñar la página de perfil de usuario', 7, 'Front', 'Alta', 'To-Do', '2021-03-24 10:00:00', '2021-03-29 18:00:00'),
    ('Agregar función de búsqueda avanzada', 6, 'Back', 'Media', 'In Progress', '2021-03-27 12:00:00', '2021-04-01 16:00:00'),
    ('Mejorar la seguridad del sistema de autenticación', 9, 'Back', 'Alta', 'To-Do', '2021-03-22 08:00:00', '2021-03-25 14:00:00'),
    ('Implementar sistema de seguimiento de tareas', 4, 'Front', 'Baja', 'Done', '2021-03-29 13:00:00', '2021-03-30 17:00:00'),
    ('Revisar y actualizar la documentación de usuario', 3, 'Back', 'Baja', 'In Progress', '2021-03-28 10:00:00', '2021-03-31 16:00:00'),
    ('Crear sección de preguntas frecuentes en el sitio web', 2, 'Front', 'Media', 'To-Do', '2021-03-23 09:00:00', '2021-03-26 18:00:00'),
    ('Agregar opción de pago con tarjeta de crédito', 5, 'Back', 'Media', 'Done', '2021-03-26 14:00:00', '2021-03-27 18:00:00')

-- Insertando datos en retroalimentacion
insert into Retroalimentacion
    (fechaCreacion, fechaFinalizacion, idSprint, idReporte)
values
    ('2021-01-01', '2021-01-02', 1, 1),
    ('2021-02-14', '2021-02-15', 2, 2),
    ('2021-03-17', '2021-03-18', 3, 3),
    ('2021-04-02', '2021-04-03', 4, 4),
    ('2021-05-05', '2021-05-06', 5, 5),
    ('2021-06-20', '2021-06-21', 6, 6),
    ('2021-07-04', '2021-07-05', 7, 7),
    ('2021-08-30', '2021-08-31', 8, 8),
    ('2021-09-15', '2021-09-16', 9, 9),
    ('2021-10-09', '2021-10-10', 10, 10),
    ('2021-11-01', '2021-11-02', 11, 11),
    ('2021-11-22', '2021-11-23', 12, 12),
    ('2021-12-01', '2021-12-02', 13, 13),
    ('2021-12-12', '2021-12-13', 14, 14),
    ('2021-12-31', '2022-01-01', 15, 15),
    ('2022-01-20', '2022-01-21', 16, 16),
    ('2022-02-14', '2022-02-15', 17, 17),
    ('2022-03-17', '2022-03-18', 18, 18),
    ('2022-04-02', '2022-04-03', 19, 19),
    ('2022-05-05', '2022-05-06', 20, 20);

-- Insertando datos en reporte
insert into reporte
    (fechaCreacion)
values
    ('2021-04-05'),
    ('2021-04-19'),
    ('2021-05-03'),
    ('2021-05-17'),
    ('2021-05-31'),
    ('2021-06-14'),
    ('2021-06-28'),
    ('2021-07-12'),
    ('2021-07-26'),
    ('2021-08-09'),
    ('2021-08-23'),
    ('2021-09-06'),
    ('2021-09-20'),
    ('2021-10-04'),
    ('2021-10-18'),
    ('2021-11-01'),
    ('2021-11-15'),
    ('2021-11-29'),
    ('2021-12-13'),
    ('2021-12-27'),
    ('2022-01-10'),
    ('2022-01-10'),
    ('2022-02-07'),
    ('2022-02-21'),
    ('2022-03-07');

-- Insertando datos en pregunta
insert into Pregunta
    (contenido)
values
    ('¿Cómo te sientes?'),
    ('¿Sientes que tu salud mental está siendo alterada por nuestro ritmo de trabajo?'),
    ('¿Consideras que el ambiente de trabajo es el adecuado?'),
    ('¿Te sientes a gusto con tu desempeño este sprint?'),
    ('¿Consideras que la cantidad de issues asignadas en este sprint son las adecuadas?'),
    ('¿Hay algo que quieras compartir antes de empezar?'),
    ('¿Cómo puede ayudarte la empresa con tu desarrollo profesional?'),
    ('Hablemos de las metas no cumplidas del sprint. ¿Qué contribuyó a estos resultados?'),
    ('¿Cuál crees que es tu principal reto el próximo sprint?'),
    ('¿Qué podemos mejorar?');

-- Insertando datos en Cuantitativa
-- Insertando datos en Cualitativa
    ('¿Cómo te sientes?'),
    ('¿Sientes que tu salud mental está siendo alterada por nuestro ritmo de trabajo?'),
    ('¿Consideras que el ambiente de trabajo es el adecuado?'),
    ('¿Te sientes a gusto con tu desempeño este sprint?'),
    ('¿Consideras que la cantidad de issues asignadas en este sprint son las adecuadas?'),
    ('¿Hay algo que quieras compartir antes de empezar?'),
    ('¿Cómo puede ayudarte la empresa con tu desarrollo profesional?'),
    ('Hablemos de las metas no cumplidas del sprint. ¿Qué contribuyó a estos resultados?'),
    ('¿Cuál crees que es tu principal reto el próximo sprint?'),
    ('¿Qué podemos mejorar?');

-- Insertando datos en Cuantitativa
-- Insertando datos en Cualitativa

-- Insertando datos en Accionables
-- Insertando datos en Accionables
insert into Accionable
    (nombreAccionable, storyPoints, prioridadAccionable, estadoAccionable, estadoJira, fechaCreacion, fechaFinalizacion)
values
    ('Diseño de Logotipo', 2, 'Baja', 'No aprobado', 'To-Do', '2021-04-01', '2021-04-15'),
    ('Campaña Publicitaria', 5, 'Media', 'No aprobado', 'To-Do', '2021-05-08', '2021-05-22'),
    ('Desarrollo de App Web', 6, 'Media-Alta', 'Aprobado', 'In Progress', '2021-06-14', '2021-06-28'),
    ('Mantenimiento de Servidores', 4, 'Media-Baja', 'Aprobado', 'Done', '2021-07-01', '2021-07-15'),
    ('Actualización de Contenido', 3, 'Media-Baja', 'No aprobado', 'To-Do', '2021-08-11', '2021-08-25'),
    ('Integración de Redes Sociales', 2, 'Baja', 'Aprobado', 'In Progress', '2021-09-20', '2021-10-04'),
    ('Optimización SEO', 4, 'Media-Baja', 'No aprobado', 'To-Do', '2021-10-15', '2021-10-29'),
    ('Análisis de Datos', 7, 'Alta', 'Aprobado', 'Done', '2021-11-18', '2021-12-02'),
    ('Diseño de Nuevos Productos', 5, 'Media', 'No aprobado', 'To-Do', '2021-12-28', '2022-01-11'),
    ('Promociones Especiales', 4, 'Media-Baja', 'No aprobado', 'To-Do', '2022-01-23', '2022-02-06'),
    ('Nuevas Características', 3, 'Media-Baja', 'Aprobado', 'In Progress', '2022-02-28', '2022-03-14'),
    ('Mantenimiento de Base de Datos', 6, 'Media-Alta', 'Aprobado', 'Done', '2022-03-19', '2022-04-02'),
    ('Rediseño de Sitio Web', 5, 'Media', 'No aprobado', 'To-Do', '2022-04-10', '2022-04-24'),
    ('Nuevas Integraciones', 4, 'Media-Baja', 'No aprobado', 'To-Do', '2022-05-15', '2022-05-29'),
    ('Actualización de Seguridad', 6, 'Media-Alta', 'Aprobado', 'In Progress', '2022-06-19', '2022-07-03'),
    ('Campaña de Email Marketing', 3, 'Media-Baja', 'Aprobado', 'Done', '2022-07-18', '2022-08-01'),
    ('Desarrollo de App Móvil', 7, 'Alta', 'No aprobado', 'To-Do', '2022-08-22', '2022-09-05'),
    ('Diseño de Nuevos Servicios', 5, 'Media', 'No aprobado', 'To-Do', '2022-09-26', '2022-10-10'),
    ('Nuevos Canales de Venta', 4, 'Media-Baja', 'Aprobado', 'In Progress', '2022-10-31', '2022-11-14'),
    ('Diseño de Nuevos Paquetes', 3, 'Media-Baja', 'Aprobado', 'Done', '2022-11-19', '2022-12-03'),
    ('Desarrollo de App de Escritorio', 6, 'Media-Alta', 'No aprobado', 'To-Do', '2022-12-12', '2022-12-26');