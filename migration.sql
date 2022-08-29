DROP TABLE IF EXISTS characters;


CREATE TABLE characters (
  id SERIAL,
  name TEXT,
  player TEXT,
  boss TEXT, 
  support BOOLEAN
);


