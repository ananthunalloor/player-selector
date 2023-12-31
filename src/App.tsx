import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";
import SlotCounter from "react-slot-counter";

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Dialog, PlayerImage, SaveDialogDetails } from "./components";
import {
  FormValues,
  getPlayerCount,
  getReadyPlayerListData,
  getUnSoldPlayerListData,
  updatePlayerSold,
  updatePlayerUnsold,
} from "./utils";

function App() {
  const [value, setValue] = useState<number>(0);
  const [disableButton, setDisableButton] = useState(false);
  const [playerCount, setPlayerCount] = useState<{
    total: number;
    ready: number;
    sold: number;
  }>({
    total: 0,
    ready: 0,
    sold: 0,
  });

  const [
    playerDialogOpened,
    { open: playerDialogOpen, close: playerDialogClose },
  ] = useDisclosure(false);
  const [saveDialogOpened, { open: saveDialogOpen, close: saveDialogClose }] =
    useDisclosure();

  const onClickHandler = useCallback(() => {
    const getPlayerData = async () => {
      const readyPlayerList = await getReadyPlayerListData();
      const UnSoldPlayerList = await getUnSoldPlayerListData();

      if (readyPlayerList.length === 0 && UnSoldPlayerList.length === 0) {
        toast.error("No Players Left");
        return 0;
      }

      if (readyPlayerList.length <= 1) {
        const playerList = [...readyPlayerList, ...UnSoldPlayerList];
        const randomValue =
          playerList[Math.floor(Math.random() * playerList.length)];
        return randomValue;
      } else {
        const randomValue =
          readyPlayerList[Math.floor(Math.random() * readyPlayerList.length)];
        return randomValue;
      }
    };

    getPlayerData().then((res) => {
      setValue(res);
      if (res === 0) {
        return;
      }
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

  useEffect(() => {
    const getPlayerListCount = async () => {
      return await getPlayerCount();
    };
    getPlayerListCount()
      .then((res) => {
        setPlayerCount(res);
      })
      .catch(() => {
        setPlayerCount({
          total: 0,
          ready: 0,
          sold: 0,
        });
      });
  }, [value, disableButton, playerDialogOpened, saveDialogOpened]);

  return (
    <>
      <div className="absolute top-0 right-0 flex gap-2 p-6 text-xs">
        <div className="flex">
          Total Players:{" "}
          <p className="font-bold text-blue-500">{playerCount.total}</p>
        </div>
        <div className="flex">
          Sold Players:{" "}
          <p className="font-bold text-green-400">{playerCount.sold}</p>
        </div>
        <div className="flex">
          Unsold Players:{" "}
          <p className="font-bold text-yellow-400">{playerCount.ready}</p>
        </div>
      </div>
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
