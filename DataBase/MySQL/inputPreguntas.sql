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




