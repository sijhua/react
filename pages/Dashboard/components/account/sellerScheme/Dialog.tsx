import * as React from 'react';
import styles from './index.module.css';
import {Dialog,DialogTitle,DialogContent,Select,
    MenuItem,TextField, Divider, Button,InputBase,
    Accordion,AccordionSummary,AccordionDetails,
    Checkbox, FormControlLabel
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import data from "../../../../../public/sellerData/account_sellerScheme_switches.json"

interface Props {
    t:(params: String) => string;
    open:boolean;
    handleClose:() => void;
    handleSave:(data:any) =>void
    data:any   
}

function Diaglog(props: Props) {
    const { t, open, handleClose, handleSave } = props
    const [companyName, setCompanyName] = React.useState("");
    const [alignment, setAlignment] = React.useState('normal input')
    const [switchData, setSwitchData] = React.useState(data);
    
    const handleChangeCompanyName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
        setCompanyName(event.target.value);
    };
    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) {
            setAlignment(newAlignment) 
        }
    };
    const onSave =() =>{
        //vwDeliveryEditDialog
        if (companyName != null && companyName.replace(/(^s*)|(s*$)/g, "").length != 0) {
           handleClose()
        
        switchData.criteria.push({
          "id":   companyName,
          "type": alignment,
          "switch": true,
          "system": "no",
           "name": companyName
        })
        handleSave(switchData.criteria)   
        } else {
          alert("Name cannot be blank")
        }
                        
    }

    return (
        <Dialog classes={{paperWidthSm:styles.paper_WidthXs}}  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">       
            <DialogContent classes={{ root: styles.dialog_root }}>
                 
             <div className={styles.pop_first_group}>
                    <div className={styles.pop_title}> 
                        Name
                    </div>
                 <InputBase
                classes={{
                  root: styles.switchName_input,
                  input: styles.switchName_base,
                }}
                value={companyName}
                onChange={handleChangeCompanyName}
                    />
                </div>
                <div>
                    
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        classes={{ root: styles.groupBT_container_root }}
                        onChange={handleAlignment}
                        aria-label="text alignment">
                      <ToggleButton
                        classes={{
                        root: styles.groupBT_root,
                        selected: styles.groupBT_selected
                        }}
                        value="normal input"
                         aria-label="left aligned">
                         normal input
                        </ToggleButton>

                        <ToggleButton
                        classes={{
                        root: styles.groupBT_root,
                        selected: styles.groupBT_selected
                        }}
                        value="file attachment"
                         aria-label="centered">
                          file attachment
                         </ToggleButton>  
                    
                    </ToggleButtonGroup>
                    <div className={styles.popup_button_container }> 
                    <Button className={styles.popup_button} onClick={onSave}>
                         ok
                    </Button>
                    </div>
                </div>
            </DialogContent>
       </Dialog>
   )
}
export default Diaglog