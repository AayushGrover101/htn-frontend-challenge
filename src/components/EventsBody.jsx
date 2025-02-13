import React, { useState, useEffect } from 'react';
import Event from './Event';
import axios from 'axios';
import { useSearch } from '../contexts/SearchContext';
import { useFilter } from '../contexts/FilterContext';
import { useAuth } from '../contexts/AuthContext';
import PopUp from './PopUp';

function EventsBody() {
  const { searchTerm } = useSearch();
  const { isAuthenticated } = useAuth();
  const { filter } = useFilter();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch data from API
  useEffect(() => {
    axios.get('https://api.hackthenorth.com/v3/events')
      .then(response => {
        const events = response.data;
        events.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        setEvents(events);
      })
      .catch(error => console.log(error));
  }, [isAuthenticated]);

  // Format date from API
  const formatDateRange = (startTimestamp, endTimestamp) => {
    const start = new Date(startTimestamp);
    const end = new Date(endTimestamp);

    const formatDate = (date) =>
      date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
      });

    const formatTime = (date) =>
      date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Toronto',
      });

    if (start.toDateString() === end.toDateString()) {
      return `${formatDate(start)}, ${formatTime(start)} - ${formatTime(end)}`;
    } else {
      return `${formatDate(start)}, ${formatTime(start)} to ${formatDate(end)} ${formatTime(end)}`;
    }
  };

  // Truncate the discription
  const truncateBody = (text) => {
    const words = text.split(' ');
    return words.length > 35 ? words.slice(0, 35).join(' ') + '...' : text;
  };

  // Filter events based on search term and selected category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || event.event_type === filter;
    const isAccessible = isAuthenticated || event.permission === "public";
    return matchesSearch && matchesFilter && isAccessible;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  // Filter related events based on authentication
  const handleSelectRelatedEvent = (relatedId) => {
    const relatedEvent = events.find((e) => e.id === relatedId && (isAuthenticated || e.permission === "public"));
    if (relatedEvent) {
      setSelectedEvent(relatedEvent);
    }
  };

  return (
    <div className="w-full mx-auto md:w-[calc(100%-200px)]">
      <div className="border-white border-opacity-15 border-t-[1px]">
        {filteredEvents.map(event => (
          <div key={event.id} onClick={() => handleEventClick(event)}>
            <Event
              title={event.name}
              date={`${formatDateRange(event.start_time, event.end_time)}`}
              tag={event.event_type}
              permission={event.permission}
              body={truncateBody(event.description)}
            />
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <h1 className="text-white text-2xl font-semibold mt-10 md:pl-8 md:text-left text-center">No events found.</h1>
        )}
      </div>

      <PopUp
        event={selectedEvent}
        onClose={handleClosePopup}
        onSelectRelatedEvent={handleSelectRelatedEvent}
        events={events}
      />
    </div>
  );
}

export default EventsBody;
