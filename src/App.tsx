import { useState } from 'react'
import reactLogo from './assets/react.svg' 
import viteLogo from './assets/vite.svg'
import './App.css'
import CustomersPage from "./pages/CustomersPage";
function App() {
  const [count, setCount] = useState(0)
  return (<CustomersPage />)
}
export default App