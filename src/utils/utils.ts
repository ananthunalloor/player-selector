import Database from "tauri-plugin-sql-api";

export const dbConnections = () => {
  const getPlayerInfo = async () => {
    const db = await Database.load("sqlite:test.db");
    const playerInfo = await db.select("SELECT * from team_list where id = 1");
    return playerInfo;
  };

  const addPlayerInfo = async () => {
    const db = await Database.load("sqlite:test.db");
    const playerInfo = await db.execute(
      "INSERT INTO players (player_id, team_id, name, points) VALUES ($1, $2, $3, $4), (2, 1, 'test2', 200)"
    );
    return playerInfo;
  };

  return { getPlayerInfo, addPlayerInfo };
};
