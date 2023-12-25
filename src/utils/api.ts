import { ComboboxItem } from "@mantine/core";
import { DBConnections } from "./utils";

export const DataProvider = () => {
  const { getTeamList, getAllPlayerList, getUnsoldPlayerList } =
    DBConnections();

  const getTeamListData: Promise<ComboboxItem[]> = getTeamList()
    .then(
      (res) =>
        res.map((team) => ({
          value: team.team_id.toString(),
          label: team.name,
        })) as unknown as ComboboxItem[]
    )
    .catch(() => [] as ComboboxItem[]);

  const getTeamPlayerListData = getAllPlayerList()
    .then((response) => response.map((res) => res.player_id.toString()))
    .catch(() => [] as string[]);

  const getUnsoldPlayerListData = getUnsoldPlayerList()
    .then((response) => response.map((res) => res.player_id.toString()))
    .catch(() => [] as string[]);

  // const getSoldPlayerList  =

  return { getTeamListData, getTeamPlayerListData, getUnsoldPlayerListData };
};
