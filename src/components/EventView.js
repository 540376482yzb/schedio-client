import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Weather from './Widgets/WeatherWidget';
import Map from './Widgets/MapWidget';
// import Todo from './Widgets/Todo';
// import Trail from './Widgets/trail';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import MediaQuery from 'react-responsive';

export class EventView extends React.Component {
  render() {
    const { currentEvent, history } = this.props;
    let widgetsForShow = [];
    if (currentEvent.id) {
      const widgets = currentEvent.widgets;
      for (let widget in widgets) {
        if (widgets[widget].displayed === true) {
          if (widget === 'weather') {
            widgetsForShow.push(
              <Card>
                <Weather event={currentEvent} key={'weather'} />
              </Card>
            );
          }
        }
      }
    }

    return (
<<<<<<< HEAD
      <main>
        <Card>
          <Header
            title={currentEvent.title ? currentEvent.title : 'No Event Selected'}
            date={currentEvent.title ? new Date(Number(currentEvent.starttime)).toDateString() : ''}
            location={currentEvent.location.address ? currentEvent.location.address : ''}
            countdown={
              currentEvent.starttime ? moment(Number(currentEvent.starttime)).fromNow() : ''
=======
      <Card>
        <div>
          <CardHeader
            title={
              this.props.currentEvent.title ? this.props.currentEvent.title : 'No Upcoming Events.  Why not create some?'
            }
            subtitle={
              this.props.currentEvent.title
                ? new Date(Number(this.props.currentEvent.starttime)).toDateString()
                : ''
>>>>>>> Set up default event logic for event view
            }
            history={history}
          />
        </Card>
        <br />
        <section>{widgetsForShow}</section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.events.activeEvent ? state.events.activeEvent : ''
});

export default withRouter(connect(mapStateToProps)(EventView));

/*=============== Header Component for EventView==================
 @props { title, location, date, countdown, history }
*/
function Header(props) {
  const { title, location, date, countdown, history } = props;
  return (
    <MediaQuery maxWidth={700}>
      {matches => {
        return (
          <main style={matches ? styles.headerContainer : styles.headerContainerDesk}>
            <div style={styles.gearIcon}>
              <IconButton tooltip="setting" onClick={() => history.push('/dashboard/eventsetting')}>
                <ActionSettings />
              </IconButton>
            </div>
            {/* Left half div */}
            <section>
              <header style={styles.headerTitle}>
                {title.length > 10 ? title.substring(0, 25) + '...' : title}
              </header>
              <section style={styles.subHeaderContainer}>
                <div style={styles.subHeaderItem}>
                  <header style={styles.headerLabel}>Location</header>
                  <section>{location}</section>
                </div>
                <div style={styles.subHeaderItem}>
                  <header style={styles.headerLabel}>Date</header>
                  <section>{date}</section>
                </div>
              </section>
            </section>
            {/* right half div */}
            <section>
              <header style={styles.headerLabel}>Event count down</header>
              <div>{countdown}</div>
            </section>
          </main>
        );
      }}
    </MediaQuery>
  );
}

const styles = {
  headerContainerDesk: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '10px 40px 10px 10px'
  },
  headerContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 25px 10px 10px'
  },
  headerTitle: {
    overflow: 'hidden'
  },
  gearIcon: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  subHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '10px 0'
  },
  subHeaderItem: {
    padding: '10px 10px'
  },
  headerLabel: {
    color: 'rgba(140, 140, 140,0.9)'
  }
};
