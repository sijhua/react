import * as React from 'react';
import styles from './index.module.css';
import {
    Divider,
    Grid,
    InputBase,
    Checkbox,
    FormControl,
    FormGroup,
    FormControlLabel,
    Chip,
    Avatar,
    Button,
} from '@material-ui/core';
import 'date-fns';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import eventData from '../../../../public/eventData/event_newEvent_web.json';
import DataGridPopper from '../dataGridPopper';
import Calendar from './calendar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Products, customerList, sellerList } from '../../../../public/fakeData';
import eventList from '../../../../public/eventData/event_list_web.json';
import RecurringCalendarDialog from './recurringCalendarDialog';
import EventDialog from './eventDialog/EventDialog'

export interface Props {
    t: (params: String) => string;
}

const setColor = (scheme:any) => {
    let color = scheme.split('/');
    let colorL = [];
    color.forEach((c: string) => {
        colorL.push({ color: c, selected: false });
    });
    return colorL;
};

const initialState = {
    colorList: setColor(eventData.scheme),
    currentColor: setColor(eventData.scheme)[0].color,
    alignment: 'one_off',
    reminderAlignment: 'reminder',
    goalsAlignment: 'goals',
    ticketAlignment: 'ticket',
    productAlignment: 'product',
    productList: [
        { id: '1', src: '/img/Dashboard/product1.svg', name: 'event cup', price: '5' },
        { id: '2', src: '/img/Dashboard/product2.svg', name: 'event cup 2', price: '5' }
    ],
    sendtoAllst: false,
    sendtofuturestaff: false,
    sendToAllExiCus: false,
    sendToAllExiCusFu: false,
    eventData: eventData,
    products: eventData.products,
    recipients: eventData.recipients,
    dataGridPopperOpen: false,
    dataGridPopperAnchorEl: null,
    row: [],
    currentGrid: '',
    dialogOpen: false,
    timeRange: {
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    },
    timeRangeData: {
        from_time: new Date(),
        to_time: new Date()
    },
    eventList: eventList,
    oneOffEventDateTime:{
        selectedOneOffDate: new Date(),
        selectedOneOffEndDate: new Date(),
        selectedStartTime: new Date(),
        selectedEndTime: new Date()
    },
    recurring_normal: null,
    currentEventData: {startDate:"",
                        endDate:"",
                        startTime:"",
                        endTime:"",
                    eventType:""},
    currentEvent:{
        name:"",
        title:"",
        scheme:"",
        tags:"",
        address:"",
        eventData:{},
        reminder_mh:false,
        reminder_fre:false,
        goals:false,
        ticket:false,
    },
    eventDialogOpen:false,
    completeEvent:'',
    completeEventType:'',
    completeEventColor:''
};

type State = {
    currentEvent:any,
    oneOffEventDateTime:object
    colorList: Array<any>;
    currentColor: string;
    productList: Array<any>;
    sendtoAllst: boolean;
    sendtofuturestaff: boolean;
    sendToAllExiCus: boolean;
    sendToAllExiCusFu: boolean;
    eventData: Object;
    dataGridPopperOpen: boolean;
    dataGridPopperAnchorEl: any;
    row: Array<any>;
    currentGrid: string;
    dialogOpen: boolean;
    timeRange: any;
    timeRangeData: any;
    eventList: Array<any>;
    recurring_normal: any;
    currentEventData: any;
    eventDialogOpen:boolean 
};

class Event extends React.Component<Props, object> {
    state = initialState;

    private checkList = { PRODICT: 'product', CUSTOMER: 'customer', SELLER: 'seller' };

    private customerColumn = [
        { id: 'id', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },
        { id: 'name', label: ['dashboard.acc.delivery.setDelivery.name'], minWidth: 100 }
    ];

    private handleDialogSave = (eventData: any) => {
        if(eventData){
            if(this.state.alignment==="recurring_normal"){
                this.setState((prevState,props) =>{
                
                    prevState["currentEventData"] = {...eventData}
                    prevState["currentEventData"].eventType = "recurring_normal"
    
                    return{currentEventData:prevState["currentEventData"]}
                })
            }else{
                this.setState((prevState,props) =>{
                
                    prevState["currentEventData"] = {...eventData.date}
                    prevState["currentEventData"].eventType = "recurring_cus"
                    prevState["currentEventData"]["rule"] = {...eventData.rule}
                    return{currentEventData:prevState["currentEventData"]}
                })
            }
            
        }
        
    };

