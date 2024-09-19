import "./App.css";
import { Container, SxProps, Theme } from "@mui/material";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HomePage from "./pages/HomePage";
import DocPage from "./pages/DocPage";
import CsvPage from "./pages/CsvPage";
import { Outlet, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container maxWidth="lg" fixed sx={rootSx}>
            <Header />
            <Outlet />
            <Footer />
          </Container>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/csv" element={<CsvPage />} />
        <Route path="/doc" element={<DocPage />} />
      </Route>
    </Routes>
  );
}

export default App;

const rootSx: SxProps<Theme> = {
  display: "flex",
  height: "100vh",
  overflow: "scroll",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  gap: 1,
  py: 2,
};
