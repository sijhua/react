import 'date-fns';
import * as React from 'react';
import styles from './index.module.css';
import {Popper,MenuItem,Select,TextField} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';

interface Props {
    t:(params: String) => string;
    filterList:any;
    handleChangeFilterCol?:(ev:any,ind:any) => void;
    handleChangeFilterOpe?:(ev:any,ind:any) => void;
    getValue?:(ev:any,ind:any) => void;
    handleChangeFilterLogicOpe?:(ev:any,ind:any) => void;
    handAddCondition?:() => void;
    filteredItem:Array<any>;
    downloadPDF?:() => void;
    handleFromDateChange?:(date: Date ) => void;
    handletoDateChange?:(date: Date ) => void;
    // handleFilter
  }
  
  function DataFilter(props: Props) {
      const {t,filteredItem,filterList,handleChangeFilterCol,handleChangeFilterOpe,getValue,handleChangeFilterLogicOpe,handAddCondition} = props
    const [open,setOpen] = React.useState(false);
    const [anchorEl,setAnchorEl]= React.useState(null);

    const handleFilter = (event:any) =>{
        // console.log("event",event)
        // this.setState({anchorEl:event.currentTarget,
        //     open:!this.state.open});
        setAnchorEl(event.currentTarget)
        setOpen((prev) => !prev);
    }


    return(
        <div className={styles.dataFilter_container}>
            <div  className={styles.filter_container}>
                <div onClick={handleFilter} className={styles.filter_container_text}>{t("dashboard.sal.Filter")}</div>
                <div onClick={handleFilter} className={styles.filter_container_img}><img src="/img/Dashboard/filter_more.svg"></img></div>

            </div>
            <Popper className={styles.popper} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
                <div className={styles.popper_content_container}>
                {props.downloadPDF?
                    (
                    <div>
                        {filteredItem[0].value=="Date"?(
                            <div className={styles.selectDate}>
                                <div className={styles.selectDate_title}>{t('dashboard.sal.Date')}</div>
                                <div className={styles.selectDate_group}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-from-picker-inline"
                                        label="From"
                                        value={filterList.selectedFromDate}
                                        onChange={props.handleFromDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-to-picker-inline"
                                        label="To"
                                        value={filterList.selectedtoDate}
                                        onChange={props.handletoDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />
                                </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        ):[]}
                        <MenuItem >
                        <div className={styles.downloadPDF}>
                            {t('common.downloadPDF')}
                        </div>
                        </MenuItem>
                    </div>
                    
                    ):
                    
                    filterList.map((filter:any,ind:any)=>(

                    <div key={ind}>
                        <div  className={styles.popper_content_line}>
                        <MenuItem >
                            <Select
                            value={filter.column}
                            onChange={(ev)=>handleChangeFilterCol(ev,ind)}
                            >
                                {filteredItem.map((item,i)=>(
                                    <MenuItem key={i} value={item.value}>{t(item.label)} </MenuItem>
                                ))}
                            </Select>
                        </MenuItem>
                        <MenuItem >
                            <Select
                                value={filter.ope}
                                onChange={(ev)=>handleChangeFilterOpe(ev,ind)}
                                >

                            <MenuItem value="Contains">{t("dashboard.sal.Contains")}</MenuItem>
                            <MenuItem value="Equals">{t("dashboard.sal.Equals")}</MenuItem>
                            </Select>
                        </MenuItem>
                        <MenuItem >
                            <TextField onChange={(ev)=>getValue(ev,ind)} value={filter.val} id="value" />
                        </MenuItem>
                        </div>
                        <div className={styles.popper_content_line}>
                            <MenuItem >
                                <Select
                                    value={filter.logicOpe}
                                    onChange={(ev)=>handleChangeFilterLogicOpe(ev,ind)}
                                    >
                                    <MenuItem value="and">{t("dashboard.sal.and")}</MenuItem>
                                    <MenuItem value="or">{t("dashboard.sal.or")}</MenuItem>
                                </Select>
                            </MenuItem>
                            <MenuItem>
                                <AddCircleIcon onClick={handAddCondition} classes={{root:styles.icon_root}} color="primary"/>
                            </MenuItem>
                        </div>
                    </div>))
                    }
                </div>
            </Popper>
        </div>
    )

  }

  export default DataFilter