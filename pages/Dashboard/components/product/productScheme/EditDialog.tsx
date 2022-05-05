import * as React from 'react';
import {Dialog,Button,TextField,DialogActions,DialogContent,DialogTitle
    ,DialogContentText} from '@material-ui/core';
import styles from './index.module.css';

interface Props {
    t:(params: String) => string;
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
        console.log(tempRow)
    }


    return(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{ t("dashboard.sal.Edit")}</DialogTitle>
                <DialogContent>
                <TextField
                    onChange={setChange}
                    margin="dense"
                    id="products"
                    label={ t("dashboard.acc.productSche.products")}
                    type="text"
                    fullWidth
                />
                <TextField
                    onChange={setChange}
                    margin="dense"
                    id="ProductName"
                    label={ t("dashboard.acc.productSche.ProductName")}
                    type="email"
                    fullWidth
                />
                 <TextField
                    onChange={setChange}
                    margin="dense"
                    id="Category"
                    label={ t("dashboard.acc.productSche.Category")}
                    type="text"
                    fullWidth
                />
                <TextField
                    onChange={setChange}
                    margin="dense"
                    id="Price"
                    label={ t("dashboard.acc.productSche.Price")}
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
