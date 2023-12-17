
-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Create a tournament table
CREATE TABLE IF NOT EXISTS tournaments (
  tournament_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL
);

-- Create a team table
CREATE TABLE IF NOT EXISTS teams (
  team_id INTEGER PRIMARY KEY,
  tournament_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  points INTEGER NOT NULL,
  FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id)
);

-- Create a player table
CREATE TABLE IF NOT EXISTS players (
  player_id INTEGER PRIMARY KEY,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  points INTEGER NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

-- Create a team_list table
CREATE TABLE IF NOT EXISTS team_list (
  team_id INTEGER,
  player_id INTEGER,
  points INTEGER NOT NULL,
  PRIMARY KEY (team_id, player_id),  -- Add a primary key constraint if needed
  FOREIGN KEY (team_id) REFERENCES teams(team_id),
  FOREIGN KEY (player_id) REFERENCES players(player_id)
);