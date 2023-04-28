    -- Insertando datos en la tabla Rol
    insert into rol
        (nombreRol)
    values
        ('Administrador'),
        ('Squad Member'),
        ('Sin Rol');

    -- Insertando datos en la tabla de Privilegios
    insert into privilegio
        (nombrePrivilegio, descripcionPrivilegio)
    values
        ('Consultar respuestas', 'Consultar respuestas de retroalimentacion'),
        ('Consultar comparativa de epicas', 'Consultar comparativas de metricas de epicas'),
        ('Consultar metricas sprint', 'Consultar metricas de sprint actual'),
        ('Consultar tareas', 'Consultar tareas del sprint'), 
        ('Modificar respuestas', 'Modificar respuestas en la retroalimentacion'),
        ('Consultar comparativas de metricas', 'Consultar comparativas de metricas actuales'), 
        ('Consultar historico de retroalimentacion', 'Consultar historico de retroalimetnacion'),
        ('Registrar accionables', 'Registrar aprobacion de los accionables en el sistema'),
        ('Registrar respuestas', 'Registrar respuestas en la retroalimentacion'), 
        ('Registrar usuarios', 'Registrar nuevos usuarios en el sistema'), 
        ('Consultar equipos', 'Consultar miembros del equipo de trabajo'),
        ('Eliminar usuarios', 'Eliminar usuarios en el sistema'), 
        ('Modificar usuarios', 'Modificar usuarios en el sistema'), 
        ('Modificar preguntas', 'Modificar preguntas de retroalimentacion'), 
        ('Consultar accionables', 'Consultar historico de accionables'), 
        ('Eliminar preguntas', 'Eliminar preguntas de retroalimentacion'), 
        ('Eliminar roles', 'Eliminar roles del sistema'), 
        ('Ingresar credenciales', 'Ingresar credenciales de acceso tipo empleado (Google Sign In)'),
        ('Modificar roles', 'Modificar roles existentes en el sistema'),
        ('Registrar preguntas', 'Registrar neuvas preguntas en la retroalimentacion'),
        ('Registrar roles', 'Registrar nuevos roles en el sistema'), 
        ('Consultar rol', 'Consultar asignacion de rol'),
        ('Registrar reporte', 'Registrar nuevo reporte'),
        ('Consultar squad member', 'Consultar squad member'),
        ('Registrar Log Out', 'Registrar cierre de sesion (Log Out)'),
        ('Sin privilegio', 'Privilegio vacío para rol sin privilegio');

    -- Insertando datos en la relacion de RolPrivilegio
    insert into rolPrivilegio(idRol, idPrivilegio)
    values 
    -- Admin
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10),
    (1, 11),
    (1, 12),
    (1, 13),
    (1, 14),
    (1, 15),
    (1, 16),
    (1, 17),
    (1, 18),
    (1, 19),
    (1, 20),
    (1, 21),
    (1, 22),
    (1, 23),
    (1, 24),
    (1, 25),
    -- Squad Member
    (2, 2),
    (2, 3), 
    (2, 4), 
    (2, 7),
    (2, 9),
    (2, 18), 
    (2, 22), 
    (2, 25),
    -- Sin Rol
    (3, 26);

    -- Insertando datos en pregunta
    insert into bancoPreguntas
        (contenido, tipoPregunta)
    values
        ('¿Cómo te sientes?', 'Cuantitativa'),
        ('¿Te sientes a gusto con tu desempeño este sprint?', 'Cuantitativa'),
        ('¿Consideras que la cantidad de issues asignadas en este sprint son las adecuadas?', 'Cuantitativa'),
        ('¿Que hicimos bien este sprint', 'Cualitativa'),
        ('¿Que hicimos mal que debemos hacer diferente?', 'Cualitativa'),
        ('¿Que nos causa ruido?', 'Cualitativa'),
        ('¿Que impedimiento tuvimos en este sprint?', 'Cualitativa');

    -- Insertando datos en banco de preguntas
    insert into pregunta
        (contenido, tipoPregunta)
    values
        ('¿Cómo te sientes?', 'Cuantitativa'),
        ('¿Te sientes a gusto con tu desempeño este sprint?', 'Cuantitativa'),
        ('¿Consideras que la cantidad de issues asignadas en este sprint son las adecuadas?', 'Cuantitativa'),
        ('¿Que hicimos bien este sprint', 'Cualitativa'),
        ('¿Que hicimos mal que debemos hacer diferente?', 'Cualitativa'),
        ('¿Que nos causa ruido?', 'Cualitativa'),
        ('¿Que impedimiento tuvimos en este sprint?', 'Cualitativa'),
        ('¿Que podemos mejorar?', 'Cualitativa');

