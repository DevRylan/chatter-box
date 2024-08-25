CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    recipient_id INTEGER,
    chatroom_id INTEGER,
    message_content TEXT NOT NULL,
    message_type VARCHAR(50) CHECK (message_type IN ('private', 'chatroom')) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id),
    FOREIGN KEY (chatroom_id) REFERENCES chatrooms(id)
);
CREATE TABLE privateMessages(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id);
    recipient_id INTEGER,
    sent_at TIMESTAMT DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE chatrooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chatroom_members (
    id SERIAL PRIMARY KEY,
    chatroom_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chatroom_id) REFERENCES chatrooms(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE (chatroom_id, user_id)
);

