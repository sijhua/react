import * as React from 'react';
import styles from './index.module.css';
import {Popper, TextField} from '@material-ui/core';
import DataGrid from '../dataGrid'
import { check } from 'prettier';

export interface Props {
    t: (params: String) => string;
    open:boolean;
    anchorEl:null | HTMLElement;
    column:any;
    row:any;
    handleChange:(event:any)=>void;
    handleCheckBoxChanged:(ev:any,i:any,row:any) => void
}
function DataGridPopper(props: Props) {

    const {t,open,anchorEl,column,row,handleCheckBoxChanged,handleChange} = props
    

    const [state,setState] = React.useState(0);
    const [innerRow,setInnerRow] = React.useState(row);

    const forceUpdate = () => {
        setState(prev => prev+=1)
    }

    React.useEffect(() => {
        // Update the document title using the browser API
        
        if(row){
            forceUpdate()
        }

      },[row]);
    
    return(
        <Popper className={styles.poppers} open={open} placement="right"  anchorEl={anchorEl} >
            <div className={styles.searchBar_container}>
                <TextField id="outlined-basic" label="Search" onChange={handleChange} variant="outlined" />
            </div>
            <div className={styles.customer_poppers_content}>
                <DataGrid
                    t={t}
                    columns={column}
                    rows={row}
                    delivery={true}
                    checkedLine={true}
                    singlePage={true}
                    handleCheckBoxChanged={handleCheckBoxChanged}
                />
            </div>
        </Popper>
    )
        
}


export default DataGridPopper

