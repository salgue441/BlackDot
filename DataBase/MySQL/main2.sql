

-- --------------------------------------------------------

--
-- Table structure for table `accionable`
--

CREATE TABLE `accionable` (
  `idAccionable` int(11) NOT NULL,
  `nombreAccionable` varchar(50) DEFAULT NULL,
  `storyPoints` int(11) NOT NULL DEFAULT 0,
  `labelAccionable` varchar(50) DEFAULT NULL,
  `prioridadAccionable` enum('Alta','Media-Alta','Media','Media-Baja','Baja') NOT NULL DEFAULT 'Media',
  `estadoAccionable` enum('Aprobado','No aprobado') NOT NULL DEFAULT 'No aprobado',
  `estadoIssue` enum('To Do','In Progress','Done') NOT NULL DEFAULT 'To Do',
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fechaFinalizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cualitativa`
--

CREATE TABLE `cualitativa` (
  `idCualitativa` int(11) NOT NULL,
  `contenido` varchar(300) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `idRetroalimentacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cualitativaaccionable`
--

CREATE TABLE `cualitativaaccionable` (
  `idCualitativa` int(11) NOT NULL,
  `idAccionable` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cuantitativa`
--

CREATE TABLE `cuantitativa` (
  `idCuantitativa` int(11) NOT NULL,
  `contenido` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `idRetroalimentacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `empleado`
--

CREATE TABLE `empleado` (
  `idEmpleado` int(11) NOT NULL,
  `primerNombre` varchar(25) NOT NULL,
  `segundoNombre` varchar(25) DEFAULT NULL,
  `apellidoPaterno` varchar(25) NOT NULL,
  `apellidoMaterno` varchar(25) DEFAULT NULL,
  `idGoogleAuth` binary(16) NOT NULL,
  `googleEmail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `empleadoequipotrabajo`
--

CREATE TABLE `empleadoequipotrabajo` (
  `idEmpleado` int(11) NOT NULL,
  `idEquipoTrabajo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `empleadorol`
--

CREATE TABLE `empleadorol` (
  `idEmpleado` int(11) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `epica`
--

CREATE TABLE `epica` (
  `idEpica` int(11) NOT NULL,
  `nombreEpica` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `equipotrabajo`
--

CREATE TABLE `equipotrabajo` (
  `idEquipoTrabajo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `equipotrabajoissue`
--

CREATE TABLE `equipotrabajoissue` (
  `idEquipoTrabajo` int(11) NOT NULL,
  `idIssue` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `issue`
--

CREATE TABLE `issue` (
  `idIssue` int(11) NOT NULL,
  `nombreIssue` varchar(150) NOT NULL,
  `storyPoints` int(11) NOT NULL DEFAULT 0,
  `labelIssue` varchar(50) DEFAULT NULL,
  `prioridadIssue` enum('Alta','Media-Alta','Media','Media-Baja','Baja') NOT NULL DEFAULT 'Baja',
  `estadoIssue` enum('To Do','In Progress','Done') NOT NULL DEFAULT 'To Do',
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fechaFinalizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pregunta`
--

CREATE TABLE `pregunta` (
  `idPregunta` int(11) NOT NULL,
  `contenido` varchar(300) NOT NULL,
  `tipoPregunta` enum('Cuantitativa','Cualitativa') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `privilegio`
--

CREATE TABLE `privilegio` (
  `idPrivilegio` int(11) NOT NULL,
  `nombrePrivilegio` varchar(25) NOT NULL,
  `descripcionPrivilegio` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reporte`
--

CREATE TABLE `reporte` (
  `idReporte` int(11) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `retroalimentacion`
--

CREATE TABLE `retroalimentacion` (
  `idRetroalimentacion` int(11) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fechaFinalizacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `idSprint` int(11) NOT NULL,
  `idReporte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `retroalimentacionpregunta`
--

CREATE TABLE `retroalimentacionpregunta` (
  `idRetroalimentacion` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `required` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombreRol` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- --------------------------------------------------------

--
-- Table structure for table `rolprivilegio`
--

CREATE TABLE `rolprivilegio` (
  `idRol` int(11) NOT NULL,
  `idPrivilegio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sprint`
--

CREATE TABLE `sprint` (
  `idSprint` int(11) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fechaFinalizacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `numeroSprint` int(11) NOT NULL,
  `idEpica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


- --------------------------------------------------------

--
-- Table structure for table `sprintepica`
--

CREATE TABLE `sprintepica` (
  `idSprint` int(11) NOT NULL,
  `idEpica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sprintissue`
--

CREATE TABLE `sprintissue` (
  `idIssue` int(11) NOT NULL,
  `idSprint` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accionable`
--
ALTER TABLE `accionable`
  ADD PRIMARY KEY (`idAccionable`);

--
-- Indexes for table `cualitativa`
--
ALTER TABLE `cualitativa`
  ADD PRIMARY KEY (`idCualitativa`),
  ADD KEY `fk_idPreguntaCuali` (`idPregunta`),
  ADD KEY `fk_idRetroalimentacionCuali` (`idRetroalimentacion`);

--
-- Indexes for table `cualitativaaccionable`
--
ALTER TABLE `cualitativaaccionable`
  ADD PRIMARY KEY (`idCualitativa`,`idAccionable`),
  ADD KEY `idAccionable` (`idAccionable`);

--
-- Indexes for table `cuantitativa`
--
ALTER TABLE `cuantitativa`
  ADD PRIMARY KEY (`idCuantitativa`),
  ADD KEY `fk_idPreguntaCuanti` (`idPregunta`),
  ADD KEY `fk_idRetroalimentacionCuanti` (`idRetroalimentacion`);

--
-- Indexes for table `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idEmpleado`);

--
-- Indexes for table `empleadoequipotrabajo`
--
ALTER TABLE `empleadoequipotrabajo`
  ADD PRIMARY KEY (`idEmpleado`,`idEquipoTrabajo`),
  ADD KEY `idEquipoTrabajo` (`idEquipoTrabajo`);

--
-- Indexes for table `empleadorol`
--
ALTER TABLE `empleadorol`
  ADD PRIMARY KEY (`idEmpleado`,`idRol`),
  ADD KEY `idRol` (`idRol`);

--
-- Indexes for table `epica`
--
ALTER TABLE `epica`
  ADD PRIMARY KEY (`idEpica`);

--
-- Indexes for table `equipotrabajo`
--
ALTER TABLE `equipotrabajo`
  ADD PRIMARY KEY (`idEquipoTrabajo`);

--
-- Indexes for table `equipotrabajoissue`
--
ALTER TABLE `equipotrabajoissue`
  ADD PRIMARY KEY (`idEquipoTrabajo`,`idIssue`),
  ADD KEY `idIssue` (`idIssue`);

--
-- Indexes for table `issue`
--
ALTER TABLE `issue`
  ADD PRIMARY KEY (`idIssue`);

--
-- Indexes for table `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`idPregunta`);

--
-- Indexes for table `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`idPrivilegio`);

--
-- Indexes for table `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`idReporte`);

--
-- Indexes for table `retroalimentacion`
--
ALTER TABLE `retroalimentacion`
  ADD PRIMARY KEY (`idRetroalimentacion`),
  ADD KEY `fk_idSprint` (`idSprint`),
  ADD KEY `fk_idReporte` (`idReporte`);

--
-- Indexes for table `retroalimentacionpregunta`
--
ALTER TABLE `retroalimentacionpregunta`
  ADD PRIMARY KEY (`idRetroalimentacion`,`idPregunta`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indexes for table `rolprivilegio`
--
ALTER TABLE `rolprivilegio`
  ADD PRIMARY KEY (`idRol`,`idPrivilegio`),
  ADD KEY `idPrivilegio` (`idPrivilegio`);

--
-- Indexes for table `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`idSprint`);

--
-- Indexes for table `sprintepica`
--
ALTER TABLE `sprintepica`
  ADD PRIMARY KEY (`idSprint`,`idEpica`),
  ADD KEY `idEpica` (`idEpica`);

--
-- Indexes for table `sprintissue`
--
ALTER TABLE `sprintissue`
  ADD PRIMARY KEY (`idIssue`,`idSprint`),
  ADD KEY `idSprint` (`idSprint`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accionable`
--
ALTER TABLE `accionable`
  MODIFY `idAccionable` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cualitativa`
--
ALTER TABLE `cualitativa`
  MODIFY `idCualitativa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `cuantitativa`
--
ALTER TABLE `cuantitativa`
  MODIFY `idCuantitativa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `epica`
--
ALTER TABLE `epica`
  MODIFY `idEpica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `equipotrabajo`
--
ALTER TABLE `equipotrabajo`
  MODIFY `idEquipoTrabajo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `issue`
--
ALTER TABLE `issue`
  MODIFY `idIssue` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `idPrivilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `retroalimentacion`
--
ALTER TABLE `retroalimentacion`
  MODIFY `idRetroalimentacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sprint`
--
ALTER TABLE `sprint`
  MODIFY `idSprint` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cualitativa`
--
ALTER TABLE `cualitativa`
  ADD CONSTRAINT `fk_idPreguntaCuali` FOREIGN KEY (`idPregunta`) REFERENCES `retroalimentacionpregunta` (`idPregunta`),
  ADD CONSTRAINT `fk_idRetroalimentacionCuali` FOREIGN KEY (`idRetroalimentacion`) REFERENCES `retroalimentacionpregunta` (`idRetroalimentacion`);

--
-- Constraints for table `cualitativaaccionable`
--
ALTER TABLE `cualitativaaccionable`
  ADD CONSTRAINT `cualitativaaccionable_ibfk_1` FOREIGN KEY (`idCualitativa`) REFERENCES `cualitativa` (`idCualitativa`),
  ADD CONSTRAINT `cualitativaaccionable_ibfk_2` FOREIGN KEY (`idAccionable`) REFERENCES `accionable` (`idAccionable`);

--
-- Constraints for table `cuantitativa`
--
ALTER TABLE `cuantitativa`
  ADD CONSTRAINT `fk_idPreguntaCuanti` FOREIGN KEY (`idPregunta`) REFERENCES `retroalimentacionpregunta` (`idPregunta`),
  ADD CONSTRAINT `fk_idRetroalimentacionCuanti` FOREIGN KEY (`idRetroalimentacion`) REFERENCES `retroalimentacionpregunta` (`idRetroalimentacion`);

--
-- Constraints for table `empleadoequipotrabajo`
--
ALTER TABLE `empleadoequipotrabajo`
  ADD CONSTRAINT `empleadoequipotrabajo_ibfk_1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`),
  ADD CONSTRAINT `empleadoequipotrabajo_ibfk_2` FOREIGN KEY (`idEquipoTrabajo`) REFERENCES `equipotrabajo` (`idEquipoTrabajo`);

--
-- Constraints for table `empleadorol`
--
ALTER TABLE `empleadorol`
  ADD CONSTRAINT `empleadorol_ibfk_1` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`),
  ADD CONSTRAINT `empleadorol_ibfk_2` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`);

--
-- Constraints for table `equipotrabajoissue`
--
ALTER TABLE `equipotrabajoissue`
  ADD CONSTRAINT `equipotrabajoissue_ibfk_1` FOREIGN KEY (`idEquipoTrabajo`) REFERENCES `equipotrabajo` (`idEquipoTrabajo`),
  ADD CONSTRAINT `equipotrabajoissue_ibfk_2` FOREIGN KEY (`idIssue`) REFERENCES `issue` (`idIssue`);

--
-- Constraints for table `retroalimentacion`
--
ALTER TABLE `retroalimentacion`
  ADD CONSTRAINT `fk_idReporte` FOREIGN KEY (`idReporte`) REFERENCES `reporte` (`idReporte`),
  ADD CONSTRAINT `fk_idSprint` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`);

--
-- Constraints for table `retroalimentacionpregunta`
--
ALTER TABLE `retroalimentacionpregunta`
  ADD CONSTRAINT `retroalimentacionpregunta_ibfk_1` FOREIGN KEY (`idRetroalimentacion`) REFERENCES `retroalimentacion` (`idRetroalimentacion`),
  ADD CONSTRAINT `retroalimentacionpregunta_ibfk_2` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`idPregunta`);

--
-- Constraints for table `rolprivilegio`
--
ALTER TABLE `rolprivilegio`
  ADD CONSTRAINT `rolprivilegio_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`),
  ADD CONSTRAINT `rolprivilegio_ibfk_2` FOREIGN KEY (`idPrivilegio`) REFERENCES `privilegio` (`idPrivilegio`);

--
-- Constraints for table `sprintepica`
--
ALTER TABLE `sprintepica`
  ADD CONSTRAINT `sprintepica_ibfk_1` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`),
  ADD CONSTRAINT `sprintepica_ibfk_2` FOREIGN KEY (`idEpica`) REFERENCES `epica` (`idEpica`);

--
-- Constraints for table `sprintissue`
--
ALTER TABLE `sprintissue`
  ADD CONSTRAINT `sprintissue_ibfk_1` FOREIGN KEY (`idIssue`) REFERENCES `issue` (`idIssue`),
  ADD CONSTRAINT `sprintissue_ibfk_2` FOREIGN KEY (`idSprint`) REFERENCES `sprint` (`idSprint`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
