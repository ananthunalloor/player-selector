import { ComboboxItem } from "@mantine/core";
import { DBConnections, TeamList } from ".";

export const DataProvider = () => {
  const { getTeamList } = DBConnections();

  const getTeamListData = () => {
    //convert Promise<TeamList[]> to ComboboxItem[]
    const teamList = getTeamList()
      .then((data) => {
        return data.map((item) => {
          const teamListData: ComboboxItem = {
            value: item.team_id.toString(),
            label: item.name,
          };
          return teamListData;
        });
      })
      .catch(() => {
        return [] as ComboboxItem[];
      });

    //resolve Promise<ComboboxItem[]>
    return Promise.resolve(teamList);
  };

  return { getTeamListData };
};
