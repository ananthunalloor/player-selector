import { useState } from "react";
import SlotCounter from "react-slot-counter";

function App() {
  const [value, setValue] = useState("0");

  const onClickHandler = () => {
    //on click change the value to random number between 0 and 350 and fix the value to 3 digits
    setValue(
      Math.floor(Math.random() * 350)
        .toString()
        .padStart(3, "0")
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
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
      <button
        className="px-6 py-3 bg-blue-400 rounded-md "
        onClick={onClickHandler}
      >
        Click
      </button>
    </div>
  );
}

export default App;
