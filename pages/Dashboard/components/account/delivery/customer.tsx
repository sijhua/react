import * as React from 'react';
import styles from './index.module.css';
import {FormControlLabel,RadioGroup,Radio, Button,TextField,Popper,Checkbox,Dialog,DialogContent,
    Collapse,List,ListItem,ListItemText,ListSubheader} from '@material-ui/core';
import DataGrid from '../../dataGrid'
import {customerList} from '../../../../../public/fakeData'
import { id } from 'date-fns/locale';

interface Props {
    t:(params: String) => string;
    getDatachange:(comd:string,data:any)=>void
    customer:any
    toDecimal2:(x:any) => any
  }

const createData=(data:any)=>{
    let temp = []
    data.map((d:any,i:any)=>{
        temp.push({editable:false,index:{item:d.index,type:"string"},scope:{item:d.scope,type:"cus-scope"},rate:{item:d.rate.includes("$")?d.rate.replace("$",""):d.rate,type:"rate"}})
    })
    return temp
}


const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}

const createCustomerListData=(data:any)=>{
    let temp = []
    data.map((d:any,i:any)=>{
        temp.push({id:{item:d.id,type:"string",checked:false},name:{item:d.name,type:"string"},Category:{item:d.Category,type:"string"}})
    })
    return temp
}

const initialState = {
    value:'both',
    anchorEl:null,
    expandOpen:false,
    customerLi:[],
    customers:[
        {name:"Business",id:"business",checked:false},
        {name:"Consumer",id:"consumer",checked:false},
        {name:"All",id:"all",checked:true},
        {name:"Important",id:"important",checked:false}
    ],
    customerRow:createCustomerListData(customerList),
    rowsList:[],
    open:false,
    editMenuListAnchorEl:null,
    editOpen:false,
    currentRow:null,
    newRate:'',
    newScope:'',
    editrow:false
  }

  type State = {
    value:string,
    anchorEl:any,
    expandOpen:boolean,
    customers:Array<any>,
    customerLi:Array<any>,
    rowsList:any,
    customerRow:any,
    open:boolean,
    editMenuListAnchorEl:any,
    editOpen:boolean
    currentRow:any,
    newRate:any,
    newScope:any,
    editrow:boolean
}
class Customer extends React.Component<Props, object> {

    
    state= initialState
    
    componentDidMount(){
        let tmp = []
        customerList.map((cus,ind)=>{
            cus.checked = false
            tmp.push(cus)
        })
        this.setState({customerLi:tmp})
        this.setState({rowsList:createData(this.props.customer)})
    }

