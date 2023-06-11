import DetailPage from "./Pages/EnterDetail.jsx";
import ChooseCandidate from "./Pages/ChooseCandidate.jsx";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={() => <DetailPage />} />
          <Route path="/ballot" Component={() => <ChooseCandidate />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
