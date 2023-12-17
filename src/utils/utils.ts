import { appDataDir, join } from "@tauri-apps/api/path";
import Database from "tauri-plugin-sql-api";

export class DBConnection {
  constructor() {
    this.init();
  }

  async init() {
    // if db does not exist, create it
    const db = await Database.load("data/sqlite:test.db");
    console.log("db", db);
  }
}

export const dbConnections = () => {
  const getPlayerInfo = async () => {
    const appDataDirPath = await appDataDir();
    const filePath = await join(appDataDirPath, "data/sqlite:test.db");
    console.log("filePath", filePath);
    const db = await Database.load(filePath);
    console.log("db", db);
    const playerInfo = await db.select("SELECT * from teams where id = 1");
    return playerInfo;
  };

  const addPlayerInfo = async () => {
    const db = await Database.load("../../data/sqlite:test.sqlite");
    console.log("db", db);
    const playerInfo = await db.execute(
      "INSERT INTO players (player_id, team_id, name, points) VALUES ($1, $2, $3, $4), (2, 1, 'test2', 200)"
    );
    return playerInfo;
  };

  return { getPlayerInfo, addPlayerInfo };
};
