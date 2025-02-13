import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ArrowUpRight } from 'lucide-react';

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

function PopUp({ event, onClose, onSelectRelatedEvent, events }) {
  const { isAuthenticated } = useAuth();
  const popUpRef = useRef(null);
  const scrollableContentRef = useRef(null);

  useEffect(() => {
    // Only run effect if popup should be open
    if (!event) return; 

    // Auto-scroll to top of popup
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = 0;
    }

    // Escape popup using esc key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Listen for keydown + disable external page scroll
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [event, onClose]);

  // Close popup upon external click
  const handleOutsideClick = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Only run return component if popup should be open
  if (!event) return null; 

  // Grab related events based on relatedId's and authentication status
  const relatedEvents = event.related_events
    ?.map((relatedId) => events.find((e) => e.id === relatedId))
    .filter((e) => e && (isAuthenticated || e.permission === "public"));

  // Conditionally render event color
  const getEventTypeColor = (eventType) => {
    switch (eventType) {
      case 'tech_talk':
        return 'text-primary';
      case 'workshop':
        return 'text-secondary';
      case 'activity':
        return 'text-tertiary';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={handleOutsideClick}>
      <div ref={popUpRef} className="bg-background bg-opacity-[100%] p-10 rounded-[18px] shadow-xl max-w-2xl sm:w-[90%] w-[85%] sm:h-[450px] h-[80%] overflow-hidden relative border border-white border-opacity-10">
        <button className="absolute top-7 right-7 text-white px-2 rounded-lg text-lg hover:bg-white hover:bg-opacity-15 transition-all" onClick={onClose}>✕</button>

        <div ref={scrollableContentRef} className="h-full overflow-y-auto pr-2">

          <h2 className="text-2xl font-bold text-white">{event.name}</h2>
          <p className="text-gray-400 text-sm mt-1">{formatDateRange(event.start_time, event.end_time)}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {event.event_type === "tech_talk" && <div className="font-medium text-xs px-3 py-[4px] rounded-full bg-opacity-20 bg-[#ff00bf] text-primary">TECH TALK</div>}
            {event.event_type === "workshop" && <div className="font-medium text-xs px-3 py-[4px] rounded-full bg-opacity-20 bg-[#00c4ff] text-secondary">WORKSHOP</div>}
            {event.event_type === "activity" && <div className="font-medium text-xs px-3 py-[4px] rounded-full bg-opacity-20 bg-[#FF8C00] text-tertiary">ACTIVITY</div>}
            {event.permission === "private" && <div className="font-medium text-xs px-3 py-[4px] rounded-full bg-opacity-20 bg-gray-500 text-gray-300">PRIVATE</div>}
            {event.permission === "public" && <div className="font-medium text-xs px-3 py-[4px] rounded-full bg-opacity-15 bg-gray-300 text-gray-300">PUBLIC</div>}
          </div>

          <div className="mt-4">
            <strong className="text-white">Speakers:</strong>{' '}
            {event.speakers.length > 0 ? event.speakers.map((s) => s.name).join(', ') : 'N/A'}
          </div>

          <p className="mt-3 text-gray-300 text-sm leading-relaxed">{event.description}</p>

          {(event.public_url || event.private_url) && (
            <div className="mt-4 flex gap-4">
              {event.public_url && (
                <a href={event.public_url} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline text-sm flex items-center">
                  Public Link
                  <ArrowUpRight className="ml-1 w-4 h-4" />
                </a>
              )}
              {event.private_url && (
                <a href={event.private_url} target="_blank" rel="noopener noreferrer" className="font-bold text-white text-sm hover:underline flex items-center">
                  Private Link
                  <ArrowUpRight className="ml-1 w-4 h-4" />
                </a>
              )}
            </div>
          )}

          {relatedEvents.length > 0 && (
          <div className="mt-4">
            <strong className="text-white">Related Events:</strong>
            <ul className="mt-2 text-sm">
              {relatedEvents.map((relatedEvent) => (
                <li 
                  key={relatedEvent.id} 
                  className={`cursor-pointer hover:underline flex items-center mb-1 ${getEventTypeColor(relatedEvent.event_type)}`} 
                  onClick={() => onSelectRelatedEvent(relatedEvent.id)}
                >
                  {relatedEvent.name}
                  <ArrowUpRight className="ml-1 w-4 h-4 inline" />
                </li>
              ))}
            </ul>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default PopUp;