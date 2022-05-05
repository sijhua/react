import * as React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import MediaQuery from 'react-responsive';
import styles from './index.module.css';
import Layout from '../../layout/Home';
import {Grid,Divider,Box,Button,
  Card,CardContent,Typography,TextField,FormControl,InputBase} from '@material-ui/core';

import Auth from './../Auth/index'


export interface Props {
  t:(params: String) => string;
  value?: any;
}

const initialState = { onContactUs: false };
type State = {
  onContactUs: Boolean;
  submitSuccess?: boolean;
};


class Home extends React.Component<Props, State> {
  state = initialState;

      private handleContactUs=()=>this.setState(onhandleContactUs)
      
      private handleCloseContactUs=()=>this.setState(closeContactUs)
 
      private handleSubmitEmailForm=()=>{

      }
      private handleSubmitContactForm=(e)=>{

      }

      private handleLogin = data => {

      }

      render() {
        const { onContactUs } = this.state;

        const {t,value} = this.props;
        return (
          <Layout
          t={t}
          >
            <div className="body_container">
              <Box className={styles.banner_container}>
                <Grid container className={styles.footer_root} spacing={2}>
                    <Grid item lg={6} xs={7} className={styles.banner_left}>
                      <Box className={styles.banner_box}>
                        <div className={styles.commonSoon}>
                          {t('common.commonSoon')}
                        </div>
                        <div className={styles.banner_title}>
                          {t('landing.banner.title_1')}
                        </div>
                        <div className={styles.banner_title}>
                          {t('landing.banner.title_2')}
                        </div>
                        <div className={styles.banner_subtitle}>
                          {t('landing.banner.subTitle')}
                        </div>
                      </Box>
                      <div className={styles.register_container}>
                            <Auth />
                      </div>
                      
                    </Grid>
                    <Grid item className={styles.banner_right} lg={6} xs={5}>
                      <div className={styles.banner_bg_wrapper}>
                        <img src='/img/HomeLayoutImg/banner_bg.svg'></img>
                      </div>
                    </Grid>
                  </Grid>
              </Box>

              <Box className={styles.section2_container}>
                <Box className={styles.section2}>
                <Grid container className={styles.section2_root} spacing={0}>
                    <Grid item xs={6} className={styles.section2_row1_left}>
                      <div className={styles.section2_title}>
                        {t('landing.section_2.title')}
                      </div>
                    </Grid>
                    <Grid item className={styles.section2_container} xs={6}>
                      <div className={styles.section2_description}>
                        {t('landing.section_2.description')}
                      </div>
                    </Grid>
                  </Grid>
                    <Divider/>

                    <Grid container className={styles.section2_root} spacing={0}>
                      <Grid item xs={4} className={styles.section2_row2_col1}>
                        <div className={styles.section2_order}>
                          01.
                        </div>
                        <div className={styles.section2_content_title}>
                          {t('landing.section_2.content_1.title')}
                        </div>
                        <div className={styles.section2_content_des}>
                          {t('landing.section_2.content_1.description')}
                        </div>
                      </Grid>
                      <Grid item xs={4} className={styles.section2_row2_col2} >
                        <div className={styles.section2_order}>
                          02.
                        </div>
                        <div className={styles.section2_content_title}>
                          {t('landing.section_2.content_2.title')}
                        </div>
                        <div className={styles.section2_content_des}>
                          {t('landing.section_2.content_2.description')}
                        </div>
                      </Grid>
                      <Grid item xs={4} className={styles.section2_row2_col3} >
                        <div className={styles.section2_order}>
                          03.
                        </div>
                        <div className={styles.section2_content_title}>
                          {t('landing.section_2.content_3.title')}
                        </div>
                        <div className={styles.section2_content_des}>
                          {t('landing.section_2.content_3.description')}
                        </div>
                      </Grid>
                    </Grid>

                    <Divider/>
                    
                    <Grid container className={styles.section2_root} spacing={0}>
                      <Grid item xs={8} className={styles.section2_row3_col1} >
                        <div className={styles.section2_content_iNeed}>
                          {t('landing.section_2.iNeed')}
                        </div>
                      </Grid>
                      <Grid item xs={4} className={styles.section2_row3_col2} >
                        <div className={styles.section2_content_bt_wrapper}>
                            <Button onClick={this.handleContactUs} className={styles.section2_content_bt}> 
                              <div>{t('common.contactUs')}</div>
                            </Button>
                        </div>
                      </Grid>
                  </Grid>
                  </Box>
              </Box>

            {onContactUs?
            <Box className={styles.contactForm_container}>
              <form noValidate={false}>
                <div className={styles.contactForm_title_container}>
                  <div>
                    <div className={styles.contactForm_title}>
                      {t('landing.contactForm.title')}
                    </div>
                    <div className={styles.contactForm_des}>
                      {t('landing.contactForm.description')}
                    </div>
                  </div>
                </div>
              
                <Grid container className={styles.contactForm_root} spacing={0}>
                  <Grid item xs={6} className={styles.contactForm_col1} >
                    <Grid container className={styles.contactForm_col1_rows} spacing={0}>
                      <div className={styles.contactForm_col1_row} >
                        <TextField value={value} name="contactName" required className={styles.contactForm_input} id="contactName" label={t('landing.contactForm.contactName')} variant="outlined" />
                      </div>
                      <div className={styles.contactForm_col1_row} >
                        <TextField value={value} required className={styles.contactForm_input} id="email" name="email" label={t('common.email')} variant="outlined" />
                      </div>
                      <div className={styles.contactForm_col1_row} >
                        <TextField value={value} className={styles.contactForm_input} id="companyName" name="companyName" label={t('landing.contactForm.companyName')} variant="outlined" />
                      </div>
                      <div className={styles.contactForm_col1_row} >
                        <TextField value={value} className={styles.contactForm_input} id="companyNumber" name="companyNumber" label={t('landing.contactForm.companyNumber')} variant="outlined" />
                      </div>
                    </Grid>
                    
                    
                  </Grid>
                  <Grid item xs={6} className={styles.contactForm_col2} >
                    <TextField multiline rows="15" className={styles.input_message} id="message" name="message" label={t('landing.contactForm.message')} variant="outlined" />
                    <Button  type="submit"  className={styles.section2_contactForm_bt}> 
                    <div>{t('common.submit')}</div>
                  </Button>
                  </Grid>
                </Grid>
                
              </form>
            </Box>:[]}

            <Box className={styles.section3_container}>
              <Grid container className={styles.section3_root} spacing={0}>
                <Grid item xs={7} className={styles.section3_col1} >
                  <div className={styles.section3_phone_container}>
                    <div className={styles.section3_phone}>
                      <img className={styles.section3_phone_img} src="/img/HomeLayoutImg/PAYMENT.svg"></img>
                    </div>
                   
                    <div className={styles.section3_phone_bg_grey}>
                      <img src="/img/HomeLayoutImg/Rectangle 29.svg"></img>
                    </div>
                    <div className={styles.section3_phone_bg_blue}>
                      <img src="/img/HomeLayoutImg/Rectangle 28.svg"></img>
                    </div>
                    
                  </div>
                </Grid>
                <Grid item xs={5} className={styles.section3_col2} >
                  <div className={styles.section3_titile}>
                    {t('landing.section_3.title1')}<span className={styles.hl} >{t('landing.section_3.title2')} </span>
                    {t('landing.section_3.title3')}
                  </div>
                  <div className={styles.section3_des}>
                    {t('landing.section_3.description')}
                  </div>
                  <div className={styles.section3_content_container}>
                    <div className={styles.section3_content}>
                      <div className={styles.section3_content_vec_img_wrapper}>
                        <img src="/img/HomeLayoutImg/Vector.svg"></img>
                      </div>
                      <div>{t('landing.section_3.option_1')}</div>
                    </div>
                    <div className={styles.section3_content}>
                      <div className={styles.section3_content_vec_img_wrapper}>
                        <img src="/img/HomeLayoutImg/Vector.svg"></img>
                      </div>
                      <div>{t('landing.section_3.option_2')}</div>
                    </div>
                    <div className={styles.section3_content}>
                      <div className={styles.section3_content_vec_img_wrapper}>
                        <img  src="/img/HomeLayoutImg/Vector.svg"></img>
                      </div>
                      <div>{t('landing.section_3.option_3')}</div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>

            <Box className={styles.section4_container}>
              <Grid container className={styles.section4_root} spacing={0}>
                <Grid item md={6} sm={7} className={styles.section4_col1} >
                  <Card className={styles.card}>
                    <CardContent className={styles.cardContent}>
                    <div className={styles.card_location}>
                      {t('landing.section_4.location')}
                    </div>
                    <div className={styles.card_title}>
                      {t('landing.section_4.dontMiss')}
                    </div>
                    <div className={styles.card_des}>
                      {t('landing.section_4.receiveInfo')}
                    </div>
                        <form>
                      {/* <input className={styles.input_email} type="email" placeholder={t('common.email')}> </input> */}
                          
                    {/* <TextField value={value} classes={{root:styles.input_email}} id="email" name="email" label={t('common.email')} variant="outlined" /> */}
                      {/* <TextField className={styles.input_email} id="email" name="email"  label={t('common.email')} variant="outlined" /> */}
                      <Button onClick={this.handleSubmitEmailForm} className={styles.submit_bt} > {t('common.submit')} </Button>
                    </form>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={6} sm={5} className={styles.section4_col2} >
                  <div className={styles.section4_bg_container}>
                    <div className={styles.section4_bg_part_1}>
                      <img src="/img/HomeLayoutImg/Subtract.svg"></img>
                    </div>
                    <div className={styles.section4_bg_part_2}>
                      <img src="/img/HomeLayoutImg/Subtract-1.svg"></img>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
          </Layout>
        )
      }
      
  }

  const onhandleContactUs = (prevState: State) => ({
    onContactUs: !prevState.onContactUs,
  });
  const closeContactUs = (prevState: State) => ({
    onContactUs: false,
  });

  export default Home