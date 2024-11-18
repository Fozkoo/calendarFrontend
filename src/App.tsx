import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.tsx";
import LoginPage from './pages/LoginPage.tsx';
import './styles/index.css';
import PrivateRoute from './components/PrivateRoute.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { MainMenuView } from './pages/MainMenuView.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/MainMenuView" element={<MainMenuView />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
