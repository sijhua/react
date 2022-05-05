import * as React from 'react';
import styles from './index.module.css';
import {Grid,Divider,Container,SvgIcon,Box} from '@material-ui/core';

import { useTranslation, Trans, Translation } from 'react-i18next';



export interface Props {
  t:(params: String) => string;
}


class Layout extends React.Component<Props, object> {
  
    render() {
      const { children ,t} = this.props;
      return (
        
          <div className={styles.container}>
            <div>
              <div className={styles.header}>
                <div className={styles.logo_wrapper}>
                  <img src="/img/HomeLayoutImg/Logo.svg"></img>
                </div>
                <div className={styles.headerIcon_wrapper}>
                  <img src="/img/HomeLayoutImg/header_icon.svg"></img>
                </div>
              </div>
            </div>
            <main>{children}</main>
            <footer>
              <div className={styles.footer}>
                <div className={styles.footer_container}>
                  <Grid container className={styles.footer_content_root} spacing={0}>
                    <Grid item xs={3} className={styles.footer_content}>
                      <div className={styles.footer_content_title}>{t('common.contactUs')}</div>
                      <div className={styles.footer_content_content}>{t('common.number')}</div>
                    </Grid>
                    <Grid item xs={3} className={styles.footer_content} >
                      <div className={styles.footer_content_title}>{t('footer.getInTouch')}</div>
                      <div className={styles.footer_content_content}>{t('common.number')}</div>
                    </Grid>
                    <Grid item xs={3} className={styles.footer_content} >
                      <div className={styles.footer_content_title}>{t('footer.openHour')}</div>
                      <div className={styles.footer_content_content}>{t('footer.hour')}</div>
                    </Grid>
                    <Grid item xs={3} className={styles.footer_content} >
                      <div className={styles.footer_content_title}>{t('footer.visitUs')}</div>
                      <div className={styles.footer_content_content}>{t('footer.address')}</div>
                    </Grid>
                  </Grid>
                  <Divider/>
                  <Grid container className={styles.footer_root} spacing={0}>
                    <Grid item xs={6} className={styles.footer_left}>
                      <div>{t('common.copyright')}</div>
                    </Grid>
                    <Grid item xs={6} className={styles.footer_right} >
                      {/* <div>{t('common.sitemap')}</div> */}
                    </Grid>
                  </Grid>
                </div>
              </div>
            </footer>
          </div>
          
      );
    }
  }
  
  export default Layout;