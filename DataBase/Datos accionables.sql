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