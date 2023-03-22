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
INSERT INTO `empleado` (`
idEmpleado`,
`primerNombre
`, `segundoNombre`, `apellidoPaterno`, `apellidoMaterno`, `idGoogleAuth`, `googleEmail`) VALUES
(1, 'Saúl', 'Carmen', 'Armendáriz', NULL, 0xdba6a8c07b84449894cc524f047b42e1, 'saúl.armendáriz@gmail.com'),
(2, 'Micaela', 'Ivanna', 'Acosta', NULL, 0x26e98e8aee12416a842d05cba4ea2454, 'micaela.acosta@gmail.com'),
(3, 'Reina', NULL, 'Olivera', 'Montaño', 0x043128a38b7e4e488945afc64134796e, 'reina.olivera@gmail.com'),
(4, 'Agustín', 'Ximena Guadalupe', 'Moya', 'Colunga', 0xb070dfd57f3040668a75bbed0ad78aec, 'agustín.moya@gmail.com'),
(5, 'Alicia', NULL, 'Corrales', NULL, 0x2ae9aed35f5b488d8f2dd7cfb8aa7e1e, 'alicia.corrales@gmail.com'),
(6, 'Juan Manuel', 'Jerónimo', 'Riojas', NULL, 0x6d11115f1b3144adb5e2e12489209424, 'juan manuel.riojas@gmail.com'),
(7, 'Dolores', 'Ángel Daniel', 'Velázquez', 'Salcedo', 0x2e0806fafacc43d69b65ac68d432d01a, 'dolores.velázquez@gmail.com'),
(8, 'Berta', 'María de los Ángeles', 'Malave', 'Márquez', 0x50d56b9188544ebc8a96564aef938bcb, 'berta.malave@gmail.com'),
(9, 'Manuela', NULL, 'Serrato', 'Kyra', 0x288459f41939430abcc6a962d84f02db, 'manuela.serrato@gmail.com'),
(10, 'Francisco Javier', 'Yolanda', 'Menchaca', 'Aparicio', 0x314b8c27b6734f218a76895bf07c9baf, 'francisco javier.menchaca@gmail.com'),
(11, 'Manuel', 'Israel', 'Arevalo', NULL, 0x485b3fbdf10743c0b0054d21297322f2, 'manuel.arevalo@gmail.com'),
(12, 'José Emilio', 'Lourdes', 'Krasnova', 'Cordero', 0xeeb78b5378684fb4b80ca9f5b261b26e, 'josé emilio.krasnova@gmail.com'),
(13, 'Santiago', 'Manuela', 'Casillas', NULL, 0xd5e277fcb25f492285ce59ff7eb90ebf, 'santiago.casillas@gmail.com'),
(14, 'Jennifer', NULL, 'Montemayor', NULL, 0x2d183d2c0f66468aa41973b1cbfa6ae3, 'jennifer.montemayor@gmail.com'),
(15, 'Manuel', 'Ramona', 'Pagan', NULL, 0x761c94851e564335b2e9f922a9b1dc2f, 'manuel.pagan@gmail.com'),
(16, 'Alfredo', 'José Eduardo', 'Vigil', 'Acuña', 0xc0889a4516ec45c78a7ad5af8aeb5ec6, 'alfredo.vigil@gmail.com'),
(17, 'Germán', NULL, 'Villarreal', NULL, 0xa24e5ea89481468eb14ef78e4d65454d, 'germán.villarreal@gmail.com'),
(18, 'Ximena', 'Victor Manuel', 'Maldonado', 'Canales', 0x53b4c2f78f6a439f88182dd839293ec0, 'ximena.maldonado@gmail.com'),
(19, 'Yolanda', NULL, 'Abrego', 'Solorzano', 0xbe99d323a5e3409f8dc252583f8bf21b, 'yolanda.abrego@gmail.com'),
(20, 'Federico', 'Lorenzo', 'Beltrán', 'Covarrubias', 0x356a9ff0bea348649f8be2d39efde866, 'federico.beltrán@gmail.com'),
(21, 'Eduardo', NULL, 'Agosto', 'Palomo', 0x941d3eb568a24ad59e698b311f3cfb82, 'eduardo.agosto@gmail.com'),
(22, 'Patricio', 'Berta', 'Garica', 'Casares', 0x1fd0bb7829754a2d95e6c0c098bba4d0, 'patricio.garica@gmail.com'),
(23, 'Jorge Luis', 'Mariano', 'Gastélum', 'Espinal', 0xae5b6389f4764c0db44cacba808ec9a8, 'jorge luis.gastélum@gmail.com'),
(24, 'Pedro', 'Maricarmen', 'Contreras', 'Mota', 0x86bfd67b082a4983b55c29df50e42a36, 'pedro.contreras@gmail.com'),
(25, 'Marcos', 'Jose Daniel', 'Balderas', 'Mateo', 0xbeb8b06427404ad58ab1e85754103f91, 'marcos.balderas@gmail.com'),
(26, 'Juan Carlos', NULL, 'Santillán', NULL, 0x5fa51fcc5f5941de984cf1aebd2be6e8, 'juan carlos.santillán@gmail.com'),
(27, 'Germán', 'Esteban', 'Salinas', NULL, 0x855af815a12548e9afc46d5e76d47be7, 'germán.salinas@gmail.com'),
(28, 'Ana María', 'Florencia', 'Montalvo', 'Vázquez', 0xf5560c3193f1467f96d904991d5d8f9c, 'ana maría.montalvo@gmail.com'),
(29, 'David', NULL, 'Vaca', NULL, 0x0dd5d7250ac24d068d88d9ed7a500bee, 'david.vaca@gmail.com'),
(30, 'David', 'Mariano', 'Ramón', 'Baca', 0x5579274d8fc74d94ae660eb52bd28f38, 'david.ramón@gmail.com'),
(31, 'Ernesto', 'Rosalia', 'Cotto', 'Arteaga', 0x30225b9c306647e49a11b5aa39d6b90e, 'ernesto.cotto@gmail.com'),
(32, 'Nicolás', 'José Luis', 'Mesa', 'Trejo', 0x31bea5e51e7e4aef95e151c91bfa2d2d, 'nicolás.mesa@gmail.com'),
(33, 'Leonardo', NULL, 'Acevedo', NULL, 0x999ec79fe8d04d1592d556b351c18bb2, 'leonardo.acevedo@gmail.com'),
(34, 'Hugo', NULL, 'Batista', NULL, 0xcfad81e9330f406da0c73706549e44a2, 'hugo.batista@gmail.com'),
(35, 'Catalina', 'Juan Carlos', 'Quintana', 'Varela', 0xa117d3fdd64549c1b8631be87790e5d6, 'catalina.quintana@gmail.com'),
(36, 'Ricardo', NULL, 'Rincón', 'Luna', 0xe1f5799660614961a2a564819964332d, 'ricardo.rincón@gmail.com'),
(37, 'Virginia', NULL, 'Ledesma', 'Figueroa', 0xeab66bc042e547a3a58ef1dfe88c0eed, 'virginia.ledesma@gmail.com'),
(38, 'Alfonso', 'Manuela', 'Zepeda', 'Lucero', 0x38a14b57dd094675bc5cf886102f1ae1, 'alfonso.zepeda@gmail.com'),
(39, 'Saúl', 'Esperanza', 'Caraballo', NULL, 0xad05b7dae93245e2bd39314063738947, 'saúl.caraballo@gmail.com'),
(40, 'José Miguel', 'Guillermo', 'Rosas', NULL, 0x36739f88015d4742a8312cbbad241051, 'josé miguel.rosas@gmail.com'),
(41, 'Manuela', 'Bernardo', 'Bahena', NULL, 0x5c80014060684bec8dc4ee5164bfecc4, 'manuela.bahena@gmail.com'),
(42, 'Concepción', 'Lucia', 'Balderas', 'Delarosa', 0x7b12920f116a4bacbc64e98300757ce4, 'concepción.balderas@gmail.com'),
(43, 'Soledad', 'Liliana', 'Gurule', 'Preciado', 0x2c5ebacd36344d9c80b5da77ca262b1c, 'soledad.gurule@gmail.com'),
(44, 'Rosa María', NULL, 'Delgado', 'Ceballos', 0x1fd1ad4254b9453cac26030bef6bb1f0, 'rosa maría.delgado@gmail.com'),
(45, 'Leticia', NULL, 'Curiel', 'Vaca', 0x8ffa3d9284da4cb2ab4ad77313c3d4e4, 'leticia.curiel@gmail.com'),
(46, 'Federico', 'Ana Victoria', 'Rentería', 'Cardenas', 0x4fbd61df38454068a4801348906985dc, 'federico.rentería@gmail.com'),
(47, 'Ivanna', 'Erick', 'Mendoza', NULL, 0xe9bc8aed2c29466fb79d9aed112aea54, 'ivanna.mendoza@gmail.com'),
(48, 'Juan', NULL, 'Agosto', 'Murillo', 0xe2a4878d03aa46c19e7e3dc0d317db52, 'juan.agosto@gmail.com'),
(49, 'David', 'José Miguel', 'Karam', 'Atencio', 0x2aab4a236bdc4aad913d6c30a72c17c8, 'david.karam@gmail.com'),
(50, 'Fernando', 'Damián', 'Nevárez', NULL, 0xa0be3009aebf44ce857573d983b88968, 'fernando.nevárez@gmail.com');

