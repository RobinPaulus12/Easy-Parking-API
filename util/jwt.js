import 'dotenv/config.js';
import jsonwebtoken from 'jsonwebtoken';


// creer un jwt avec les données et une cle secrete
export const sign = (payload, options) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, options);
};

// verifie si je jwt est valide, si valide retourne le contenue decode
export const verify = (jwt, options = {}) => {
  return jsonwebtoken.verify(jwt, process.env.JWT_SECRET, options);
};
