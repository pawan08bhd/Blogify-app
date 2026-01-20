
const { verifyToken } =  require("../service/auth");

function checkForAuthenticationCookie(cookieName) {
    return  (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
        return next();
    }

    try{
        const userPayLoad = verifyToken(tokenCookieValue);
        // console.log("User Found:", userPayLoad);
        req.user = userPayLoad;
        res.locals.user = userPayLoad;
    }catch(err){} 
    next();
}
}

 



module.exports = {checkForAuthenticationCookie
};