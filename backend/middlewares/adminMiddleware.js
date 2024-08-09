const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
  const designation = req.headers['designation'];
  const personalNumber = req.headers['personalnumber'];

  if (!designation || !personalNumber) {
    return res.status(403).send({ message: 'No data provided!' });
  }

  try {

    // Attach the decoded token data to the request object
    req.admin = {
      personalNumber: personalNumber,
      designation: designation
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).send({ message: 'Failed to authenticate token.' });
  }
};

function updateMiddleware(req,res,next){
    try{
        const status = req.headers["status"];
        if(status){
            req.status = status;
            next();
        }else{
            res.status(404).json("status middleware error");
        }
    }catch(err){
        res.status(404).json({"msg":"some error occured"});
    }
}

module.exports = {adminMiddleware,updateMiddleware};
