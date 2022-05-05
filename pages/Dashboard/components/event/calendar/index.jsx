
import * as React from 'react';
import styles from './index.module.scss';
import ReactCSSTransitionGroup from 'react-transition-group';
import moment from "moment"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: moment(),
      selectedDay: moment().startOf("day"),
      selectedMonthEvents: [],
      showEvents: false
    };

   
  }

  componentWillMount() {
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.goToCurrentMonthView = this.goToCurrentMonthView.bind(this);

    this.initialiseEvents();
  }

  previous() {
    const currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: currentMonthView.subtract(1, "month")
    });
  }

  next() {
    const currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: currentMonthView.add(1, "month")
    });
  }

  select(day) {
    this.setState({
      selectedMonth: day.date,
      selectedDay: day.date.clone(),
      showEvents: true
    });
  }

  goToCurrentMonthView(){
    const currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: moment()
    });
  }
  
  showCalendar() {
    this.setState({
      selectedMonth: this.state.selectedMonth,
      selectedDay: this.state.selectedDay,
      showEvents: false
    });
  }

  renderMonthLabel() {
    const currentMonthView = this.state.selectedMonth;
    return (
      <span className={styles.box,styles['month-label']}>
        {currentMonthView.format("MMMM YYYY")}
      </span>
    );
  }

  renderDayLabel() {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className={styles.box,styles['month-label']}>
        {currentSelectedDay.format("DD MMMM YYYY")}
      </span>
    );
  }
  
  renderTodayLabel() {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className={styles.box,styles['today-label']} onClick={this.goToCurrentMonthView}>
        Today
      </span>
    );
  }
  
  renderWeeks() {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const monthEvents = this.state.selectedMonthEvents;

    let weeks = [];
    let done = false;
    let previousCurrentNextView = currentMonthView
      .clone()
      .startOf("month")
      .subtract(1, "d")
      .day("Monday");
    let count = 0;
    let monthIndex = previousCurrentNextView.month();

    while (!done) {
      weeks.push(
        <Week
          key={count}
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={currentMonthView}
          monthEvents={monthEvents}
          selected={currentSelectedDay}
          select={day => this.select(day)}
        />
      );
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  }

  handleAdd() {
    const monthEvents = this.state.selectedMonthEvents;
    const currentSelectedDate = this.state.selectedDay;

    let newEvents = [];

    var eventTitle = prompt("Please enter a name for your event: ");

    switch (eventTitle) {
      case "":
        alert("Event name cannot be empty.");
        break;
      case null:
        alert("Changed your mind? You can add one later!");
        break;
      default:
        var newEvent = {
          title: eventTitle,
          date: currentSelectedDate,
          dynamic: true
        };

        newEvents.push(newEvent);

        for (var i = 0; i < newEvents.length; i++) {
          monthEvents.push(newEvents[i]);
        }

        this.setState({
          selectedMonthEvents: monthEvents
        });
        break;
    }
  }

  addEvent() {
    const currentSelectedDate = this.state.selectedDay;
    let isAfterDay = moment().startOf("day").subtract(1, "d");

    if (currentSelectedDate.isAfter(isAfterDay)) {
      this.handleAdd();
    } else {
      if (confirm("Are you sure you want to add an event in the past?")) {
        this.handleAdd();
      } else {
      } // end confirm past
    } //end is in the past
  }

  removeEvent(i) {
    const monthEvents = this.state.selectedMonthEvents.slice();
    const currentSelectedDate = this.state.selectedDay;

    if (confirm("Are you sure you want to remove this event?")) {
      let index = i;

      if (index != -1) {
        monthEvents.splice(index, 1);
      } else {
        alert("No events to remove on this day!");
      }

      this.setState({
        selectedMonthEvents: monthEvents
      });
    }
  }

  setCalendarEvent(){

  }

  initialiseEvents() {
    const monthEvents = this.state.selectedMonthEvents;

    let allEvents = [];

    this.props.eventList.map((e,index)=>{

      if(e.when.type =="oneoff"){
        
        let event = {
          title:e.name,
          scheme:e.scheme,
          date:moment(e.when.start,'YYYY-MM-DD hh:mma'),
          dynamic: false,
          color:e.scheme
        }
          allEvents.push(event)

      }else{

        let startDay =  moment(e.when.start,'YYYY-MM-DD hh:mma')
        let next = startDay.clone()
        let end = moment(e.when.end,'YYYY-MM-DD hh:mma')
        while(next.isBefore(end,"d")){
          
          let event = {
            title:e.name,
            scheme:e.scheme,
            date:next,
            dynamic: false,
            color:e.scheme
          }
          allEvents.push(event)
          next = next.clone()
          e.when.period? next.add(e.when.period, "d"):next.add(1, "d")
        }
        let event = {
          title:e.name,
          scheme:e.scheme,
          date:end,
          dynamic: false,
          color:e.scheme
        }
        allEvents.push(event)
      }
      
    })

    for (var i = 0; i < allEvents.length; i++) {
      monthEvents.push(allEvents[i]);
    }

    this.setState({
      selectedMonthEvents: monthEvents
    });
  }

  render() {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const showEvents = this.state.showEvents;

    if (showEvents) {
      return (
        <section className={styles["main-calendar"]}>
          <header className={styles["calendar-header"]}>
            <div className={styles["row"]+" "+styles[" title-header"]}>
              {this.renderDayLabel()}
            </div>
            <div className={styles["row"]+" "+ styles["button-container"]}>
              <i
                className={styles["row"]+" "+ styles["arrow"]+" "+styles["fa"]+" "+styles["fa-angle-left"]}
                onClick={this.showCalendar}
              />
              <i
                className={styles["box"]+" "+ styles["event-button"]+" "+styles["fa"]+" "+styles["fa-plus-square"]}
                onClick={this.addEvent}
              />
            </div>
          </header>
          <Events
            selectedMonth={this.state.selectedMonth}
            selectedDay={this.state.selectedDay}
            selectedMonthEvents={this.state.selectedMonthEvents}
            removeEvent={i => this.removeEvent(i)}
          />
        </section>
      );
    } else {
      return (
        <section className={styles["main-calendar"]}>
          <header className={styles["calendar-header"]}>
            <div className={styles["row"]+" "+ styles["title-header"]}>
              <ChevronLeftIcon className={styles["row"]+" "+ styles["arrow"]} onClick={this.previous}/>
              {/* <i
                className={styles["row"]+" "+ styles["arrow"]+" "+ styles["fa"]+" "+ styles["fa-angle-left"]}
                onClick={this.previous}
              /> */}
              <div className={styles["box"]+" "+ styles["header-text"]}>
              {this.renderTodayLabel()}
              {this.renderMonthLabel()}
              </div>
              <ChevronRightIcon className={styles["row"]+" "+ styles["arrow"]} onClick={this.next}/>
              {/* <i className={styles["row"]+" "+ styles["arrow"]+" "+ styles["fa"]+" "+styles["fa-angle-right"]} onClick={this.next} /> */}
            </div>
            <DayNames />
          </header>
          <div className={styles["days-container"]}>
            {this.renderWeeks()}
          </div>
        </section>
      );
    }
  }
}

