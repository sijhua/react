import * as React from 'react';
import styles from './index.module.css';
import {Dialog,DialogTitle,DialogContent,Select,
    MenuItem,TextField, Divider, Button,
    Accordion,AccordionSummary,AccordionDetails,
    Checkbox,FormControlLabel} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useMediaQuery } from 'react-responsive'
import deliveryData from '../../../../../public/deliveryData/account_deliveryScheme_flatRate_web.json'
import CancelIcon from '@material-ui/icons/Cancel';
import DataGrid from '../../dataGrid'
import Product from './product'
import Customer from './customer'
import Order from './order'
import Coupon from './coupon'
import Distance from './distance'
import Postcode from './postcode'

interface Props {
    t:(params: String) => string;
    open:boolean;
    handleClose:() => void;
    dialogName:String;
    handleSave:(data:any) =>void

    
  }

function DeliveryEditDialog(props: Props){
    const {t,open,handleClose,dialogName,handleSave} = props
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const FLATCONDITION = [{id:"dontCare",label:"dashboard.acc.delivery.setDelivery.dontCare"},
    {id:"carepw",label:"dashboard.acc.delivery.setDelivery.carepw"},
    {id:"careVolume",label:"dashboard.acc.delivery.setDelivery.careVolume"},
    {id:"careWeight",label:"dashboard.acc.delivery.setDelivery.careWeight"}]
    const [flatRateCondition,setFlatRateCondition] = React.useState("dontCare");
    const [isSetVolume, setIsSetVolume] = React.useState(false);
    const [isSetWeight, setIsSetWeight] = React.useState(false);
    const [volume ,setVolume] =  React.useState(10);
    const [weight ,setWeight] =  React.useState(100);
    const [state,setState] = React.useState(0);
    const [deliveData,setDeliveData ] = React.useState(JSON.parse(JSON.stringify(deliveryData)));
    const [checkList,setCheckList] = React.useState({product:false,customer:false,order:false,coupon:false,postcode:false,distance:false});
    const productOrientatedColumn =  [
        { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },
        { id: 'scope', label: ['dashboard.acc.delivery.setDelivery.Scope'], minWidth: 100 },
        { id: 'vw', label: ['dashboard.acc.delivery.setDelivery.vol_wei_range'], minWidth: 100 },
        { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.Rate'], minWidth: 100 },
    ]

    const forceUpdate=()=>{
        setState(prev=>prev+=1)
    }

    const handleflatRateConditionChange =(event:any) =>{
        setFlatRateCondition(event.target.value)
        setState((prov)=> prov+1)
        switch (event.target.value){
            case FLATCONDITION[0].id:
                setIsSetVolume(false)
                setIsSetWeight(false)
                break
            case FLATCONDITION[1].id:
                setIsSetVolume(true)
                setIsSetWeight(true)
                break
            case FLATCONDITION[2].id:
                setIsSetVolume(true)
                setIsSetWeight(false)
                break
            case FLATCONDITION[3].id:
                setIsSetVolume(false)
                setIsSetWeight(true)
                break
        }
    }

    const handleVolumechange=(event:any)=>{
        setVolume(event.target.value)
        
        setDeliveData(prev=>{
            prev.vw.volume = event.target.value
            return prev
        })
        setState((prov)=> prov+1)
    }
    
    const handleWeightchange=(event:any)=>{
        setWeight(event.target.value)
        setDeliveData(prev=>{
            prev.vw.weight = event.target.value
            return prev
        })
        setState((prov)=> prov+1)
    }
    
    const onDatachange=(ev:any,cmd:string)=>{
        
        setCheckList(prev=>{
            prev[cmd] = !prev[cmd]
            return prev
        })
        forceUpdate()
    }
    const getDatachange=(comd:string,data:any)=>{

        setDeliveData(prev=>{
            prev[comd] = data
            return prev
        })
        forceUpdate()
    }
    const onSave =() =>{
        handleClose()

        handleSave(deliveData)
        
    }
    const handleclick = (event:any) =>{

        event.stopPropagation()
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

    return(

        <Dialog classes={{paperWidthSm:styles.paper_WidthXs}}  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle classes={{root:styles.dialogTitle_root}} id="form-dialog-title">{ t("dashboard.sal.Edit")+" "+t(dialogName)} <CancelIcon onClick={handleClose} className={styles.closed_bt}/> </DialogTitle>
            <DialogContent classes={{root:styles.dialog_root}}>
                <div className={styles.deliveryEditDialog_container}>
                    <div className={styles.deliveryEditDialog_item}>
                        <Select
                            labelId="flatRateCondition"
                            id="flatRateCondition"
                            value={flatRateCondition}
                            onChange={handleflatRateConditionChange}
                            >
                            {FLATCONDITION.map(options => (
                                <MenuItem key={options.id} value={options.id}>{t(options.label)}</MenuItem>
                            ))}   
                            
                        </Select>
                    </div>
                    <div className={styles.setLimitation_group}>
                    {isSetVolume?
                        <div className={styles.setLimitation_volume}>
                            {t("dashboard.acc.delivery.setDelivery.volumeNotBig")}
                            <TextField
                                id="setLimitation_volume"
                                onChange={handleVolumechange}
                                type="number"
                                />
                                {t("dashboard.acc.delivery.setDelivery.meter")}
                        </div>
                        :[]
                    }
                    {isSetWeight?
                        <div className={styles.setLimitation_Weight}>
                            {t("dashboard.acc.delivery.setDelivery.weightNotBig")}
                            <TextField
                                id="setLimitation_Weight"
                                onChange={handleWeightchange}
                                type="number"
                                />
                            {t("dashboard.acc.delivery.setDelivery.kg")}
                        </div>
                    :[]
                }
                    </div>
                    <div className={styles.setrules_container}>{t("dashboard.acc.delivery.setDelivery.setRule")}</div>
                    <Divider/>

                    <div className={styles.orientated_container}>
                    <Accordion >
                        <AccordionSummary
                        
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                        >
                        <FormControlLabel
                            aria-label="Acknowledge"
                            classes={{label:styles.accordionlabel_root}}
                            onClick={(event) => handleclick(event)}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox onChange={ev=>onDatachange(ev,'product')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                            label={t("dashboard.acc.delivery.setDelivery.ProductOrientated")}
                        />
                        </AccordionSummary>
                        {checkList.product?
                            <AccordionDetails>
                                <Product
                                toDecimal2={toDecimal2}
                                getDatachange={getDatachange}
                                product = {deliveData.product}
                                t={t}
                                />
                            </AccordionDetails>
                        :[]}
                    </Accordion>
                    </div>

                    {/* customer orientated */}
                    <div className={styles.orientated_container}>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                        >
                        <FormControlLabel
                            classes={{label:styles.accordionlabel_root}}
                            aria-label="Acknowledge"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox onChange={ev=>onDatachange(ev,'customer')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                            label={t("dashboard.acc.delivery.setDelivery.customerorientated")}
                        />
                        </AccordionSummary>
                        {checkList.customer?
                            <AccordionDetails>
                            <Customer
                            toDecimal2={toDecimal2}
                            getDatachange={getDatachange}
                            customer = {deliveData.customer}
                            t={t}/>
                            </AccordionDetails>
                            :[]}
                    </Accordion>
                    </div>

                        {/* orderOrientated */}
                    <div className={styles.orientated_container}>
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
                            control={<Checkbox onChange={ev=>onDatachange(ev,'order')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                            label={t("dashboard.acc.delivery.setDelivery.orderOrientated")}
                        />
                        </AccordionSummary>
                        {checkList.order?
                            <AccordionDetails>
                                <Order
                                toDecimal2={toDecimal2}
                                getDatachange={getDatachange}
                                order = {deliveData.order}
                                t={t}
                                />

                            </AccordionDetails>
                        :[]}
                    </Accordion>
                    </div>

                    {/* couponOrientated */}
                    <div className={styles.orientated_container}>
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
                                control={<Checkbox onChange={ev=>onDatachange(ev,'coupon')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                                label={t("dashboard.acc.delivery.setDelivery.couponOrientated")}
                            />
                            </AccordionSummary>
                            {checkList.coupon?
                                <AccordionDetails>
                                    <Coupon
                                    toDecimal2={toDecimal2}
                                    getDatachange={getDatachange}
                                    coupon = {deliveData.coupon}
                                    t={t}/>
                                </AccordionDetails>:[]}
                        </Accordion>
                    </div>

                    {/* distanceOrientated */}
                    <div className={styles.orientated_container}>
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
                                control={<Checkbox onChange={ev=>onDatachange(ev,'distance')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                                label={t("dashboard.acc.delivery.setDelivery.distanceOrientated")}
                            />
                            </AccordionSummary>
                            {checkList.distance?
                                <AccordionDetails>
                                    <Distance
                                    toDecimal2={toDecimal2}
                                    getDatachange={getDatachange}
                                    distance = {deliveData.distance}
                                    t={t}/>

                                </AccordionDetails>
                                :[]}
                        </Accordion>
                    </div>

                        {/* postcodeOrientated */}
                        <div className={styles.orientated_container}>
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
                                control={<Checkbox onChange={ev=>onDatachange(ev,'postcode')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                                label={t("dashboard.acc.delivery.setDelivery.postcodeOrientated")}
                            />
                            </AccordionSummary>
                            {checkList.postcode?
                                <AccordionDetails>
                                    <Postcode
                                    toDecimal2={toDecimal2}
                                    getDatachange={getDatachange}
                                    postcode = {deliveData.postcode}
                                        t={t}
                                    />

                                </AccordionDetails>
                            :[]}
                        </Accordion>
                    </div>
                    <div className={styles.button_group}>
                        <Button onClick={onSave} classes={{root:styles.dialog_bt}}>{t("common.save")}</Button>
                        <Button onClick={handleClose} classes={{root:styles.dialog_bt}}>{t("common.cancel")}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeliveryEditDialog