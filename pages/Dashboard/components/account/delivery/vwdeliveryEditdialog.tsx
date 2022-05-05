import * as React from 'react';
import styles from './index.module.css';
import {Dialog,DialogTitle,DialogContent,Accordion,AccordionSummary,AccordionDetails,
    Checkbox,FormControlLabel,Radio,Button,Snackbar,IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataGrid from '../../dataGrid'
import vwData from '../../../../../public/deliveryData/account_deliveryScheme_volumeWeight_web.json'
import VWOrientated from './vwOrientated'
import WOrientated from './wOrientated'
import VOrientated from './vOrientated'
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from "@material-ui/icons/Close";

interface Props {
    t:(params: String) => string;
    open:boolean;
    handleClose:() => void;
    dialogName:string;
    handleSave:(data:any) =>void;
    data:any
}

function VWDeliveryEditDialog(props: Props){
    const {t,open,handleClose,dialogName,handleSave,data} = props
    const [state,setState] = React.useState(0);
    const [delivVWData,setDelivVWData ] = React.useState(vwData);
    const [openSnackbar,setOpenSnackbar] = React.useState(false);
    const [checkList,setCheckList] = React.useState({vw:false,v:false,w:false});

    const forceUpdate=()=>{
        setState(prev=>prev+=1)
    }

    const toDecimal2 = (x:any) => {
        let f = parseFloat(x)
        if (isNaN(f)) {
         return false
        }
        f = Math.round(x*100)/100
        let s = f.toString()
        let rs = s.indexOf('.')
        if (rs < 0) {
         rs = s.length
         s += '.'
        }
        while (s.length <= rs + 2) {
         s += '0'
        }
        return s
       }

    const handleCloseSnackbar = (
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string
    ) =>{
        if (reason === "clickaway") {
            return;
          }
      
          setOpenSnackbar(false);
    }

    const onDatachange = (event:any, cmd:string) =>{
        
        setCheckList(prev => {
            prev[cmd] = !prev[cmd]
            return prev
        })

        forceUpdate()
    }

    const getDatachange = (comd:string,data:any) =>{

        setDelivVWData(prev=>{
            prev[comd] = data
            return prev
        })
        forceUpdate()
    }

    const onSave =() =>{
        if(checkValidation('vwitems') && checkValidation('vitems') && checkValidation('witems')){
            handleClose()
            handleSave(delivVWData)
        }else{

        }
        
    }
    const checkValidation = (cmd:string) => {
        let pass = true
        delivVWData[cmd].map((item,index) => {
            if(item.v<props.data.vw.volume && item.w<props.data.vw.weight){
                pass = false
            }else{
                setOpenSnackbar(true)
            }
        })

        return pass
    }

    return(
        <Dialog classes={{paperWidthSm:styles.paper_WidthXs}}  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle classes={{root:styles.dialogTitle_root}} id="form-dialog-title">{ t("dashboard.sal.Edit")+" "+t(dialogName)} <CancelIcon onClick={handleClose} className={styles.closed_bt}/> </DialogTitle>
            <DialogContent classes={{root:styles.dialog_root}}>
                <div className={styles.display_group}>
                    <div className={styles.display_line}>{t("dashboard.acc.delivery.setDelivery.biggerVolume")}{props.data.vw.volume}{t("dashboard.acc.delivery.setDelivery.meter")}</div>
                    <div className={styles.display_line}>{t("dashboard.acc.delivery.setDelivery.biggerWeight")}{props.data.vw.weight}{t("dashboard.acc.delivery.setDelivery.kg")}</div>
                </div>

                <Accordion>
                        <AccordionSummary
                        
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                        >
                        <FormControlLabel
                            aria-label="Acknowledge"
                            classes={{label:styles.accordionlabel_root}}
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox onChange={ev=>onDatachange(ev,'vw')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                            label={t("dashboard.acc.delivery.setDelivery.vwo")}
                        />
                        {/* checked={checkedList}  */}
                        </AccordionSummary>
                        {checkList.vw?
                            <AccordionDetails>
                                <VWOrientated
                                    t={t}
                                    getDatachange={getDatachange}
                                    vwdata={delivVWData.vwitems}
                                    limitation={props.data.vw}
                                    toDecimal2={toDecimal2}
                                />
                            </AccordionDetails>:[]}
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                        >
                        <FormControlLabel
                            aria-label="Acknowledge"
                            classes={{label:styles.accordionlabel_root}}
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox onChange={ev=>onDatachange(ev,'w')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                            label={t("dashboard.acc.delivery.setDelivery.wo")}
                        />
                        </AccordionSummary>
                        {checkList.w?
                            <AccordionDetails>
                                <WOrientated
                                    t={t}
                                    getDatachange={getDatachange}
                                    vwdata={delivVWData.witems}
                                    limitation={props.data.vw}
                                    toDecimal2={toDecimal2}
                                />
                            
                            </AccordionDetails>:[]}
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                        
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                        >
                        <FormControlLabel
                            aria-label="Acknowledge"
                            classes={{label:styles.accordionlabel_root}}
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox onChange={ev=>onDatachange(ev,'v')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                            label={t("dashboard.acc.delivery.setDelivery.vo")}
                        />
                        </AccordionSummary>
                        {checkList.v?
                            <AccordionDetails>
                                <VOrientated
                                    t={t}
                                    getDatachange={getDatachange}
                                    vwdata={delivVWData.vitems}
                                    limitation={props.data.vw}
                                    toDecimal2={toDecimal2}
                                />

                            </AccordionDetails>:[]}
                    </Accordion>

                    <div className={styles.button_group}>
                        <Button onClick={onSave} classes={{root:styles.dialog_bt}}>{t("common.save")}</Button>
                        <Button onClick={handleClose} classes={{root:styles.dialog_bt}}>{t("common.cancel")}</Button>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                        }}
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        message="Please enter right value."
                        action={
                            <React.Fragment>
                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={handleCloseSnackbar}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                            </React.Fragment>
                        }
                        />
            </DialogContent>
        </Dialog>
    
    )
}

export default VWDeliveryEditDialog