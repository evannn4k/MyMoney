import { Route, Routes, Link, useParams } from "react-router";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/main/dashboard";
import MainLayout from "./layouts/main-layout";
import Wallet from "./pages/main/wallet";
import Note from "./pages/main/note";
import History from "./pages/main/history";
import { ProtectedRoute, GuestRoute } from "./route/middleware";
import NotFount from "./pages/main/not-fount";
import Category from "./pages/main/category";
import { Toaster } from "sonner";
import VerifyAccount from "./pages/auth/verify-account";

export default function App() {
    return (
        <>
            <Toaster position="top-right" closeButton richColors />

            <Routes>
                <Route element={<GuestRoute />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-account/:url" element={<VerifyAccount />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/note" element={<Note />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/category" element={<Category />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFount />} />
            </Routes>
        </>
    );
}
