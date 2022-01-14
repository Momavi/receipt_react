import "./App.css";
import { adress_pull } from "./data";

import Receipt from "./Receipt";
import Adress from "./Adress";

function App() {
  return (
    <div className="App">
      <Receipt adress_pull={adress_pull} />
      <Adress adress_pull={adress_pull} />
    </div>
  );
}

export default App;
