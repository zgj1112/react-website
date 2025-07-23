import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Outlet /> {/* 就是 <router-view /> */}
    </div>
  );
};

export default App;