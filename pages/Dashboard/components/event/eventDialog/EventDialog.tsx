import * as React from 'react';
import {
    Grid,
    Button,
    Dialog,
    DialogContent,
    InputBase,
    Chip,
    Avatar,
    Typography,
} from '@material-ui/core';
import styles from './index.module.css';

import 'date-fns';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import eventData from '../../../../../public/eventData/event_newEvent_web.json';
import eventList from '../../../../../public/eventData/event_list_web.json';

import oneoff from '../../../../../event_completedEventoneoff_web.json';
import normal from '../../../../../event_completedEventnormal_web.json';
import customise from '../../../../../event_completedEventcustomise_web.json';

interface Props {
    t: (params: String) => string;
    dialogOpen: boolean;
    eventName: string;
    eventType: string;
    eventColor: string;
    handleDialogClose: () => void;
}
interface PeopleProps {
    t: (params: String) => string;
    dialogOpen: boolean;
    handleDialogClose: () => void;
}
const setColor = (scheme:any) => {
    let color = scheme.split('/');
    let colorL = [];
    color.forEach((c: string) => {
        colorL.push({ color: c , selected: false});
    });
    return colorL;
};
var eventDialogOpen = false;
function handlePeopleList() {
    eventDialogOpen = !eventDialogOpen;
};

function isEmpty(products){
    for (var product in products){
        return false;
    }
    return true;
};

