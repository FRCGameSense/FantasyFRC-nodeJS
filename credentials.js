module.exports = {
    cookieSecret: 'secretrobot',
    mongo: {
        development: {
            connectionString: 'mongodb://gamesense:robotrocks@ds043957.mongolab.com:43957/fantasyfrcbeta'
        },
        production: {
            connectionString: 'mongodb://gamesense:robotrocks@ds043957.mongolab.com:43957/fantasyfrcbeta'
        }
    },
    authProviders: {
        facebook: {
            development: {
                appId: '1668879593343023',
                appSecret: '671ab43f0982a4632fae7c4316b7a1ea'
            }
        }
    },
    TBAdata: {
        url: 'www.thebluealliance.com',
        path: '/api/v2/'
    },
    twitter: {
        consumerKey: 'kEiFiQrWp5YZA8GAMwxwsEbsG',
        consumerSecret: 'A8R6vPWwpkmnsZltkNbnflfwS8Ubh7clon2DyQfDIvZx7UYRnT'
    }
};