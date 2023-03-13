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


-- Insertando datos en la tabla Empleado
insert into `empleado`(`primerNombre`,`segundoNombre`, `apellidoPaterno`, `apellidoMaterno`, `idGoogleAuth`, `googleEmail`) 
values
('Aarón', null, 'Salgado', null, 0x18ba911467af441189771d9d3c16122c, 'Alfredo_Bonilla@gmail.com'),
( 'Alfredo', null, 'Borrego', 'Escamilla', 0xd89eef1ed75641d289a91b4795ab333e, 'Antonia.Kadarrodriguez@gmail.com'),
( 'Luis Fernando', null, 'Castellanos', 'Sauceda', 0x9edd9e19e77d4a48b04d20f1dc56d6ba, 'Manuel_Centeno@gmail.com'),
( 'Ivanna', 'Yaretzi', 'Toledo', 'Armendáriz', 0x030889d7d0254aa3bf53cad33d33d1aa, 'AnaSofa_Zaragoza88@gmail.com'),
( 'Mariano', 'Rosalia', 'Balderas', 'Maldonado', 0x5a38c51b68c1419599269e31a89af5fd, 'Valentina.Archuleta@gmail.com'),
( 'Elvira', 'Leonor', 'Amador', null, 0xe9ccc8020bd043fc824ed3d84e1c0f85, 'Norma_Feliciano6@gmail.com'),
( 'Carmen', null, 'Tapia', 'Negrete', 0x7a801d37c2224b0b95f46c2e1ce30e7e, 'Emily64@gmail.com'),
( 'Enrique', null, 'Solano', 'Bernal', 0xc6c8a2413a324ad6915a1dbee360c876, 'Miranda_Patio@gmail.com'),
( 'Francisca', 'Matías', 'Navarrete', 'Zayas', 0x0d192efe35f7414696070d3d2b66477e, 'Alfonso_Flores@gmail.com'),
('Mayte', 'Ricardo', 'Roldán', 'Madrid', 0x6a54a4f0039847e29d065699823fe8bf, 'Paola.Mares1@gmail.com'),
('Reina', 'Natalia', 'Sedillo', 'Zarate', 0xdeb11a446bda455b93f8179e970186e1, 'Teodoro.Vera24@gmail.com'),
('Jesús', null, 'Atencio', 'Noriega', 0xb8227a7ed82841fd9e58b5f31513c9ab, 'Ximena.Corona@gmail.com'),
('María Fernanda', 'Miranda', 'Páez', 'Kortajarena', 0x10b0d5c69aad4d1f94a44f902bf7bf69, 'Alexa_Yunta@gmail.com'),
('Carlos', 'Juan Carlos', 'Barela', 'Tirado', 0xb3f51648412b45688802c9f0b5bcd26d, 'Mauricio_Bermdez@gmail.com'),
('Miguel', 'Valeria', 'Aragón', null, 0x824892166c484b2ebeef8719e39de620, 'JuanManuel11@gmail.com'),
('Dolores', 'Francisca', 'Beltrán', 'Cadena', 0xd22a0e5cbb314fa3b49de973df9ecd2d, 'Esteban_Prado52@gmail.com'),
('Reina', 'Marco Antonio', 'Cepeda', null, 0x2adb470a715c4dc19def439cc1aa554b, 'Miguel_Colunga39@gmail.com'),
('Laura', 'Adela', 'Cazares', null, 0xed16c1814e77463e94d936a7fc6bb0bf, 'Nicols83@gmail.com'),
('Mauricio', 'María Soledad', 'Valencia', 'Rocha', 0x1930a94c956044b7af91e92c4b765b6a, 'Vctor.Garrido@gmail.com'),
('Carla', 'Horacio', 'Padrón', 'Frías', 0xe56c578124ae418882bd99b6b32e579f, 'JosMara_Aparicio83@gmail.com'),
('Ricardo', 'Cristobal', 'Tamez', null, 0x845c82e84b86468591a61aeba0b5a4a0, 'Matas_Amaya6@gmail.com'),
('Alexis', null, 'Menchaca', null, 0xaf3455ad01904c248c9a626d547bdda3, 'JosMiguel.Karem@gmail.com'),
('Isabela', 'Abraham', 'Zelaya', 'Garrido', 0x4d9b04558be64a64ba81e09e30b62637, 'Rosario13@gmail.com'),
('Gloria', 'Agustín', 'Palomino', null, 0x3636089413864d1995e22ac620449da1, 'Rubn.Ulloa85@gmail.com'),
('Andrés', null, 'Ochoa', null, 0xbd762e4ff005456285a5028019fa2c9c, 'Esteban23@gmail.com'),
('Miguel Ángel', 'Rafael', 'Delacrúz', 'Espinoza', 0x20d7e572a2c849e5ae9e6bf96ab1c465, 'Micaela.Casrez@gmail.com'),
('Luis Ángel', 'Claudio', 'Arguello', null, 0x0 'Guillermina', 'Camila', 'Aranda', 'Alfaro', 0xf383f4ed42724d998e3a23f52f24bb66, 'Xochitl49@gmail.com'),
('José Luis', 'Carlota', 'Caballero', null, 0x9a54b6d13fa84442bdf91779c2a5a687, 'Gael.Padilla27@gmail.com'),
('Jerónimo', null, 'Téllez', 'Tovar', 0x4d4d5d542296490da7ac7e74fb1cab46, 'Ivanna.Almanza@gmail.com'),
('Guillermina', 'Maricarmen', 'Ramos', null, 0xa1acf4e939d648ba80f82ba2fd19f879, 'Elvira_Aguirre@gmail.com'),
('Elsa', 'Rosario', 'Olivas', 'Quiroz', 0x469488cc7faa40088506c8db56946368, 'Guillermo.Kyra@gmail.com'),
('Ángela', 'Óscar', 'Villegas', 'Villarreal', 0x570e09e5529e48a687f27c3d196397b4, 'Cristobal.Arriaga37@gmail.com'),
('Ester', 'Salvador', 'Kamat', 'Calvillo', 0xe778c9b8f6df4a828f175cca822a588a, 'Esperanza.Arteaga89@gmail.com'),
('Jimena', 'Jazmin', 'Espinosa', 'Pelayo', 0xe50f994561954bc794eb62c0452b7de6, 'Alan.Holgun@gmail.com'),
('Teresa', null, 'Valenzuela', 'Maestas', 0x6e9a0933af634912ab9fffb4ea433c96, 'Rosalia.Narvez@gmail.com'),
('Renata', 'Mayte', 'Vallejo', null, 0x321f4401c9f0488493f604ef9a7310c7, 'Gregorio0@gmail.com'),
('Uriel', null, 'Orozco', null, 0xf66c84e1014f467cb52de25e0b9dfca3, 'Hernn34@gmail.com'),
('Clara', null, 'Korta hernandez', null, 0x24c41c00b3e447da9e9143b17be02b42, 'Ivanna.Cepeda@gmail.com'),
('Ángel Gabriel', 'César', 'Gaitán', null, 0xac845bac3f814a0b96fb393c17ca6b5c, 'Alexa.Delro28@gmail.com'),
('Conchita', 'Kevin', 'Gonzales', 'Melgar', 0x27de113cf6b740978ddcf8c238b7a75d, 'Claudia94@gmail.com'),
('Sancho', 'María de Jesús', 'Sedillo', 'Kano', 0x376c1380d38e4b908aaa0eba20fc3f54, 'Rosario_Esparza@gmail.com'),
('Ernesto', null, 'Roldán', null, 0x8e0653cfa55f433c9005dea2c166bc48, 'Clemente92@gmail.com'),
('Araceli', 'Matías', 'Valle', 'Krasnova', 0xd897419a77cd441dbc5f8f100b532129, 'Rocio88@gmail.com'),
('Hernán', null, 'Valverde', null, 0xfd7fa8a9f1b540288741ee5a52d77303, 'Uriel.Glvez1@gmail.com'),
('Diana', 'Octavio', 'Collazo', null, 0x7ea4240c80064f288d71b21456878ac6, 'Elsa_Padrn15@gmail.com'),
('Adriana', 'Daniel', 'Kuzmina', 'Olivas', 0x2cb16cec6edd4c52bcb9786c40652b6d, 'XimenaGuadalupe90@gmail.com'),
('Jorge Luis', null, 'Quiros', 'Huixtlacatl', 0x2ec94c4f8f264b8ea8678215914a5a78, 'MaradelCarmen_Delgadillo@gmail.com'),
('Patricio', 'Luis Ángel', 'Castellanos', null, 0x04fda30c664b4116a8e53c646b26598a, 'Dorotea.Macas7@gmail.com'),
('Laura', 'Elena', 'Gonzales', 'Rascón', 0x3bcdea42546f47eaab03af48a4ebe2f9, 'Erick17@gmail.com');

-- Insertando datos en la tabla Rol
insert into Rol
    (nombreRol)
values
    ('Administrador'),
    ('Squad Member')

-- Insertando datos en tabla de Issue


-- Insertando datos en la tabla Rol
insert into Rol
    (nombreRol)
values
    ('Administrador'),
    ('Squad Member')

-- Insertando datos en la tabla de Issue
insert into Issue
    (nombreIssue, storyPoints, prioridadIssue, estadoIssue, fechaCreacion, fechaFinalizacion)
values
-- ('Arreglar error en el sistema de pagos', 5, 'Alta', 'To-Do', '3/1/2023 9:00:00', '3/24/2023 13:00:00');

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
