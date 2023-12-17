import { Autocomplete, Button, Flex, TextInput } from "@mantine/core";

export const SaveDialogDetails = () => {
  return (
    <Flex
      style={{
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Flex
        style={{
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Autocomplete
          label="Your favorite library"
          placeholder="Pick value or enter anything"
          data={["React", "Angular", "Vue", "Svelte"]}
        />
        <TextInput
          placeholder="Input component"
          label="Your favorite library"
          type="number"
        />
      </Flex>
      <Button
        style={{
          width: "fit-content",
          alignSelf: "flex-end",
        }}
        className="bg-blue-400"
      >
        Save
      </Button>
    </Flex>
  );
};
