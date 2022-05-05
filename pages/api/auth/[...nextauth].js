import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Okta({
            clientId: process.env.OKTA_CLIENTID,
            clientSecret: process.env.OKTA_CLIENTSECRET,
            domain: process.env.OKTA_DOMAIN
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        Providers.Instagram({
            clientId: process.env.INS_ID,
            clientSecret: process.env.INS_SECRET
        }),
        Providers.Twitter({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET
        })
    ],
    pages: {
        signIn: '/Auth/SignIn'
    }
});
