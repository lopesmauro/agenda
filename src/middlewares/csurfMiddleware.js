const checkCsurfError = (err, req, res, next) => {
    if (err) {
        console.log(err)
        return res.send(err)
    }
    next()
} 

const csurfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

module.exports = { checkCsurfError, csurfToken }
