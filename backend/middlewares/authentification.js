const jwt = require ('jsonwebtoken');
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
//exportation de la fonction du middleware
module.exports = (req, res, next) => {
   try{
    //Récupérer le token dans le headers authorization de la requête 
    const token = req.headers.authorization.split(" ")[1]

    //Le décodage du token
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
    
    //Nous stockons le userId présent dans le token dans la const ci-dessous
    const userIdFromDecodedToken = decodedToken.userId ;
   
    //Nous implémentons le userId présent dans le decodedtoken au req.auth
    const userId = decodedToken.userId;
    req.auth = {
        userId: userId
    };

    //Comparaison de l'userId présent dans la requête avec celui présent dans le Token 
    if(req.auth.userId === userIdFromDecodedToken){
      next()
    }else{
      throw "userId non valide"
    }
    
   }catch(error){
    res.status(401).json({error})
   }
}

