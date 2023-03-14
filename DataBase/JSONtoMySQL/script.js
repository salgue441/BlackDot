const dataBase = require("./server/dataBase")
const { faker } = require("@faker-js/faker")
const sampleUsers = require("./sampleUsers.json")

faker.setLocale("es_MX")

async function loadUsers(db) {
  for (let i = 0; i < 50; i++) {
    let idGoogleAuth = faker.datatype.uuid()
    let primerNombre = faker.name.firstName()
    let segundoNombre = Math.random() > 0.55 ? faker.name.firstName() : null
    let apellidoPaterno = faker.name.lastName()
    let apellidoMaterno = Math.random() > 0.7 ? faker.name.lastName() : null
    let googleEmail = `${primerNombre.toLowerCase()}.${apellidoPaterno.toLowerCase()}@gmail.com`

    try {
      await db.query(
        `insert into empleado(primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno, idGoogleAuth, googleEmail) values(?, ?, ?, ?, unhex(replace(?, '-', '')), ?)`,
        [
          primerNombre,
          segundoNombre,
          apellidoPaterno,
          apellidoMaterno,
          idGoogleAuth,
          googleEmail,
        ]
      )

      console.log("User added")
    } catch (err) {
      console.log(err.message)
    }

    if (i == 50) break
  }
}

loadUsers(dataBase)
