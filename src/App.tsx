import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";
import SlotCounter from "react-slot-counter";
import { Dialog, PlayerImage, SaveDialogDetails } from "./components";
import { DBConnections } from "./utils";

function App() {
  DBConnections();

  const [value, setValue] = useState("0");

  const [
    playerDialogOpened,
    { open: playerDialogOpen, close: playerDialogClose },
  ] = useDisclosure(false);
  const [saveDialogOpened, { open: saveDialogOpen, close: saveDialogClose }] =
    useDisclosure();

  const onClickHandler = () => {
    //on click change the value to random number between 0 and 350 and fix the value to 3 digits

    setValue(
      Math.floor(Math.random() * 350)
        .toString()
        .padStart(3, "0")
    );
    setTimeout(() => {
      playerDialogOpen();
    }, 4000);
  };

  const saveDialogOpenHandler = () => {
    saveDialogOpen();
  };

  const onSaveHandler = useCallback(() => {
    saveDialogClose();
    playerDialogClose();
  }, [saveDialogClose, playerDialogClose]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
        <SlotCounter
          value={value}
          startValue="000"
          startValueOnce
          animateUnchanged
          duration={3}
          autoAnimationStart={false}
          charClassName="text-20xl font-bold"
          valueClassName="w-auto"
          direction="top-down"
        />
        <Button className="bg-blue-400" onClick={onClickHandler}>
          Pick Player
        </Button>
      </div>
      <Dialog
        title="test"
        onClose={playerDialogClose}
        opened={playerDialogOpened}
      >
        <PlayerImage
          onSoldClick={saveDialogOpenHandler}
          onUnSoldClick={saveDialogOpenHandler}
        />
      </Dialog>
      <Dialog
        title="Save Dialog"
        onClose={saveDialogClose}
        opened={saveDialogOpened}
      >
        <SaveDialogDetails onSave={onSaveHandler} />
      </Dialog>
    </>
  );
}

export default App;
