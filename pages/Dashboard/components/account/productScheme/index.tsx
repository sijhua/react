import * as React from "react";
import { useState } from "react";
import styles from "./index.module.css";
import { Divider, FormControlLabel, Grid, Button } from "@material-ui/core";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import MethodTable from "../../methodTable";

import FileUpload from "./fileUpload/fileUpload.component";

function ProductScheme(props: Props) {
  const [manualInput, setManualInput] = useState(false);
  const [uploadFile, setUploadFile] = useState(false);
  const [websiteScrape, setWebsiteScrape] = useState(false);
  const [file, setFile] = useState();
  const [fileUrl, setFileURL] = useState();

  function handleChangeManualInput() {
    setManualInput(!manualInput);
  }
  function handleChangeUploadFile() {
    setUploadFile(!uploadFile);
  }
  function handleChangeWebsiteScrape() {
    setWebsiteScrape(!websiteScrape);
  }

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  function setUploadedFiles(myfile) {
    setFileURL(myfile);
  }

  async function handleSubmit() {
    handleSubmitFile();
  }

  async function handleSubmitFile() {
    let presignedUploadUrl =
      "https://0tgg0ho3x2.execute-api.ap-southeast-2.amazonaws.com/default/getPresignedURL";
    const res = await fetch(presignedUploadUrl, {
      method: "GET",
    });
    let json = await res.json();
    let uploadUrl = json.uploadURL;

    const s3res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: file,
    });
    if (s3res.status == 200) {
      setFileURL(s3res.url);
    }
  }

  const IOSSwitch = withStyles((theme: Theme) =>
    createStyles({
      root: {
        width: 51,
        height: 22,
        padding: 0,
        margin: theme.spacing(1),
      },
      switchBase: {
        padding: 1,
        "&$checked": {
          transform: "translateX(29px)",
          color: theme.palette.common.white,
          "& + $track": {
            backgroundColor: "#3464DC",
            opacity: 1,
            border: "none",
          },
        },
        "&$focusVisible $thumb": {
          color: "#3464DC",
        },
      },
      thumb: {
        width: 20,
        height: 20,
      },
      track: {
        borderRadius: 26 / 2,
        backgroundColor: "#B4B6BA",
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"]),
      },
      checked: {},
      focusVisible: {},
    })
  )(({ classes, ...props }: CusSwitchProps) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <div className={styles.productScheme_container}>
      <div className={styles.productScheme_section}>
        <div className={styles.productScheme_section_title_container}>
          <div className={styles.productScheme_section_title_icon}>
            <img src="/img/Dashboard/entypo_circle-with-cross.svg"></img>
          </div>
          <div className={styles.productScheme_section_title_tra}>
            <img src="/img/Dashboard/Polygon_5.svg"></img>
          </div>
          <div className={styles.productScheme_section_title}>
            <p>Manual input</p>
          </div>
          <div className={styles.manualInput_section_title_switch}>
            <IOSSwitch
              checked={manualInput}
              onChange={handleChangeManualInput}
              name="Manual input"
            />
          </div>
        </div>
        <Divider />
        
      </div>
      <div className={styles.productScheme_section}>
        <div className={styles.productScheme_section_title_container}>
          <div className={styles.productScheme_section_title_icon}>
            <img src="/img/Dashboard/grommet-icons_document-upload.svg"></img>
          </div>
          <div className={styles.productScheme_section_title_tra}>
            <img src="/img/Dashboard/Polygon_5.svg"></img>
          </div>
          <div className={styles.productScheme_section_title}>
            <p>Upload file</p>
          </div>
          <div className={styles.uploadFile_section_title_switch}>
            <IOSSwitch
              checked={uploadFile}
              onChange={handleChangeUploadFile}
              name="Upload file"
            />
          </div>
          <div className={styles.productScheme_section_title_des}>
            <p>*Upload your own product or datafeed file</p>
          </div>
        </div>
        <div className={styles.productScheme_section_title_container}>
          <div className={styles.productScheme_section_upload_container}>
            <FileUpload
              accept=".xml,.json,.xls,.csv,.txt"
              label="Profile Image(s)"
              updateFilesCb={updateUploadedFiles}
              getFile={setUploadedFiles}
            />
          </div>
          <div className={styles.productScheme_section_content}>
            <p>
              *Please download the{" "}
              <span style={{ textDecoration: "underline", color: "blue" }}>
                pdf
              </span>{" "}
              example and prepare your file according to the example.
            </p>
          </div>
        </div>
        <Divider />
      </div>
      <div className={styles.productScheme_section}>
        <div className={styles.productScheme_section_title_container}>
          <div className={styles.productScheme_section_title_icon}>
            <img src="/img/Dashboard/dashicons_cloud-upload.svg"></img>
          </div>
          <div className={styles.productScheme_section_title_tra}>
            <img src="/img/Dashboard/Polygon_5.svg"></img>
          </div>
          <div className={styles.productScheme_section_title}>
            <p>Website scrape</p>
          </div>
          <div className={styles.websiteScrape_section_title_switch}>
            <IOSSwitch
              checked={websiteScrape}
              onChange={handleChangeWebsiteScrape}
              name="Website scrape"
            />
          </div>
          <div className={styles.productScheme_section_title_des}>
            <p>*use BUBBLE8UP provided web scrape facilities</p>
          </div>
        </div>
        <div className={styles.productScheme_section_title_container}>
          <div className={styles.productScheme_section_title_rectLarge}>
            <div className={styles.productScheme_section_title_rectMedium}>
              <div className={styles.productScheme_section_title_rectSmall}>
                <img
                  style={{ height: "30px" }}
                  src="/img/Dashboard/vector.svg"
                ></img>
              </div>

            </div>
          </div>
          <div className={styles.productScheme_section_content}>
            <p>
              *BUBBLE8UP will auto update your product files for you. Contact us
              for more information about our upload gateway.
            </p>
          </div>
          <div className={styles.productScheme_section_imgContainer}>
            <div className={styles.productScheme_section_contact}>
              <img
                style={{ height: "42.5px" }}
                src="/img/Dashboard/contact_icon.svg"
              ></img>
              <p>0466 687 787</p>
            </div>
          </div>
        </div>
        <div
          className={styles.productScheme_section_title_container_bottom}
        ></div>
      </div>
    </div>
  );
}

export default ProductScheme;
