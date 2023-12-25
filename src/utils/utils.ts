import Database from "tauri-plugin-sql-api";
import { Player, Status, Team, Tournament } from "./type";

export const DBConnections = () => {
  const dbPromise = Database.load("sqlite:test.db");

  // Get

  const getTournamentList = () => {
    return dbPromise.then((db) =>
      db.select<Tournament[]>("SELECT * FROM tournaments")
    );
  };

  const getTeamList = () => {
    return dbPromise.then((db) => db.select<Team[]>("SELECT * FROM teams"));
  };

  const getAllPlayerList = () => {
    return dbPromise.then((db) => db.select<Player[]>("SELECT * FROM players"));
  };

  const getSoldPlayerList = () => {
    return dbPromise.then((db) =>
      db.select<Player[]>("SELECT * FROM players WHERE status = 'SOLD'")
    );
  };

  const getUnsoldPlayerList = () => {
    return dbPromise.then((db) =>
      db.select<Player[]>("SELECT * FROM players WHERE status = 'UNSOLD'")
    );
  };

  const getTeamPlayerList = (team_id: number) => {
    return dbPromise.then((db) =>
      db.select<Player[]>(`SELECT * FROM players WHERE team_id = ${team_id}`)
    );
  };

  const getPlayerInfo = (player_id: number) => {
    return dbPromise.then((db) =>
      db.select<Player>(`SELECT * FROM players WHERE player_id = ${player_id}`)
    );
  };

  // Add

  const addTournament = (
    name: string,
    start_date: string,
    end_date: string
  ) => {
    return dbPromise.then((db) =>
      db.execute(
        `INSERT INTO tournaments (name, start_date, end_date) VALUES (?, ?, ?)`,
        [name, start_date, end_date]
      )
    );
  };

  const addTeam = (tournament_id: number, name: string) => {
    return dbPromise.then((db) =>
      db.execute(`INSERT INTO teams (tournament_id, name) VALUES (?, ?)`, [
        tournament_id,
        name,
      ])
    );
  };

  const addPlayer = (team_id: number, name: string, points: number) => {
    return dbPromise.then((db) =>
      db.execute(
        `INSERT INTO players (team_id, name, points) VALUES (?, ?, ?)`,
        [team_id, name, points]
      )
    );
  };

  // Update

  const updatePlayerStatus = (player_id: number, status: Status) => {
    return dbPromise.then((db) =>
      db.execute(`UPDATE players SET status = ? WHERE player_id = ?`, [
        status,
        player_id,
      ])
    );
  };

  const updatePlayerPoints = (player_id: number, points: number) => {
    return dbPromise.then((db) =>
      db.execute(`UPDATE players SET points = ? WHERE player_id = ?`, [
        points,
        player_id,
      ])
    );
  };

  // Delete

  const deleteTournament = (tournament_id: number) => {
    return dbPromise.then((db) =>
      db.execute(`DELETE FROM tournaments WHERE tournament_id = ?`, [
        tournament_id,
      ])
    );
  };

  const deleteTeam = (team_id: number) => {
    return dbPromise.then((db) =>
      db.execute(`DELETE FROM teams WHERE team_id = ?`, [team_id])
    );
  };

  const deletePlayer = (player_id: number) => {
    return dbPromise.then((db) =>
      db.execute(`DELETE FROM players WHERE player_id = ?`, [player_id])
    );
  };

  return {
    getTournamentList,
    getTeamList,
    getAllPlayerList,
    getSoldPlayerList,
    getUnsoldPlayerList,
    getTeamPlayerList,
    getPlayerInfo,
    addTournament,
    addTeam,
    addPlayer,
    updatePlayerStatus,
    updatePlayerPoints,
    deleteTournament,
    deleteTeam,
    deletePlayer,
  };
};
