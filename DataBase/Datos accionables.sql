/*
create table if not exists Accionable(
    idAccionable int not null auto_increment primary key,
    nombreAccionable varchar(50) null,
    storyPoints int default 0 not null,
    prioridadAccionable enum('Alta', 'Media-Alta', 'Media', 'Media-Baja', 'Baja') not null default 'Baja',
    estadoAccionable enum('Aprobado', 'No aprobado') not null default 'No aprobado',
    estadoJira enum('To-Do', 'In Progress', 'Done') not null default 'To-Do',
    fechaCreacion date not null,
    fechaFinalizacion date not null
);
*/

insert into Accionable
    (nombreAccionable, storyPoints, prioridadAccionable, estadoAccionable, estadoJira, fechaCreacion, fechaFinalizacion)
values
    ('Martes de Tacos', 2, 'Baja', 'No aprobado', 'To-Do', '2023-02-03', '2023-02-25')
    ('Mantenimiento Página Web', 5, 'Alta', 'Aprobado', 'In Progress', '2023-02-20', '2023-02-23')
    ('Mantenimiento Base de Datos', 4, 'Media-Alta', 'Aprobado', 'Done', '2023-01-21', '2023-02-22')
    ('Actualización Productos', 3, 'Media', 'No aprobado', 'To-Do', '2023-03-10', '2023-03-05')
    ('Venta Fin de Año', 7, 'Alta', 'Aprobado', 'Done', '2022-12-15', '2022-12-31')
    ('Buen Fin', 7, 'Alta', 'Aprobado', 'Done', '2022-11-18', '2022-11-21')
    ('Mantenimiento Servidores', 4, 'Media-Baja', 'In Progress', '2023-03-05', '2023-03-07')
    ('Agregar Easter Eggs', 2, 'Alta', 'No aprobado', 'To-Do', '2023-03-03', '2023-03-11')
    ('Productos Luuna', 6, 'Media-Alta', 'Aprobado', 'In Progress', '2023-03-06', '2023-03-12')
    ('Productos Nooz', 4, 'Media-Baja', 'Aprobado', 'Done', '2023-01-02', '2023-01-07')