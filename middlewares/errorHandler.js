module.exports = (err, req, res, next)=>{
    let code;
    let name = err.name;
    let message;

    switch (name){
        case "Missing_Token":
            code = 401;
            message = "Akses Token Hilang"
            break;
        default:
            code = 500
            message = "Internal Server Error"
    }
    res.status(code).json({success:false, message})
}