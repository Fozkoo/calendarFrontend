import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.tsx";
import LoginPage from './pages/LoginPage.tsx';
import './styles/index.css';
import PrivateRoute from './components/PrivateRoute.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import Test from './components/Test.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/Test" element={<Test />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
