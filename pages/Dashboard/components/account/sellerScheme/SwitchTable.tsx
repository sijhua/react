import * as React from 'react';
import styles from './index.module.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import data from "../../../../../public/sellerData/account_sellerScheme_switches.json"
interface SwitchTableProps {
    children?: React.ReactNode;
    t:(params: String) => string;
    content:any;
    IOSSwitch:any;
    tableName:string;
    handleChange:(ev: any,i:any) => void;
    handleSetupDialogOpen?: (item: string) => void;
    handleSave: (data: any) => void  
}


function SwitchTable(props: SwitchTableProps) {
    const { children, t, content, IOSSwitch, handleChange, tableName, handleSetupDialogOpen, handleSave,...other } = props;
    const [switchData, setSwitchData] = React.useState(data);

    const deleteData = (e:string,index:number) => {
      switchData.criteria.splice(index,1);  
      handleSave(switchData.criteria)
    }
    return (
         <div className={styles.switches_container}>
            {content.map((e,i) => {
                //console.log(e,"tt")
                return (
                   
                    <div className={styles.switches_group} key={i}>
                        <div className={styles.switch_text_container}>
                           <div className={styles.switch_text}>
                              {e.name}
                            </div>
                        { e.system === "no" ? (<div className={styles.switch_alter_text}>
                                {e.type}
                            </div>)
                         : ([])}
                        </div>
                        { e.system === "no" ? ( <CancelIcon
                            color="secondary"
                            classes={{
                                root: styles.HighlightOffIcon_root,
                                colorSecondary: styles.HighlightOffIcon_colorPrimary
                            }}
                          onClick={(ev) =>
                                    deleteData(e.name,i)
                          }
                        />) : (<div className={styles.empty}> <CancelIcon
                            color="secondary"
                            classes={{
                                root: styles.HighlightOffIcon_root,
                                colorSecondary: styles.HighlightOffIcon_colorPrimary
                            }}                          
                        /> </div>)}

                        <div className={styles.switch_button}>
                                <IOSSwitch checked={e.switch} onChange={(ev)=>handleChange(ev,i)} name="full name Switch"/>
                        </div>
                        {i == content.length - 1 ? (                            
                            <AddCircleIcon
                                onClick={(ev) =>
                                        handleSetupDialogOpen(e.name)
                                }
                                color="primary"
                                classes={{
                                    root: styles.AddCircleIcon_root,
                                    colorPrimary: styles.AddCircleIcon_colorPrimary
                                }}
                                />
                        ) : ([])}
                </div>                
                    )
                })}

       </div>      
 
     )
 
}
export default SwitchTable