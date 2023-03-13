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

insert into Sprint
    (fechaCreacion, fechaFinalizacion, numeroSprint)
values
    ('06/06/2016', '6/10/2016', 1),
    ('22/08/2017', '22/10/2017', 2),
    ('25/02/2022', '25/04/2022', 3),
    ('30/04/2022', '19/06/2022', 4),
    ('19/08/2022', '19/10/2022', 5);




