import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import { Button } from '@material-ui/core';
import styles from './index.module.css';


const SIGN_IN_REDIRECT_URL='http://localhost:3000/Home/';


export default function SignIn({ providers, csrfToken }) {


  return (

    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoImgContainer}>
          <div className={styles.logoImg}>
              <img src="/img/HomeLayoutImg/Logo.svg"/>
          </div>
        </div>
        <div>
          {Object.values(providers).map((provider) => {
            if (provider.name === "Okta") {
              return (
                <Button 
                  color='primary' 
                  backgroundColor='primary' 
                  style={{marginBottom:'20px',textTransform: 'none',width:'180px'}}
                  variant="contained" 
                  onClick={() => signIn(provider.id,{callbackUrl: SIGN_IN_REDIRECT_URL,}
                )}>
                  Continue to Sign in
                </Button>
              )               
            }
            return (
              <div key={provider.name}>
                <Button 
                  color='primary' 
                  variant="contained" 
                  style={{marginBottom:'20px',textTransform: 'none',width:'180px'}}
                  onClick={() => signIn(provider.id, {callbackUrl: SIGN_IN_REDIRECT_URL,}
                )}>
                  Sign in with {provider.name}
                </Button>
              </div>
            );
          })}
            
        </div>
      </div>
    </div>

  );
}

SignIn.getInitialProps = async (context) => {
  const { req, res, query } = context;
  const session = await getSession({ req });

  const { callbackUrl } = query;

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  };
};