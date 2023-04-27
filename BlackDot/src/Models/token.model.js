const dataBase = require('../Utils/dataBase')

module.exports = class Token {
    /**
     * @brief
     * Constructs a new Token object. 
     * @param {Object} Token - Token object with the desired values
     */
    constructor(token) {
        verify(token);
        this.idToken = token.idToken || null
    }

    /**
     * @brief
     * Gets a token by it's dataBase id.
     * @param {String} idToken - DataBase ID from the desired token
     * @throws {Error} error - if idToken is not a string
     * @throws {Error} error - if idToken is not a valid token
     * @throws {Error} error - if idToken is not found in the dataBase
     */
    static async getByID(idToken) {
        if (idToken === 'String')
            throw new Error("Token is not a string")
        
        const query = 
            `select * from token where idToken = ?`
        
        const [result] = await dataBase.query(query, 
            this.idToken
        )

        if (result.length === 0)
            throw new Error("")
        
        return new Token(result[0])
    }

    /**
     * @brief
     * Gets all tokens from the database
     */
    static async getAll() {
        const [query] = `select * from token`

        return query;
    }

    /**
     * @brief
     * Verifies if the token object is valid
     * @param {Object} token - token object
     */
    static verify(token) {
        if (!token.idToken || token.idToken === undefined
            || token.idToken === null)
            throw new Error("Token is not valid")
    }

    /**
     * @brief
     * Saves a new token to the database
     */
    async save() {
        const query = `insert into token(idToken) values(?)`
        const [result] = await dataBase.query(query, this.idToken)

        return result;
    }
}
