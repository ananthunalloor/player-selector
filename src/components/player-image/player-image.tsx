import { Button, Flex, Image } from "@mantine/core";
import { useCallback } from "react";

export interface PlayerImageProps {
  onSoldClick?: () => void;
  onUnSoldClick?: () => void;
}

export const PlayerImage = ({
  onSoldClick,
  onUnSoldClick,
}: PlayerImageProps) => {
  const onSoldClickHandler = useCallback(() => {
    onSoldClick && onSoldClick();
  }, [onSoldClick]);

  const onUnSoldClickHandler = useCallback(() => {
    onUnSoldClick && onUnSoldClick();
  }, [onUnSoldClick]);

  return (
    <Flex
      style={{
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Image
        radius="md"
        h={700}
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
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
