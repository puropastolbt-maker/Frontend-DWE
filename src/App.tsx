import './App.css'
import { useState } from 'react' 
import CustomersPage from "./pages/CustomersPage";
import DepartamentPage from './pages/DepartamentPage';
import TestMenuOptionPage from './pages/TestMenuOptionPage';
import MainLayout from "./layouts/MainLayout";
import SidebarMenu from "./components/SidebarMenu";
import AboutPage from './pages/AboutPage';

function App() {
  const [page, setPage] = useState("customers");
  const menuOptions = [
    {
      name: "customers",
      content: "Customers"
    },
    {
      name: "departments",
      content: "Departments"
    },
    {
      name: "tmo",
      content: "TMO"
    },
    {
      name: "about",
      content: "About"
    },
  ];
  function renderContent() {
    switch (page) {
      case "customers":
        return <CustomersPage />;
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
  return (
    <MainLayout
      sidebar={<SidebarMenu current={page} onChange={setPage} menuOptions={menuOptions} />}
      content={renderContent()} />
  )
}
export default App