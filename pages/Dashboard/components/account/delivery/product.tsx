import * as React from 'react';
import { useMediaQuery } from 'react-responsive'
import DataGrid from '../../dataGrid'
import style from './index.module.css';
import {deliveryProductOrientatedData,treeData} from '../../../../../public/fakeData'
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import {FormControl,FormLabel,RadioGroup,FormControlLabel,Radio} from '@material-ui/core';


interface Props {
    t:(params: String) => string;
    getDatachange:(comd:string,data:any)=>void
    product:any
    toDecimal2:(x:any) => any
  }

function Product(props: Props){
    const {t,toDecimal2} = props
    const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}
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
    const [editMenuListAnchorEl,setEditMenuListAnchorEl]= React.useState(null);
    const [editOpen,setEditOpen] = React.useState(false);
    const [currentRow,setCurrentRow] = React.useState(null);
    const [value, setValue] = React.useState("minRate");

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

    const productOrientatedColumn =  [
        { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },
        { id: 'scope', label: ['dashboard.acc.delivery.setDelivery.Scope'], minWidth: 100 },
        { id: 'vw', label: ['dashboard.acc.delivery.setDelivery.vol_wei_range'], minWidth: 100 },
        { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.Rate'], minWidth: 100 },
        {
            id: 'more',
            label: "",
            minWidth: 10,
            align: "center",
          } 
    ]
       
    const createData=(rows:Array<any>)=>{
        let tempList = []
        
        rows.map((row,index)=>{
            let rate = row.rate.includes("$")?row.rate.replace("$",""):row.rate
            tempList.push({
            editable:false,
            index:{item:row.index,type:"string"},
            scope:{item:row.scope,treeList:setScope(row.scope),type:"scope"},rate:{item:rate?toDecimal2(rate):rate,type:"rate"},
            vw:{item:{volume:row.vw.volume,weight:row.vw.weight},type:"slider"}})

            })

        return tempList
    }
    const setScope = (scope:any) =>{    
        let scopeList = scope.split(',')
        
        let tempNode = JSON.parse(JSON.stringify(treeData));
        let nodesList = setnode(tempNode,scopeList)
        return nodesList
    }
    const setnode = (nodes:any,scopeList:any) =>{

        nodes.forEach((n,i) => {
            scopeList.forEach(element => {
                if(element==n.name){
                    n.checked = true
                }else if(n.children){
                    n.checked = false

                    n.children=setnode(n.children,scopeList)
                }else{
                    n.checked = false
                }
            });
            
        });

        return nodes
        
    }

    
    const [productOrientatedRow ,setProductOrientatedRow] = React.useState(createData(props.product));

    const handleAction =(ev:any,command:string,row?:any)=>{

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
        setProductOrientatedRow(prev=>{
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
        setProductOrientatedRow(prev=>{
            prev.forEach((p,i)=>{
                if(p.index.item ==row.index.item){
                    p.editable = false
                }

            })
            update(prev)
            return prev
        })
        
        forceUpdate()

    }
    const onEditValue=(ev:any,command:string,row:any)=>{
        
            setProductOrientatedRow(prev=>{
                prev.map(p=>{
                    if(p.index.item==row.index.item){
                        p[command].item = ev.target.value
                    }
                })
                update(prev)
                return prev
            })
        
        forceUpdate()


    }
    const enableEdit=(ev:any,row:any)=>{
        setProductOrientatedRow(prev=>{
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
    const addNewRow = ()=>{

        setProductOrientatedRow(prev=>{
            prev.push({ editable: true,index:{item:prev.length+1,type:"string"},
            scope:{item:'',treeList:setScope(""),type:"scope"},rate:{item:"0",type:"rate"},
            vw:{item:{volume:0,weight:0},type:"slider"}})
            update(prev)
            return prev
        })
        
        forceUpdate()
        
    }
    
    const update = (data) =>{
        if(data){
            let clean = []
            data.map((p,i)=>{
                clean.push({
                    "index":p.index.item,
                    "scope":p.scope.item,
                    "vw":{"volume":p.vw.item.volume,
                        "weight":p.vw.item.weight},
                    "rate":p.rate.item})
            })
            props.getDatachange("product",clean)
        }
        
    }
    const onDatachange =(type:string,data:any,currentRow:any)=>{
        if(type=="vw"){
            setProductOrientatedRow(prev=>{
                prev.map(p=>{
                    if(p.index.item == currentRow.index.item){
                        p.vw[type] = data
                    }
                })
                update(prev)
                return prev
            })
        }else{
            setProductOrientatedRow(prev=>{
                prev.map(p=>{
                    if(p.index.item == currentRow.index.item){
                        p[type].item = data
                    }
                })
                update(prev)
                return prev
            })
            
            forceUpdate()
        }
        
    }
    const handleChange = (event:any) => {
        setValue(event.target.value)
    }

    const formated = (cmd:string,id:any) =>{

        setProductOrientatedRow(prev => {
            if(cmd=='rate') prev[id][cmd].item = toDecimal2(prev[id][cmd].item)
            return prev
        })
        forceUpdate()
    }
    
    

    return(
        <div className={style.product_container}>
            <div className={style.radioGroup_container}>
            <FormControl component="fieldset">
                <FormLabel classes={{root:style.formLabel_root}} component="legend">{t('dashboard.acc.delivery.setDelivery.multMatch')}</FormLabel>
                <RadioGroup aria-label="multMatch" name="multMatch" value={value} onChange={handleChange}>
                    <FormControlLabel classes={{label:style.formControlLabel_label}} value="minRate" control={<Radio classes={{root:style.radio_root}} color="primary" />} label={t('dashboard.acc.delivery.setDelivery.minRate')} />
                    <div className={style.label_des}>{t('dashboard.acc.delivery.setDelivery.minRate_exp')}</div>
                    <FormControlLabel classes={{label:style.formControlLabel_label}} value="maxRate" control={<Radio classes={{root:style.radio_root}} color="primary" />} label={t('dashboard.acc.delivery.setDelivery.maxRate')} />
                    <div className={style.label_des}>{t('dashboard.acc.delivery.setDelivery.maxRate_exp')}</div>
                    <FormControlLabel classes={{label:style.formControlLabel_label}} value="avgRate" control={<Radio classes={{root:style.radio_root}} color="primary" />} label={t('dashboard.acc.delivery.setDelivery.avgRate')} />
                    <div className={style.label_des}>{t('dashboard.acc.delivery.setDelivery.avgRate_exp')}</div>
                    <FormControlLabel classes={{label:style.formControlLabel_label}} value="rateSum" control={<Radio classes={{root:style.radio_root}} color="primary" />} label={t('dashboard.acc.delivery.setDelivery.rateSum')} />
                    <div className={style.label_des}>{t('dashboard.acc.delivery.setDelivery.rateSum_exp')}</div>
                </RadioGroup>
                </FormControl>
            </div>
            <DataGrid
                t={t}
                columns={productOrientatedColumn}
                rows={productOrientatedRow}
                singlePage={true}
                simpleMore={true}
                volume={volume}
                weight={weight}
                treeData={treeData}
                editMenuListAnchorEl={editMenuListAnchorEl}
                editOpen={editOpen}
                handleEdit={handleEdit}
                delivery={true}
                handleAction={handleAction}
                onEditValue={onEditValue}
                onDatachange={onDatachange}
                formated={formated}
                                />
        </div>
    )
}

export default React.memo(Product)