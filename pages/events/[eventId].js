import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import {
  getAllEvents,
  getEventByIdFireBase,
  getFeaturedEventsFireBase,
} from "@/helper/api-util";
import { Fragment } from "react";

const EventDetailPage = (props) => {
  // const router = useRouter();
  // const eventId = router.query.eventId;

  const event = props.selectedEvent;
  if (!event) {
    return (
      <Fragment>
        {/* <ErrorAlert>
          <p>No event found</p>
        </ErrorAlert> */}
        <div className="center">
          <p>Loading...</p>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const allEvents = await getFeaturedEventsFireBase();

  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return { paths: paths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const getData = await getEventByIdFireBase(eventId);
  return { props: { selectedEvent: getData }, revalidate: 30 };
};

export default EventDetailPage;
