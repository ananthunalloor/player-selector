import Database from "tauri-plugin-sql-api";
import { TeamList } from ".";

export const DBConnections = () => {
  const getPlayerInfo = async () => {
    const db = await Database.load("sqlite:test.db");
    const playerInfo = await db.select("SELECT * from players");
    return playerInfo;
  };

  const addPlayerInfo = async () => {
    const db = await Database.load("sqlite:test.db");
    const playerInfo = await db.execute(
      "INSERT INTO players(team_id, name, points) VALUES (1, 'test2', 200)"
    );
    return playerInfo;
  };

  const getTeamList = async () => {
    const db = await Database.load("sqlite:test.db");
    const teamList = await db.select<TeamList[]>("SELECT * from teams");
    return teamList;
  };

  return { getPlayerInfo, addPlayerInfo, getTeamList };
};
