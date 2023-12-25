import { Button, ComboboxItem, Flex, Select, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useCallback, useState } from "react";
import { DataProvider } from "../../utils";

import * as yup from "yup";

export interface SaveDialogDetailsProps {
  onSave?: () => void;
}

interface FormValues {
  team: string | undefined;
  points: string | undefined;
}

const schema = yup.object().shape({
  team: yup.string().required("Team is required"),
  points: yup
    .number()
    .required("Points is required")
    .typeError("Points is required"),
});

export const SaveDialogDetails = ({ onSave }: SaveDialogDetailsProps) => {
  const [teamList, setTeamList] = useState<ComboboxItem[]>(
    [] as ComboboxItem[]
  );
  const { getTeamListData } = DataProvider();
  getTeamListData.then((res) => setTeamList(res));

  const { getInputProps, onSubmit } = useForm<FormValues>({
    initialValues: {
      team: undefined,
      points: undefined,
    },
    validate: yupResolver(schema),
  });

  const onSaveHandler = useCallback(
    (values: FormValues) => {
      console.log(values);

      onSave?.();
    },
    [onSave]
  );

  return (
    <form onSubmit={onSubmit(onSaveHandler)}>
      <Flex
        style={{
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Flex
          style={{
            gap: "1rem",
            height: "5rem",
          }}
        >
          <Select
            label="Team"
            placeholder="Select a Team"
            data={teamList}
            {...getInputProps("team")}
          />
          <TextInput
            placeholder="Points"
            label="Points"
            type="number"
            {...getInputProps("points")}
          />
        </Flex>
        <Button
          type="submit"
          style={{
            width: "fit-content",
            alignSelf: "flex-end",
          }}
          className="bg-blue-400"
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};
