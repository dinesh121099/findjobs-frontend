import { useState } from "react";
import { Briefcase, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [hamOpen, sethamOpen] = useState(false);

    return (
        <>
            <div className="bg-[#f0f0f0] h-15 flex justify-between items-center">
                <div>
                    <a href="/" className="flex items-center ml-4">
                        <Briefcase size={32} className="text-black" />
                        <span className="ml-2 text-xl font-bold">FindJob</span>
                    </a>
                </div>
                <nav className="mx-10 flex max-[570px]:hidden">
                    <a className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" href="/login">Login</a>
                    <a className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" href="/">Home</a>
                    <a className="mx-6 px-2 bg-white hover:shadow-lg rounded-md" href="/profile">Profile</a>
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
                        <li><a href="/login" className="block w-full">Login</a></li>
                        <li><a href="/" className="block w-full">Home</a></li>
                        <li><a href="/profile" className="block w-full">Profile</a></li>
                    </ul>
                </motion.nav>}
            </AnimatePresence>
        </>
    );
}