import { ToastContainer } from 'react-toastify';
import './App.css'
import Header from "./components/Header"
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main className="p-4">
        <Outlet />
      </main>
      <ToastContainer/>
    </div>
  );
}

export default App;
