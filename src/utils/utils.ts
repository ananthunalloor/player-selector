// import Database from "tauri-plugin-sql-api";
// import { Player, Status, Team, Tournament } from "./type";

// export const DBConnections = () => {
//   const dbPromise = Database.load("sqlite:test.db");

//   // Get

//   const getTournamentList = async () => {
//     const db = await dbPromise;
//     return await db.select<Tournament[]>("SELECT * FROM tournaments");
//   };

//   const getTeamList = async () => {
//     const db = await dbPromise;
//     return await db.select<Team[]>("SELECT * FROM teams");
//   };

//   const getAllPlayerList = async () => {
//     const db = await dbPromise;
//     return await db.select<Player[]>("SELECT * FROM players");
//   };

//   const getSoldPlayerList = async () => {
//     const db = await dbPromise;
//     return await db.select<Player[]>(
//       "SELECT * FROM players WHERE status = 'SOLD'"
//     );
//   };

//   const getReadyPlayerList = async () => {
//     const db = await dbPromise;
//     return await db.select<Player[]>(
//       "SELECT * FROM players WHERE status = 'READY'"
//     );
//   };
//   const getUnsoldPlayerList = async () => {
//     const db = await dbPromise;
//     return await db.select<Player[]>(
//       "SELECT * FROM players WHERE status = 'UNSOLD'"
//     );
//   };

//   const getTeamPlayerList = async (team_id: number) => {
//     const db = await dbPromise;
//     return await db.select<Player[]>(
//       `SELECT * FROM players WHERE team_id = ${team_id}`
//     );
//   };

//   const getPlayerInfo = async (player_id: number) => {
//     const db = await dbPromise;
//     return await db.select<Player>(
//       `SELECT * FROM players WHERE player_id = ${player_id}`
//     );
//   };

//   // Add

//   const addTournament = async (
//     name: string,
//     start_date: string,
//     end_date: string
//   ) => {
//     const db = await dbPromise;
//     return await db.execute(
//       `INSERT INTO tournaments (name, start_date, end_date) VALUES (?, ?, ?)`,
//       [name, start_date, end_date]
//     );
//   };

//   const addTeam = async (tournament_id: number, name: string) => {
//     const db = await dbPromise;
//     return await db.execute(
//       `INSERT INTO teams (tournament_id, name) VALUES (?, ?)`,
//       [tournament_id, name]
//     );
//   };

//   const addPlayer = async (team_id: number, name: string, points: number) => {
//     const db = await dbPromise;
//     return await db.execute(
//       `INSERT INTO players (team_id, name, points) VALUES (?, ?, ?)`,
//       [team_id, name, points]
//     );
//   };

//   // Update

//   const playerSold = async (
//     player_id: number,
//     team_id: number,
//     points: number
//   ) => {
//     const db = await dbPromise;
//     await db.execute(
//       `UPDATE players SET status = ?, team_id = ?, points = ? WHERE player_id = ?`,
//       [Status.SOLD, team_id, points, player_id]
//     );
//   };

//   const playerUnsold = async (player_id: number) => {
//     const db = await dbPromise;
//     await db.execute(`UPDATE players SET status = ? WHERE player_id = ?`, [
//       Status.UNSOLD,
//       player_id,
//     ]);
//   };

//   const updatePlayerStatus = async (player_id: number, status: Status) => {
//     const db = await dbPromise;
//     return await db.execute(
//       `UPDATE players SET status = ? WHERE player_id = ?`,
//       [status, player_id]
//     );
//   };

//   const updatePlayerPoints = async (player_id: number, points: number) => {
//     const db = await dbPromise;
//     return await db.execute(
//       `UPDATE players SET points = ? WHERE player_id = ?`,
//       [points, player_id]
//     );
//   };

//   // Delete

//   const deleteTournament = async (tournament_id: number) => {
//     const db = await dbPromise;
//     return await db.execute(`DELETE FROM tournaments WHERE tournament_id = ?`, [
//       tournament_id,
//     ]);
//   };

//   const deleteTeam = async (team_id: number) => {
//     const db = await dbPromise;
//     return await db.execute(`DELETE FROM teams WHERE team_id = ?`, [team_id]);
//   };

//   const deletePlayer = async (player_id: number) => {
//     const db = await dbPromise;
//     return await db.execute(`DELETE FROM players WHERE player_id = ?`, [
//       player_id,
//     ]);
//   };

//   return {
//     getTournamentList,
//     getAllPlayerList,
//     getTeamPlayerList,
//     getPlayerInfo,
//     addTournament,
//     addTeam,
//     addPlayer,
//     updatePlayerStatus,
//     updatePlayerPoints,
//     deleteTournament,
//     deleteTeam,
//     deletePlayer,

//     getTeamList,
//     getSoldPlayerList,
//     getUnsoldPlayerList,
//     getReadyPlayerList,
//     playerSold,
//     playerUnsold,
//   };
// };
