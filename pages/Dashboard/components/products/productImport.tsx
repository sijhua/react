import * as React from 'react';
import styles from './index.module.css';
import { FlatfileButton } from "@flatfile/react";
import {Button} from '@material-ui/core';
interface Props {
    t:(params: String) => string;
}

function ProductImport(props: Props) {

    const {t} = props

    const licenseKey = process.env.NEXT_PUBLIC_FLATEFILE_LICENSEKEY

    return(
        <div className={styles.productImport_container}>
            <div className={styles.flatfileButton_wrapper}>
                <FlatfileButton
                    licenseKey= {licenseKey}
                    customer={{ userId: "12345" }}
                    settings={{
                    type: "Contact",
                    fields: [
                        { label: "Name", key: "name" },
                        { label: "id", key: "id" },
                        { label: "favorite food", key: "favorite_food" }
                    ],
                    managed: true
                    }}
                    onData={async (results) => {
                    // do something with the results
                    console.log("results",results)
                    return "Done!";
                    }}
                    render={(importer, launch) => {
                        return <Button classes={{root:styles.upload_bt}} onClick={launch}>{t("dashboard.prod.uploadFile")} </Button>;
                    }}
                >
                </FlatfileButton>
                <div className={styles.flatfileButton_text}>Please import your .csv, .tsv, .xls, .xlsx, .xml, .txt file here.</div>
            </div>
            
        </div>
    )
}

export default ProductImport