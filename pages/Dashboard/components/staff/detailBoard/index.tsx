import * as React from "react";
import styles from "./index.module.css";
import { Grid, Divider, Button, InputBase, Dialog } from "@material-ui/core";
import BoardlineChart from "./boardLineChart";
import { useMediaQuery } from "react-responsive";
import Carousel from 'nuka-carousel';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { blue } from '@material-ui/core/colors';
import { useState } from "react";

import Viewer from 'react-viewer';


interface Props {
  t: (params: String) => string;
  detailData: any;
  setStatus?: (result: any) => void;
}

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, message } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <div className={styles.customised_title}>Message History</div>
        <div onClick={handleClose} className={styles.closeIcon}>
          <img src="/img/Dashboard/closeCard.svg"/>
        </div>
      <List>
        {message.map((m) => (
          <div>
            <div className={styles.customised_key}>
              {m.title}
              <span className={styles.customised_date}>{m.sent}</span>
            </div>
            <div className={styles.customised_value}>
              {m.content}
            </div>
          </div>
        ))}
      </List>
    </Dialog>
  );
}
SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    message: PropTypes.any.isRequired,
  };

function DetailBoard(props: Props) {
  const { t, detailData } = props;

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  
  const [visible, setVisible] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  let cerImg = [];
  let message;
  let sortedMessageTime;
  if (detailData.profile){
    message = detailData.Message;
    sortedMessageTime = message.sort((a,b)=> a.sent.split('-').reverse().join().localeCompare(b.sent.split('-').reverse().join()));
  }else{
    for (var i in detailData.certificates){
      cerImg.push({src: detailData.certificates[i].url})
    }
  }
  return (
    
    <div className={styles.detail_container}>
      <Grid container>
        <Grid container>
          <Grid xs={6} item>
            <div className={styles.basicInfo_group}>
              <div
                className={
                  isTabletOrMobile
                    ? styles.basicInfo_ava_small
                    : styles.basicInfo_ava
                }
              >
                <img src="/img/Dashboard/staff_test.svg"/>
                
              </div>
              <div className={styles.basicInfo_text}>
                {detailData.profile ? (
                  <div className={styles.basicInfo_text_name}>
                    {detailData.profile.name}
                  </div>
                ):(
                  <div className={styles.basicInfo_text_name}>
                    {detailData.name}
                  </div>
                )}
                {detailData.profile ? (
                  <div className={styles.basicInfo_text_gray}>
                    {detailData.profile.position}
                  </div>
                ):(
                  <div className={styles.basicInfo_text_gray}>
                    {detailData.position}
                  </div>
                )}
                {detailData.profile ? (
                  <div className={styles.basicInfo_text_gray}>
                    {detailData.profile.title}
                  </div>
                ):(
                  []
                )}
                {detailData.profile ? (
                  <div className={styles.basicInfo_text_gray}>
                    {detailData.profile.email}
                  </div>
                ):(
                  <div className={styles.basicInfo_text_gray}>
                    {detailData.email}
                  </div>
                )}
              </div>
            </div>
          </Grid>
          <Grid xs={1} item>
            <Divider orientation={"vertical"} />
          </Grid>
          <Grid xs={5} item>
            <div className={styles.basicInfo_group_2}>
            {detailData.profile ? (
              <div className={styles.basicInfo_text_title}>
                <img
                  className={styles.basicInfo_icon}
                  src="/img/Dashboard/phone_icon.svg"
                ></img>
                {detailData.profile.phone}
              </div>
            ):(
              <div className={styles.basicInfo_text_title}>
                <img
                  className={styles.basicInfo_icon}
                  src="/img/Dashboard/phone_icon.svg"
                ></img>
                {detailData.phone}
              </div>
            )}
            {detailData.profile ? (
              <div className={styles.basicInfo_text_title}>
                <img
                  className={styles.basicInfo_icon}
                  src="/img/Dashboard/location_icon.svg"
                ></img>
                {detailData.profile.address}
              </div>
            ):(
              <div className={styles.basicInfo_text_title}>
                <img
                  className={styles.basicInfo_icon}
                  src="/img/Dashboard/location_icon.svg"
                ></img>
                {detailData.address}
              </div>
            )}
            </div>
          </Grid>
        </Grid>
        <Divider classes={{ root: styles.Dividerroot }} />

        {detailData.profile ? (
          <Grid container>
            <Grid classes={{ root: styles.gridroot }} container>
              
            </Grid>
            <Divider classes={{ root: styles.Dividerroot }} />
            <Grid container>
              <Grid xs={4} item>
                <div className={styles.staff_detail_cards_m}>
                  <div className={styles.top_section}>
                    <p className={styles.msg_head}>Messages from {detailData.profile.name}</p>
                    {sortedMessageTime.map((m, index)=>(
                      index < 4 ? 
                        <div>
                          <div className={styles.msg_title}>
                            <img
                              src="/img/Dashboard/messageIcon.svg"
                            ></img>
                            {m.title}
                          </div>
                          <br></br>
                          {m.content}
                          <Divider classes={{ root: styles.Dividerroot }} />
                        </div>
                      :
                        ''
                    ))}

                  </div>
                  <div className={styles.bottom_section}>
                    <div className={styles.bottom_aligner}></div>
                    <div className={styles.bottom_content}>
                      <p onClick={handleClickOpen} className={styles.bottom_content}>
                        message history
                      </p>
                      <SimpleDialog open={open} onClose={handleClose} message={sortedMessageTime}/>
                    </div>
                  </div>

                
                </div>
              </Grid>
              <Grid xs={8} item>
                <div className={styles.staff_detail_cards_m}>
                  
                    
                </div>
              </Grid>
              
              <Grid xs={4} item>
                <div></div>
              </Grid>
              
            </Grid>
          </Grid>
        ) : (
          <div className={styles.staff_detail_bottom_container}>
            <Grid container>
              <Grid xs={4} item>
                <div className={styles.staff_detail_cards_spec}>
                  <p className={styles.staff_detail_title}>Qualification:</p>
                  <p className={styles.staff_detail_content}>{detailData.qualifications}</p>
                  <p className={styles.staff_detail_title}>Specialty Area:</p>
                  <p className={styles.staff_detail_content}>{detailData.specialties}</p>
                </div>

                <div className={styles.staff_detail_cards_applicant_m}>
                  <div className={styles.top_section}>
                    <p className={styles.msg_head}>Messages from {detailData.name}</p>
                    {detailData.message.map((m)=>(
                      <p>
                        {/* <p className={styles.msg_title}>
                          {m.title}
                        </p> */}
                        <br></br>
                        {m.message}
                        <Divider classes={{ root: styles.Dividerroot }} />
                      </p>
                    ))}

                  </div>
                  <div className={styles.bottom_section}>
                    <div className={styles.bottom_aligner}></div>
                    <div className={styles.bottom_content}>
                      <p onClick={handleClickOpen} className={styles.bottom_content}>
                        message history
                      </p>
                      <SimpleDialog open={open} onClose={handleClose} message={detailData.message}/>
                    </div>
                  </div>
                </div>
                
              </Grid>
            
              <Grid xs={8} item>
                <div className={styles.staff_detail_cards_cert}>
                  <p>Certificates:
                  
                  {/* <button onClick={() => { setVisible(true); } }>show</button> */}
                  <Viewer
                  visible={visible}
                  onClose={() => { setVisible(false); } }
                  images={cerImg}
                  />
                  </p><Carousel className={styles.certificate_img}>
                    {detailData.certificates.map((certificate)=>(
                      <img src={certificate.url} alt="" key={certificate.url} onClick={() => { setVisible(true); } }/>
                    ))}
                  </Carousel>

                    <div className={styles.staff_detail_cards_msg}>
                      <p>
                        <InputBase
                        placeholder={t('dashboard.sta.Messageapproval')}
                        classes={{root:styles.msg_box_multiline}}
                        multiline={true}
                        ></InputBase>
                    </p>
                    </div>
                </div>
              </Grid>
              
              <Grid xs={4} item>
                <div></div>
              </Grid>
              
              <Grid >
                
                <div
                  className={
                    isTabletOrMobile
                      ? styles.bt_group_row_small
                      : styles.bt_group_row
                  }
                >
                  <div className={styles.detail_bt}>
                    <Button
                      onClick={(ev) => props.setStatus("PASS")}
                      // classes={{ root: styles.aprove_bt }}
                      style={{ backgroundColor: "#39A049", width: "96px" }}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      {t("dashboard.sta.aprove")}
                    </Button>
                  </div>
                  <div className={styles.detail_bt}>
                    <Button
                      onClick={(ev) => props.setStatus("Decline")}
                      // classes={{ root: styles.Decline_bt }}
                      style={{
                        backgroundColor: "#908686",
                        width: "83px",
                        marginLeft: "20px",
                      }}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      {t("dashboard.sta.Decline")}
                    </Button>
                  </div>
                  <div className={styles.detail_bt}>
                    <Button
                      onClick={(ev) => props.setStatus("Pending")}
                      // classes={{ root: styles.Messageapproval_bt }}
                      style={{
                        backgroundColor: "#39A049",
                        marginLeft: "50px",
                        width: "169px",
                      }}
                      variant="contained"
                      color="primary"
                      size="medium"
                    >
                      Send message
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>

            {/* <div > <div/> */}
          </div>
        )}
      </Grid>
    </div>
  );
}

export default DetailBoard;
