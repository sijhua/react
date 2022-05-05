import * as React from 'react';
import styles from './index.module.css';
import {FormControlLabel,RadioGroup,Radio, Button,Popper,
    Collapse,List,ListItem,ListItemText,ListSubheader} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DataGrid from '../../dataGrid'

interface Props {
    t:(params: String) => string;
    getDatachange:(comd:string,data:any)=>void
    coupon:any;
    toDecimal2:(x:any) => any
  }
  
  function Coupon(props: Props){
    const {t,toDecimal2} = props

    
    const customerOrientatedColumn =  [
        { id: 'index',label:["dashboard.acc.delivery.setDelivery.index"], minWidth: 100 },  
        { id: 'code',label:["dashboard.acc.delivery.setDelivery.couponCode"], minWidth: 100 },
        { id: 'scope',label:["dashboard.acc.delivery.setDelivery.scope"], minWidth: 100 },    
        { id: 'period',label:["dashboard.acc.delivery.setDelivery.period"], minWidth: 100 },  
        { id: 'custom',label:["dashboard.acc.delivery.setDelivery.customers"], minWidth: 100 },
        { id: 'percentage',label:["dashboard.acc.delivery.setDelivery.percentage"], minWidth: 100 } ,
        {
          id: 'more',
          label: "",
          minWidth: 10,
          align: "center",
        }
    ]

    const createData = (data:any) =>{
        let temp = []
        data.map(d=>{
          temp.push({editable: false,index: { item: d.index, type: 'string' },
          code: { item: d.code, type: 'es' },
          scope: { item: d.scope, type: 'es' },
          custom: { item: d.custom, type: 'es' },
          period: { item: d.period, type: 'Daterange' },
          percentage: { item: d.percentage, type: 'es' }})
        })

        return temp
    }


    const [rows, setRows] = React.useState(createData(props.coupon));
    const [value, setValue] = React.useState('female');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [expandOpen, setExpandOpen] = React.useState(false);
    const [editMenuListAnchorEl,setEditMenuListAnchorEl]= React.useState(null);
    const [editOpen,setEditOpen] = React.useState(false);
    const [currentRow,setCurrentRow] = React.useState(null);
    const [state ,setState] = React.useState(0);

    const forceUpdate=()=>{
      setState(prev=>prev+=1)
    }
    const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}

    const handleEdit=(event: any,row:any) => {
      setEditOpen(prev => !prev)
      setCurrentRow(row)
      setEditMenuListAnchorEl(editMenuListAnchorEl?null : event.currentTarget)
    }
    const handleexpandOpenClick = () => {
      setExpandOpen(!expandOpen);
    };


  

  const handleClick = (event:any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onDatachange =(dataId:string,data:any,currentRow:any)=>{
    let temp = []

    setRows(prev =>{
      prev.map((row:any)=>{
        if(row.index.item == currentRow.index.item){
          row.period.item = data
        }
        
      })
      return prev
    })
    

    setRows(temp)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };
  const onSetdata=()=>{
    // let temp 
  }
  const handleAction =(ev:any,command:string,row?:any)=>{
    if(row){
      setCurrentRow(row)
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
  setEditMenuListAnchorEl(null)
  setEditOpen(false)
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
}

  const enableEdit=(ev:any,row:any)=>{
      setRows(prev=>{
          prev.forEach((p,i)=>{
              if(p.index.item ==row.index.item){
                  p.editable = true
              }

          })
          return prev
      })
  }
  const addNewRow = ()=>{

      setRows(prev=>{
          prev.push({editable: false,index: { item: prev.length, type: 'string' },
          code: { item: "", type: 'rate' },
          scope: { item: "", type: 'rate' },
          custom: { item: "", type: 'rate' },
          period: { item: "", type: 'Daterange' },
          percentage: { item: "", type: 'rate' }})
          update(prev)
          return prev
      })

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
  const update = (data) =>{
    if(rows){
        let clean = []
        rows.map((p,i)=>{
          if(p.index){
            clean.push({"index":p.index.item,
                "code":p.code.item,
                "scope": p.scope.item,
                "custom": p.custom.item,
                "period": p.period.item,
                "percentage": p.percentage.item})}
        })
        props.getDatachange("coupon",clean)
    }
  }
  const formated = (cmd:string,id:any) =>{

    setRows(prev => {
      if(cmd=='rate') prev[id][cmd].item = toDecimal2(prev[id][cmd].item)
        return prev
    })
    forceUpdate()
}


    return(
        <div className={styles.customer_container}>
            <DataGrid
                t={t}
                columns={customerOrientatedColumn}
                rows={rows}
                singlePage={true}
                onDatachange={onDatachange}
                editMenuListAnchorEl={editMenuListAnchorEl}
                editOpen={editOpen}
                handleEdit={handleEdit}
                delivery={true}
                handleAction={handleAction}
                onEditValue={onEditValue}
                formated={formated}
            />
        </div>
    )
}

export default Coupon
