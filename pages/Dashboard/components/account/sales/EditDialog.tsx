import * as React from 'react';
import {Dialog,Button,TextField,DialogActions,DialogContent,DialogTitle
    ,DialogContentText} from '@material-ui/core';
import styles from './index.module.css';

interface Props {
    t:(params: String) => String;
    handleClose:(event:any,params:any) =>void;
    open:boolean;
    currentRow:Object;

  }
  
  function EditDialog(props: Props) {
    const {t,currentRow,handleClose,open} = props
    let tempRow ={}
    Object.assign(tempRow, currentRow);

    const setChange=(event:any)=>{
        
        tempRow[event.target.id] = event.target.value
    }

    return(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{ t("dashboard.sal.Edit")}</DialogTitle>
                <DialogContent>
                <TextField
                    onChange={setChange}
                    margin="dense"
                    id="Name"
                    label={ t("dashboard.sal.Name")}
                    type="text"
                    fullWidth
                />
                <TextField
                    onChange={setChange}
                    margin="dense"
                    id="Emailaddress"
                    label={ t("dashboard.sal.Emailaddress")}
                    type="email"
                    fullWidth
                />
                 <TextField
                    onChange={setChange}
                    margin="dense"
                    id="SpecialtyArea"
                    label={ t("dashboard.sal.SpecialtyArea")}
                    type="text"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button className={styles.editDialog_button} onClick={(ev)=>handleClose(ev,null)} >
                    {t('common.cancel')}
                </Button>
                <Button className={styles.editDialog_button} onClick={(ev)=>handleClose(ev,tempRow)} >
                    {t('common.save')}
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

  }

  export default EditDialog
