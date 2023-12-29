import { useCallback, useState } from "react";

import toast from "react-hot-toast";
import SlotCounter from "react-slot-counter";

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Dialog, PlayerImage, SaveDialogDetails } from "./components";
import {
  FormValues,
  getReadyPlayerListData,
  updatePlayerSold,
  updatePlayerUnsold,
} from "./utils";

function App() {
  const [value, setValue] = useState<number>(0);
  const [disableButton, setDisableButton] = useState(false);

  const [
    playerDialogOpened,
    { open: playerDialogOpen, close: playerDialogClose },
  ] = useDisclosure(false);
  const [saveDialogOpened, { open: saveDialogOpen, close: saveDialogClose }] =
    useDisclosure();

  const onClickHandler = useCallback(() => {
    const getPlayerData = async () => {
      const playerList = await getReadyPlayerListData();
      console.log(playerList);
      const randomValue =
        playerList[Math.floor(Math.random() * playerList.length)];
      console.log(randomValue);
      setValue(randomValue);
    };
    getPlayerData().then(() => {
      setDisableButton(true);
      setTimeout(() => {
        playerDialogOpen();
        setDisableButton(false);
      }, 4000);
    });
  }, []);

  const onSaveHandler = useCallback(
    (val: FormValues) => {
      if (val.team !== undefined || val.points !== undefined) {
        val.team &&
          val.points &&
          updatePlayerSold(value, parseInt(val.team), parseInt(val.points))
            .then(() => {
              saveDialogClose();
              playerDialogClose();
            })
            .catch(() => {
              toast.error("Something went wrong");
            });
      }
      saveDialogClose();
      playerDialogClose();
    },
    [saveDialogClose, playerDialogClose, value]
  );

  const onHandleUnSoldClick = useCallback(() => {
    updatePlayerUnsold(value)
      .then(() => {
        playerDialogClose();
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [playerDialogClose, value]);

  const onHandleSoldClick = useCallback(() => {
    saveDialogOpen();
  }, [saveDialogOpen]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
        <SlotCounter
          value={value?.toString().padStart(3, "0") || "000"}
          startValue="000"
          startValueOnce
          animateUnchanged
          duration={3}
          autoAnimationStart={false}
          charClassName="text-20xl font-bold"
          valueClassName="w-auto"
          direction="top-down"
        />
        <Button
          className="bg-blue-400"
          onClick={onClickHandler}
          disabled={disableButton}
        >
          Pick Player
        </Button>
      </div>
      <Dialog
        title="Player Auction"
        onClose={playerDialogClose}
        opened={playerDialogOpened}
      >
        <PlayerImage
          onSoldClick={onHandleSoldClick}
          onUnSoldClick={onHandleUnSoldClick}
          selectedPlayer={value}
        />
      </Dialog>
      <Dialog
        title=" Save Player Details"
        onClose={saveDialogClose}
        opened={saveDialogOpened}
      >
        <SaveDialogDetails onSave={onSaveHandler} />
      </Dialog>
    </>
  );
}

export default App;
