import * as React from "react";
import { useState } from "react";
import {
  InputLabel,
  InputBase,
  FormControl,
  TextField,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";
import styles from "./index.module.css";


import FileUpload from "./../../../Attachment/fileUpload/fileUpload.component";
import LogoDragandDrop from "./../../../Attachment/imgDragandDrop/imgDragandDrop.component";

interface Props {
  t: (params: String) => string;
}

function CompanyInfo(props: Props) {
  const { t } = props;

  const [companyName, setCompanyName] = React.useState("");
  const [companyAdress, setCompanyAdress] = React.useState("");
  const [contactPerson, setContactPerson] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [aboutyourbusiness, setAboutyourbusiness] = React.useState("");

  const [logo, setLogo] = useState();
  const [file, setFile] = useState();
  const [logoUrl, setLogoURL] = useState();
  const [fileUrl, setFileURL] = useState();

  const [abn, setABN] = React.useState("");

  const [bankAccount, setBankAccount] = React.useState("");
  const [bsb, setBsb] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [verify, setVerify] = React.useState("");

  const handleChangebankAccount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBankAccount(event.target.value);
  };
  const handleChangebsb = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBsb(event.target.value);
  };
  const handleChangeaccountNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(event.target.value);
  };
  const handleChangeabn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setABN(event.target.value);
  };
  const handleChangeverify = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerify(event.target.value);
  };
  const handleChangeCompanyName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyName(event.target.value);
  };
  const handleChangeContactPerson = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactPerson(event.target.value);
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangeContactNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactNumber(event.target.value);
  };
  const handleChangeaboutyourbusiness = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAboutyourbusiness(event.target.value);
  };
  
  const handleChangecompanyAdress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyAdress(event.target.value);
  };

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  function setUploadedLogo(mylogo) {
    setLogoURL(mylogo);
  }  

  function setUploadedFiles(myfile) {
    setFileURL(myfile);
  }  

  async function handleSubmit() {
    handleSubmitLogo();
    handleSubmitFile();
  }

  async function handleSubmitLogo() {
    let presignedUploadUrl = 'https://0tgg0ho3x2.execute-api.ap-southeast-2.amazonaws.com/default/getPresignedURL';
    const res = await fetch(
      presignedUploadUrl, 
      {
        method: 'GET',
      }
    );
    let json = await res.json();
    let uploadUrl = json.uploadURL;

    const s3res = await fetch(
      uploadUrl, 
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: logo,
      }
    );
    if (s3res.status == 200) {
      setLogoURL(s3res.url);
    }
  }

  async function handleSubmitFile() {
    let presignedUploadUrl = 'https://0tgg0ho3x2.execute-api.ap-southeast-2.amazonaws.com/default/getPresignedURL';
    const res = await fetch(
      presignedUploadUrl, 
      {
        method: 'GET',
      }
    );
    let json = await res.json();
    let uploadUrl = json.uploadURL;

    const s3res = await fetch(
      uploadUrl, 
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: file,
      }
    );
    if (s3res.status == 200) {
      setFileURL(s3res.url);
    }
  }

    return(
        <div className={styles.companyInfo_container}>
             <form onSubmit={handleSubmit} className={styles.companyInfo_form} noValidate={false} autoComplete="off">
                
                <div className={styles.board_title_container}>
                    <div className={styles.board_title_img}><img src="/img/dashboard/building.svg"></img></div>
                    <div  className={styles.board_title_down_icon}>
                        <img src={"/img/Dashboard/Polygon_5_blue.svg"}></img>
                    </div>
                    <div className={styles.board_title}>
                        {t("dashboard.acc.company.basicInfo")}
                    </div>

        </div>
        <Divider />
        <Grid className={styles.company_basic_for_row} container>
          <Grid item md={12} >
            <div className={styles.formControl}>
              <div className={styles.inputLabel_root}>
                {t("landing.contactForm.companyName")}
              </div>
              <InputBase
                classes={{
                  root: styles.company_Form_input,
                  input: styles.company_base_input,
                }}
                value={companyName}
                onChange={handleChangeCompanyName}
              />
            </div>
            <div className={styles.formControl}>
              <div className={styles.inputLabel_root}>
                {t("dashboard.acc.company.logo")}
              </div>

              <div>
                <LogoDragandDrop
                    accept=".jpg,.png,.jpeg,"
                    label="Profile Image(s)"
                    updateFilesCb={updateUploadedFiles}
                    getLogo={setUploadedLogo}
                />
              </div>
            </div>
            <div className={styles.formControl}>
              <div className={styles.inputLabel_root}>
                {t("dashboard.acc.company.CompanyAdress")}
              </div>
              <InputBase
                classes={{
                  root: styles.company_Form_input_address,
                  input: styles.company_base_input,
                }}
                value={companyAdress}
                onChange={handleChangecompanyAdress}
              />
            </div>
            <div className={styles.formControl_group}>
              <div className={styles.formControl_ContactNumber}>
                <div className={styles.inputLabel_root}>
                  {t("dashboard.acc.company.ContactPerson")}
                </div>
                <InputBase
                  classes={{
                    root: styles.company_Form_input_person,
                    input: styles.company_base_input,
                  }}
                  value={contactPerson}
                  onChange={handleChangeContactPerson}
                />
              </div>
              <div className={styles.formControl_ContactNumber}>
                <div className={styles.inputLabel_root}>
                  {t("dashboard.acc.company.ContactNumber")}
                </div>
                <InputBase
                  classes={{
                    root: styles.company_Form_input_person_ContactNumber,
                    input: styles.company_base_input,
                  }}
                  value={contactNumber}
                  onChange={handleChangeContactNumber}
                />
              </div>
            </div>
            <div className={styles.formControl}>
              <div className={styles.inputLabel_root}>
                {t("dashboard.acc.company.email")}
              </div>
              <InputBase
                classes={{
                  root: styles.company_Form_input_person,
                  input: styles.company_base_input,
                }}
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            <div className={styles.formControl_Aboutyourbusiness}>
              <div className={styles.inputLabel_root_multiline}>
                {t("dashboard.acc.company.Aboutyourbusiness")}
              </div>
              <InputBase
                multiline={true}
                rows="5"
                classes={{
                  root: styles.company_Form_input_Aboutyourbusiness,
                  input: styles.company_base_input,
                }}
                value={aboutyourbusiness}
                onChange={handleChangeaboutyourbusiness}
              />
            </div>
          </Grid>

        </Grid>

        <div className={styles.board_title_container}>
          <div className={styles.board_title_img}>
            <img src="/img/dashboard/cert.svg"></img>
          </div>
          <div className={styles.board_title_down_icon}>
            <img src={"/img/Dashboard/Polygon_5_blue.svg"}></img>
          </div>
          <div className={styles.board_title}>
            {t("dashboard.acc.certificate.cert")}
          </div>
        </div>
        <Divider />
        <div className={styles.board_title_container}>
          <Grid className={styles.company_basic_for_row} container>
            <Grid item xs={8}>
              <div className={styles.formControl}>
                <div className={styles.inputLabel_root}>
                  {t("dashboard.acc.certificate.BusinessAbn")}
                </div>
                <InputBase
                  classes={{
                    root: styles.company_Form_input,
                    input: styles.company_base_input,
                  }}
                  value={abn}
                  onChange={handleChangeabn}
                />
              </div>
              <div className={styles.formControl}>
                <div className={styles.inputLabel_root}>
                  {t("dashboard.acc.certificate.BusinessCertificate")}
                </div>

                <div>
                    <FileUpload
                        accept=".jpg,.png,.jpeg,.pdf"
                        label="Profile Image(s)"
                        updateFilesCb={updateUploadedFiles}
                        getFile={setUploadedFiles}
                    />
                </div>

              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={styles.cert_img}></div>
            </Grid>
          </Grid>
        </div>

        <div className={styles.board_title_container}>
          <div className={styles.board_title_img}>
            <img src="/img/dashboard/finance.svg"></img>
          </div>
          <div className={styles.board_title_down_icon}>
            <img src={"/img/Dashboard/Polygon_5_blue.svg"}></img>
          </div>
          <div className={styles.board_title}>
            {t("dashboard.acc.finance.fin")}
          </div>
        </div>
        <Divider />
        <Grid className={styles.company_basic_for_row} container>
          <Grid item xs={7}>
            <div className={styles.formControl_Aboutyourbusiness}>
              <div className={styles.inputLabel_root}>
                {t("dashboard.acc.finance.BankAccount")}
              </div>
              <div className={styles.inputBase_group}>
                <InputBase
                  placeholder="Bank Account"
                  required
                  classes={{
                    root: styles.company_Form_input_bank,
                    input: styles.company_base_input,
                  }}
                  value={bankAccount}
                  onChange={handleChangebankAccount}
                />
                <InputBase
                  placeholder="BSB"
                  required
                  classes={{
                    root: styles.company_Form_input_bank,
                    input: styles.company_base_input,
                  }}
                  value={bsb}
                  onChange={handleChangebsb}
                />
                <InputBase
                  placeholder="Account Name"
                  required
                  classes={{
                    root: styles.company_Form_input_bank,
                    input: styles.company_base_input,
                  }}
                  value={accountNumber}
                  onChange={handleChangeaccountNumber}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={5}>
            <InputBase
              placeholder="*We will verify your account within 48 hours."
              multiline={true}
              rows="5"
              classes={{
                root: styles.company_Form_input_verify,
                input: styles.company_base_input,
              }}
              value={verify}
              onChange={handleChangeverify}
            />
          </Grid>
        </Grid>
        <div className={styles.saveButton_wrapper}>
          <Button 
              className={styles.saveButton}
              onClick={handleSubmit}
          >
              {t("common.save")}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompanyInfo;