    componentWillUnmount() {
        
    }
    shouldComponentUpdate(newProps, newState) {
        if(this.state.customerRow !==newState.customerRow){
            this.setState(newState.customerRow)
        }
        return true;
  }
    private customerColumn =[
        { id: 'id', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },
        { id: 'name', label: ['dashboard.acc.delivery.setDelivery.name'], minWidth: 100 },  
        { id: 'Category', label: ['dashboard.acc.delivery.setDelivery.category'], minWidth: 100 }, 
    ]
    private customerOrientatedColumn =[{ id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },  
    { id: 'scope', label: ['dashboard.acc.delivery.setDelivery.scope'], minWidth: 100 },  
    { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.rate'], minWidth: 100 }, 
    {
        id: 'more',
        label: "",
        minWidth: 10,
        align: "center",
    }
    ]

    private handleAction =(ev:any,command:string,row?:any)=>{

        switch(command){
            case commandList.ADD:
                this.addNewRow()
                break;
            case commandList.EDIT:

                this.enableEdit(ev,row)
                break;
            case commandList.DELETE:
                this.deleteEdit(ev,row)
                break;
            default:
                break
        }
    }
    private deleteEdit=(ev:any,row:any)=>{
        this.setState((preState,props)=>{
            preState['rowsList'].map((p,i)=>{
                if(p.index.item ==row.index.item){
                    preState['rowsList'].splice(i,1)
                }
            
            })
            this.update(preState['rowsList'])
            return {rowsList:preState['rowsList'],editOpen:false,editMenuListAnchorEl:false}})   
    }

    private enableEdit=(ev:any,row:any)=>{
        this.setState((preState,props)=>{
            
            preState['rowsList'].map((p,i)=>{
                if(p.index.item ==row.index.item){
                    preState['rowsList'][i].editable = true
                    
                    let tempcusList = row.scope.item.split(',')

                    tempcusList.map((t:any,index:any)=>{
                        preState['customerRow'].map((c:any,index:any)=>{
                            if(t==c.name.item){
                                c.id.checked = true
                            }
                        })
                    })
                }    
        })
        this.update(preState['rowsList'])
        return {rowsList:preState['rowsList'],currentRow:row,editOpen:false,editMenuListAnchorEl:false,customerRow:preState['customerRow']}})   
    }

    private onCusSeteditOpen=(event:any,row:any)=>{
        this.handleClick(event)
        
    }

    private addNewRow =()=>{
        this.setState((preState,props)=>{
            let temp = {editable:true,index:{item:preState['rowsList'].length+1,type:"string"},scope:{item:this.state.newRate,type:"cus-scope"},rate:{item:this.state.newRate,type:"rate"}}
            preState['rowsList'].push(temp)
            preState['currentRow'] = temp//{editable:true,index:{item:preState['rowsList'].length+1,type:"string"},scope:{item:this.state.newRate,type:"cus-scope"},rate:{item:this.state.newRate,type:"rate"}}
            this.update(preState['rowsList'])
            return {rowsList:preState['rowsList'],currentRow:preState['currentRow']}
        })


    }

    private onEditValue=(ev:any,command:string,row:any)=>{
        
        if(command==='rate'){
            this.setState(prevState=>{
                prevState['rowsList'].map(p=>{
                    if(p.index.item==row.index.item){
                        p.rate.item = ev.target.value
                    }
                })
                this.update(prevState['rowsList'])
                return {rowsList: prevState['rowsList']}
            })
        }
    }

    private handleCheckBoxChanged=(ev:any,i:any,row:any)=>{
       
        this.setState((preState,props)=>{
            
            preState['customerRow'].map((cus:any,index:any)=>{
                if(index ==i){
                    preState['customerRow'][i].id.checked = !preState['customerRow'][i].id.checked
                    preState['newScope']+=`${preState['customerRow'][i].name.item},`
                }
            })

            preState["rowsList"].map(r=>{
                if(r.index.item==this.state.currentRow.index.item){
                    r.scope.item=preState['newScope']
                }
            })
            
            return {customerRow:preState['customerRow'],newScope: preState['newScope']}
        })

    }
    private handleEdit=(event: any,row:any) => {
        this.setState({editMenuListAnchorEl:event.currentTarget,editOpen:!this.state.editOpen,currentRow:row})
      }

    private handleexpandOpenClick = () => {
        this.setState({expandOpen:!this.state.expandOpen});
    };
    private handleNaoDialogClose=()=>{
        this.setState({
            open:false})
      }

    private onSave=()=>{
        this.handleNaoDialogClose()
        if(!this.state.editrow){
            this.setState((preState,props)=>{
                preState['rowsList'].push({index:{item:preState['rowsList'].length+1,type:"string"},scope:{item:this.state.newRate,type:"string"},rate:{item:this.state.newRate,type:"price"}})
                return {rowsList:preState['rowsList']}})
        }else{
            this.setState((preState,props)=>{

                preState['rowsList'].map((p,i)=>{
                    if(p.index.item ==this.state.currentRow.index.item){
                        preState['rowsList'][i].scope.item = this.state.newScope
                        preState['rowsList'][i].rate.item = this.state.newRate
                    }
                
                })
                return {rowsList:preState['rowsList'],editrow:true}})
        }
        

    }

    private getnewRate =(event:any)=>{
        this.setState({newRate:event.target.value})
    }
    private handleClick = (event?:any) => {
        this.setState({
            anchorEl:event.currentTarget,
            customerRow:createCustomerListData(customerList),
            open:!this.state.open,
            editOpen:false})

    };

// TODO
    private handleChange = (event:any) => {
        
        this.setState((preState,props)=>{

            preState['customerRow'].map((c,i)=>{
                if(c.Category !== event.target.value){

                    preState['customerRow'].splice(i,1)
                }

            })

            return {customerRow:preState['customerRow'],value:event.target.value}
        })

  };

  private update = (data) =>{
        if(data){
            let clean = []
            data.map((p,i)=>{
                clean.push({index:p.index.item,
                    scope:p.scope.item,
                    rate:p.rate.item})
            })
            this.props.getDatachange("customer",clean)
        }
        
    }
    private formated = (cmd:string,id:any) =>{
        this.setState((preState,props) => {
            if(cmd=='rate') preState['rowsList'][id][cmd].item = this.props.toDecimal2(preState['rowsList'][id][cmd].item)
            return {rowsList:preState['rowsList']}
        })
    }

    render(){
        const {t} = this.props

        return(
            <div className={styles.customer_container}>
                
                <Popper className={styles.poppers} open={this.state.open} placement="right"  anchorEl={this.state.anchorEl} >
                    <div className={styles.customer_poppers_content}>
                        <div className={styles.selectCustomer_container}>
                            <div className={styles.selectCustomer_radio_container}>
                                <RadioGroup row aria-label="selectCustomer_radio_container" name="selectCustomer_radio_container" value={this.state.value} onChange={this.handleChange}>
                                    <FormControlLabel value="business" control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>} label={t("dashboard.acc.delivery.setDelivery.businessCustomer")} />
                                    <FormControlLabel value="consumer" control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>} label={t("dashboard.acc.delivery.setDelivery.consumerCustomer")} />
                                    <FormControlLabel value="both" control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>} label={t("dashboard.acc.delivery.setDelivery.both")} />
                                </RadioGroup>
                            </div>  
                        </div>

                        <DataGrid
                            t={t}
                            columns={this.customerColumn}
                            rows={this.state.customerRow}
                            handleEdit={this.handleEdit}
                            editMenuListAnchorEl={this.state.editMenuListAnchorEl}
                            editOpen={this.state.editOpen}
                            delivery={true}
                            checkedLine={true}
                            singlePage={true}
                            handleCheckBoxChanged={this.handleCheckBoxChanged}
                        />
                    </div>
                </Popper>
                {this.state.rowsList.length>0?
                <DataGrid
                    t={t}
                    columns={this.customerOrientatedColumn}
                    rows={this.state.rowsList}
                    singlePage={true}
                    handleEdit={this.handleEdit}
                    editMenuListAnchorEl={this.state.editMenuListAnchorEl}
                    editOpen={this.state.editOpen}
                    delivery={true}
                    handleAction={this.handleAction}
                    onCusSeteditOpen={this.onCusSeteditOpen}
                    onEditValue={this.onEditValue}
                    formated={this.formated}
                />:[]}
            </div>
        )
    }
}

export default Customer
