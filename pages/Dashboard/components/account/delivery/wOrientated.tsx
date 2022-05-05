import * as React from 'react';
import styles from './index.module.css';
import {FormControlLabel,RadioGroup,Radio, Button,Dialog,DialogContent,
    Collapse,List,ListItem,ListItemText,ListSubheader,Snackbar,IconButton} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DataGrid from '../../dataGrid'
import CloseIcon from "@material-ui/icons/Close";


interface Props {
    t:(params: String) => string;
    getDatachange:(comd:string,data:any)=>void
    vwdata:any,
    limitation:any,
    toDecimal2:(x:any) => any
  }
  

function WOrientated(props: Props){
    const {t,toDecimal2} = props

    
  const customerOrientatedColumn =  [
      { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },  
      { id: 'weight', label: ['common.weight'], minWidth: 100 },  
      { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.rate'], minWidth: 100 },  
      {
        id: 'more',
        label: "",
        minWidth: 10,
        align: "center"
      }
  ]
  
    const createData = (data:any)=>{
        let rows = []

        data.forEach((element:any,index:any) => {
            console.log("element.rate",element.rate)
            let rate = element.rate?element.rate.replace("$",''):''
            rows.push({index:{item:element.index,type:'string'},
                        weight:{item:element.w,type:'rs'},
                        rate:{item:toDecimal2(rate),type:'rate'}})
        });
        return rows
    }

    const [rows, setRows] = React.useState(createData(props.vwdata));
    const [value, setValue] = React.useState('female');
    const [open, setOpen] = React.useState(false);
    const [expandOpen, setExpandOpen] = React.useState(false);
    const [editMenuListAnchorEl,setEditMenuListAnchorEl]= React.useState(null);
    const [editOpen,setEditOpen] = React.useState(false);
    const [currentRow,setCurrentRow] = React.useState(null);
    const [state,setState] = React.useState(0);
    const [subList,setSubList] = React.useState('');
    const [openSnackbar,setOpenSnackbar] = React.useState(false);

    const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}

    const handleCloseSnackbar = (
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string
    ) =>{
        if (reason === "clickaway") {
            return;
          }
      
          setOpenSnackbar(false);
    }

    const forceUpdate =()=>{
        setState(prev=>prev+=1)
    }
    const handleEdit=(event: any,row:any) => {
    setEditOpen(prev => !prev)
    if(row){
        setCurrentRow(row)
    }
    setEditMenuListAnchorEl(editMenuListAnchorEl?null : event.currentTarget)

    }
  const handleexpandOpenClick = () => {
    setExpandOpen(!expandOpen);
  };


  const handleClick = (event:any) => {
    setOpen(true)
  };

  const id = open ? 'simple-popper' : undefined;

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };

  const handleClose=(event:any)=>{

  }
  const handleNaoDialogClose=()=>{
    setOpen(false)
  }
  const handleAction =(ev:any,command:string,row?:any)=>{
    if(row){
      setCurrentRow(row)
      forceUpdate()
    }
    switch(command){
        case commandList.ADD:
            addNewRow()
            break;
        case commandList.EDIT:

            enableEdit(ev,row)
            break;
        case commandList.DELETE:
            deleteEdit(ev,row)
            break;
        default:
            break
    }
}
    const deleteEdit=(ev:any,row:any)=>{
        setRows(prev=>{
            // let id = null
            let temp = JSON.parse(JSON.stringify(prev))
            temp.map((p,i)=>{
                if(p.index.item ==row.index.item){
                    prev.splice(i,1)
                }
            
            })
            update(prev)
            return prev
        })
        
        setEditMenuListAnchorEl(null)
        setEditOpen(false)
        forceUpdate()
    }

    const onSave =()=>{
        let newList = ''
        if(subList!=""){
            let temp = subList.split(', ')
            temp.forEach(t=>{
                let templ = t.split(" ")
                newList+=templ[templ.length-1]+" "

            })
        }
        setRows(prev=>{
                prev.map(p=>{
                    if(p.index.item==currentRow.index.item){
                        p.to.item = newList
                    }
                    
                })
                // update(prev)
                return prev
        })

        setOpen(false)
    }
    const onselectedSub=(list:string)=>{
        setSubList(list)
        forceUpdate()
    }
    const enableEdit=(ev:any,row:any)=>{
        setRows(prev=>{
            prev.forEach((p,i)=>{
                
                if(p.index.item ==row.index.item){
                    p.editable = true
                }

            })
            update(prev)
            return prev
        })

        forceUpdate()
    }
    const onCusSeteditOpen =()=>{
        setOpen(true)
    }
    const addNewRow = ()=>{

        setRows(prev=>{
            prev.push({index:{item:prev.length+1,type:'string'},
            weight:{item:0.00,type:'rs'},
            rate:{item:0.00,type:'rate'}})  
            update(prev)
            return prev
        })

        forceUpdate()

        
    }
    const onEditValue=(ev:any,command:string,therow:any)=>{

        setRows(prev=>{
            prev.map(p=>{

                if(p.index.item==therow.index.item){
                    p[command].item = ev.target.value
                }
                
            })

            update(prev)
            return prev
        })

        forceUpdate()
    }

    const update = (r) =>{
        if(r){
            let clean = []
            r.map((p,i)=>{
                clean.push({"index":p.index.item,
                    "w":p.weight.item,
                    "rate":p.rate.item})
            })
            props.getDatachange("witems",clean)
        }
    }
    const formated = (cmd:string,id:any) =>{

        setRows(prev => {
            if(cmd=='rate'){
                prev[id][cmd].item = toDecimal2(prev[id][cmd].item)
            }
            return prev
        })
        forceUpdate()
    }
    const valided = (cmd:string,i:any) =>{
        console.log('props.limitation[cmd]',props.limitation[cmd])
        if(rows[i][cmd].item<props.limitation[cmd]){
            
            setRows(prev=>{
                prev[i][cmd].item = props.limitation[cmd]
                return prev
            })
            setOpenSnackbar(true)
        }
    }
    
    return(
        <div className={styles.customer_container}>
            <DataGrid
                t={t}
                columns={customerOrientatedColumn}
                rows={rows}
                singlePage={true}
                editMenuListAnchorEl={editMenuListAnchorEl}
                editOpen={editOpen}
                handleEdit={handleEdit}
                delivery={true}
                handleAction={handleAction}
                onEditValue={onEditValue}
                onCusSeteditOpen={onCusSeteditOpen}
                formated={formated}
                valided={valided}
            />
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
        </div>
    )
}

export default WOrientated