-- Insertando datos en la tabla Rol
insert into Rol
    (nombreRol)
values
    ('Administrador'),
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
insert into Sprint
    (fechaCreacion, fechaFinalizacion, numeroSprint)
values
    ('2016/06/06', '2016/10/06', 1),
    ('2016/10/06', '2016/12/06', 2),
    ('2016/12/06', '2017/02/06', 3),
    ('2017/02/06', '2017/04/06', 4),
    ('2017/04/06', '2017/06/06', 5),
    ('2017/06/06', '2017/08/06', 6),
    ('2017/08/06', '2017/10/06', 7),
    ('2017/10/06', '2017/12/06', 8),
    ('2017/12/06', '2018/02/06', 9),
    ('2018/02/06', '2018/04/06', 10),
    ('2018/04/06', '2018/06/06', 11),
    ('2018/06/06', '2018/08/06', 12),
    ('2018/08/06', '2018/10/06', 13),
    ('2018/10/06', '2018/12/06', 14),
    ('2018/12/06', '2019/02/06', 15),
    ('2019/02/06', '2019/04/06', 16),
    ('2019/04/06', '2019/06/06', 17),
    ('2019/06/06', '2019/08/06', 18),
    ('2019/08/06', '2019/10/06', 19),
    ('2019/10/06', '2019/12/06', 20),
    ('2019/12/06', '2020/02/06', 21),
    ('2020/02/06', '2020/04/06', 22),
    ('2020/04/06', '2020/06/06', 23),
    ('2020/06/06', '2020/08/06', 24),
    ('2020/08/06', '2020/10/06', 25),
    ('2020/10/06', '2020/12/06', 26);

