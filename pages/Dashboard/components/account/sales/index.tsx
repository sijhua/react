import * as React from 'react';
import styles from './index.module.css';
import DataGrid from '../../dataGrid';
import DataFilter from '../../dataFilter';
import EditDialog from './EditDialog';
import {SalesData} from '../../../../../public/fakeData';

export interface Props {
    t:(params: String) => string;
}

const createDate = (product:any)=>{
    let rows = []
    product.forEach((element:any,index:any) => {
        element.StaffProfile = {item:element.StaffProfile,type:"img" }
        element['Staff_NEW'] = {item:element['Staff_NEW'],type:"string" }
        element.MostsaleProduct = {item:element.MostsaleProduct,type:"group_string" ,des:element.des}
        element.Ranking = {item:element.Ranking,type:"ranking"}
        element.YearlyCommisiion = {item:element.YearlyCommisiion,type:"price"}
        element.MonthlyCommisiion = {item:element.MonthlyCommisiion,type:"price"}
        element.Customer={item:element.Customer,type:"string"}
        element.Products_sale={item:element.Products_sale,type:"item"}
        element.TotalsolditemMonthly={item:element.TotalsolditemMonthly,type:"item"}
        element.Products_New={item:element.Products_New,type:"item"}
        rows.push(element)
    });
    return rows
}

const initialState = {
    columns:[{ id: 'StaffProfile',currentLabel:1,idList:['Staff_NEW','StaffProfile'], label: ['dashboard.acc.sale.Staff_NEW','dashboard.acc.sale.StaffProfile'], minWidth: 100 },  
    { id: 'MostsaleProduct', label: ["dashboard.acc.sale.MostsaleProduct"],minWidth: 100 },
    { id: 'Ranking', label: ["dashboard.acc.sale.Ranking"], minWidth: 100 },
    { id: 'YearlyCommisiion',currentLabel:1,idList:['YearlyCommisiion','MonthlyCommisiion'],  label: ["dashboard.acc.sale.YearlyCommisiion","dashboard.acc.sale.MonthlyCommisiion"], minWidth: 100 },
    { id: 'Customer', label: ["dashboard.acc.sale.Customer"], minWidth: 100 },
    { id: 'Products_sale',currentLabel:1,idList:['Products_sale','TotalsolditemMonthly','Products_New'], label: ["dashboard.acc.sale.Products_sale","dashboard.acc.sale.TotalsolditemMonthly","dashboard.acc.sale.Products_New"], minWidth: 100 },
    { id: 'Status', label:["dashboard.acc.productSche.Status"], minWidth: 100 }],
    editMenuListAnchorEl:null  ,
    editOpen:false ,
    rows:createDate(SalesData),

    filterList:[{column:"Staff_NEW",ope:"Contains",val:"",logicOpe:"and"}],
    filteredItem:[
    {value:"Staff_NEW",label:"dashboard.acc.sale.Staff_NEW"},
    {value:"MostsaleProduct",label:"dashboard.acc.sale.MostsaleProduct"},
    {value:"Ranking",label:"dashboard.acc.sale.Ranking"}],
    currentEditRow:null,
    dialogOpen:false
}
type State = {
    columns:Array<any>,
    editMenuListAnchorEl:any,
    editOpen:boolean,
    anchorEl:any,
    open:boolean,
    filterList:any,
    filteredItem:Array<any>,
    currentEditRow:any,
    dialogOpen:boolean
}

class Sales extends React.Component<Props, object> {

    state = initialState

    private ope = {
        EDIT:"Edit",
        ADD:"Add",
        HIDE:"Hide"
    }

    private handleEdit=(event:any,row:any)=>{
        this.setState({editMenuListAnchorEl:event.currentTarget,
            editOpen:!this.state.editOpen})
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
    }

    private handleDialogClose= ()=>{
        this.setState({dialogOpen:false})
    }

    render(){
        const {t} = this.props
        return (
            <div className={styles.sales_container}>
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
                <div className={styles.sales_dataGrid_container}>
                    <DataGrid
                        t={t}
                        columns={this.state.columns}
                        handleEdit={this.handleEdit}
                        handleAction={this.handleAction}
                        editMenuListAnchorEl={this.state.editMenuListAnchorEl}
                        editOpen={this.state.editOpen}
                        rows={this.state.rows}
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

export default Sales