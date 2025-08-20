import { supabase } from '../lib/supabase';

export default function Events({ events }) {
  if (!events || events.length === 0) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Upcoming Events</h1>
        <p>No events found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: '20px' }}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>
              📍 {event.city} | 📅 {event.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { data: events, error } = await supabase
    .from('events') // 👈 must match your table name in Supabase (lowercase)
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Supabase error:', error.message);
  } else {
    console.log('Fetched events:', events);
  }

  return { props: { events: events || [] } };
}
