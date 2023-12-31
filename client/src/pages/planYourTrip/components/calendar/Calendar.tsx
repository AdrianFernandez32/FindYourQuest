import React from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import EventForm from "./EventForm";
import EventInfo from "./EventInfo";
import "./index.css";
import { generateItinerary } from "../../../../assets/functions/generateItinerary";
import {
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
} from "@chakra-ui/react";

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
  isModalOpen: boolean;
  selectedInfo: DateSelectArg | null;
  isDetailsOpen: boolean;
  currentEvent: EventApi | null;
  isLoading: boolean;
}

interface CalendarProps {
  updateEvents: (newEvents: EventApi[]) => void;
  start_date: Date | string;
  end_date: Date | string;
  startingPoint: string;
  validateAutogenerate: () => boolean;
  type: "create" | "view";
}

export default class Calendar extends React.Component<
  CalendarProps,
  DemoAppState
> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
    isModalOpen: false,
    selectedInfo: null,
    isDetailsOpen: false,
    currentEvent: null,
    isLoading: false,
  };

  calendarComponentRef = React.createRef<any>();

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events,
    });

    this.props.updateEvents(events);
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  openDetails = () => {
    this.setState({ isDetailsOpen: true });
  };

  closeDetails = () => {
    this.setState({ isDetailsOpen: false });
  };

  render() {
    return (
      <div className="demo-app mt-4">
        {this.renderSidebar()}
        <div className="demo-app-main">
          <button
            className="rounded-lg p-2 px-3 bg-[#55ab00] font-semibold text-white text-lg my-8 border border-[#55ab00] duration-200 cursor-pointer hover:bg-white hover:text-[#55ab00]"
            onClick={() => this.handleAutogenerate()}
          >
            Autogenerate itinerary
          </button>
          <FullCalendar
            ref={this.calendarComponentRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            // events={eventInputArray}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
          <EventForm
            isOpen={this.state.isModalOpen}
            onClose={this.closeModal}
            handleModalSubmit={this.handleModalSubmit}
          />
          <EventInfo
            isOpen={this.state.isDetailsOpen}
            onClose={this.closeDetails}
            event={this.state.currentEvent}
            handleDelete={this.handleDelete}
          />
          <Modal isOpen={this.state.isLoading} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
              <Center height="200px" display="flex" flexDir="column">
                <Spinner size="xl" />
                <h1 className="text-xl lg:text-2xl font-semibold">
                  Generating the itinerary...
                </h1>
                <h4 className="text-sm lg:text-md font-medium text-gray-600">
                  This may take a while, hold up
                </h4>
              </Center>
            </ModalContent>
          </Modal>
        </div>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <h2 className="text-md m-4">
          In this section you can create your own itinerary or if you want to,
          you can ask the app to do it by clicking in "Generate itinerary"
        </h2>
        <div className="demo-app-sidebar-section">
          <h2 className="font-bold text-2xl">Instructions</h2>
          <ul>
            <li className="font-medium">
              Click dates and you will be prompted to create a new event
            </li>
            <li className="font-medium">Drag, drop, and resize events</li>
            <li className="font-medium">
              Click an event to see details or delete it
            </li>
          </ul>
        </div>
        <div className=""></div>
        {this.state.currentEvents.length > 0 ? (
          <div className="demo-app-sidebar-section">
            <h2 className="font-bold">
              All Events ({this.state.currentEvents.length})
            </h2>
            <ul className="overflow-y-auto max-h-[400px]">
              {this.state.currentEvents.map(renderSidebarEvent)}
            </ul>
          </div>
        ) : (
          <div className="demo-app-sidebar-section">
            <h2 className="font-bold">Your events will appear here</h2>
          </div>
        )}
      </div>
    );
  }

  handleAutogenerate = async () => {
    if (this.props.validateAutogenerate()) {
      this.setState({ isLoading: true });
      const places = await generateItinerary(
        [],
        this.props.start_date,
        this.props.end_date,
        this.props.startingPoint
      );

      let calendarApi = this.calendarComponentRef.current.getApi();

      places.forEach((place) => {
        if (place.start && place.end) {
          calendarApi.addEvent({
            id: createEventId(),
            title: place.title,
            start: place.start,
            end: place.end,
            place_id: place.place_id,
          });
        }
      });
      this.setState({ isLoading: false });
    }
  };

  handleDelete = (event: EventApi) => {
    event.remove();

    this.setState({
      selectedInfo: null,
    });
    this.closeDetails();
  };

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo: DateSelectArg) => {
    this.setState({
      selectedInfo: selectInfo,
    });
    this.openModal();
  };

  handleModalSubmit = (title: string, place_id: string) => {
    if (this.state.selectedInfo) {
      let calendarApi = this.state.selectedInfo.view.calendar;
      calendarApi.unselect(); // clear date selection

      calendarApi.addEvent({
        id: createEventId(),
        title,
        place_id,
        start: this.state.selectedInfo.startStr,
        end: this.state.selectedInfo.endStr,
        allDay: this.state.selectedInfo.allDay,
      });
    }

    this.setState({
      selectedInfo: null,
    });
    this.closeModal();
  };

  handleEventClick = (clickInfo: EventClickArg) => {
    this.setState({ currentEvent: clickInfo.event });
    this.openDetails();
  };
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
