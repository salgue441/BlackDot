/**
 * @file index.ts
 * @brief Generates random tokens for secrets and passwords
 * @author Carlos Salguero
 * @version 1.0
 * @date 2023-04-15
 *
 * @copyright Copyright (c) 2023 - MIT License
 */

import { randomBytes } from "crypto"

/**
 * @brief
 * Generates a random string of characters i.e salt
 * @param {number} length - Length of the random string.
 * @returns {string} The random string.
 */
const generateSecret = (length: number): string => {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length)
}

const secret = generateSecret(32)
console.log(secret)