    private onSelectColor = (index: Number) => {
        this.setState((preState, preProps) => {
            preState['colorList'].map((color, i) => {
                if (i == index) {
                    color.selected = true;
                    preState['currentColor'] = color.color;
                    preState['currentEvent'].scheme = color.color
                } else {
                    color.selected = false;
                }
            });
            return {currentEvent:preState['currentEvent'], colorList: preState['colorList'], currentColor: preState['currentColor'] };
        });
    };
    private handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) {
            this.setState({ alignment: newAlignment });
        }
    };

    private handleReminderAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) this.setState({ reminderAlignment: newAlignment });
    };
    private handleGoalAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) this.setState({ goalsAlignment: newAlignment });
    };
    private handleTicketAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) this.setState({ ticketAlignment: newAlignment });
    };
    private handleProductAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) this.setState({ productAlignment: newAlignment });
    };

    private handlesendtoAllstChange = () => {
        this.setState((statePrev, prop) => {
            statePrev['sendtoAllst'] = !statePrev['sendtoAllst'];
            return { sendtoAllst: statePrev['sendtoAllst'] };
        });
    };
    private handlesendtofuturestaffChange = () => {
        this.setState((statePrev, prop) => {
            statePrev['sendtofuturestaff'] = !statePrev['sendtofuturestaff'];
            return { sendtofuturestaff: statePrev['sendtofuturestaff'] };
        });
    };

    private handlesendToAllExiCusChange = () => {
        this.setState((statePrev, prop) => {
            statePrev['sendToAllExiCus'] = !statePrev['sendToAllExiCus'];
            return { sendToAllExiCus: statePrev['sendToAllExiCus'] };
        });
    };
    private handlesendToAllExiCusFuChange = () => {
        this.setState((statePrev, prop) => {
            statePrev['sendToAllExiCusFu'] = !statePrev['sendToAllExiCusFu'];
            return { sendToAllExiCusFu: statePrev['sendToAllExiCusFu'] };
        });
    };


    private onRemoveProduct = (index: Number) => {
        this.setState((statePrev, prop) => {
            statePrev['eventData'].products.splice(index, 1);
            statePrev['currentEvent'].products = [...statePrev['eventData'].products]
            return { eventData: statePrev['eventData'], currentEvent:statePrev['currentEvent']};
        });
    };

    private handleDelete = (index: number) => {
        this.setState((statePrev, prop) => {
            statePrev['eventData'].recipients.splice(index, 1);
            return { eventData: statePrev['eventData'] };
            //eventData.products
        });
    };

    private handlePopperEdit = (event: any, category: string) => {
        this.setState({ dataGridPopperAnchorEl: event.currentTarget });
        
        this.setState((prevState, prop) => {
            prevState['dataGridPopperOpen'] = !prevState['dataGridPopperOpen'];
            prevState['row'] = [];
            prevState['currentGrid'] = category;
            switch (category) {
                case this.checkList.PRODICT:
                    Products.map((p, i) => {
                        prevState['row'].push({
                            id: { item: p.id, type: 'string' },
                            name: { item: p.ProductName, type: 'string' }
                        });
                    });
                    break;
                case this.checkList.SELLER:
                    sellerList.map((p, i) => {
                        prevState['row'].push({
                            id: { item: p.id, type: 'string' },
                            name: { item: p.name, type: 'string' }
                        });
                    });
                    break;
                case this.checkList.CUSTOMER:
                    customerList.map((p, i) => {
                        prevState['row'].push({
                            id: { item: p.id, type: 'string' },
                            name: { item: p.name, type: 'string' }
                        });
                    });
                    break;
            }
            return {
                dataGridPopperOpen: prevState['dataGridPopperOpen'],
                row: prevState['row'],
                currentGrid: prevState['currentGrid']
            };
        });
    };

    private handleChange = (event: any) => {
        this.setState((prevState, prop) => {
            prevState['row'] = [];
            switch (prevState['currentGrid']) {
                case this.checkList.PRODICT:
                    Products.map((p, i) => {
                        
                        if (p.ProductName == event.target.value) {
                            console.log(event.target.value,p.ProductName)
                            prevState['row'].push({
                                id: { item: p.id, type: 'string' },
                                name: { item: p.ProductName, type: 'string' }
                            });
                        }
                    });
                    break;
                case this.checkList.SELLER:
                    sellerList.map((p, i) => {
                        if (p.name.toString().includes(event.target.value))
                            prevState['row'].push({
                                id: { item: p.id, type: 'string' },
                                name: { item: p.name, type: 'string' }
                            });
                    });
                    break;
                case this.checkList.CUSTOMER:
                    customerList.map((p, i) => {
                        if (p.name.toString().includes(event.target.value))
                            prevState['row'].push({
                                id: { item: p.id, type: 'string' },
                                name: { item: p.name, type: 'string' }
                            });
                    });
                    break;
            }

            return { row: prevState['row'] };
        });

    };
    
    //handle box changed function and update the datalist
    private handleCheckBoxChanged = (ev: any, i: any, row: any) => {
        this.setState((prevState, prop) => {
            prevState['row'] = [];
            switch (prevState['currentGrid']) {
                case this.checkList.PRODICT:
                    prevState['eventData'].products.push({ id: row.id.item, name: row.name.item });
                    prevState['currentEvent'].products = [...prevState['eventData'].products]
                    break;
                case this.checkList.CUSTOMER:
                    prevState['eventData'].recipients.push({
                        name: row.name.item,
                        type: 'customer'
                    });
                    break;
                case this.checkList.SELLER:
                    prevState['eventData'].recipients.push({ name: row.name.item, type: 'seller' });
                    break;
            }

            return {currentEvent:prevState['currentEvent'], eventData: JSON.parse(JSON.stringify(prevState['eventData'])) };

        });
    };

    private handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    };

    private handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    };
    
    private handleOneOffDateTimeChange = (date: Date | null, cmd:string) => {
        this.setState((prevState,props) => {
            prevState['oneOffEventDateTime'][cmd] = date

            return{oneOffEventDateTime:prevState['oneOffEventDateTime']}
        });
    };   
    private setBasicInfo = (event:any,cmd:string) => {
        this.setState((prevState,props) => {
            prevState['currentEvent'][cmd] = event.target.value
            return {currentEvent:prevState['currentEvent']}
        })
    }

    private onSend = () => {
        this.setState((prevState,props)=>{
            prevState['currentEvent'].products = [...prevState['eventData'].products]
            prevState['currentEvent'].recipients = [...prevState['eventData'].recipients]
            if(this.state.alignment ==="one_off"){
                prevState['currentEvent'].eventData = prevState['oneOffEventDateTime']
            }else{
                prevState['currentEvent'].eventData = prevState['currentEventData']
            }
            return {currentEvent:prevState['currentEvent']}
        })
        alert(this.state.currentEvent)
        console.log(this.state.currentEvent)
    }

    private handleEventDialog = () => {
        this.setState({ eventDialogOpen: !this.state.eventDialogOpen });
    };

    private handleComplateEventDialog = (event: any, name: string, type: string, color: string) => {
        this.setState({ eventDialogOpen: !this.state.eventDialogOpen });
        this.setState({ completeEvent: name})
        this.setState({ completeEventType: type})
        this.setState({ completeEventColor: color})
    };

    render() {
        const { t } = this.props;

        return (
            <div className={styles.event_container}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={9}>
                        <div className={styles.event_card_continer_1}>
                            <div className={styles.event_card_wrapper}>
                                <Grid
                                    container
                                    classes={{
                                        root: styles.section1_grid_root,
                                        item: styles.grid_item
                                    }}
                                    spacing={0}>
                                    <Grid item xs={2}>
                                        <div className={styles.event_icon}>
                                            <div
                                                style={{ background: this.state.currentColor }}
                                                className={styles.select_color_icon}>
                                            </div>
                                            <img src="/img/Dashboard/icon.svg"></img>
                                        </div>
                                        <div className={styles.userName_wrapper}>HQ WATER</div>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div className={styles.eventBasicInfo_column}>
                                            <Divider
                                                classes={{ vertical: styles.divider_column }}
                                                orientation="vertical"
                                            />
                                            <div className={styles.eventBasicInfo_container}>
                                                <InputBase
                                                    classes={{
                                                        input: styles.eventBasicInfo_input_name
                                                    }}
                                                    value={this.state.currentEvent.name}
                                                    onChange={(ev)=>this.setBasicInfo(ev,"name")}
                                                    id="event_name"
                                                    placeholder={t('dashboard.eve.e_name')}
                                                />
                                                <InputBase
                                                    classes={{ input: styles.eventBasicInfo_input }}
                                                    id="event_title"
                                                    value={this.state.currentEvent.title}
                                                    onChange={(ev)=>this.setBasicInfo(ev,"title")}
                                                    placeholder={t('dashboard.eve.title')}
                                                />
                                                <div className={styles.color_input_container}>
                                                    <div className={styles.color_input_label}>
                                                        {t('dashboard.eve.color')}
                                                    </div>
                                                    <div className={styles.color_selection}>
                                                        {this.state.colorList.map(
                                                            (color, index) => (
                                                                <div
                                                                    style={{
                                                                        background: color.color
                                                                    }}
                                                                    onClick={(ev) =>
                                                                        this.onSelectColor(index)
                                                                    }
                                                                    className={styles.color_options}
                                                                    key={index}>
                                                                    {color.selected ? (
                                                                        <div
                                                                            className={
                                                                                styles.selected_icon
                                                                            }>
                                                                            <img src="/img/Dashboard/selected.svg"></img>
                                                                        </div>
                                                                    ) : (
                                                                        []
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    {/* <InputBase classes={{root:styles.eventBasicInfo_input_tag}} id="event_name" /> */}
                                                </div>
                                                <div className={styles.tag_input_container}>
                                                    <div className={styles.tag_input_label}>
                                                        {t('dashboard.eve.tags')}
                                                    </div>
                                                    <InputBase
                                                        classes={{
                                                            root: styles.eventBasicInfo_input_tag
                                                        }}
                                                        value={this.state.currentEvent.tags}
                                                        onChange={(ev)=>this.setBasicInfo(ev,"tags")}
                                                        id="event_tag"
                                                    />
                                                </div>
                                                <div className={styles.tag_basic_des}>
                                                    {t('dashboard.eve.basic_des')}
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>

                                <Divider />

                                <Grid>
                                    <div className={styles.event_address_container}>
                                        <div className={styles.event_address_label}>
                                            {t('dashboard.eve.address')}
                                        </div>
                                        <InputBase
                                            classes={{ root: styles.eventBasicInfo_input_tag }}
                                            id="event_tag"
                                            value={this.state.currentEvent.address}
                                            onChange={(ev)=>this.setBasicInfo(ev,"address")}
                                        />
                                    </div>

                                    <div>
                                        <ToggleButtonGroup
                                            value={this.state.alignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="one_off"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.one_off')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="recurring_normal"
                                                aria-label="centered">
                                                <div className={styles.bt_text_container}>
                                                    <div>{t('dashboard.eve.recurring')}</div>
                                                    <div className={this.state.alignment==="recurring_normal"?styles.bt_des_selected:styles.bt_des}>
                                                        {t('dashboard.eve.normal')}
                                                    </div>
                                                </div>
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="recurring_cus"
                                                aria-label="right aligned">
                                                <div className={styles.bt_text_container}>
                                                    <div>{t('dashboard.eve.recurring')}</div>
                                                    <div className={this.state.alignment==="recurring_cus"?styles.bt_des_selected:styles.bt_des}>
                                                        {t('dashboard.eve.customised')}
                                                    </div>
                                                </div>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        {this.state.alignment === 'recurring_normal' ? (
                                            <div className={styles.bt_recurring_normal_container}>
                                                <div className={styles.bt_oneOff_start_container}>
                                                    <div className={styles.bt_oneOff_start_text}>
                                                        <div className={styles.bt_oneOff_icon}>
                                                            <img src="/img/Dashboard/alert_icon.svg"></img>
                                                        </div>
                                                        <div className={styles.bt_oneOff_text}>
                                                            {t('dashboard.eve.dateRange')}
                                                        </div>
                                                    </div>
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        value={this.state.currentEventData.startDate}
                                                        classes={{ root: styles.eventBasicInfo_DT }}
                                                        id="event_recurring_normal_startDate"
                                                    />-
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        value={this.state.currentEventData.endDate}
                                                        classes={{ root: styles.eventBasicInfo_DT }}
                                                        id="event_recurring_normal_endDate"
                                                    />
                                                </div>
                                                <div className={styles.bt_oneOff_end_container}>
                                                    <div className={styles.bt_oneOff_end_text}>
                                                        <div className={styles.endTime_text}>
                                                            {t('dashboard.eve.timeRange')}
                                                        </div>
                                                        
                                                    </div>
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        classes={{ root: styles.reminder_input }}
                                                        value={this.state.currentEventData.startTime}
                                                        id="event_recurring_normal_endTime"
                                                        />{" - "}
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        classes={{ root: styles.reminder_input }}
                                                        value={this.state.currentEventData.endTime}
                                                        id="event_recurring_normal_endTime"
                                                    />
                                                    
                                                </div>
                                            </div>
                                        ) : this.state.alignment === 'one_off' ? (
                                            <div className={styles.bt_oneOff_container}>
                                                <div className={styles.bt_oneOff_start_container}>
                                                    <div className={styles.bt_oneOff_start_text}>
                                                        <div className={styles.bt_oneOff_icon}>
                                                            <img src="/img/Dashboard/alert_icon.svg"></img>
                                                        </div>
                                                        <div className={styles.bt_oneOff_text}>
                                                            {t('dashboard.eve.eventD')}
                                                        </div>
                                                    </div>
                                                    <div className={styles.one_off_input_group}>
                                                        <MuiPickersUtilsProvider
                                                            utils={DateFnsUtils}>
                                                            <Grid container justify="space-around">
                                                                <KeyboardDatePicker
                                                                    disableToolbar
                                                                    variant="inline"
                                                                    format="MM/dd/yyyy"
                                                                    margin="normal"
                                                                    id="selectedOneOffDate"
                                                                    label="Start Day"
                                                                    value={
                                                                        this.state.
                                                                        oneOffEventDateTime.selectedOneOffDate
                                                                    }
                                                                    onChange={
                                                                        (date) => this.handleOneOffDateTimeChange(date,"selectedOneOffDate")
                                                                    }
                                                                    KeyboardButtonProps={{
                                                                        'aria-label': 'change date'
                                                                    }}
                                                                />
                                                                <KeyboardTimePicker
                                                                    margin="normal"
                                                                    id="selectedStartTime"
                                                                    label="Start Time"
                                                                    value={
                                                                        this.state.oneOffEventDateTime.selectedStartTime
                                                                    }
                                                                    onChange={
                                                                        (date) => this.handleOneOffDateTimeChange(date,"selectedStartTime")
                                                                    }
                                                                    KeyboardButtonProps={{
                                                                        'aria-label': 'change time'
                                                                    }}
                                                                />
                                                                
                                                                <KeyboardDatePicker
                                                                    disableToolbar
                                                                    variant="inline"
                                                                    format="MM/dd/yyyy"
                                                                    margin="normal"
                                                                    id="selectedOneOffEndDate"
                                                                    label="End Day"
                                                                    value={
                                                                        this.state.
                                                                        oneOffEventDateTime.selectedOneOffEndDate
                                                                    }
                                                                    onChange={
                                                                        (date) => this.handleOneOffDateTimeChange(date,"selectedOneOffEndDate")
                                                                    }
                                                                    KeyboardButtonProps={{
                                                                        'aria-label': 'change date'
                                                                    }}
                                                                />
                                                                <KeyboardTimePicker
                                                                    margin="normal"
                                                                    id="selectedEndTime"
                                                                    label="End Time"
                                                                    value={
                                                                        this.state.oneOffEventDateTime.selectedEndTime
                                                                    }
                                                                    onChange={
                                                                        (date) => this.handleOneOffDateTimeChange(date,"selectedEndTime")
                                                                    }
                                                                    KeyboardButtonProps={{
                                                                        'aria-label': 'change time'
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </MuiPickersUtilsProvider>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.bt_recurring_normal_container}>
                                                <div className={styles.bt_oneOff_start_container}>
                                                    <div className={styles.bt_oneOff_start_text}>
                                                        <div className={styles.bt_oneOff_icon}>
                                                            <img src="/img/Dashboard/alert_icon.svg"></img>
                                                        </div>
                                                        <div className={styles.bt_oneOff_text}>
                                                            {t('dashboard.eve.dateRange')}
                                                        </div>
                                                    </div>
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        value={this.state.currentEventData.startDate}
                                                        classes={{ root: styles.eventBasicInfo_DT }}
                                                        id="event_recurring_cus_startDate"
                                                    />-
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        value={this.state.currentEventData.endDate}
                                                        classes={{ root: styles.eventBasicInfo_DT }}
                                                        id="event_recurring_cus_endDate"
                                                    />
                                                </div>
                                                <div className={styles.bt_oneOff_end_container}>
                                                    <div className={styles.bt_oneOff_end_text}>
                                                        <div className={styles.endTime_text}>
                                                            {t('dashboard.eve.timeRange')}
                                                        </div>
                                                        
                                                    </div>
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        classes={{ root: styles.reminder_input }}
                                                        value={this.state.currentEventData.startTime}
                                                        id="event_recurring_cus_endTime"
                                                        />{" - "}
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        classes={{ root: styles.reminder_input }}
                                                        value={this.state.currentEventData.endTime}
                                                        id="event_recurring_cus_endTime"
                                                    />
                                                    
                                                </div>
                                                {this.state.currentEventData['rule']?
                                                <div className={styles.bt_oneOff_end_container}>
                                                    <div className={styles.bt_oneOff_end_text}>
                                                        <div className={styles.endTime_text}>
                                                            {t('dashboard.eve.recurrenceRule')}
                                                        </div>
                                                        
                                                    </div>
                                                    <div className={styles.rule_text}>{t('dashboard.eve.every')+" "+
                                                    this.state.currentEventData['rule']['period']+" "+
                                                    this.state.currentEventData['rule']['unit']} </div>
                                                    <div className={styles.rule_text}>{t('dashboard.eve.repeat')+" on "+this.state.currentEventData['rule']['fre'].toString()}</div>
                                                    <div className={styles.rule_text}>{t('dashboard.eve.before')+" "}{this.state.currentEventData['rule']['series']==="days"? this.state.currentEventData['rule']['seriesEnd']+" times":this.state.currentEventData['rule']['seriesEnd']}</div>
                                                </div>:[]}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <ToggleButtonGroup
                                            value={this.state.reminderAlignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleReminderAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="reminder"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.reminder')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="noReminder"
                                                aria-label="centered">
                                                {t('dashboard.eve.noReminder')}
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        {this.state.reminderAlignment === 'reminder' ? (
                                            <div className={styles.reminder_container}>
                                                <div className={styles.bt_oneOff_icon}>
                                                    <img src="/img/Dashboard/alarm_icon.svg"></img>
                                                </div>
                                                <div className={styles.reminder_text}>
                                                    {t('dashboard.eve.every')}
                                                </div>
                                                <InputBase
                                                    type="number"
                                                    classes={{ root: styles.reminder_input }}
                                                    value={this.state.currentEvent.reminder_fre}
                                                    onChange={(ev) => this.setBasicInfo(ev,"reminder_fre")}
                                                    id="event_tag"
                                                />
                                                <div className={styles.reminder_text_des}>
                                                    {t('dashboard.eve.m/h')}
                                                </div>
                                                <div className={styles.reminder_text}>
                                                    {t('dashboard.eve.before')}
                                                </div>
                                                <InputBase
                                                    type="number"
                                                    value={this.state.currentEvent.reminder_mh}
                                                    onChange={(ev) => this.setBasicInfo(ev,"reminder_mh")}
                                                    classes={{ root: styles.reminder_input }}
                                                    id="event_tag"
                                                />
                                                <div className={styles.reminder_text_des}>
                                                    {t('dashboard.eve.m/h')}
                                                </div>
                                            </div>
                                        ) : (
                                            []
                                        )}
                                    </div>

                                    <div>
                                        <ToggleButtonGroup
                                            value={this.state.goalsAlignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleGoalAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="goals"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.goals')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="noGoals"
                                                aria-label="centered">
                                                {t('dashboard.eve.noGoals')}
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        {this.state.goalsAlignment === 'goals' ? (
                                            <div className={styles.goal_container}>
                                                <div className={styles.reminder_text}>
                                                    {t('dashboard.eve.goals')}
                                                </div>
                                                <InputBase
                                                    type="number"
                                                    value={this.state.currentEvent.goals}
                                                    onChange={(ev) => this.setBasicInfo(ev,"goals")}
                                                    classes={{ root: styles.goal_input }}
                                                    id="event_tag"
                                                />
                                            </div>
                                        ) : (
                                            []
                                        )}
                                    </div>

                                    <div>
                                        <ToggleButtonGroup
                                            value={this.state.ticketAlignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleTicketAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="ticket"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.ticker')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="noticket"
                                                aria-label="centered">
                                                {t('dashboard.eve.noticker')}
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        {this.state.ticketAlignment === 'ticket' ? (
                                            <div className={styles.goal_container}>
                                                <div className={styles.reminder_text}>
                                                    {t('dashboard.eve.ticketFee')} $
                                                </div>
                                                <InputBase
                                                    type="number"
                                                    value={this.state.currentEvent.ticket}
                                                    onChange={(ev) => this.setBasicInfo(ev,"ticket")}
                                                    classes={{ root: styles.goal_input }}
                                                    id="event_tag"
                                                />
                                            </div>
                                        ) : (
                                            []
                                        )}
                                    </div>

                                    <div className={styles.product_section_container}>
                                        <ToggleButtonGroup
                                            value={this.state.productAlignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleProductAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="product"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.product')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="noProduct"
                                                aria-label="centered">
                                                {t('dashboard.eve.noProduct')}
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        {this.state.productAlignment === 'product' ? (
                                            <div className={styles.product_container}>
                                                <div className={styles.product_text}>
                                                    {t('dashboard.eve.linkpro')}
                                                </div>
                                                <div className={styles.product_list_container}>
                                                    {this.state.eventData.products.map(
                                                        (p, index) => (
                                                            <div
                                                                className={styles.product_img}
                                                                key={index}>
                                                                <HighlightOffIcon
                                                                    onClick={(ev) =>
                                                                        this.onRemoveProduct(index)
                                                                    }
                                                                    color="primary"
                                                                    classes={{
                                                                        colorPrimary:
                                                                            styles.HighlightOffIcon_primary
                                                                    }}
                                                                    className={
                                                                        styles.HighlightOffIcon
                                                                    }
                                                                />
                                                                <img src="/img/Dashboard/product1.svg"></img>
                                                            </div>
                                                        )
                                                    )}
                                                    <div
                                                        onClick={(ev) =>
                                                            this.handlePopperEdit(ev, 'product')
                                                        }
                                                        className={styles.product_img_add}>
                                                        <div
                                                            className={styles.product_img_add_icon}>
                                                            <img src="/img/Dashboard/add_product.svg"></img>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            []
                                        )}
                                    </div>

                                    <div className={styles.sendMsg_box}>
                                        <div className={styles.sendMsg_box_checkBox_group}>
                                            <FormControl
                                                component="fieldset"
                                                className={styles.formControl}>
                                                {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                                                <FormGroup>
                                                    <FormControlLabel
                                                        classes={{ label: styles.checkbox_label }}
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={this.state.sendtoAllst}
                                                                onChange={
                                                                    this.handlesendtoAllstChange
                                                                }
                                                                name="sendtoAllst"
                                                            />
                                                        }
                                                        label={t('dashboard.eve.sendtoAllst')}
                                                    />
                                                    <FormControlLabel
                                                        classes={{ label: styles.checkbox_label }}
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={
                                                                    this.state.sendtofuturestaff
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handlesendtofuturestaffChange
                                                                }
                                                                name="sendtofuturestaff"
                                                            />
                                                        }
                                                        label={t('dashboard.eve.sendtofuturestaff')}
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </div>
                                        <div className={styles.people_list}>
                                            {this.state.eventData.recipients.map(
                                                (person, index) => {
                                                    if (person.type === 'seller') {
                                                        return (
                                                            <Chip
                                                                color="primary"
                                                                classes={{
                                                                    root: styles.chip_root,
                                                                    colorPrimary:
                                                                        styles.chip_colorPrimary
                                                                }}
                                                                key={index}
                                                                label={person.name}
                                                                onDelete={(ev) =>
                                                                    this.handleDelete(index)
                                                                }
                                                                avatar={
                                                                    <Avatar src="/img/Dashboard/placeholder.svg" />
                                                                }
                                                            />
                                                        );
                                                    }
                                                }
                                            )}
                                            <AddCircleIcon
                                                onClick={(ev) =>
                                                    this.handlePopperEdit(ev, 'seller')
                                                }
                                                color="primary"
                                                classes={{
                                                    root: styles.AddCircleIcon_root,
                                                    colorPrimary: styles.AddCircleIcon_colorPrimary
                                                }}
                                            />
                                        </div>
                                        <div className={styles.message_box}>
                                            <InputBase
                                                placeholder={t('dashboard.eve.msg_placeholder')}
                                                classes={{
                                                    input: styles.msg_box_input,
                                                    multiline: styles.msg_box_multiline
                                                }}
                                                multiline={true}
                                                rows={10}></InputBase>
                                        </div>
                                    </div>

                                    <div className={styles.sendMsg_box}>
                                        <div className={styles.sendMsg_box_checkBox_group}>
                                            <FormControl
                                                component="fieldset"
                                                className={styles.formControl}>
                                                {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                                                <FormGroup>
                                                    <FormControlLabel
                                                        classes={{ label: styles.checkbox_label }}
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={this.state.sendToAllExiCus}
                                                                onChange={
                                                                    this.handlesendToAllExiCusChange
                                                                }
                                                                name="sendtoAllst"
                                                            />
                                                        }
                                                        label={t('dashboard.eve.sendToAllExiCus')}
                                                    />
                                                    <FormControlLabel
                                                        classes={{ label: styles.checkbox_label }}
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={
                                                                    this.state.sendToAllExiCusFu
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handlesendToAllExiCusFuChange
                                                                }
                                                                name="sendtofuturestaff"
                                                            />
                                                        }
                                                        label={t('dashboard.eve.sendToAllExiCusFu')}
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </div>
                                        <div className={styles.people_list}>
                                            {this.state.eventData.recipients.map(
                                                (person, index) => {
                                                    if (person.type === 'customer') {
                                                        return (
                                                            <Chip
                                                                color="primary"
                                                                classes={{
                                                                    root: styles.chip_root,
                                                                    colorPrimary:
                                                                        styles.chip_colorPrimary
                                                                }}
                                                                key={index}
                                                                label={person.name}
                                                                onDelete={(ev) =>
                                                                    this.handleDelete(index)
                                                                }
                                                                avatar={
                                                                    <Avatar src="/img/Dashboard/placeholder.svg" />
                                                                }
                                                            />
                                                        );
                                                    }
                                                }
                                            )}
                                            <AddCircleIcon
                                                onClick={(ev) =>
                                                    this.handlePopperEdit(ev, 'customer')
                                                }
                                                color="primary"
                                                classes={{
                                                    root: styles.AddCircleIcon_root,
                                                    colorPrimary: styles.AddCircleIcon_colorPrimary
                                                }}
                                            />
                                        </div>
                                        <div className={styles.message_box}>
                                            <InputBase
                                                placeholder={t('dashboard.eve.msg_placeholder')}
                                                classes={{
                                                    input: styles.msg_box_input,
                                                    multiline: styles.msg_box_multiline
                                                }}
                                                multiline={true}
                                                rows={10}></InputBase>
                                        </div>
                                    </div>
                                </Grid>

                                {/* Add button */}
                                <div className={styles.sendBT_group}>
                                    <Button classes={{ root: styles.bt_draft_root }}>
                                        {t('dashboard.eve.save_draft')}
                                    </Button>
                                    <Button onClick={this.onSend} classes={{ root: styles.bt_root }}>
                                        {t('dashboard.eve.send')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Grid>

                    <Grid container item xs={3}>
                        <div className={styles.event_card_continer_2}>
                            <div className={styles.calendar_container}>
                                <Calendar eventList={this.state.eventList} />
                            </div>
                            <div className={styles.eventList_container}>
                                <div className={styles.eventList_title}>
                                    All Events (upcoming, new, completed):
                                </div>
                                
                                <div className={styles.eventList_card}>
                                    {this.state.eventList.map((event, index) => (
                                        <Grid
                                            container
                                            key={index}
                                            className={styles.eventList_card_container}
                                            onClick={(ev)=>this.handleComplateEventDialog(ev, event.name, event.when.type, event.scheme)}
                                        >
                                            <Grid
                                                item
                                                xs={1}
                                                className={styles.eventList_card_column_1}>
                                                <div
                                                    style={{ background: event.scheme }}
                                                    className={
                                                        styles.eventList_card_eventType
                                                    }></div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={9}
                                                className={styles.eventList_card_column_2}>
                                                <div className={styles.event_title}>
                                                    {event.name}
                                                </div>
                                                <div className={styles.eventList_date}>
                                                    {event.when.start}
                                                </div>
                                                <div className={styles.eventList_to}>to</div>
                                                <div className={styles.eventList_date}>
                                                    {event.when.end}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                className={styles.eventList_card_column_3}>
                                                <div className={styles.event_title}>Goal</div>
                                                <div className={styles.eventList_date}>
                                                    {event.goals.attendee}
                                                </div>
                                                <div className={styles.eventList_date}>
                                                    {event.fee.amount}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </div>
                                
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <DataGridPopper
                    t={t}
                    open={this.state.dataGridPopperOpen}
                    anchorEl={this.state.dataGridPopperAnchorEl}
                    column={this.customerColumn}
                    row={this.state.row}
                    handleCheckBoxChanged={this.handleCheckBoxChanged}
                    handleChange={this.handleChange}
                />

                <RecurringCalendarDialog
                    t={t}
                    dialogOpen={this.state.dialogOpen}
                    handleDialogClose={this.handleDialogClose}
                    alignment={this.state.alignment}
                    handleDialogSave={this.handleDialogSave}
                />

                <EventDialog
                    t={t}
                    dialogOpen={this.state.eventDialogOpen}
                    eventName={this.state.completeEvent}
                    eventType={this.state.completeEventType}
                    eventColor={this.state.completeEventColor}
                    handleDialogClose={this.handleEventDialog}                                      
                />
                
            </div>
        );
    }
}

export default Event;