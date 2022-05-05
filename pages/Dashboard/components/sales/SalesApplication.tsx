import * as React from 'react';
import {Tooltip,Chip,FormControl,Table,TableBody,TableCell,
        TableContainer,TableHead,TablePagination,TableRow,MenuItem,
        Select,Popper,TextField} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styles from './index.module.css';
import EditDialog from './EditDialog';
import DataFilter from '../dataFilter';
import {SalesApplicationRow} from '../../../../public/fakeData'
// import { AppendKeys } from 'react-i18next';
// import AddIcon from '@material-ui/icons/Add';



interface Props {
    t:(params: String) => string;
    downloadOnly:boolean
  }
  
  function SalesApplication(props: Props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    // const [column, setColumn] = React.useState("Name"); 
    // const [ope, setOpe]= React.useState("Contains"); 
    // const [val,setVal] = React.useState(""); 
    const [state, setState] = React.useState(0);
    const [seleValue, setSeleValue] = React.useState("");
    const [editOpen,setEditOpen] = React.useState(false); 
    const [editMenuListAnchorEl, setEditMenuListAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [currentEditRow,setCurrentEditRow] = React.useState({});
    const [dialogOpen,setDialogOpen] = React.useState(false);
    // const [logicOpe,setLogicOpe] = React.useState("and");
    const [filterList,setFilterList] = React.useState({selectedFromDate:new Date('2021-08-18T21:11:54'),selectedtoDate:new Date('2021-08-18T21:11:54')});
    
    const filteredItem = [{value:"Date",label:"dashboard.sal.Date"},
    // {value:"Name",label:"dashboard.sal.Name"},
    // {value:"Emailaddress",label:"dashboard.sal.Emailaddress"},
    // {value:"SpecialtyArea",label:"dashboard.sal.SpecialtyArea"},
]

    const EDIT = "Edit"
    const DELETE = "Delete"

    const {t} = props

    const forceUpdate = () => {
        setState(state + 1)
    };  
    
    const handleChangePage = (event:any, newPage:any) => {
        // console.log("page")
        setPage(newPage);
        // setOpen((prev) => !prev);
    };

    const handleChangeRowsPerPage = (event:any)=> {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleSelectionChange =(event:any,row:any) =>{
        // console.log('event.target.value',event.target.value)
        setSeleValue(event.target.value);
        row.Status = event.target.value
        // console.log("row",row)
    }

    const handleFilter = (event:any) =>{
        // console.log("event",event)
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);

    }
    const handleClose = () => {
        setOpen(false);
      };
    
    const handleFromDateChange = (date: Date | null)=>{
        let templist = filterList
        templist.selectedFromDate = date
        setFilterList(templist)
        forceUpdate()
        console.log(filterList)
    }

    const handletoDateChange = (date: Date | null)=>{
        let templist = filterList
        templist.selectedtoDate = date
        setFilterList(templist)
        forceUpdate()
        console.log(filterList)
    }
    const columns = [
        { id: 'Date', label: t("dashboard.sal.Date"), minWidth: 110 , align: "center",},
        { id: 'Name', label: t("dashboard.sal.Name"), minWidth: 110, align: "center", },
        {
          id: 'Emailaddress',
          label: t("dashboard.sal.Emailaddress"),
          minWidth: 110,
          align: "center",
          format: (value:any) => value.toLocaleString('en-GB'),
        },
        {
          id: 'Qualifications',
          label: t("dashboard.sal.Qualifications"),
          minWidth: 110,
          align: "center",
        //   format: (value) => value.toLocaleString('en-US'),'Size\u00a0(km\u00b2)'
        },
        {
          id: 'SpecialtyArea',
          label: t("dashboard.sal.SpecialtyArea"),
          minWidth: 110,
          align: "center",
        //   align: 'right',
        //   format: (value) => value.toFixed(2),
        },
        {
            id: 'Certificate',
            label: t("dashboard.sal.Certificate"),
            minWidth: 110,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
          {
            id: 'Status',
            label: t("dashboard.sal.Status"),
            minWidth: 110,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
          {
            id: 'more',
            label: "",
            minWidth: 10,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
      ];

      const onCloseActionMenu =()=>{
        setEditOpen(false)
      }

      
     

      const handleView=(col:string,name:string)=>{
        //   TODO
          console.log("click View",name,col)
      }

      const createData=(data:any)=>{
          let rows=[]
          data.forEach((element:any,index:any) => {
            element.Qualifications=setView("Qualifications",element.Name)
            element.Certificate=setView("Certificate",element.Name)
            rows.push(element)
          });
          return rows
      }

    //   const createData=(Date:any, Name:string, Emailaddress:string, Qualifications:any,SpecialtyArea:any,Certificate:any,Status:string,id:Number)=>{
    //     // const density = population / size;
     
    //     return { Date, Name, Emailaddress, Qualifications, SpecialtyArea, Certificate,Status,id};
    //   }
      const handleItemEditMenuList=(event:any,row:any)=>{
        // console.log("clicked",row)
        if(!props.downloadOnly){
            if (row )setCurrentEditRow(row)
            setEditOpen((prev) => !prev)
            setEditMenuListAnchorEl(event.currentTarget)
        }
        
      }

      const setView =(col:any,row:any)=>{
          return (<a onClick={handleView.bind(this,col,row)} className={styles.a}>{t("dashboard.sal.View")}</a>)
      }

    //   const rows = [
    //     createData('20/08/21','Tom_remove', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),"",0),
    //     createData('20/08/21','Jerry', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),"",1),
    //     createData('20/08/21','Tom', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),"",2),
    //     createData('20/08/21','Tom', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),"",3),
    //     createData('20/08/21','Tom', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),"",4),
    //     createData('20/08/21','Tom', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),"",5),
    //     createData('20/08/21','Tom', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),"",6),
        
    //   ]
    //   console.log('SalesApplicationRow',SalesApplicationRow)

      const handleDelete=(row:any)=>{
        //For front end Demo
        SalesApplicationRow.forEach((r,i)=>{
            if(r.id == row.id){
                SalesApplicationRow.splice(i, 1)
            }
        })

        // TODO send request to back to 
        setFilterData(createData(SalesApplicationRow))

    }

      const handleAction=(event:any,action:string,row?:any)=>{
      
        // console.log("action",action,currentEditRow)
        onCloseActionMenu()
        if(action){
            switch(action){
                case EDIT:
                    setDialogOpen(true)
                    break;
                case DELETE:
                    if(currentEditRow) handleDelete(currentEditRow)
                    break;
            }
        }
        //currentEditRow 
        

      }


    const [filterData,setFilterData] = React.useState(createData(SalesApplicationRow)); 
// console.log('filterData',filterData)
    // const handleSetFilter = (val:any,ope:any,column:any)=>{
    //     var filRow=[]
    //     // console.log(val,ope,column)
    //     if(val&&ope&&column){
    //         rows.forEach((row,ind)=>{
    //             switch(ope){
    //                 case "Contains":
    //                     if(row[column].includes(val)) filRow.push(row)
    //                     break;
    //                 case "Equals":
    //                     if(row[column]==val) filRow.push(row)
    //                     break;
    //             }
                
    //         })
    //     }else{
    //         filRow = rows
    //     }
        
    //     setFilterData(filRow)
    // }

    // const handAddCondition=()=>{
    //     const newfilter = {column:"Date",ope:"Contains",val:"",logicOpe:"and"}
    //     let temfilterList = filterList
    //     temfilterList.push(newfilter)
    //     setFilterList(temfilterList)
    //     forceUpdate()
    //     // console.log('filterList',filterList)
    // }
    const handEditCondition=(editFilterPart:string,id:any,valu:any)=>{
        
        let temfilterList = filterList
        temfilterList[id][editFilterPart] = valu
        // temfilterList.push(newfilter)
        setFilterList(temfilterList)
        forceUpdate()
        console.log('filterList',filterList)
    }

    const getValue=(event:any,id:Number)=>{
        handEditCondition('val',id,event.target.value)
        // setVal(event.target.value)

        // handleSetFilter(event.target.value,ope,column)
        // console.log(val,ope,column)
        
    }

    const handleChangeFilterOpe=(event:any,id:Number)=>{
        handEditCondition('ope',id,event.target.value)
        // console.log("event.target.value",event.target.value)
        // setOpe(event.target.value)
        // handleSetFilter(val,event.target.value,column)
    }

    const handleChangeFilterCol=(event: any,id:Number)=>{
        handEditCondition('column',id,event.target.value)
        // setColumn(event.target.value)
        // handleSetFilter(val,ope,event.target.value)
    }

    const handleChangeFilterLogicOpe=(event:any,id:Number)=>{
        handEditCondition('logicOpe',id,event.target.value)
        // setLogicOpe(event.target.value)
    }

    const handleDialogClose=(event:any,newRow:any)=>{
        setDialogOpen(false)
        // TODO on update need send request to the back
        if(newRow){
            SalesApplicationRow.forEach((r,i)=>{
                if(r.id==newRow.id){
                    SalesApplicationRow[i] = newRow
                }
            })
            setFilterData(createData(SalesApplicationRow))
        }
    }

    const downloadPDF = ()=>{
        // TODO
    }
    return(
        <div className={styles.salesApplication_container}>

                <DataFilter
                    t={t}
                    filterList={filterList}
                    // handleChangeFilterCol={handleChangeFilterCol}
                    // handleChangeFilterOpe={handleChangeFilterOpe}
                    // getValue={getValue}
                    // handleChangeFilterLogicOpe={handleChangeFilterLogicOpe}
                    // handAddCondition={handAddCondition}
                    filteredItem={filteredItem}
                    downloadPDF={downloadPDF}
                    handleFromDateChange={handleFromDateChange}
                    handletoDateChange={handletoDateChange}

                />

            <div onClick={handleClose} className={styles.salesApplication_table_container}>
            
                <TableContainer classes={{root:styles.sales_MuiTableContainer_root}} className={styles.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            // align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                // console.log("row",row)
                                if(column.id=="more"){
                                    return(
                                        <TableCell onClick={(ev) => {handleItemEditMenuList(ev,row)}}  key={index.toString()+"more"}>
                                            <div id={index.toString()} className={styles.sales_table_more_icon}>
                                                <img src={"/img/Dashboard/more.svg"}></img>
                                            </div>
                                    </TableCell>)
                                }else if(column.id=="Status"){
                                    return(
                                        <TableCell onClick={onCloseActionMenu} key="Status">
                                            <FormControl classes={{root:styles.outlined}}>
                                                <Select
                                                labelId={index+"label"}
                                                id={index.toString()}
                                                value={row.Status}
                                                onChange={(ev) => {handleSelectionChange(ev, row)}}
                                                >
                                                    {/* <MenuItem className={styles.sales_opt} value={""}></MenuItem> */}
                                                    <MenuItem className={styles.sales_new} value="NEW">{ t("dashboard.sal.NEW")}</MenuItem>
                                                    <MenuItem className={styles.sales_PASS} value="PASS">{ t("dashboard.sal.PASS")}</MenuItem>
                                                    <MenuItem className={styles.sales_Declined} value="Declined">{ t("dashboard.sal.Declined")}</MenuItem>
                                                    <MenuItem className={styles.sales_Pending} value="Pending">{ t("dashboard.sal.Pending")}</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    )
                                    
                                }else{
                                    return (
                                        //  align={column.align}
                                    <TableCell key={column.id}>
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                    </TableCell>
                                    );
                                }
                                
                            })}
                                
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={SalesApplicationRow.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <Popper className={styles.popper} open={editOpen} anchorEl={editMenuListAnchorEl} placement="bottom-start" transition>
                    <div  className={styles.popper_content_more}>
                        <MenuItem onClick={(ev)=>{handleAction(ev,"Edit")}} className={styles.sales_opt} value="Edit">{ t("dashboard.sal.Edit")}</MenuItem>
                        <MenuItem onClick={(ev)=>{handleAction(ev,"Delete")}} className={styles.sales_opt} value="Delete">{ t("dashboard.sal.Delete")}</MenuItem>
                    </div>
                </Popper>

                <EditDialog
                    t={t}
                    currentRow={currentEditRow}
                    open={dialogOpen}
                    handleClose={handleDialogClose}
                />
            </div>
        </div>
    )
}

export default SalesApplication


// {/* <div style={{ height: 400, width: '100%' }}> */}
// <DataGrid
// {...data}
// filterModel={riceFilterModel}
// components={{
// Toolbar: GridToolbar,
// }}
// />
// {/* </div> */}