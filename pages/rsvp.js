import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function RSVP() {
  const [userId, setUserId] = useState('');
  const [eventId, setEventId] = useState('');
  const [status, setStatus] = useState('Yes');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const { error } = await supabase
        .from('rsvps') // lowercase table name
        .insert([{ user_id: userId, event_id: eventId, status }]);

      if (error) {
        console.log('Supabase error:', error);
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('RSVP submitted successfully!');
        setUserId('');
        setEventId('');
        setStatus('Yes');
      }
    } catch (err) {
      console.log('Unexpected error:', err);
      setMessage('Unexpected error occurred.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>RSVP to an Event</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <input
          placeholder="User ID (1-10)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <input
          placeholder="Event ID (1-5)"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginBottom: '10px', padding: '8px' }}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Submit RSVP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
