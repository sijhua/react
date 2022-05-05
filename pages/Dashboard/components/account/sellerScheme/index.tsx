import * as React from "react";
import sellerData from "../../../../../public/sellerData/account_sellerScheme_switches.json"
import { Grid, Divider, Button } from "@material-ui/core";
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styles from './index.module.css';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import {
  createStyles,
  fade,
  Theme,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import SwitchTable from "./SwitchTable";
import Dialog from "./Dialog";

export interface Props {
    t:(params: String) => string;
    // classes?: Styles;
    
}

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
}
  
interface CusSwitchProps{
    checked?:any;
    onChange?:any;
    name?:any;
    classes?: Styles;
    
}

const initialState = {
    fullName: sellerData.criteria[0].switch,
    address: sellerData.criteria[1].switch,
    dob:sellerData.criteria[2].switch,
    cNumber: sellerData.criteria[3].switch,
    driverLicence: sellerData.criteria[4].switch,
    certificate: sellerData.criteria[5].switch, 
    abnNumber: sellerData.criteria[6].switch, 
    switchObjs: sellerData.criteria,
    open: false,
    switchData:sellerData.criteria
}

type State = {
    fullName: boolean,
    address: boolean,
    dob: boolean,
    cNumber: boolean,
    driverLicence: boolean,
    certificate: boolean,
    abnNumber: boolean,
    switchObjs: any,
    open: boolean,
    switchData:any
}

class SellerScheme extends React.Component<Props, object> {

    state = initialState
    //Switches control functions 
    private fullNameSwitch = () => {
        this.setState({ fullName: !this.state.fullName })
        
    }
    private addressSwitch=() => {
      this.setState({address:!this.state.address})
    }
    private dobSwitch=() => {
      this.setState({dob:!this.state.dob})
    }

    private cNumberSwitch=() => {
      this.setState({cNumber:!this.state.cNumber})
    }
    private dLicenceSwitch=() => {
      this.setState({driverLicence:!this.state.driverLicence})
    }
    private certificateSwitch=() => {
      this.setState({certificate:!this.state.certificate})
    }
    private abnSwitch=() => {
      this.setState({abnNumber:!this.state.abnNumber})
    }
    private handleContentChange =(event:any,i:any)=>{
        let tempObj = null
        tempObj= this.state.switchObjs
        tempObj[i].switch = !tempObj[i].switch
        this.setState({switchObjs:tempObj})
    }
    private handleClose =()=>{
        this.setState({open:!this.state.open})
    }
    private handleSave =(data:any)=>{
        this.setState({switchObjs:data})
    }
    private handleSetupDialogOpen =(item: string)=>{
      this.setState({open:true})
    } 

    render() {
        const {t} = this.props
        const IOSSwitch = withStyles((theme: Theme) =>
        createStyles({
            root: {
            width: 51,
            height: 20,
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
            width: 19,
            height: 19,
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
        return ( 
            <div className={styles.sellerScheme_container}>
                <div className={styles.firstLine_container}>
                    <div className={ styles.firstLine_ava_small}>
                        <img src="/img/Dashboard/sellerScheme_avatar.svg"></img> 
                    </div>
                    <h4> Pickup the items required to be selller of your business or add your own required items(s)</h4> 
                </div>
                <Divider classes={{ root: styles.Dividerroot }} />
                {/* <AddCircleIcon onClick={handAddCondition} classes={{root:styles.icon_root}} color="primary"/> */}
                 <SwitchTable
                            t={t}
                            tableName="ownDeliveryObj"
                            content={this.state.switchObjs}
                            IOSSwitch={IOSSwitch}
                            handleChange={this.handleContentChange}
                            handleSetupDialogOpen={this.handleSetupDialogOpen}
                            handleSave={this.handleSave}
                    />
 
                <div className={styles.firstLine_container}>
                    <div className={ styles.firstLine_ava_small}>
                        <img src="/img/Dashboard/sellerScheme_SMS.svg"></img> 
                    </div>
                    <h4> Type the message that you want to deliver to your potential sellers</h4> 
                </div>
                <Divider classes={{ root: styles.Dividerroot }} />
                <div className={styles.input_container}>
                    <div className={styles.message_container} > 
                        <TextField id="outlined-basic" label="message to application" variant="outlined" autoFocus margin="none" fullWidth/>
                    </div>
                </div>
                <div className={styles.sellerScheme_update_button} >
                     <Button classes={{root:styles.sellerScheme_button }}>{t("common.update")}</Button>
                </div>
                <Dialog
                    t={t}
                    open={this.state.open}
                    handleClose={this.handleClose}
                    handleSave={this.handleSave}
                    data={this.state.switchData}
                />

            </div>
        )
    }
}

export default SellerScheme