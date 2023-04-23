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
    -- timestamp: 2023-03-11
    -- copyright: Copyright (c) 2023 - MIT License
    -- copyright: Copyright (c) 2023 - MIT License

create database if not exists blackdot;

    use blackdot;

    -- Entidades
    create table if not exists Empleado
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

    create table if not exists Rol
    (
        idRol int not null auto_increment primary key, 
        nombreRol varchar (25) not null
    );

create table if not exists Privilegio
(
    idPrivilegio int not null auto_increment primary key,
    nombrePrivilegio varchar (50) not null,
    descripcionPrivilegio varchar (200)
);

create table if not exists Epica
(
    idEpica int not null auto_increment primary key,
    jiraID int unique,
    jiraKey varchar(50),
    nombreEpica varchar(50)
);

create table if not exists Sprint
(
    idSprint int not null auto_increment primary key, 
    jiraID int unique,
    sprintName varchar(200),
    state varchar(50),
    boardID int not null,
    fechaCreacion timestamp not null default current_timestamp,
    fechaFinalizacion timestamp not null default current_timestamp
);

    create table if not exists Issue
    (
        idIssue int not null auto_increment primary key,
        issueKey varchar(30) unique,
        nombreIssue varchar (150) not null, 
        storyPoints int not null default 0,
        labelIssue varchar (100),
        prioridadIssue enum ('Highest', 'High', 'Medium', 'Low', 'Lowest') not null default 'Lowest',
        estadoIssue enum ('To Do', 'En curso', 'Pull request', 'QA', 'Blocked', 'Done') not null default 'To Do',
        fechaCreacion timestamp not null default current_timestamp,
        fechaFinalizacion timestamp null default null
    );

    create table if not exists Retroalimentacion
    (
        idRetroalimentacion int not null auto_increment primary key, 
        fechaCreacion timestamp not null default current_timestamp, 
        fechaFinalizacion timestamp not null default current_timestamp,

        idSprint int not null
    );

    create table if not exists Reporte
    (
        idReporte int not null auto_increment primary key,
        fechaCreacion timestamp default current_timestamp not null,
        idRetroalimentacion int not null
    );

    create table if not exists Pregunta
    (
        idPregunta int not null auto_increment primary key, 
        contenido varchar (300) not null, 
        tipoPregunta enum ('Cuantitativa', 'Cualitativa')
    );

    create table if not exists BancoPreguntas
    (
        idPreguntaBanco int not null auto_increment primary key, 
        contenido varchar (300) not null, 
        tipoPregunta enum ('Cuantitativa', 'Cualitativa')
    );

    create table if not exists Cuantitativa
    (
        idCuantitativa int not null auto_increment primary key, 
        contenido int not null,

        idPregunta int not null,
        idRetroalimentacion int not null
    );

    create table if not exists Cualitativa
    (
        idCualitativa int not null auto_increment primary key,
        contenido varchar(300) not null,

        idPregunta int not null,
        idRetroalimentacion int not null
    );

    create table if not exists Accionable
    (
        idAccionable int not null auto_increment primary key,
        nombreAccionable varchar (50) null,
        storyPoints int default 0 not null,
        labelAccionable varchar (50),
        prioridadAccionable enum ('Alta', 'Media-Alta', 'Media', 'Media-Baja', 'Baja') not null default 'Media',
        estadoAccionable enum ('Aprobado', 'No aprobado') not null default 'No aprobado',
        estadoIssue enum ('To Do', 'In Progress', 'Done') not null default 'To Do',
        fechaCreacion timestamp not null default current_timestamp ,
        fechaFinalizacion timestamp not null default current_timestamp
    );

    -- Relaciones
    create table if not exists EmpleadoRol
    (
        idEmpleado int not null, 
        idRol int not null, 

        primary key (idEmpleado, idRol), 
        foreign key (idEmpleado) references Empleado (idEmpleado),
        foreign key (idRol) references Rol(idRol)
    );

    create table if not exists RolPrivilegio
    (
        idRol int not null, 
        idPrivilegio int not null,

        primary key (idRol, idPrivilegio),
        foreign key (idRol) references Rol (idRol),
        foreign key (idPrivilegio) references Privilegio (idPrivilegio)
    );

create table if not exists SprintEpica
(
    idEpica int not null,
    idSprint int not null,

    primary key (idEpica, idSprint),
    foreign key (idEpica) references Epica (idEpica),
    foreign key (idSprint) references Sprint (idSprint)
);

    create table if not exists SprintIssue
    (
        idIssue int not null, 
        idSprint int not null, 

    primary key (idIssue, idSprint),
    foreign key (idIssue) references Issue (idIssue),
    foreign key (idSprint) references Sprint (idSprint)
);

    create table if not exists RetroalimentacionPregunta
    (
        idRetroalimentacion int not null,
        idPregunta int not null,
        required boolean not null,

        primary key (idRetroalimentacion, idPregunta),
        foreign key (idRetroalimentacion) references Retroalimentacion (idRetroalimentacion),
        foreign key (idPregunta) references Pregunta (idPregunta)
    );


    create table if not exists CualitativaAccionable
    (
        idCualitativa int not null,
        idAccionable int not null,

        primary key (idCualitativa, idAccionable),
        foreign key (idCualitativa) references Cualitativa (idCualitativa),
        foreign key (idAccionable) references Accionable (idAccionable)
    );

create table if not exists token
(
    id varchar (100) not null,

    primary key (id)
);



-- Alterando las tablas para aniadir las llaves foraneas
alter table Retroalimentacion
add constraint fk_idSprint foreign key (idSprint) references Sprint(idSprint);

    alter table Cuantitativa
    add constraint fk_idPreguntaCuanti foreign key (idPregunta) references RetroalimentacionPregunta(idPregunta),
    add constraint fk_idRetroalimentacionCuanti foreign key (idRetroalimentacion) references RetroalimentacionPregunta(idRetroalimentacion);

    alter table Cualitativa
    add constraint fk_idPreguntaCuali foreign key (idPregunta) references RetroalimentacionPregunta(idPregunta),
    add constraint fk_idRetroalimentacionCuali foreign key (idRetroalimentacion) references RetroalimentacionPregunta (idRetroalimentacion);

    alter table Reporte
    add constraint fk_idRetroalimentacion foreign key (idRetroalimentacion) references Retroalimentacion (idRetroalimentacion);