import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <span>{count}</span>
        <div onClick={() => setCount(count + 1)}>12</div>
      </div>
    </>
  );
}

export default App;
