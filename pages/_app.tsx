import type { AppProps , AppContext } from 'next/app'
import App from "next/app";
import './styles.css'
import '../i18n'
import { useTranslation, Trans, Translation } from 'react-i18next';
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
  const { t ,i18n} = useTranslation()
  const test = { a: 1 };
  test.a ??= 2;
  return (
    <Provider session={pageProps.session}>
      <Component t={t} i18n={i18n} {...pageProps} />
    </Provider>
  )

  
}



export default MyApp