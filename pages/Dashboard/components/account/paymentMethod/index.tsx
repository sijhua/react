import * as React from 'react';
import styles from './index.module.css';
import {Divider,FormControlLabel,Grid,Button} from '@material-ui/core';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import MethodTable from '../../methodTable'

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
}
  
export interface Props {
    t:(params: String) => string;
    classes?: Styles;
    
}


interface CusSwitchProps{
    checked?:any;
    onChange?:any;
    name?:any;
    classes?: Styles;
}

const initialState = {
    noPayment:false,
    ownPayment:false,
    bubPayment:true,
    ownPaymentObj:[{name:"dashboard.acc.payment.Directbanktransfer",des:"dashboard.acc.payment.DBT_des",enable:false},
            {name:"dashboard.acc.payment.Checkpayments",des:"dashboard.acc.payment.Checkpayments_des",enable:false},
            {name:"dashboard.acc.payment.Cashondelivery",des:"dashboard.acc.payment.Cashondelivery_des",enable:false},],
    bubPaymentObj:[
        {icon:"",name:"dashboard.acc.payment.Directbanktransfer",des:"dashboard.acc.payment.DBT_des",enable:true},
        {icon:"",name:"dashboard.acc.payment.PayPalStandard",des:"dashboard.acc.payment.PayPalStandard_des",enable:true},
        {icon:"",name:"dashboard.acc.payment.CreditCard",des:"dashboard.acc.payment.CreditCard_des",enable:false},
        {icon:"",name:"dashboard.acc.payment.Stripe",des:"dashboard.acc.payment.Stripe_des",enable:false}
    ],
}

type State = {
    noPayment:boolean,
    ownPayment:boolean,
    bubPayment:boolean,
    ownPaymentObj:any,
    bubPaymentObj:any
}

class PaymentMethod extends React.Component<Props, object> {

    state= initialState

    private OWNPAYMENTOBJ = "ownPaymentObj"
    private BUBPAYMENTOBJ = "bubPaymentObj"

    private handleChangeNoPayment=()=>{
        this.setState({noPayment:!this.state.noPayment})
    }   

    private handleChangeBubPayment=()=>{
        this.setState({bubPayment:!this.state.bubPayment})
    }

    private handleChangeOwnPayment=()=>{
        this.setState({ownPayment:!this.state.ownPayment})
    }

    private handleContentChange =(event:any,i:any,tableName:string)=>{
        let tempObj = null
        switch(tableName){
            case this.OWNPAYMENTOBJ:
                tempObj= this.state.ownPaymentObj
                tempObj[i].enable = !tempObj[i].enable
                this.setState({ownPaymentObj:tempObj})
                break;
            case this.BUBPAYMENTOBJ:
                tempObj = this.state.bubPaymentObj
                tempObj[i].enable = !tempObj[i].enable
                this.setState({bubPaymentObj:tempObj})
                break;
        }
    }
    render(){
        const {t,classes} = this.props

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
            '&$checked': {
                transform: 'translateX(29px)',
                color: theme.palette.common.white,
                '& + $track': {
                backgroundColor: '#3464DC',
                opacity: 1,
                border: 'none',
                },
            },
            '&$focusVisible $thumb': {
                color: '#3464DC',
            },
            },
            thumb: {
            width: 20,
            height: 20,
            },
            track: {
            borderRadius: 26 / 2,
            backgroundColor: '#B4B6BA',
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
            },
            checked: {},
            focusVisible: {},
        }),
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

        return(
            <div className={styles.paymentMethod_container}>
                <div className={styles.paymentMethod_section}>
                    <div className={styles.paymentMethod_section_title_container}>
                        <div className={styles.paymentMethod_section_title_icon}><img src="/img/Dashboard/entypo_circle-with-cross.svg"></img></div>
                        <div className={styles.paymentMethod_section_title_tra}><img src="/img/Dashboard/Polygon_5.svg"></img></div>
                        <div className={styles.paymentMethod_section_title}>{t("dashboard.acc.payment.no")}</div>
                        <div className={styles.paymentMethod_section_title_switch}>
                            <IOSSwitch checked={this.state.noPayment} onChange={this.handleChangeNoPayment} name="noPayment" />
                        </div>
                    </div>
                    <Divider/>
                </div>
                <div className={styles.paymentMethod_section}>
                    <div className={styles.paymentMethod_section_title_container}>
                        <div className={styles.paymentMethod_section_title_icon}><img src="/img/Dashboard/ic_sharp-payments.svg"></img></div>
                        <div className={styles.paymentMethod_section_title_tra}><img src="/img/Dashboard/Polygon_5_blue.svg"></img></div>
                        <div className={styles.paymentMethod_section_title}>{t("dashboard.acc.payment.own")}</div>
                        <div className={styles.paymentMethod_section_title_switch}>
                            <IOSSwitch checked={this.state.ownPayment} onChange={this.handleChangeOwnPayment} name="own" />
                        </div>
                        <div className={styles.paymentMethod_section_title_des}>{t("dashboard.acc.payment.own_exp")}</div>
                    </div>

                    <div>
                        <MethodTable
                            t={t}
                            tableName="ownPaymentObj"
                            content={this.state.ownPaymentObj}
                            IOSSwitch={IOSSwitch}
                            handleChange={this.handleContentChange}
                        >
                            
                        </MethodTable>
                    </div>
                    <Divider/>

                </div>
                <div className={styles.paymentMethod_section}>
                    <div className={styles.paymentMethod_section_title_container}>
                        <div className={styles.paymentMethod_section_title_icon}><img src="/img/Dashboard/ri_secure-payment-fill.svg"></img></div>
                        <div className={styles.paymentMethod_section_title_tra}><img src="/img/Dashboard/Polygon_5_blue.svg"></img></div>
                        <div className={styles.paymentMethod_section_title}>{t("dashboard.acc.payment.bubble8up")}</div>
                        <div className={styles.paymentMethod_section_title_switch}>
                            <IOSSwitch checked={this.state.bubPayment} onChange={this.handleChangeBubPayment} name="bubble8up" />
                        </div>
                        <div className={styles.paymentMethod_section_title_des}>{t("dashboard.acc.payment.bubble8up_exp")}</div>
                    </div>
                    
                    <div>
                        <MethodTable
                            t={t}
                            tableName="bubPaymentObj"
                            content={this.state.bubPaymentObj}
                            IOSSwitch={IOSSwitch}
                            handleChange={this.handleContentChange}
                        >
                        </MethodTable>
                    </div>
                    
                </div>
                <div className={styles.paymentMethod_update_bt}>
                    <Button classes={{root:styles.paymentMethod_update}}>{t("common.upload")}</Button>
                </div>
            </div>
        )
    }
}

export default PaymentMethod