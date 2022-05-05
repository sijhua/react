import * as React from 'react';
import styles from './index.module.css';
import {FormControlLabel,RadioGroup,Radio, Button,Dialog,DialogContent,
    Collapse,List,ListItem,ListItemText,ListSubheader} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DataGrid from '../../dataGrid'
import Map from './map'


interface Props {
    t:(params: String) => string;
    getDatachange:(comd:string,data:any)=>void
    postcode:any;
    toDecimal2:(x:any) => any
  }
  
  function Postcode(props: Props){
    const {t,toDecimal2} = props

    
  const customerOrientatedColumn =  [
      { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },  
      { id: 'from', label: ['dashboard.acc.delivery.setDelivery.from'], minWidth: 100 },  
      { id: 'to', label: ['dashboard.acc.delivery.setDelivery.to'], minWidth: 100 },  
      { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.rate'], minWidth: 100},  
      {
        id: 'more',
        label: "",
        minWidth: 10,
        align: "center"
      }
  ]

    const createData = (post:any)=>{
        let rows = []
        post.forEach((element:any,index:any) => {
            // let rate = element.rate.replace("$",'')
            rows.push({index:{item:element.index,type:'string'},
                        from:{item:element.from,type:'es'},
                        to:{item:element.to,type:'map'},
                        rate:{item:element.rate?toDecimal2(element.rate):element.rate,type:'rate'}})
        });
        return rows
    }

    const [rows, setRows] = React.useState(createData(props.postcode));
    const [value, setValue] = React.useState('female');
    const [open, setOpen] = React.useState(false);
    const [expandOpen, setExpandOpen] = React.useState(false);
    const [editMenuListAnchorEl,setEditMenuListAnchorEl]= React.useState(null);
    const [editOpen,setEditOpen] = React.useState(false);
    const [currentRow,setCurrentRow] = React.useState(null);
    const [state,setState] = React.useState(0);
    const [subList,setSubList] = React.useState('');

    const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}

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
        case commandList.SAVE:

            saveEdit(ev,row)
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


    const saveEdit=(ev:any,row:any)=>{
        setRows(prev=>{
            prev.forEach((p,i)=>{
                if(p.index.item ==row.index.item){
                    p.editable = false
                }

            })
            update(prev)
            return prev
        })

        forceUpdate()
        setOpen(false)
    }
    const onSave =()=>{
        let newList = ''
        if(subList!=""){
            let temp = subList.split(', ')
            temp.forEach((t,i)=>{
                let templ = t.split(" ")
                if(templ[templ.length-2]!=" "){
                    let next = i==temp.length-1?"":", "
                    newList+=templ[templ.length-1]+next

                }
                

            })
            
        }
        setRows(prev=>{
                prev.map(p=>{
                    if(p.index.item==currentRow.index.item){
                        p.to.item = newList
                    }
                    
                })
                update(prev)
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
            from:{item:"1 mcintyre st burwood vic 3125",type:'rate'},
            to:{item:"",type:'map'},
            rate:{item:0,type:'rate'}})  
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

    const formated = (cmd:string,id:any) =>{
        setRows(prev => {
            if(cmd=='rate') prev[id][cmd].item = toDecimal2(prev[id][cmd].item)
            return prev
        })
        forceUpdate()
    }
    
    

    const update = (data) =>{
        if(data){
            let clean = []
            data.map((p,i)=>{
                clean.push({"index":p.index.item,
                    "from":p.from.item,
                    "to":p.to.item,
                    "percentage":p.rate.item})
            })
            props.getDatachange("postcode",clean)
        }
    }
    return(
        <div className={styles.customer_container}>
            <Dialog classes={{paperWidthSm:styles.paper_WidthXs_map}}  onClose={handleClose} id={id} open={open} >
                <DialogContent>
                    <div className={styles.customer_poppers_content}>
                        <Map
                            onselectedSub={onselectedSub}
                            t={t}/>
                    </div>
                    <div className={styles.map_dialog_bt_container}>
                        <Button onClick={onSave} classes={{root:styles.dialog_bt}}>{t("common.save")}</Button>
                        <Button onClick={handleNaoDialogClose} classes={{root:styles.dialog_bt}}>{t("common.cancel")}</Button>
                    </div>
                </DialogContent>
                
            </Dialog>
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
            />
        </div>
    )
}

export default Postcode
