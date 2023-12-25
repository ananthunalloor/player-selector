import { ComboboxItem } from "@mantine/core";
import { DBConnections } from "./utils";

export const DataProvider = () => {
  const { getTeamList } = DBConnections();

  const getTeamListData: Promise<ComboboxItem[]> = getTeamList()
    .then(
      (res) =>
        res.map((team) => ({
          value: team.team_id.toString(),
          label: team.name,
        })) as unknown as ComboboxItem[]
    )
    .catch(() => [] as ComboboxItem[]);

  return { getTeamListData };
};
