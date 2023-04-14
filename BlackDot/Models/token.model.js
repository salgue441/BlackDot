const dataBase = require("../utils/dataBase");


//ESTO SOLO FUNCIONA SI HAVEMOS LA TABLA DE TOKENS. PREGUNTAR

class Token { 
  constructor(token) {
    Token.verify(token);
    this.id = token.id || null;
  }

  static async getById(id) {
    let [token, _] = await db.execute(`SELECT * FROM token WHERE id = ?`, [id]);

    if (token.length === 0) return null;
    return new Token(token[0]);
  }
  static async getAll() {
    let [tokens, _] = await db.execute(`SELECT * FROM token`);
    return tokens.map((token) => new Token(token));
  }

  //----------------VERIFIER----------------

  static verify(token) {
    //id
    if (!token.id || token.id === undefined || token.id === null) {
      throw new ValidationError("id", validationMessages.isMandatory); ///no tenemos esto, podemos enviar direct a login
    }
  }

  //----------------POST----------------

  async post() {
    let [res, _] = await db.execute(`INSERT INTO token (id) VALUES (?)`, [
      this.id,
    ]);

    return res;
  }
}

module.exports = Token;