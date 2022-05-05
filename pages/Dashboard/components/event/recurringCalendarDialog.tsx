import * as React from 'react';
import styles from './index.module.css';
import {
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    InputBase,
    FormControl,
    Select,
    MenuItem,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormLabel
} from '@material-ui/core';
import 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { DateRangePicker } from 'react-date-range';

interface Props {
    t: (params: String) => string;
    dialogOpen: boolean;
    handleDialogClose: () => void;
    alignment: string;
    handleDialogSave: (eventData: any) => void;
}

function RecurringCalendarDialog(props: Props) {
    const { t, dialogOpen, handleDialogClose, alignment, handleDialogSave } = props;
    const OPTION = {
        NORMAL: 'recurring_normal',
        CUSTOMIZE: 'recurring_cus'
    };

    const SELECTION = [
        { value: 'day', label: 'dashboard.eve.day' },
        { value: 'week', label: 'dashboard.eve.week' },
        { value: 'month', label: 'dashboard.eve.month' },
        { value: 'year', label: 'dashboard.eve.year' }
    ];

    const [weekList, setWeekList] = React.useState([
        { label: 'S',value:'Sunday' , selected: false },
        { label: 'M',value:'Monday' , selected: false },
        { label: 'T',value:'Tuesday' , selected: false },
        { label: 'W',value:'Wednesday' , selected: false },
        { label: 'T',value:'Thursday' , selected: false },
        { label: 'F',value:'Friday' , selected: false },
        { label: 'S',value:'Saturday' , selected: false }
    ]);

    const [timeRange, setTimeRange] = React.useState({
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    });

    const [timeRangeData, setTimeRangeData] = React.useState({
        from_time: new Date(),
        to_time: new Date()
    });

    const [month, setMonth] = React.useState(timeRange.selection.startDate.getDate());
    const [state, setState] = React.useState(0);
    const [repeat,setRepeat] = React.useState(1);

    const forceUpdate = () => {
        setState((prev) => (prev += 1));
    };

    const [unit, setUnit] = React.useState('week');
    const [period, setPeriod] = React.useState(1);
    const [value, setValue] = React.useState("endDate");

    const onDateTimeRangePickerChange = (item: any) => {
        setTimeRange({ ...timeRange, ...item });
        forceUpdate();
        setMonth(timeRange.selection.startDate.getDate());
    };

    // const onEnterMonth = (event:any) =>{
    //     setMonth(event.target.value)
    // }

    const getDataTimeRange = (dateData: any, timeData: any) => {
        let startDate = `${dateData.selection.startDate.getFullYear()}-${
            dateData.selection.startDate.getMonth() + 1
        }-${dateData.selection.startDate.getDate()}`;
        let startTime = `${addZero(timeData.from_time.getHours())}:${addZero(
            timeData.from_time.getMinutes()
        )}:${addZero(timeData.from_time.getSeconds())}`;
        let endDate = `${dateData.selection.endDate.getFullYear()}-${
            dateData.selection.endDate.getMonth() + 1
        }-${dateData.selection.endDate.getDate()}`;
        let endTime = ` ${addZero(timeData.to_time.getHours())}:${addZero(
            timeData.to_time.getMinutes()
        )}:${addZero(timeData.to_time.getSeconds())}`;
        return { startDate: startDate, endDate: endDate, startTime: startTime, endTime: endTime };
    };

    const addZero = (i) => {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    };

    const onTimeRangePickerChange = (event: any, id: string) => {
        let temp = { from_time: timeRangeData.from_time, to_time: timeRangeData.to_time };
        temp[id] = event;
        setTimeRangeData(temp);
    };

    const getRecurringCusData = () => {
        let recurrenceEventdata = {}
        let weeks = []
        if(unit==="week"){
            weekList.map(w =>{
                if(w.selected) weeks.push(w.value)
            })
        }
        recurrenceEventdata["date"] = getDataTimeRange(timeRange, timeRangeData);
        recurrenceEventdata["rule"] = {
            unit:unit,
            period:period,
            fre:unit==="week"?weeks:month,
            series:value,
            seriesEnd:value==="days"?repeat:recurrenceEventdata["date"].endDate
        }
        return recurrenceEventdata
    }

    const onHandleSave = () => {
        let data = undefined
        if(alignment===OPTION.NORMAL){
            data = getDataTimeRange(timeRange, timeRangeData);
        }else if(alignment===OPTION.CUSTOMIZE){
            data = getRecurringCusData()
        }
        handleDialogClose();
        handleDialogSave(data);
        
    };

    const handleChange = (event: any) => {
        setUnit(event.target.value);
    };

    const onSelectWeekDay = (event: any, index: number) => {
        setWeekList((prev) => {
            prev[index].selected = !prev[index].selected;
            return prev;
        });
        forceUpdate();
    };

    const onEnterPeriod = (event: any) => {
        setPeriod(event.target.value);
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setValue((event.target as HTMLInputElement).value)
        forceUpdate()
    }

    const onEnterrepeat = (event:any) => {
        setRepeat(event.target.value)
    }

    return (
        <Dialog
            classes={{ paperWidthSm: styles.event_WidthXs_map }}
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent classes={{ root: styles.dialog_container }}>
                <div className={styles.dialog_container}>
                    <div className={styles.dataRange_container}>
                        <Grid container>
                            {alignment === OPTION.NORMAL ? (
                                <Grid item xs={2}>
                                    <div className={styles.calendar_icon}>
                                        <img src="/img/Dashboard/dataRange.svg"></img>
                                    </div>
                                    <div className={styles.text}>
                                        {t('dashboard.eve.dateRange')}
                                    </div>
                                </Grid>
                            ) : (
                                <Grid item xs={2}>
                                    <div className={styles.calendar_icon}>
                                        <img src="/img/Dashboard/recurring.svg"></img>
                                    </div>
                                    <div className={styles.text}>
                                        {t('dashboard.eve.recurring')}
                                    </div>
                                </Grid>
                            )}
                            <Grid item xs={10}>
                                <div className={styles.popper_content_DateTimeRangePicker}>
                                    <div className={styles.timeRangePicker_container}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="from_time"
                                                label="From"
                                                value={timeRangeData.from_time}
                                                onChange={(ev) =>
                                                    onTimeRangePickerChange(ev, 'from_time')
                                                }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time'
                                                }}
                                            />
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="to_time"
                                                label="To"
                                                value={timeRangeData.to_time}
                                                onChange={(ev) =>
                                                    onTimeRangePickerChange(ev, 'to_time')
                                                }
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time'
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <DateRangePicker
                                        onChange={(item: any) => onDateTimeRangePickerChange(item)}
                                        months={1}
                                        minDate={addDays(new Date(), -300)}
                                        maxDate={addDays(new Date(), 900)}
                                        direction="vertical"
                                        scroll={{ enabled: true }}
                                        ranges={[timeRange.selection]}
                                    />
                                </div>

                                {alignment === OPTION.CUSTOMIZE ? (
                                    <div className={styles.recurring_cus_opt_container}>
                                        <div className={styles.recurring_cus_rule_title}>
                                            {t('dashboard.eve.recurrenceRules')}
                                        </div>
                                        <div className={styles.recurring_cus_rule_unit}>
                                            <div className={styles.recurring_cus_rule_unit_title}>
                                                {t('dashboard.eve.every')}
                                            </div>
                                            <div>
                                                <InputBase
                                                    classes={{ root: styles.period_input }}
                                                    value={period}
                                                    onChange={onEnterPeriod}
                                                    type="number"
                                                />
                                            </div>
                                            <div className={styles.recurring_cus_rule_unit_title}>
                                                <FormControl className={styles.formControl}>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={unit}
                                                        onChange={handleChange}>
                                                        {SELECTION.map((opt, index) => (
                                                            <MenuItem key={index} value={opt.value}>
                                                                {t(opt.label)}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>

                                        {unit === 'week' ? (
                                            <div className={styles.recurring_cus_rule_unit}>
                                                <div
                                                    className={
                                                        styles.recurring_cus_rule_unit_title
                                                    }>
                                                    {t('dashboard.eve.on')}
                                                </div>
                                                <div className={styles.week_group}>
                                                    {weekList.map((weekday, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={(ev) =>
                                                                onSelectWeekDay(ev, index)
                                                            }
                                                            className={
                                                                weekday.selected
                                                                    ? styles.weekday_bt_focus
                                                                    : styles.weekday_bt
                                                            }>
                                                            {weekday.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : unit === 'month' ? (
                                            <div className={styles.recurring_cus_rule_unit}>
                                                <div
                                                    className={
                                                        styles.recurring_cus_rule_unit_title
                                                    }>
                                                    {t('dashboard.eve.on')}
                                                </div>
                                                <div className={styles.month_group}>
                                                    <InputBase
                                                        classes={{ root: styles.period_input }}
                                                        value={month}
                                                        disabled
                                                        // onChange = {onEnterMonth}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            []
                                        )}
                                        <div className={styles.recurring_cus_rule_unit}>
                                            <div className={styles.recurring_cus_rule_unit_title}>
                                                {t('dashboard.eve.seriesEnds')}
                                            </div>
                                            <div className={styles.seriesEnds_group}>
                                                <FormControl component="fieldset">
                                                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                                                    <RadioGroup
                                                        aria-label="gender"
                                                        name="seriesEnds"
                                                        value={value}
                                                        onChange={handleRadioChange}>
                                                        <FormControlLabel
                                                            value="endDate"
                                                            control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>}
                                                            label={<div>{t('dashboard.eve.on')+" "+timeRange.selection.endDate.getDate()+"/"
                                                            +(timeRange.selection.endDate.getMonth()+1)+"/"+timeRange.selection.endDate.getFullYear()}</div>}
                                                        />
                                                        <FormControlLabel
                                                            value="days"
                                                            control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary" />}
                                                            label={<div>{t('dashboard.eve.repeat')}
                                                            <InputBase
                                                                classes={{ root: styles.period_input }}
                                                                value={repeat}
                                                                type="number"
                                                                onChange = {onEnterrepeat}
                                                            />
                                                            {t('dashboard.eve.times')}
                                                             </div>}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    []
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    classes={{ root: styles.dialog_bt }}
                    onClick={handleDialogClose}
                    color="primary">
                    {t('common.cancel')}
                </Button>
                <Button
                    classes={{ root: styles.dialog_bt }}
                    onClick={onHandleSave}
                    color="primary"
                    autoFocus>
                    {t('common.save')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RecurringCalendarDialog;
