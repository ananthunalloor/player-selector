import Database from "tauri-plugin-sql-api";
import { Player, Team, Tournament } from ".";

export const DBConnections = async () => {
  const db = await Database.load("sqlite:test.db");

  // Get

  const getTournamentList = async () => {
    const tournamentList = await db.select<Tournament[]>(
      "SELECT * from tournaments"
    );
    return tournamentList;
  };

  const getTeamList = async () => {
    const teamList = await db.select<Team[]>("SELECT * from teams");
    return teamList;
  };

  const getAllPlayerList = async () => {
    const playerList = await db.select<Player[]>("SELECT * from players");
    return playerList;
  };

  const getSoldPlayerList = async () => {
    const playerList = await db.select<Player[]>(
      "SELECT * from players WHERE status = 'SOLD'"
    );
    return playerList;
  };

  const getUnsoldPlayerList = async () => {
    const playerList = await db.select<Player[]>(
      "SELECT * from players WHERE status = 'UNSOLD'"
    );
    return playerList;
  };

  const getTeamPlayerList = async (team_id: number) => {
    const playerList = await db.select<Player[]>(
      `SELECT * from players WHERE team_id = ${team_id}`
    );
    return playerList;
  };

  const getPlayerInfo = async (player_id: number) => {
    const playerInfo = await db.select<Player>(
      `SELECT * from players WHERE player_id = ${player_id}`
    );
    return playerInfo;
  };

  // Add

  const addTournament = async (
    name: string,
    start_date: string,
    end_date: string
  ) => {
    await db.execute(
      `INSERT INTO tournaments (name, start_date, end_date) VALUES ('${name}', '${start_date}', '${end_date}')`
    );
  };

  const addTeam = async (tournament_id: number, name: string) => {
    await db.execute(
      `INSERT INTO teams (tournament_id, name) VALUES (${tournament_id}, '${name}')`
    );
  };

  const addPlayer = async (team_id: number, name: string, points: number) => {
    await db.execute(
      `INSERT INTO players (team_id, name, points) VALUES (${team_id}, '${name}', ${points})`
    );
  };

  // Update

  const updatePlayerStatus = async (player_id: number, status: string) => {
    await db.execute(
      `UPDATE players SET status = '${status}' WHERE player_id = ${player_id}`
    );
  };

  const updatePlayerPoints = async (player_id: number, points: number) => {
    await db.execute(
      `UPDATE players SET points = ${points} WHERE player_id = ${player_id}`
    );
  };

  // Delete

  const deleteTournament = async (tournament_id: number) => {
    await db.execute(
      `DELETE FROM tournaments WHERE tournament_id = ${tournament_id}`
    );
  };

  const deleteTeam = async (team_id: number) => {
    await db.execute(`DELETE FROM teams WHERE team_id = ${team_id}`);
  };

  const deletePlayer = async (player_id: number) => {
    await db.execute(`DELETE FROM players WHERE player_id = ${player_id}`);
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

  return {};
};