class Events extends React.Component {
  render() {
    const currentMonthView = this.props.selectedMonth;
    const currentSelectedDay = this.props.selectedDay;
    const monthEvents = this.props.selectedMonthEvents;
    const removeEvent = this.props.removeEvent;

    const monthEventsRendered = monthEvents.map((event, i) => {
      return (
        <div className={styles["calendar-content"]}>
        <div
          key={event.title}
          className={styles["event-container"]}
          onClick={() => removeEvent(i)}
        >
          <ReactCSSTransitionGroup
            component="div"
            className={styles["animated-time"]}
            transitionName="time"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <div className={styles["event-time"]+" "+styles["event-attribute"]}>
              {event.date.format("HH:mm")}
            </div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup
            component="div"
            className={styles["animated-title"]}
            transitionName="title"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <div className={styles["event-title"]+" "+styles["event-attribute"]}>{event.title}</div>
          </ReactCSSTransitionGroup>
        </div>
        </div>
      );
    });

    const dayEventsRendered = [];

    for (var i = 0; i < monthEventsRendered.length; i++) {
      if (monthEvents[i].date.isSame(currentSelectedDay, "day")) {
        dayEventsRendered.push(monthEventsRendered[i]);
      }
    }

    return (
      <div className={styles["day-events"]}>
        {dayEventsRendered}
      </div>
    );
  }
}

class DayNames extends React.Component {
  render() {
    return (
      <div className={styles["row"] +" "+ styles["days-header"]}>
        <span className={styles["box"] +" "+ styles["day-name"]}>Mon</span>
        <span className={styles["box"] +" "+ styles["day-name"]}>Tue</span>
        <span className={styles["box"] +" "+ styles["day-name"]}>Wed</span>
        <span className={styles["box"] +" "+ styles["day-name"]}>Thu</span>
        <span className={styles["box"] +" "+ styles["day-name"]}>Fri</span>
        <span className={styles["box"] +" "+ styles["day-name"]}>Sat</span>
        <span className={styles["box"] +" "+ styles["day-name"]}>Sun</span>
      </div>
    );
  }
}

class Week extends React.Component {
  render() {
    let days = [];
    let date = this.props.previousCurrentNextView;
    let currentMonthView = this.props.currentMonthView;
    let selected = this.props.selected;
    let select = this.props.select;
    let monthEvents = this.props.monthEvents;

    for (var i = 0; i < 7; i++) {
      var dayHasEvents = false;
      var eventColorlist = []
      for (var j = 0; j < monthEvents.length; j++) {
        if (monthEvents[j].date.isSame(date, "day")) {
          dayHasEvents = true;
          eventColorlist.push(monthEvents[j].color)
        }
      }

      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === currentMonthView.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        hasEvents: dayHasEvents,
        eventColor:eventColorlist
      };

      days.push(<Day key={day.number} day={day} selected={selected} select={select} />);
      date = date.clone();
      date.add(1, "d");
    }
    return (
      <div className={[styles["row"]+" "+styles["week"]]}>
        {days}
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    let day = this.props.day;
    let selected = this.props.selected;
    let select = this.props.select;
    return (
      <div
        className={
          styles["day"] +
          (day.isToday ? " "+styles["today"] : "") +
          (day.isCurrentMonth ? "" : " "+styles["different-month"]) +
          (day.date.isSame(selected) ? " "+styles["selected"] : "") +
          (day.hasEvents ? " "+styles["has-events"] : "")
        }
        // onClick={() => select(day)}
      > 
        <div className={styles.day_content}>
          <div className={styles["day-number"]}>{day.number}</div>
            {day.hasEvents ? 
              <div className={styles.event_dot_group}>
                {day.eventColor.map((c,index)=>(
                  <div key={index} style={{background : c}} className={styles.event_dot}></div>
                ))}
              </div>
            :[]}
          
        </div>
      </div>
    );
  }
}

export default Calendar
