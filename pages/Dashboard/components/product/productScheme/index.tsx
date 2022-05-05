import * as React from 'react';
import styles from './index.module.css';
import DataGrid from '../../dataGrid';
// import {Popper,MenuItem,Select,TextField} from '@material-ui/core';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import DataFilter from '../../dataFilter';
import EditDialog from './EditDialog';
import {Products} from '../../../../../public/fakeData';

export interface Props {
    t:(params: String) => string;
}

const createDate = (product:any)=>{
    let rows = []
    product.forEach((element:any,index:any) => {
        element.products = {item:element.products,type:"img" }
        element.sku = {item:element.sku,type:"string" }
        element.FeatureProducts = {item:element.FeatureProducts,type:"string" }
        element.ProductName = {item:element.ProductName,type:"group_string",des:element.des}
        element.Category = {item:element.Category,type:"string"}
        element.Price = {item:element.Price,type:"price"}
        element.Color={item:element.Color,type:"color"}
        element.Sold={item:element.Sold,type:"item"}
        rows.push(element)
    });
    // console.log
    return rows
}

const initialState = {
    columns:[{ id: 'products', label: ['dashboard.acc.productSche.products'], minWidth: 100},  
            { id: 'ProductName',idList:['FeatureProducts','ProductName','sku'], 
            label: ["dashboard.acc.productSche.FeatureProducts","dashboard.acc.productSche.ProductName","dashboard.acc.productSche.sku"],currentLabel:1, minWidth: 100 },
            { id: 'Category', label: ["dashboard.acc.productSche.Category"], minWidth: 100 },
            { id: 'Price', label: ["dashboard.acc.productSche.Price"], minWidth: 100 },
            { id: 'Color', label: ["dashboard.acc.productSche.Color"], minWidth: 100 },
            { id: 'Sold', label: ["dashboard.acc.productSche.Sold"], minWidth: 100 },
            { id: 'Status', label:["dashboard.acc.productSche.Status"], minWidth: 100 }],
    rows:createDate(Products),
    editMenuListAnchorEl:null,
    editOpen:false,
    anchorEl:null,
    open:false,
    filterList:[{column:"products",ope:"Contains",val:"",logicOpe:"and"}],
    filteredItem:[{value:"products",label:"dashboard.acc.productSche.products"},
    {value:"FeatureProducts",label:"dashboard.acc.productSche.FeatureProducts"},
    {value:"ProductName",label:"dashboard.acc.productSche.ProductName"},
    {value:"Category",label:"dashboard.acc.productSche.Category"},],
    currentEditRow:null,
    dialogOpen:false
}


type State = {
    columns:Array<any>,
    rows:Array<any>,
    editMenuListAnchorEl:any,
    editOpen:boolean,
    anchorEl:any,
    open:boolean,
    filterList:any,
    filteredItem:Array<any>,
    currentEditRow:any,
    dialogOpen:boolean
}

class ProductScheme extends React.Component<Props, object> {

    state= initialState
    private ope = {
        EDIT:"Edit",
        ADD:"Add",
        HIDE:"Hide"
    }
    
    private handleEdit=(event:any,row:any)=>{
        this.setState({editMenuListAnchorEl:event.currentTarget,
            editOpen:!this.state.editOpen,
            currentEditRow:row})
    }
    private handleAction=(event: any,ope:any) =>{
        switch(ope){
            case this.ope.EDIT:
                this.setState({dialogOpen:true})
                break;
            case this.ope.ADD:
                this.setState({dialogOpen:true,currentEditRow:null})
                break;
            case this.ope.HIDE:
                break;
        }
        this.setState({
            editOpen:!this.state.editOpen})
            // console.log("currentEditRow",this.state.currentEditRow)
            
    }


    private handleChangeFilterCol = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].column = event.target.value
        this.setState({filterList:tempList})

    }

    private handleChangeFilterOpe = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].ope = event.target.value
        this.setState({filterList:tempList})
    }
    private getValue = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].val = event.target.value
        this.setState({filterList:tempList})
    }
    private handleChangeFilterLogicOpe = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].logicOpe = event.target.value
        this.setState({filterList:tempList})
    }

    private handAddCondition=()=>{
        const newfilter = {column:"products",ope:"Contains",val:"",logicOpe:"and"}
        let temfilterList = this.state.filterList
        temfilterList.push(newfilter)
        this.setState({filterList:temfilterList})
        // setFilterList(temfilterList)
        // forceUpdate()
        // console.log('filterList',filterList)
    }

    private handleDialogClose= ()=>{
        this.setState({dialogOpen:false})
    }

    render(){
        const {t} = this.props
        return (
            <div className={styles.productScheme_container}>
                <DataFilter
                    t={t}
                    filterList={this.state.filterList}
                    handleChangeFilterCol={this.handleChangeFilterCol}
                    handleChangeFilterOpe={this.handleChangeFilterOpe}
                    getValue={this.getValue}
                    handleChangeFilterLogicOpe={this.handleChangeFilterLogicOpe}
                    handAddCondition={this.handAddCondition}
                    filteredItem={this.state.filteredItem}
                />
                <div className={styles.productScheme_dataGrid_container}>
                    <DataGrid
                        t={t}
                        columns={this.state.columns}
                        rows={this.state.rows}
                        handleEdit={this.handleEdit}
                        handleAction={this.handleAction}
                        editMenuListAnchorEl={this.state.editMenuListAnchorEl}
                        editOpen={this.state.editOpen}
                        // onEditDialog={this.onEditDialog}
                    />
                    <EditDialog
                    t={t}
                    currentRow={this.state.currentEditRow}
                    open={this.state.dialogOpen}
                    handleClose={this.handleDialogClose}
                />
                </div>
            </div>
        )
    }
}

export default ProductScheme
 