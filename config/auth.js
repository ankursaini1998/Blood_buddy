module.exports = {
    'facebookAuth' : {
        'clientID'      : '719867648368034', 
        'clientSecret'  : '541e61a399e9851dd8903b35e332080b', 
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'emails', 'name'] // For requesting permissions from Facebook API
    }
}