import { useState } from "react";
import SlotCounter from "react-slot-counter";

function App() {
  const [value, setValue] = useState(0);

  const onClickHandler = () => {
    //on click change the value to random number between 0 and 350
    setValue(Math.floor(Math.random() * 350));
  };

  return (
    <div className="flex">
      <SlotCounter
        value={value}
        startValue="000"
        startValueOnce
        animateUnchanged
        duration={3}
        autoAnimationStart={false}
      />
      <button onClick={onClickHandler}>Click</button>
    </div>
  );
}

export default App;
