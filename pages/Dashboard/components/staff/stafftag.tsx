import * as React from "react";
import styles from "./index.module.css";
import DataGrid from "../dataGrid";
import { staffData, staffDetail } from "../../../../public/fakeData";
import { Grid, Divider } from "@material-ui/core";
import DataFilter from "../dataFilter";
import DetailBoard from "./detailBoard";
import stafftag from '../../../../public/staffData/staff_active_web.json'
import stafftagDetail from '../../../../public/staffData/staff_active_web_details.json'

interface Props {

    t:(params: String) => string;
  }

function Stafftag(props: Props){
    const {t} = props

    const [rows, setrow] = React.useState(stafftag);
    const [states, setStates] = React.useState(0);
    const [currentItemId,setCurrentItemId] = React.useState(0);
    const [detailData, setDetailData] = React.useState(stafftagDetail)

    const forceUpdate=()=>{
      setStates((prev:any)=>prev+1)
    }

    const [columns , setColumns] = React.useState([
        { id: 'ava', label: ["common.blank"], minWidth: 80 },
        { id: 'name', label: ["dashboard.sal.Name"], minWidth: 110 },
        { id: 'title', label: ["dashboard.Position"], minWidth: 110 },
        {
          id: 'email',
          label: ["dashboard.sal.Emailaddress"],
          minWidth: 110,
          align: "center",
          format: (value:any) => value.toLocaleString('en-GB'),
        },
        {
          id: 'qualifications',
          label: ["dashboard.sal.Qualifications"],
          minWidth: 110,
          align: "center",
        //   format: (value) => value.toLocaleString('en-US'),'Size\u00a0(km\u00b2)'
        },
        {
          id: 'specialties',
          label: ["dashboard.sal.SpecialtyArea"],
          minWidth: 110,
          align: "center",
        //   align: 'right',
        //   format: (value) => value.toFixed(2),
        },
        {
            id: 'certificates',
            label: ["dashboard.sal.Certificate"],
            minWidth: 110,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
          {id: 'status', label:["dashboard.sal.Status"], minWidth: 20},
          {id: 'more', label:["common.blank"], minWidth: 50 },
        ]);
        const [CollapsedColumns , setCollapsedColumns] = React.useState([
          { id: 'ava', label: ["common.blank"], minWidth: 80 },
          { id: 'name', label: ["dashboard.sal.Name"], minWidth: 110 },
          { id: 'title', label: ["dashboard.Position"], minWidth: 110 },
          { id: 'more', label:["common.blank"], minWidth: 50 },
          ]);
        const [filterList,setFilterList] = React.useState([{column:"Staff_NEW",ope:"Contains",val:"",logicOpe:"and"}]);
    const [filteredItem,setFilteredItem] = React.useState([{value:"Staff_NEW",label:"dashboard.acc.sale.Staff_NEW"},
    {value:"MostsaleProduct",label:"dashboard.acc.sale.MostsaleProduct"},
    {value:"Ranking",label:"dashboard.acc.sale.Ranking"}]);
    //     const [detailData , setDetailData] = React.useState({name:"Tom Williams",
    //     position:"Client Manager",
    //     email:"xxxxxx@gmail.com",
    //     phone:"0480 393 283",
    // address:"6 Avence st, Chatswood, Nsw",
    // data:[{id:"Sales_today",name:"Sales today ",value:"$9075.00"},
    // {id:"Monthly_Sales",name:"Monthly Sales",value:"$29085.00"},
    // {id:"Yearly_Sales",name:"Yearly Sales",value:"$114305.00"}]})

    const [isCollapsed ,setIsCollapsed]= React.useState(false)

    const handleChangeFilterCol = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].column = event.target.value
        setFilterList(tempList)
    }

    const handleChangeFilterOpe = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].ope = event.target.value
        setFilterList(tempList)
    }
    const getValue = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].val = event.target.value
        setFilterList(tempList)
    }

    const handleChangeFilterLogicOpe = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].logicOpe = event.target.value
        setFilterList(tempList)
    }

    const handAddCondition=()=>{
        const newfilter = {column:"products",ope:"Contains",val:"",logicOpe:"and"}
        let temfilterList = this.state.filterList
        temfilterList.push(newfilter)
        setFilterList(temfilterList)
    }

    const onSetisCollapsed=()=>{
        setIsCollapsed(true)
    }
        const ope = {
            EDIT:"Edit",
            ADD:"Add",
            HIDE:"Hide"
        }
        
        const handleEdit=(event:any,row:any)=>{
            // this.setState({editMenuListAnchorEl:event.currentTarget,
            //     editOpen:!this.state.editOpen,
            //     currentEditRow:row})
        }
        const handleAction=(event: any,ope:any,row?:any)=>{

            switch(ope){
                case ope.EDIT:
                    // this.setState({dialogOpen:true})
                    break;
                case ope.ADD:
                    // this.setState({dialogOpen:true,currentEditRow:null})
                    break;
                case ope.HIDE:
                    break;
            }
                
        }
    
    const creatData =(data:any)=>{
        
        let rows = []
            data.forEach((element:any,index:any) => {
                element.ava = {item:element.ava,type:"img"}
                element.Name = {item:element.Name,type:"string"}
                element.Position = {item:element.Position,type:"string"}
                rows.push(element)
            });
        return rows
    }

    const [row , setRows] = React.useState(stafftag.profile)

    const staffAction =(event: any,row:any)=>{
      setCurrentItemId(row.id)
      setIsCollapsed(false)
      forceUpdate()
    }

  return (
    <div className={styles.salesApplication_container}>
      <div className={styles.sales_container}>
        <div className={styles.sales_container}>
          <DataFilter
            t={t}
            filterList={filterList}
            handleChangeFilterCol={handleChangeFilterCol}
            handleChangeFilterOpe={handleChangeFilterOpe}
            getValue={getValue}
            handleChangeFilterLogicOpe={handleChangeFilterLogicOpe}
            handAddCondition={handAddCondition}
            filteredItem={filteredItem}
          />
        </div>
        <div className={styles.staff_salesApplication_container}>
          {!isCollapsed
            ? (<div className={styles.staff_datagrid_container}>
                <div className={styles.staff_datagrid}>
                  <DataGrid
                  t={t}
                  columns={CollapsedColumns}
                  rows={row}
                  handleEdit={handleEdit}
                  handleAction={handleAction}
                  simpleMore={true}
                  staffAction={staffAction}
                  singlePage={true}
                  hide_x_overflow={!isCollapsed}
                  />
                </div>
              </div>
            ): (<div className={styles.staff_datagrid_open}>
                  <DataGrid
                  t={t}
                  columns={columns}
                  rows={row}
                  handleEdit={handleEdit}
                  handleAction={handleAction}
                  simpleMore={true}
                  staffAction={staffAction}
                  singlePage={true}
                  hide_x_overflow={!isCollapsed}
                  />
              </div>
            )}
          {/* <div
            className={
              !isCollapsed
                ? styles.staff_datagrid_container
                : styles.staff_datagrid_open
            }
          >
            <div
              className={
                !isCollapsed
                  ? styles.staff_datagrid
                  : styles.staff_datagrid_open
              }
            >
              <DataGrid
                t={t}
                columns={columns}
                rows={row}
                handleEdit={handleEdit}
                handleAction={handleAction}
                simpleMore={true}
                staffAction={staffAction}
                singlePage={true}
                hide_x_overflow={!isCollapsed}
              />
            </div>
          </div> */}

          {!isCollapsed ? (
            <div className={styles.detail_container}>
              <div
                onClick={onSetisCollapsed}
                className={styles.staff_datagrid_collapsed_bt_container}
              >
                <div className={styles.staff_datagrid_collapsed_bt}>
                  <img
                    className={styles.selectePointer_img}
                    src="/img/dashboard/pointout.svg"
                  ></img>
                </div>
                <div className={styles.staff_datagrid_collapsed_toRight_bt}>
                  <img
                    className={styles.selectePointer_img}
                    src="/img/dashboard/toRight.svg"
                  ></img>
                </div>
              </div>
              <div className={styles.staff_detail_container}>
                <DetailBoard t={t} detailData={detailData} />
              </div>
            </div>
          ) : (
            []
          )}
        </div>
      </div>
    </div>
  );
}

export default Stafftag;
