# Database Design Choices

- Users table: Stores user info with unique email.
- Events table: Each event is created by a user (FK: created_by → Users).
- RSVPs table: Tracks which user responded to which event (FKs: user_id → Users, event_id → Events).
- RSVP status: Allowed values are Yes, No, Maybe.
- Referential integrity: Deleting a user or event cascades to related RSVPs.
- Relationships:
    • Users 1:N Events
    • Events N:M Users (through RSVPs)
