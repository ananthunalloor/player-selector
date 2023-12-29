import { Button, Flex, Image } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

import { BaseDirectory } from "@tauri-apps/api/path";
import { readBinaryFile } from "@tauri-apps/api/fs";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSoldClickHandler = useCallback(() => {
    onSoldClick && onSoldClick();
  }, [onSoldClick]);

  const onUnSoldClickHandler = useCallback(() => {
    onUnSoldClick && onUnSoldClick();
  }, [onUnSoldClick]);

  useEffect(() => {
    const loadPlayerImage = async () => {
      const contents = await readBinaryFile(
        `com.tauri.dev/player/${selectedPlayer}.jpg`,
        {
          dir: BaseDirectory.Config,
        }
      );
      const blob = new Blob([contents], { type: "image/jpeg" });
      setImageUrl(URL.createObjectURL(blob));
    };

    loadPlayerImage();
  }, [selectedPlayer]);

  return (
    <Flex
      style={{
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {imageUrl && (
        <Image
          radius="md"
          h={700}
          src={imageUrl}
          style={{
            objectFit: "contain",
            height: 500,
          }}
        />
      )}
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
