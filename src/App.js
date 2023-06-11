import DetailPage from "./Pages/EnterDetail.jsx";
import ChooseCandidate from "./Pages/ChooseCandidate.jsx";
import Result from "./Pages/Result.jsx";
import CreateCandidate from "./Pages/CreateCandidate.jsx";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" Component={() => <DetailPage />} />
          <Route path="/ballot" Component={() => <ChooseCandidate />} />
          <Route path="/result" Component={() => <Result />} />
          <Route path="/createcandidate" Component={() => <CreateCandidate />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
