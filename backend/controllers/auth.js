const model = require('../models/auth')
const userModel = require('../models/users')
const jwt = require('jsonwebtoken')

function login(req, res, next) {
    let { username, password } = req.body
    if (!username || !password) return next({ status: 400, message: 'Error with username or password' })
    username = username.toLowerCase()
    return model.login(username, password)
        .then(result => {
            const payload = {
                exp: (Date.now() / 1000) + 7200,
                sub: result
            }
            const token = jwt.sign(payload, process.env.SECRET)
            res.status(200).send({ token, user: payload.sub })
        })
        .catch(next)
}

function authenticate(req, res, next) {
    const [, token] = req.headers.authorization.split(' ')
    if (!token) return next({ status: 401, message: 'Unauthorized, no token' })
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err) return next({ status: 401, message: 'Unauthorized, token not confirmed' })
        req.claim = payload
        next()
    })
}

function authStatus(req, res, next) {
    return userModel.getUser(req.claim.sub.id)
    .then(result =>{
        return res.status(200).send({ user: result })
    })
    .catch(next)
}

function checkRequest(req, res, next) {
    const id = req.params.id || req.params.userId
    if (id != req.claim.sub.id) return next({ status: 401, message: 'Unauthorized, ids dont match' })
    next()
}   

module.exports = {login, authenticate, authStatus, checkRequest}