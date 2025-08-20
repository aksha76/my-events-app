import { supabase } from '../lib/supabase';
import { useState } from 'react';

export default function Events({ events }) {
  const [responses, setResponses] = useState({}); // Track user selections

  // Handle RSVP submission
  const handleRSVP = async (eventId) => {
    const status = responses[eventId];
    if (!status) return alert('Please select Yes, No, or Maybe.');

    const { data, error } = await supabase.from('rsvps').insert([
      {
        event_id: eventId,
        user_id: 1, // Replace with dynamic user id when login is implemented
        status
      }
    ]);

    if (error) {
      console.log('RSVP error:', error);
      alert('Error submitting RSVP.');
    } else {
      alert('RSVP submitted!');
      window.location.reload(); // Reload to show updated RSVPs
    }
  };

  if (!events || events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: '30px' }}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>
              {event.city} | {event.date}
            </p>

            {/* RSVP list */}
            <h4>RSVPs:</h4>
            {event.rsvps.length === 0 ? (
              <p>No RSVPs yet.</p>
            ) : (
              <ul>
                {event.rsvps.map((r) => (
                  <li key={r.id}>
                    User ID: {r.user_id} | Status: {r.status}
                  </li>
                ))}
              </ul>
            )}

            {/* RSVP form */}
            <div style={{ marginTop: '10px' }}>
              <label>
                RSVP:
                <select
                  value={responses[event.id] || ''}
                  onChange={(e) =>
                    setResponses({ ...responses, [event.id]: e.target.value })
                  }
                  style={{ marginLeft: '10px' }}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Maybe">Maybe</option>
                </select>
              </label>
              <button
                onClick={() => handleRSVP(event.id)}
                style={{ marginLeft: '10px' }}
              >
                Submit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch events
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  // Fetch RSVPs
  const { data: rsvps, error: rsvpsError } = await supabase.from('rsvps').select('*');

  if (eventsError) console.log('Events error:', eventsError);
  if (rsvpsError) console.log('RSVPs error:', rsvpsError);

  // Map RSVPs to their corresponding events
  const eventsWithRsvps = events.map((event) => ({
    ...event,
    rsvps: rsvps.filter((r) => r.event_id === event.id)
  }));

  return { props: { events: eventsWithRsvps } };
}