function PeopleList(props: PeopleProps) {
    const { t, dialogOpen, handleDialogClose } = props;
    return(
        <Dialog 
            classes={{ paperWidthSm: styles.paper_WidthXs }} 
            open={dialogOpen} 
            onClose={handleDialogClose} 
            aria-labelledby="event-dialog">
        </Dialog>
    )
};

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, people } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <List>
        {people.map((p) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={p.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    people: PropTypes.any.isRequired,
  };

function EventDialog(props: Props) {
    
    const { t, dialogOpen, handleDialogClose, eventName, eventType, eventColor } = props;
    let colorList = setColor(eventData.scheme);
    eventDialogOpen = false;
    let colorindex = 0;
    {eventColor === 'violet' ? (colorindex = 0)
    :eventColor === 'blue' ? (colorindex = 1)
    :eventColor === 'yellow' ? (colorindex = 2)
    :eventColor === 'green' ? (colorindex = 3)
    :eventColor === 'pink' ? (colorindex = 4)
    :eventColor === 'red' ? (colorindex = 5)
    :(colorindex = 6)}

    let type;
    {eventType === 'oneoff' ?(
        type = oneoff
    ):eventType === 'normal' ?(
        type = normal
    ):(
        type = customise
    )};

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        
        <Dialog 
            classes={{ paperWidthSm: styles.paper_WidthXs }} 
            open={dialogOpen} 
            onClose={handleDialogClose} 
            aria-labelledby="event-dialog">
            <DialogContent classes={{ root: styles.dialog_root }}>
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
                                        <Grid container
                                            spacing={0}
                                            direction="column"
                                            alignItems="center"
                                            justify="center">
                                            <div className={styles.event_complete_icon}>
                                                <div
                                                    
                                                    className={styles.select_color_icon}>
                                                </div>
                                                <img src="/img/Dashboard/icon.svg"></img>
                                            </div>
                                            <div className={styles.userName_complete_wrapper}>HQ WATER</div>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <div className={styles.eventBasicInfo_column}>
                                                
                                                <div className={styles.eventBasicInfo_container}>
                                                    <div
                                                        className={styles.eventBasicInfo_complete_name}
                                                       
                                                    >{eventName}</div>
                                                    
                                                    <div className={styles.color_input_container}>
                                                        <div className={styles.color_input_label}>
                                                            {t('dashboard.eve.color')}
                                                        </div>
                                                        <div className={styles.color_selection}>
                                                            {colorList.map(
                                                                (color, index) => (
                                                                    <div
                                                                        style={{
                                                                            background: color.color
                                                                        }}
                                                                        className={styles.color_options}>
                                                                        {index === colorindex ? (
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
                                                        </div >
                                                        
                                                        <div className={styles.eventBasicInfo_complete_tag}>
                                                            {type.tags}</div>
                                                          
                                                    </div>
                                                    <div className={styles.tag_basic_complete_des}>
                                                        {t('dashboard.eve.basic_des')}
                                                    </div>
                                                    
                                                    <div className={styles.event_address_container}>
                                                    <div className={styles.event_address_label}>
                                                        {t('dashboard.eve.address')}
                                                    </div>
                                                    
                                                    <div className={ styles.eventBasicInfo_complete_tag }>
                                                        {type.where}</div>
                                                </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid>
                                        
                                        <div>
                                            {eventType === 'oneoff' ? (
                                                <ToggleButtonGroup
                                                    className={styles.groupBT_container_root}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="one_off"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.one_off')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="recurring_normal"
                                                        aria-label="centered">
                                                        <div className={styles.bt_text_container}>
                                                            <div>{t('dashboard.eve.dateRange')}</div>
                                                
                                                        </div>
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="recurring_cus"
                                                        aria-label="right aligned">
                                                        <div className={styles.bt_text_container}>
                                                            <div>{t('dashboard.eve.recurring')}</div>
                                                        
                                                        </div>
                                                    </Button>
                                                </ToggleButtonGroup>
                                            ): eventType === 'normal' ? (
                                                <ToggleButtonGroup
                                                    className={styles.groupBT_container_root}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="one_off"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.one_off')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="recurring_normal"
                                                        aria-label="centered">
                                                        <div className={styles.bt_text_container}>
                                                            <div>{t('dashboard.eve.dateRange')}</div>
                                                
                                                        </div>
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="recurring_cus"
                                                        aria-label="right aligned">
                                                        <div className={styles.bt_text_container}>
                                                            <div>{t('dashboard.eve.recurring')}</div>
                                                        
                                                        </div>
                                                    </Button>
                                                </ToggleButtonGroup>
                                            ):(
                                                <ToggleButtonGroup
                                                    
                                                    exclusive
                                                    className={styles.groupBT_container_root}
                                                    
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="one_off"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.one_off')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="recurring_normal"
                                                        aria-label="centered">
                                                        <div className={styles.bt_text_container}>
                                                            <div>{t('dashboard.eve.dateRange')}</div>
                                                
                                                        </div>
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="recurring_cus"
                                                        aria-label="right aligned">
                                                        <div className={styles.bt_text_container}>
                                                            <div>{t('dashboard.eve.recurring')}</div>
                                                        
                                                        </div>
                                                    </Button>
                                                </ToggleButtonGroup>
                                            )}
                                            {eventType === 'normal' ? (
                                                <div className={styles.bt_recurring_normal_container}>
                                                    <div className={styles.bt_oneOff_start_container}>
                                                        <div className={styles.bt_oneOff_start_text}>
                                                            <div className={styles.bt_oneOff_complete_icon}>
                                                                <img src="/img/Dashboard/alert_icon.svg"></img>
                                                            </div>
                                                            <div className={styles.bt_oneOff_text}>
                                                                {t('dashboard.eve.dateRange')}
                                                            </div>
                                                        </div>

                                                        <div className={styles.one_off_input_group}>
                                                            <Grid container >
                                                                <div
                                                                    className={ styles.event_complete_range }
                                                                >{normal.when.startDate}</div>-
                                                                <div
                                                                    className={ styles.event_complete_range }
                                                                >{normal.when.endDate}</div>
                                                                
                                                            </Grid>
                                                        </div>

                                                    </div>
                                                    <div className={styles.bt_oneOff_end_container}>
                                                        <div className={styles.time_range_complte}>
                                                            <div className={styles.endTime_text}>
                                                                {t('dashboard.eve.timeRange')}
                                                            </div>
                                                        </div>

                                                        <div className={styles.one_off_input_group}>
                                                            <Grid container >
                                                                <div
                                                                    className={ styles.event_complete_range }
                                                                >{normal.when.startTime}</div>
                                                                -
                                                                <div
                                                                    className={ styles.event_complete_range }
                                                                >{normal.when.endTime}</div>
                                                                
                                                            </Grid>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : eventType === 'oneoff' ? (
                                                <div className={styles.bt_oneOff_complete_container}>
                                                    <div className={styles.bt_oneOff_start_container}>
                                                        <div className={styles.bt_oneOff_start_text}>
                                                            <div className={styles.bt_oneOff_complete_icon}>
                                                                <img src="/img/Dashboard/alert_icon.svg"></img>
                                                            </div>
                                                            <div className={styles.bt_oneOff_text}>
                                                                {t('dashboard.eve.startDT')}
                                                            </div>
                                                            
                                                            <div className={styles.bt_oneOff_complete_icon}>
                                                                <img src="/img/Dashboard/alert_icon.svg"></img>
                                                            </div>
                                                            <div className={styles.bt_oneOff_text}>
                                                                {t('dashboard.eve.endDT')}
                                                            </div> 
                                                        </div>
                                                        <div className={styles.one_off_input_group}>
                                                        
                                                                <Grid container justify="space-around">
                                                                    <div
                                                                        className={ styles.event_complete_time }
                                                                        id="selectedOneOffDate"
                                                                        
                                                                    >{oneoff.when.startDate},   {oneoff.when.startTime}</div>

                                                                    <div
                                                                        className={ styles.event_complete_time }
                                                                        id="selectedOneOffDate"
                                                                        
                                                                    >{oneoff.when.endDate},   {oneoff.when.endTime}</div>
                                                                    
                                                                </Grid>
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={styles.bt_recurring_normal_container}>
                                                    <div className={styles.bt_oneOff_start_container}>
                                                        <div className={styles.bt_oneOff_start_text}>
                                                            <div className={styles.bt_oneOff_complete_icon}>
                                                                <img src="/img/Dashboard/alert_icon.svg"></img>
                                                            </div>
                                                            <div className={styles.bt_oneOff_text}>
                                                                {t('dashboard.eve.dateRange')}
                                                            </div>
                                                        </div>

                                                        <div className={styles.one_off_input_group}>
                                                            <Grid container >
                                                                <div
                                                                    className={ styles.event_complete_range }
                                                                >{customise.when.startDate}</div>-
                                                                <div
                                                                    className={ styles.event_complete_range }
                                                                >{customise.when.endDate}</div>
                                                                
                                                            </Grid>
                                                        </div>

                                                    </div>
                                                    <div className={styles.bt_oneOff_end_container}>
                                                        <div className={styles.time_range_complte}>
                                                            <div className={styles.endTime_text}>
                                                                {t('dashboard.eve.timeRange')}
                                                            </div>
                                                        </div>

                                                        <div className={styles.one_off_input_group}>
                                                            <Grid container >
                                                                <div
                                                                    className={ styles.event_complete_range }
                                                                >{customise.when.startTime}</div>
                                                                -
                                                                <div
                                                                    className={ styles.event_complete_range }
                                                                >{customise.when.endTime}</div>
                                                                
                                                            </Grid>
                                                        </div>
                                                    </div>
                                                
                                                    {/* {this.state.currentEventData['rule']?
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
                                                    </div>:[]} */}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            {type.reminder.switch === 'on' ? (
                                                <ToggleButtonGroup
                                                    classes={{ root: styles.groupBT_container_root }}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="reminder"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.reminder')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="noReminder"
                                                        aria-label="centered">
                                                        {t('dashboard.eve.noReminder')}
                                                    </Button>
                                                </ToggleButtonGroup>
                                            ):(
                                                <ToggleButtonGroup
                                                    classes={{ root: styles.groupBT_container_root }}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="reminder"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.reminder')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="noReminder"
                                                        aria-label="centered">
                                                        {t('dashboard.eve.noReminder')}
                                                    </Button>
                                                </ToggleButtonGroup>
                                            )}
                                            {type.reminder.switch === 'on' ? (
                                                <div className={styles.reminder_container}>
                                                    <div className={styles.bt_oneOff_icon}>
                                                        <img src="/img/Dashboard/alarm_icon.svg"></img>
                                                    </div>
                                                    <div className={styles.reminder_text}>
                                                        {t('dashboard.eve.every')}
                                                    </div>
                                                    <div
                                                        className={ styles.reminder_complete_input }
                                                    >{type.reminder.period}</div>
                                                    <div className={styles.reminder_text_des}>
                                                        {t('dashboard.eve.m/h')}
                                                    </div>
                                                    <div className={styles.reminder_text}>
                                                        {t('dashboard.eve.before')}
                                                    </div>
                                                    <div
                                                        className={ styles.reminder_complete_input }
                                                    >{type.reminder.period}</div>
                                                    <div className={styles.reminder_text_des}>
                                                        {t('dashboard.eve.m/h')}
                                                    </div>
                                                </div>
                                            ) : (
                                                []
                                            )}
                                        </div>

                                        <div>
                                            {type.goals.switch === 'on' ? (
                                                <ToggleButtonGroup
                                                    classes={{ root: styles.groupBT_container_root }}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="goals"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.goals')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                        styles.groupBT_root
                                                        }
                                                        value="noGoals"
                                                        aria-label="centered">
                                                        {t('dashboard.eve.noGoals')}
                                                    </Button>
                                                </ToggleButtonGroup>
                                            ):(
                                                <ToggleButtonGroup
                                                    classes={{ root: styles.groupBT_container_root }}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="goals"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.goals')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                        styles.groupBT_complete
                                                        }
                                                        value="noGoals"
                                                        aria-label="centered">
                                                        {t('dashboard.eve.noGoals')}
                                                    </Button>
                                                </ToggleButtonGroup>
                                            )}
                                            {type.goals.switch === 'on' ? (
                                                <div className={styles.goal_container}>
                                                    <div className={styles.reminder_text}>
                                                        {t('dashboard.eve.goals')}
                                                    </div>
                                                    <div
                                                        className={ styles.goal_complete_input }
                                                    >{type.goals.amount} attendees</div>
                                                </div>
                                            ) : (
                                                []
                                            )}
                                        </div>

                                        <div>
                                            {type.fee.switch === 'on' ? (
                                                <ToggleButtonGroup
                                                    classes={{ root: styles.groupBT_container_root }}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="ticket"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.ticker')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="noticket"
                                                        aria-label="centered">
                                                        {t('dashboard.eve.noticker')}
                                                    </Button>
                                                </ToggleButtonGroup>
                                            ):(
                                                <ToggleButtonGroup
                                                    classes={{ root: styles.groupBT_container_root }}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="ticket"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.ticker')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="noticket"
                                                        aria-label="centered">
                                                        {t('dashboard.eve.noticker')}
                                                    </Button>
                                                </ToggleButtonGroup>
                                            )}
                                            {type.fee.switch === 'on' ? (
                                                <div className={styles.goal_container}>
                                                    <div className={styles.reminder_text}>
                                                        {t('dashboard.eve.ticketFee')} $
                                                    </div>
                                                    <div
                                                        className={styles.goal_complete_input }
                                                    >{type.fee.amount}</div>
                                                </div>
                                            ) : (
                                                []
                                            )}
                                        </div>
                                        
                                        <div className={styles.product_section_container}>
                                            {isEmpty(type.products) === false ? ( 
                                                <ToggleButtonGroup
                                                    classes={{ root: styles.groupBT_container_root }}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="product"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.product')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="noProduct"
                                                        aria-label="centered">
                                                        {t('dashboard.eve.noProduct')}
                                                    </Button>
                                                </ToggleButtonGroup>
                                            ):(
                                                <ToggleButtonGroup
                                                    classes={{ root: styles.groupBT_container_root }}
                                                    aria-label="text alignment">
                                                    <Button
                                                        className={
                                                            styles.groupBT_root
                                                        }
                                                        value="product"
                                                        aria-label="left aligned">
                                                        {t('dashboard.eve.product')}
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles.groupBT_complete
                                                        }
                                                        value="noProduct"
                                                        aria-label="centered">
                                                        {t('dashboard.eve.noProduct')}
                                                    </Button>
                                                </ToggleButtonGroup>
                                            )}
                                            {isEmpty(type.products) === false ? (
                                                <div className={styles.product_complete_container}>
                                                    <div className={styles.product_text}>
                                                        {t('dashboard.eve.linkpro')}
                                                    </div>
                                                    <div className={styles.product_list_container}>
                                                        {type.products.map(product => (
                                                            <div
                                                                className={styles.product_img}>
                                                                    
                                                                <img src="/img/Dashboard/product1.svg"></img>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                []
                                            )}
                                        </div>
                                        <div className={styles.sellertitle}>Invitees-Seller {type['invitee-seller'].length}</div>
                                        <div className={styles.sendMsg_complete_box}>
                                            <div className={styles.sendMsg_box_checkBox_group}>
                                            </div>
                                            <div className={styles.people_list}>
                                                {type['invitee-seller'].map((seller, index)=>(
                                                    index <= 8 ? 
                                                    <Chip
                                                        color="primary"
                                                        className={styles.chip_complete_root}
                                                        label={seller.name}
                                                        avatar={
                                                            <Avatar src="/img/Dashboard/placeholder.svg" />
                                                        }
                                                    />
                                                : index === 9 ?
                                                <div className={styles.gobutton}>
                                                    <Button onClick={handleClickOpen}>
                                                    <img src="/img/Dashboard/to.svg"></img>
                                                    </Button>
                                                    <SimpleDialog open={open} onClose={handleClose} people={type['invitee-seller']}/>
                                                </div>
                                                :
                                                    ''
                                                ))}
                                                
                                            </div>
                                        </div>
                                        
                                        <div className={styles.message_box}>
                                            <div className={styles.msg_box_complete}>
                                                {type["message-seller"]}
                                            </div>
                                        </div>

                                        <div className={styles.sellertitle}>Atendees-Seller {type['attendee-seller'].length}</div>
                                        <div className={styles.sendMsg_complete_box}>
                                            <div className={styles.sendMsg_box_checkBox_group}>
                                            </div>
                                            <div className={styles.people_list}>
                                                {type['attendee-seller'].map((seller, index)=>(
                                                    index <= 8 ? 
                                                    <Chip
                                                        color="primary"
                                                        className={styles.chip_complete_attendee}
                                                        label={seller.name}
                                                        avatar={
                                                            <Avatar src="/img/Dashboard/placeholder.svg" />
                                                        }
                                                    />
                                                : index === 9 ?
                                                <div className={styles.gobutton}>
                                                    <Button onClick={handleClickOpen}>
                                                    <img src="/img/Dashboard/to.svg"></img>
                                                    </Button>
                                                    <SimpleDialog open={open} onClose={handleClose} people={type['attendee-seller']}/>
                                                </div>
                                                :
                                                    ''
                                                ))}
                                                
                                            </div>
                                            
                                        </div>
                                        
                                        <div className={styles.sellertitle}>Invitees-Customer {type['invitee-customer'].length}</div>
                                        <div className={styles.sendMsg_complete_box}>
                                            <div className={styles.sendMsg_box_checkBox_group}>
                                            </div>
                                            <div className={styles.people_list}>
                                                {type['invitee-customer'].map((seller, index)=>(
                                                    index <= 8 ? 
                                                    <Chip
                                                        color="primary"
                                                        className={styles.chip_complete_root}
                                                        label={seller.name}
                                                        avatar={
                                                            <Avatar src="/img/Dashboard/placeholder.svg" />
                                                        }
                                                    />
                                                : index === 9 ?
                                                <div className={styles.gobutton}>
                                                    <Button onClick={handleClickOpen}>
                                                    <img src="/img/Dashboard/to.svg"></img>
                                                    </Button>
                                                    <SimpleDialog open={open} onClose={handleClose} people={type['invitee-customer']}/>
                                                </div>
                                                :
                                                    ''
                                                ))}
                                            
                                            </div>
                                        </div>
                                        
                                        <div className={styles.message_box}>
                                            <div className={styles.msg_box_complete}>
                                                {type["message-customer"]}
                                            </div>
                                        </div>
                                        <div className={styles.sellertitle}>Atendees-Customer {type['attendee-customer'].length}</div>
                                        <div className={styles.sendMsg_complete_box}>
                                            <div className={styles.sendMsg_box_checkBox_group}>
                                            </div>
                                            <div className={styles.people_list}>
                                                {type['attendee-customer'].map((seller, index)=>(
                                                    index <= 8 ? 
                                                    <Chip
                                                        color="primary"
                                                        className={styles.chip_complete_attendee}
                                                        label={seller.name}
                                                        avatar={
                                                            <Avatar src="/img/Dashboard/placeholder.svg" />
                                                        }
                                                    />
                                                : index === 9 ?
                                                <div className={styles.gobutton}>
                                                    <Button onClick={handleClickOpen}>
                                                    <img src="/img/Dashboard/to.svg"></img>
                                                    </Button>
                                                    <SimpleDialog open={open} onClose={handleClose} people={type['attendee-customer']}/>
                                                </div>
                                                :
                                                    ''
                                                ))}
                                            </div>
                                            
                                        </div>
                                    
                                    </Grid>

                                </div>
                            </div>
                        </Grid>

                    </Grid>

                    <PeopleList
                        t={t}
                        dialogOpen={eventDialogOpen}
                        handleDialogClose={handlePeopleList}                                
                    />
                </div>
            </DialogContent>

        </Dialog>
    )
}
export default EventDialog;