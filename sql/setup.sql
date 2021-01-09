DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS grams CASCADE;
DROP TABLE IF EXISTS comments;

--add profile_photo_url
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  profile_photo_url TEXT
);

CREATE TABLE grams (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  photo_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  tags TEXT[],
  user_id BIGINT REFERENCES users(id) NOT NULL
);

CREATE TABLE comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  gram_id BIGINT REFERENCES grams(id),
  comment TEXT NOT NULL
)

INSERT INTO grams (photo_url, caption, tags, user_id) VALUES 
('something', 'caption something', '{'text', 'more text'}', 1)
('something', 'captAHHHng', '{'text', 'more text'}', 1)
('something', 'captioksnt', '{'text', 'more text'}', 1)
('something', 'caption ', '{'text', 'more text'}', 1)
('something', 'captionhing', '{'text', 'more text'}', 1)
('something', 'captihing', '{'text', 'more text'}', 1)
