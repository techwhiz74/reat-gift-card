module.exports = {
    google: {
        clientID: '358663697169-cebmqlglr75tttqmsl4m71mjr9442cek.apps.googleusercontent.com',
        clientSecret: 'NlZ8emzrRpPP4IJM4Pwkkre5',
        callbackURL: "/api/auth/google/redirect"
    },
    facebook: {
        clientID: '2230814807170475',
        clientSecret: '2acdcfef4b7e6b168c15835a6f13f8f0',
        callbackURL: "/api/auth/facebook/redirect"
    },
    jwt: {
        expiresIn: '1d',
        secret: 'secret'
    },
    mongodb: {
        URI: 'mongodb://127.0.0.1:27017/auth-react-redux'
    },
    client: {
        url: 'http://localhost:3000'
    }
};