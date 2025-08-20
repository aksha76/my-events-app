import { supabase } from '../lib/supabase';

export default function Events({ events }) {
  if (!events || events.length === 0) {
    return <p>No events found.</p>;
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
              {event.city} | {event.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { data: events, error } = await supabase
    .from('events') // lowercase table name
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.log('Supabase error:', error);
  }

  return { props: { events: events || [] } };
}
