const jwtConfig = {
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    algorithm: 'HS256',
}

module.exports = jwtConfig
