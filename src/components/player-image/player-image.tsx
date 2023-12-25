import { Button, Flex, Image } from "@mantine/core";
import { useCallback, useMemo } from "react";

import { downloadDir } from "@tauri-apps/api/path";

export interface PlayerImageProps {
  onSoldClick?: () => void;
  onUnSoldClick?: () => void;
  selectedPlayer: number;
}

export const PlayerImage = ({
  onSoldClick,
  onUnSoldClick,
  selectedPlayer,
}: PlayerImageProps) => {
  const onSoldClickHandler = useCallback(() => {
    onSoldClick && onSoldClick();
  }, [onSoldClick]);

  const onUnSoldClickHandler = useCallback(() => {
    onUnSoldClick && onUnSoldClick();
  }, [onUnSoldClick]);

  const playerImage = useMemo(async () => {
    const picturePath = await downloadDir().catch((err) => console.log(err));
    console.log(picturePath);

    return new URL(
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
    );
  }, [selectedPlayer]);

  return (
    <Flex
      style={{
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Image
        radius="md"
        // h={700}
        w={700}
        src={playerImage}
      />
      <Flex
        direction={"row"}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Button onClick={onUnSoldClickHandler} className="bg-yellow-500">
          UnSold
        </Button>
        <Button onClick={onSoldClickHandler} className="bg-green-500">
          Sold
        </Button>
      </Flex>
    </Flex>
  );
};
