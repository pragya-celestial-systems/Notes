export function logger(req,res,next){
    console.log(req.url + " "+ new Date());
    next();
}