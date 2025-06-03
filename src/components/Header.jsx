import { useState } from "react";
import { Briefcase, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/userContext";
import { Link } from "react-router-dom";

export default function Header() {
    const [hamOpen, sethamOpen] = useState(false);
    const { userDetails, logout } = useUser();

    return (
        <>
            <div className="bg-[#f0f0f0] h-15 flex justify-between items-center">
                <div>
                    <Link to="/" className="flex items-center ml-4">
                        <Briefcase size={32} className="text-black" />
                        <span className="ml-2 text-xl font-bold">FindJob</span> 
                    </Link>
                </div>
                <nav className="mx-10 flex max-[570px]:hidden">
                    {!userDetails.loggedin && 
                        <>
                            <Link className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" to="/login">Login</Link>
                            <Link className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" to="/signup">Sign Up</Link>                            
                        </>
                    }
                    {userDetails.loggedin && 
                    <>
                        <Link className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" to="/">Home</Link>
                        <Link className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" to="/profile">Profile</Link>
                        <button className="mx-6 px-2 bg-red-400 hover:shadow-lg rounded-md" onClick={logout}>Logout</button>
                    </>}
                </nav>
                <button className="min-[570px]:hidden m-5 p-2" onClick={() => sethamOpen(!hamOpen)}>
                    {hamOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <AnimatePresence>
                {hamOpen && <motion.nav initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                    className="min-[570px]:hidden bg-red shadow-lg" >
                    <ul className="flex flex-col items-start p-4 space-y-2">
                        {!userDetails.loggedin &&
                            <>
                            <Link to="/login" className="block w-full">Login</Link>
                            <Link to="/signup" className="block w-full">Sign Up</Link>
                            </>
                        }
                        {userDetails.loggedin &&
                            <>
                            <Link to="/" className="block w-full">Home</Link>
                            <Link to="/profile" className="block w-full">Profile</Link>
                            <button className="block w-full bg-red-600" onClick={logout}>Logout</button>
                            </>
                        }
                    </ul>

                </motion.nav>}
            </AnimatePresence>
        </>
    );
}