-- Insertando datos en la tabla de Issue
insert into Issue
    (nombreIssue, storyPoints, labelIssue, prioridadIssue, estadoIssue, fechaCreacion, fechaFinalizacion)
values
    ('Arreglar error en el sistema de pagos', 5,'Front', 'Alta', 'To-Do', '2023-03-11 14:30:00', '2023-03-13 10:45:00'),
    ('Agregar soporte para notificaciones push', 8, 'Back','Alta', 'To-Do', '2023-03-10 09:25:00', '2023-03-15 16:50:00'),
    ('Optimizar la velocidad de carga de la página de inicio', 5,'Front', 'Media', 'In Progress', '2023-03-11 12:30:00', '2023-03-14 18:15:00'),
    ('Corregir errores en el proceso de pago', 10,'TC1000', 'Alta', 'Done', '2023-03-08 16:00:00', '2023-03-11 20:35:00'),
    ('Agregar filtros de búsqueda avanzados', 6,'Back', 'Media-Baja', 'To-Do', '2023-03-09 10:45:00', '2023-03-16 12:20:00'),
    ('Solucionar problemas de compatibilidad con Internet Explorer', 4,'Back', 'Media', 'In Progress', '2023-03-12 08:30:00', '2023-03-17 14:45:00'),
    ('Agregar funcionalidad para compartir contenido en redes sociales', 3,'Back', 'Media-Baja', 'To-Do', '2023-03-10 14:15:00', '2023-03-13 09:30:00'),
    ('Mejorar el diseño y la usabilidad de la página de registro', 7,'Front', 'Media-Alta', 'In Progress', '2023-03-11 11:00:00', '2023-03-15 17:20:00'),
    ('Solucionar problemas de seguridad en la gestión de contraseñas', 9,'Front', 'Alta', 'Done', '2023-03-09 15:30:00', '2023-03-12 21:00:00'),
    ('Agregar soporte para múltiples idiomas', 6,'Front', 'Media', 'In Progress', '2023-03-13 09:00:00', '2023-03-19 14:30:00'),
    ('Optimizar el rendimiento de la aplicación en dispositivos móviles', 8,'Back', 'Media-Alta', 'To-Do', '2023-03-12 13:45:00', '2023-03-16 19:10:00'),
    ('Agregar funcionalidad de chat en vivo para atención al cliente', 7,'Back', 'Media-Alta', 'In Progress', '2023-03-08 10:00:00', '2023-03-13 15:40:00'),
    ('Solucionar problemas de rendimiento en la búsqueda de productos', 6,'Back', 'Media-Baja', 'Done', '2023-03-09 14:00:00', '2023-03-11 19:25:00'),
    ('Agregar soporte para pagos con tarjeta de crédito', 9,'Back', 'Alta', 'To-Do', '2023-03-14 11:30:00', '2023-03-18 17:50:00'),
    ('Optimizar el proceso de carga de imágenes en la galería', 4,'Front', 'Media-Baja', 'In Progress', '2023-03-11 08:15:00', '2023-03-16 13:30:00'),
    ('Agregar funcionalidad de sugerencias de productos relacionados', 5,'TC1030', 'Media', 'To-Do', '2023-03-10 16:00:00', '2023-03-13 21:15:00'),
    ('Solucionar problemas de rendimiento en la carga de la página de detalles del producto', 8,'Front', 'Media-Alta', 'In Progress', '2023-03-12 10:30:00', '2023-03-17 16:40:00'),
    ('Agregar soporte para compartir imágenes en redes sociales', 6,'Back', 'Media-Baja', 'Done', '2023-03-09 12:45:00', '2023-03-12 18:55:00'),
    ('Optimizar la búsqueda de productos por categoría', 7,'Back', 'Media-Alta', 'To-Do', '2023-03-13 14:00:00', '2023-03-18 19:30:00'),
    ('Solucionar problemas de compatibilidad con dispositivos Apple', 9,'Front', 'Alta', 'In Progress', '2023-03-11 09:00:00', '2023-03-16 14:20:00'),
    ('Agregar funcionalidad de seguimiento de envíos', 8,'Front', 'Media-Alta', 'Done', '2023-03-10 13:15:00', '2023-03-13 18:45:00'),
    ('Optimizar el rendimiento de la página de búsqueda avanzada', 6,'TC1040', 'Media-Baja', 'To-Do', '2023-03-08 11:30:00', '2023-03-14 15:50:00'),
    ('Agregar soporte para autenticación con Google', 7,'Back', 'Media-Alta', 'In Progress', '2023-03-13 09:45:00', '2023-03-19 14:10:00'),
    ('Solucionar problemas de seguridad en el proceso de recuperación de contraseña', 10,'Back', 'Alta', 'To-Do', '2023-03-11 14:00:00', '2023-03-14 19:20:00'),
    ('Agregar funcionalidad de sugerencias de búsqueda', 5,'Front', 'Media-Baja', 'In Progress', '2023-03-09 16:30:00', '2023-03-15 21:40:00'),
    ('Optimizar la velocidad de carga de la página de resultados de búsqueda', 8,'Back', 'Media-Alta', 'Done', '2023-03-12 12:00:00', '2023-03-16 17:15:00'),
    ('Agregar soporte para pagos con PayPal', 9,'TC1045', 'Alta', 'To-Do', '2023-03-10 10:15:00', '2023-03-14 15:30:00'),
    ('Solucionar problemas de compatibilidad con navegadores antiguos', 4,'Front', 'Media-Baja', 'In Progress', '2023-03-11 09:00:00', '2023-03-17 13:25:00'),
    ('Agregar funcionalidad de búsqueda por voz', 6,'Front', 'Media', 'Done', '2023-03-08 14:30:00', '2023-03-10 19:40:00');

-- Insertando datos en retroalimentacion


-- Insertando datos en reporte
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;
insert into Reporte default values;

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

-- Insertando datos en Accionables
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