import { signIn, signOut, useSession } from 'next-auth/client'
import { Button } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive'
import styles from './index.module.css';



export default function Auth() {
  const [ session, loading ] = useSession()
  
  const notDesktopOrLaptop = useMediaQuery({
    query: '(max-width: 524px)'
  })

  return <>
    {!session && <>
    <div className={styles.signInBtn}>
      <Button 
          color='primary' 
          variant="contained" 
          onClick={() => signIn()}
          style={{width:'200px',height:'45px',textTransform: 'none',fontSize:'18px'}}
      >
        Sign in
      </Button>
    </div>  
    </>}
    {session && <>
    <div className={styles.signOutBtn}>
      <Button 
          color='primary' 
          variant="contained"           
          onClick={() => signOut()}
          style={{width:'200px',height:'45px',textTransform: 'none',fontSize:'18px'}}
      >
        Sign out
      </Button>
    </div>  
    </>}
    {notDesktopOrLaptop && <><p>youre in laptop</p></> }
  </>
}