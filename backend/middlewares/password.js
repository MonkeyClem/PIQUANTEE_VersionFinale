// IMPORT DE : passwordValidator 
const passwordValidator = require('password-validator')

// We create a newSchema for the password
const passwordSchema = new passwordValidator

// Then we add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


//Si le schéma requis pour le MDP est respecté, alors nous passons au middleware suivant
//Si ce n'est pas le cas, le reponse 400 nous est retourné. 
module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next()
    }
    else{
        return res.status(400).json({error: "The password isn't strong enough : " + passwordSchema.validate(req.body.password, { details: true })})
    }
}