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

-- Insertando datos en la tabla Preguntas

insert into Pregunta
    (contenido, tipoPregunta)
values
    ('¿Cómo te sientes?', 'Cuantitativa'),
    ('¿Te sientes a gusto con tu desempeño este sprint?', 'Cuantitativa'),
    ('¿Consideras que la cantidad de issues asignadas en este sprint son las adecuadas?', 'Cuantitativa'),
    ('¿Que hicimos bien este sprint', 'Cualitativa'),
    ('¿Que hicimos mal que debemos hacer diferente?', 'Cualitativa'),
    ('¿Que nos causa ruido?', 'Cualitativa'),
    ('¿Que impedimiento tuvimos en este sprint?', 'Cualitativa'),
    ('¿Qué podemos mejorar?', 'Cualitativa');






