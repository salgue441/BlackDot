-- file: main.sql
-- brief: Creates the database, tables, and relationships
-- brief: Creates the database, tables, and relationships
-- author: Carlos Salguero
-- author: Yuna Chung
-- author: Olimpia Garcia
-- author: Diego Llaca
-- author: Diego Sandoval
-- author: Ivan Paredes
-- version: 1.0
-- datetime: 2023-03-11
-- copyright: Copyright (c) 2023 - MIT License
-- copyright: Copyright (c) 2023 - MIT License

create database if not exists blackdot;

    use blackdot;

-- Entidades
create table if not exists empleado
(
    idEmpleado int not null auto_increment primary key, 
    primerNombre varchar (25) not null, 
    segundoNombre varchar (25),
    apellidoPaterno varchar (25) not null,
    apellidoMaterno varchar (25), 
    idGoogleAuth binary (16) not null, 
    googleEmail varchar (50) not null, 
    googleProfilePicture varchar(300)
);

create table if not exists rol
(
    idRol int not null auto_increment primary key, 
    nombreRol varchar (25) not null
);

create table if not exists privilegio
(
    idPrivilegio int not null auto_increment primary key,
    nombrePrivilegio varchar (50) not null,
    descripcionPrivilegio varchar (200)
);

create table if not exists epica
(
    idEpica int not null auto_increment primary key,
    jiraID int unique,
    jiraKey varchar(50),
    nombreEpica varchar(150)
);

create table if not exists sprint
(
    idSprint int not null auto_increment primary key, 
    jiraID int unique,
    sprintName varchar(200),
    state varchar(50),
    boardID int not null,
    fechaCreacion datetime not null default current_timestamp,
    fechaFinalizacion datetime not null default current_timestamp
);

create table if not exists issue
(
    idIssue int not null auto_increment primary key,
    issueKey varchar(30) unique,
    nombreIssue varchar (150) not null, 
    storyPoints int not null default 0,
    labelIssue varchar (100),
    prioridadIssue enum ('Highest', 'High', 'Medium', 'Low', 'Lowest') not null default 'Lowest',
    estadoIssue enum ('To Do', 'En curso', 'Pull request', 'QA', 'Blocked', 'Done') not null default 'To Do',
    fechaCreacion datetime not null default current_timestamp,
    fechaFinalizacion datetime null default null
);

create table if not exists retroalimentacion
(
    idRetroalimentacion int not null auto_increment primary key, 
    fechaCreacion datetime not null default current_timestamp, 
    fechaFinalizacion datetime not null default current_timestamp,

    idSprint int not null
);

create table if not exists pregunta
(
    idPregunta int not null auto_increment primary key, 
    contenido varchar (300) not null, 
    tipoPregunta enum ('Cuantitativa', 'Cualitativa')
);

create table if not exists bancoPreguntas
(
    idPreguntaBanco int not null auto_increment primary key, 
    contenido varchar (300) not null, 
    tipoPregunta enum ('Cuantitativa', 'Cualitativa')
);

create table if not exists cuantitativa
(
    idCuantitativa int not null auto_increment primary key, 
    contenido int not null,

        idPregunta int not null,
        idRetroalimentacion int not null
    );

create table if not exists cualitativa
(
    idCualitativa int not null auto_increment primary key,
    contenido varchar(300) not null,

        idPregunta int not null,
        idRetroalimentacion int not null
    );

<<<<<<< HEAD
    create table if not exists Accionable
    (
        idAccionable int not null auto_increment primary key,
        nombreAccionable varchar (300) null,
        storyPoints int default 0 not null,
        labelAccionable varchar (50),
        prioridadAccionable enum ('Alta', 'Media-Alta', 'Media', 'Media-Baja', 'Baja') not null default 'Media',
        estadoAccionable enum ('Aprobado', 'No aprobado') not null default 'No aprobado',
        estadoIssue enum ('To Do', 'In Progress', 'Done') not null default 'To Do',
        fechaCreacion timestamp not null default current_timestamp ,
        fechaFinalizacion timestamp not null default current_timestamp
    );
=======
create table if not exists accionable
(
    idAccionable int not null auto_increment primary key,
    nombreAccionable varchar (50) null,
    storyPoints int default 0 not null,
    labelAccionable varchar (50),
    prioridadAccionable enum ('Alta', 'Media-Alta', 'Media', 'Media-Baja', 'Baja') not null default 'Media',
    estadoAccionable enum ('Aprobado', 'No aprobado') not null default 'No aprobado',
    estadoIssue enum ('To Do', 'In Progress', 'Done') not null default 'To Do',
    fechaCreacion datetime not null default current_timestamp ,
    fechaFinalizacion datetime not null default current_timestamp
);
>>>>>>> 8ec348e6362e62ca1545f7f5a64e1c497a7b1cdc

-- Relaciones
create table if not exists empleadoRol
(
    idEmpleado int not null, 
    idRol int not null, 

    primary key (idEmpleado, idRol), 
    foreign key (idEmpleado) references empleado (idEmpleado),
    foreign key (idRol) references rol(idRol)
);

create table if not exists rolPrivilegio
(
    idRol int not null, 
    idPrivilegio int not null,

    primary key (idRol, idPrivilegio),
    foreign key (idRol) references rol (idRol),
    foreign key (idPrivilegio) references privilegio (idPrivilegio)
);

create table if not exists sprintEpica
(
    idEpica int not null,
    idSprint int not null,

    primary key (idEpica, idSprint),
    foreign key (idEpica) references epica (idEpica),
    foreign key (idSprint) references sprint (idSprint)
);

create table if not exists sprintIssue
(
    idIssue int not null, 
    idSprint int not null, 

    primary key (idIssue, idSprint),
    foreign key (idIssue) references issue (idIssue),
    foreign key (idSprint) references sprint (idSprint)
);

create table if not exists retroalimentacionPregunta
(
    idRetroalimentacion int not null,
    idPregunta int not null,
    required boolean not null,

    primary key (idRetroalimentacion, idPregunta),
    foreign key (idRetroalimentacion) references retroalimentacion (idRetroalimentacion),
    foreign key (idPregunta) references pregunta (idPregunta)
);


create table if not exists cualitativaAccionable
(
    idCualitativa int not null,
    idAccionable int not null,

    primary key (idCualitativa, idAccionable),
    foreign key (idCualitativa) references cualitativa (idCualitativa),
    foreign key (idAccionable) references accionable (idAccionable)
);

create table if not exists token
(
    id varchar (100) not null,
    primary key (id)
);


-- Alterando las tablas para aniadir las llaves foraneas
alter table retroalimentacion
add constraint fk_idSprint foreign key (idSprint) references sprint(idSprint);

alter table cuantitativa
add constraint fk_idPreguntaCuanti foreign key (idPregunta) references retroalimentacionPregunta(idPregunta),
add constraint fk_idRetroalimentacionCuanti foreign key (idRetroalimentacion) references retroalimentacionPregunta(idRetroalimentacion);

alter table cualitativa
add constraint fk_idPreguntaCuali foreign key (idPregunta) references retroalimentacionPregunta(idPregunta),
add constraint fk_idRetroalimentacionCuali foreign key (idRetroalimentacion) references retroalimentacionPregunta (idRetroalimentacion);