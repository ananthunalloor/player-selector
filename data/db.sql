-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Create a tournament table
CREATE TABLE IF NOT EXISTS tournaments (
  tournament_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT
);

-- Create a team table
CREATE TABLE IF NOT EXISTS teams (
  team_id INTEGER PRIMARY KEY AUTOINCREMENT,
  tournament_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id)
);

-- Create a player table
CREATE TABLE IF NOT EXISTS players (
  player_id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER,
  name TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  status TEXT CHECK( status IN ('SOLD','UNSOLD') ) NOT NULL DEFAULT 'UNSOLD',
  FOREIGN KEY (team_id) REFERENCES teams(team_id)
);