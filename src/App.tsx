import './App.css'
import { useState } from 'react' 
import CustomersPage from "./pages/CustomersPage";
import DepartamentPage from './pages/DepartamentPage';
import TestMenuOptionPage from './pages/TestMenuOptionPage';
import LoginPage from './pages/LoginPage';
import MainLayout from "./layouts/MainLayout";
import SidebarMenu from "./components/SidebarMenu";
import AboutPage from './pages/AboutPage';
import { useCurrentMenu } from './hooks/useCurrentMenu';
import { useAuth } from './context/AuthContext';

function App() {
  const [page, setPage] = useState("customers");
  const { isAuthenticated, user, logout } = useAuth();
  const { data: menuOptions = [], isLoading } = useCurrentMenu();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  function renderContent() {
    switch (page) {
      case "customers":
        return <CustomersPage />;
      case "activities":
        return <DepartamentPage />;
      case "departments":
        return <DepartamentPage />;
      case "tmo":
        return <TestMenuOptionPage />;
      case "about":
        return <AboutPage />;
      default:
        return <CustomersPage />;
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading menu...</p>
      </div>
    );
  }

  return (
    <MainLayout
      sidebar={
        <div>
          <SidebarMenu 
            current={page} 
            onChange={setPage} 
            menuOptions={menuOptions} 
          />
          <div className="mt-8 p-4 border-t">
            <p className="text-sm text-gray-600 mb-2">
              Logged as: <strong>{user?.username}</strong> ({user?.role})
            </p>
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      }
      content={renderContent()} 
    />
  )
}
export default App