import { Route, Routes, Link, useParams } from "react-router";
import Login from "./pages/auth/login";
import Dashboard from "./pages/main/dashboard";
import MainLayout from "./layouts/main-layout";
import Wallet from "./pages/main/wallet";
import Note from "./pages/main/note";
import History from "./pages/main/history";
import { ProtectedRoute, GuestRoute } from "./route/middleware";

export default function App() {
    return (
        <>
            <Routes>
                <Route element={<GuestRoute />}>
                    <Route path="/" element={<Login />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/note" element={<Note />} />
                        <Route path="/history" element={<History />} />
                    </Route>
                </Route>

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </>
    );
}
