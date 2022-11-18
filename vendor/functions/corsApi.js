function genCors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Max-Age", 3600);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Accept-Charset, Content-Type, Authorization, X-Requested-with, X-Content-Type-Options, Content-Disposition, User-Agent"
    );
    if(res.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.json({});
    }
    next();
}

module.exports = genCors;