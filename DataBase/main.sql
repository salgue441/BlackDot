create database if not EXISTS Zebrands;

use Zebrands;

-- Entidades
create table if not exists Empleado(
    idEmpleado int not null auto_increment primary key, 
    primerNombre varchar(25) not null, 
    segundoNombre varchar(25),
    apellidoPaterno varchar(25) not null,
    apellidoMaterno varchar(25)
);


create table if not exists Rol(
    idRol int not null auto_increment primary key, 
    nombreRol varchar(25) not null
);

 
create table if not exists Privilegio(
    idPrivilegio int not null auto_increment primary key,
    nombrePrivilegio varchar(25) not null,
    descripcionPrivilegio varchar(100)
);

 
create table if not exists EquipoTrabajo(
    idEquipoTrabajo int not null auto_increment primary key 
);

 
create table if not exists Epica(
    idEpica int not null auto_increment primary key,
    nombreEpica varchar(50)  
);

 
create table if not exists Sprint(
    idSprint int not null auto_increment primary key, 
    fechaCreacion date not null,
    fechaFinalizacion date not null,
    numeroSprint int not null,

    idEpica int not null
);

 
create table if not exists Issue(
    idIssue int not null auto_increment primary key,
    nombreIssue varchar(50) not null, 
    storyPoints int not null default 0,
    prioridadIssue enum('Alta', 'Media-Alta', 'Media', 'Media-Baja', 'Baja') not null default 'Baja',
    estadoIssue enum('To-Do', 'In Progress', 'Done') not null default 'To-Do',
    fechaCreacion date not null,
    fechaFinalizacion date not null
);

 
create table if not exists Retroalimentacion(
    idRetroalimentacion int not null auto_increment primary key, 
    fechaCreacion date not null, 
    fechaFinalizacion date not null,

    idSprint int not null,
    idReporte int not null
);

 
create table if not exists Reporte(
    idReporte int not null auto_increment primary key,
    fechaCreacion date not null
);

 
create table if not exists Pregunta(
    idPregunta int not null auto_increment primary key, 
    contenido varchar(300) not null
);

 
create table if not exists Cuantitativa(
    idCuantitativa int not null auto_increment primary key, 
    contenido int not null,

    idPregunta int not null,
    idRetroalimentacion int not null
);

 
create table if not exists Cualitativa(
    idCualitativa int not null auto_increment primary key,
    contenido varchar(600) not null,

    idPregunta int not null,
    idRetroalimentacion int not null
);

 
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

-- Relaciones
create table if not exists EmpleadoRol(
    idEmpleado int not null, 
    idRol int not null, 

    primary key(idEmpleado, idRol), 
    foreign key(idEmpleado) references Empleado(idEmpleado),
    foreign key(idRol) references Rol(idRol)
);

 
create table if not exists RolPrivilegio(
    idRol int not null, 
    idPrivilegio int not null,

    primary key(idRol, idPrivilegio),
    foreign key(idRol) references Rol(idRol),
    foreign key(idPrivilegio) references Privilegio(idPrivilegio)
);

 
create table if not exists EmpleadoEquipoTrabajo(
    idEmpleado int not null,
    idEquipoTrabajo int not null,

    primary key(idEmpleado, idEquipoTrabajo),
    foreign key(idEmpleado) references Empleado(idEmpleado),
    foreign key(idEquipoTrabajo) references EquipoTrabajo(idEquipoTrabajo)
);
 
CREATE TABLE IF NOT EXISTS EquipoTrabajoIssue(
    idEquipoTrabajo INT NOT NULL,
    idIssue INT NOT NULL,

    primary key(idEquipoTrabajo, idIssue),
    foreign key(idEquipoTrabajo) references EquipoTrabajo(idEquipoTrabajo),
    foreign key(idIssue) references Issue(idIssue)
);

create Table if not exists SprintIssue(
    idIssue int not null, 
    idSprint int not null, 

    primary key(idIssue, idSprint),
    foreign key(idIssue) references Issue(idIssue),
    foreign key(idSprint) references Sprint(idSprint)
);

CREATE TABLE IF NOT EXISTS SprintEpica(
    idSprint INT NOT NULL,
    idEpica INT NOT NULL,

    primary key(idSprint, idEpica),
    foreign key(idSprint) references Sprint(idSprint),
    foreign key(idEpica) references Epica(idEpica)
);
 

create Table if not exists RetroalimentacionPregunta(
    idRetroalimentacion int not null,
    idPregunta int not null,
    required boolean not null,

    primary key(idRetroalimentacion, idPregunta),
    foreign key(idRetroalimentacion) references Retroalimentacion(idRetroalimentacion),
    foreign key(idPregunta) references Pregunta(idPregunta)
);


 
create table if not exists CualitativaAccionable(
    idCualitativa int not null,
    idAccionable int not null,

    primary key(idCualitativa, idAccionable),
    foreign key(idCualitativa) references Cualitativa(idCualitativa),
    foreign key(idAccionable) references Accionable(idAccionable)
);
 
-- Alterando las tablas para aniadir las llaves foraneas
alter table Retroalimentacion
add constraint fk_idSprint foreign key (idSprint) references Sprint(idSprint),
add constraint fk_idReporte foreign key (idReporte) references Reporte(idReporte);

alter table Cuantitativa
add constraint fk_idPreguntaCuanti foreign key (idPregunta) references RetroalimentacionPregunta(idPregunta),
add constraint fk_idRetroalimentacionCuanti foreign key (idRetroalimentacion) references RetroalimentacionPregunta(idRetroalimentacion);

alter table Cualitativa
add constraint fk_idPreguntaCuali foreign key (idPregunta) references RetroalimentacionPregunta(idPregunta),
add constraint fk_idRetroalimentacionCuali foreign key (idRetroalimentacion) references RetroalimentacionPregunta(idRetroalimentacion);

