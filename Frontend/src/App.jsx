import { Route, Routes, Link, useParams } from "react-router";
import Login from "./pages/auth/login";
import Dashboard from "./pages/main/dashboard";
import MainLayout from "./layouts/main-layout";
import Wallet from "./pages/main/wallet";
import Note from "./pages/main/note";
import History from "./pages/main/history";

export default function App() {
    return (
        <>
            {/* <nav>
                <Link to="/">login</Link>
                <Link to="/helloworld">Hello world</Link>
            </nav> */}
            <Routes>
                <Route path="/" element={<Login />} />

                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/note" element={<Note />} />
                    <Route path="/history" element={<History />} />
                </Route>    

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </>
    );
}
