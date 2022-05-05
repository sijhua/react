import * as React from 'react';
import styles from './index.module.css';
import DataGrid from '../dataGrid'
import DataFilter from '../dataFilter';
import DetailBoard from './detailBoard';
import salesApplication from '../../../../public/staffData/staff_applicant_web.json'
import salesApplicationDetail from '../../../../public/staffData/staff_applicant_web_details.json'


interface Props {
    t:(params: String) => string;
    downloadOnly:boolean
  }
  
  function SalesApplication(props: Props) {
    const {t} = props

    const [isCollapsed ,setIsCollapsed]= React.useState(true)
    const [detailData, setDetailData] = React.useState(salesApplicationDetail)
    const [states, setStates] = React.useState(0);
    const [filterList,setFilterList] = React.useState([{column:"Staff_NEW",ope:"Contains",val:"",logicOpe:"and"}]);
    const [currentItemId,setCurrentItemId] = React.useState(0);
    const [filteredItem,setFilteredItem] = React.useState([{value:"Staff_NEW",label:"dashboard.acc.sale.Staff_NEW"},
    {value:"MostsaleProduct",label:"dashboard.acc.sale.MostsaleProduct"},
    {value:"Ranking",label:"dashboard.acc.sale.Ranking"}]);

    const forceUpdate=()=>{
        setStates((prev:any)=>prev+1)
    }

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

    const co2=[
        { id: 'Date', label: ["dashboard.sal.Date"], minWidth: 110 , align: "center"},
        { id: 'Name', label:[ "dashboard.sal.Name"], minWidth: 110, align: "center"},
        {
          id: 'Emailaddress',
          label: ["dashboard.sal.Emailaddress"],
          minWidth: 110,
          align: "center",
          format: (value:any) => value.toLocaleString('en-GB')
        }
    ]

    const col = [
        { id: 'lodgedAt', label: ["dashboard.sal.Date"], minWidth: 110 , align: "center",},
        { id: 'name', label:[ "dashboard.sal.Name"], minWidth: 110, align: "center", },
        {
          id: 'email',
          label: ["dashboard.sal.Emailaddress"],
          minWidth: 110,
          align: "center",
          format: (value:any) => value.toLocaleString('en-GB'),
        }
        ,
        {
          id: 'qualifications',
          label: ["dashboard.sal.Qualifications"],
          minWidth: 110,
          align: "center",

        },
        {
          id: 'specialties',
          label: ["dashboard.sal.SpecialtyArea"],
          minWidth: 110,
          align: "center",
        },
          {
            id: 'status',
            label: ["dashboard.sal.Status"],
            minWidth: 110,
            align: "center",
          },
          {
            id: 'more',
            label: [""],
            minWidth: 10,
            align: "center",
          },
      ]
      const [columns,setColumns] = React.useState(col)

      const coldetail = [
        { id: 'lodgedAt', label: ["dashboard.sal.Date"], minWidth: 110 , align: "center",},
        { id: 'name', label:[ "dashboard.sal.Name"], minWidth: 110, align: "center", },
          {
            id: 'status',
            label: ["dashboard.sal.Status"],
            minWidth: 110,
            align: "center",
          },
          {
            id: 'more',
            label: [""],
            minWidth: 10,
            align: "center",
          },
      ]
      const [Collapsedcolumns,setCollapsedColumns] = React.useState(coldetail)
    
    const [rows, setRows] = React.useState(salesApplication)

      const setStatus=(result:any)=>{
        console.log("result",result)
      }

    const onSetisCollapsed=()=>{
        setIsCollapsed(true)
    }
    const handleEdit=(event:any,row:any)=>{

    }
    const handleAction=(event: any,ope:any,row?:any)=>{
    
        switch(ope){
            case ope.EDIT:

                break;
            case ope.ADD:

                break;
            case ope.HIDE:
                break;
        }
            
    }
    const staffAction =(event: any,row:any)=>{

        setCurrentItemId(row.id)
        setIsCollapsed(false)
        forceUpdate()
    }
    return(
        <div className={styles.salesApplication_container}>
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
                  columns={Collapsedcolumns}
                  rows={rows}
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
                  rows={rows}
                  handleEdit={handleEdit}
                  handleAction={handleAction}
                  simpleMore={true}
                  staffAction={staffAction}
                  singlePage={true}
                  hide_x_overflow={!isCollapsed}
                  />
              </div>
            )}

            {!isCollapsed?
            <div className={styles.detail_container}>
                <div onClick={onSetisCollapsed} className={styles.staff_datagrid_collapsed_bt_container}>
                    <div className={styles.staff_datagrid_collapsed_bt}>
                        <img className={styles.selectePointer_img} src="/img/dashboard/pointout.svg"></img>
                    </div>
                    <div className={styles.staff_datagrid_collapsed_toRight_bt}>
                        <img className={styles.selectePointer_img} src="/img/dashboard/toRight.svg"></img>
                    </div>
                </div>
                <div className={styles.staff_detail_container}>
                    <DetailBoard
                        t={t}
                        detailData={detailData[currentItemId]}
                        setStatus={setStatus}
                    />
                </div>
            </div>
            
            :[]}
        </div>
        </div>
    )
  }

  export default SalesApplication