import { ComboboxItem } from "@mantine/core";
import Database from "tauri-plugin-sql-api";
import { Player, Status } from "./type";

export const getTeamListData = async () => {
  const dbPromise = await Database.load("sqlite:test.db");
  const response = await dbPromise
    .select<Player[]>("SELECT * FROM teams")
    .then(
      (res) =>
        res.map((team) => ({
          value: team.team_id.toString(),
          label: team.name,
        })) as unknown as ComboboxItem[]
    )
    .catch(() => [] as ComboboxItem[]);

  return response;
};

export const getReadyPlayerListData = async () => {
  const dbPromise = await Database.load("sqlite:test.db");
  const response = await dbPromise
    .select<Player[]>("SELECT * FROM players WHERE status = 'READY'")
    .then((response) => response.map((res) => res.player_id))
    .catch(() => [] as number[]);

  return response;
};

export const updatePlayerSold = async (
  player_id: number,
  team_id: number,
  points: number
) => {
  const db = await Database.load("sqlite:test.db");
  await db.execute(
    `UPDATE players SET status = ?, team_id = ?, points = ? WHERE player_id = ?`,
    [Status.SOLD, team_id, points, player_id]
  );
};

export const updatePlayerUnsold = async (player_id: number) => {
  const db = await Database.load("sqlite:test.db");
  console.log("player_id", player_id);
  await db.execute(`UPDATE players SET status = ? WHERE player_id = ?`, [
    Status.UNSOLD,
    player_id,
  ]);
};
