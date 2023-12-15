-- Create a new database
CREATE DATABASE IF NOT EXISTS `testdb`;


-- Use the database
USE `testdb`;

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
  FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id),
  name TEXT NOT NULL,
  points INTEGER NOT NULL
);

-- Create a player table
CREATE TABLE IF NOT EXISTS players (
  player_id INTEGER PRIMARY KEY,
  FOREIGN KEY (team_id) REFERENCES teams(team_id),
  name TEXT NOT NULL,
  points INTEGER NOT NULL
);

-- Create a team-list table
CREATE TABLE IF NOT EXISTS team_list (
  FOREIGN KEY (team_id) REFERENCES teams(team_id),
  FOREIGN KEY (player_id) REFERENCES players(player_id),
  points INTEGER NOT NULL,
);