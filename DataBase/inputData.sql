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
insert into Empleado
    (primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, idGoogleAuth, googleEmail)
values


-- Insertando datos en la tabla Rol
insert into Rol
    (nombreRol)
values
    ('Administrador'),
    ('Squad Member')

-- Insertando datos en tabla de Issue
insert into `empleado`(`
primerNombre`,
`segundoNombre
`, `apellidoPaterno`, `apellidoMaterno`, `idGoogleAuth`, `googleEmail`) 
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

-- Insertando datos en la tabla de Issue
insert into Issue
    (nombreIssue, storyPoints, prioridadIssue, estadoIssue, fechaCreacion, fechaFinalizacion)
values
   ('Arreglar error en el sistema de pagos', 5, 'Alta', 'To-Do', '2023-03-11 14:30:00', '2023-03-13 10:45:00');