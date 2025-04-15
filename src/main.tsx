import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Learn from "./pages/Learn.tsx";
import History from "./pages/History.tsx";
import Register from "./pages/Register.tsx";
import {SiteNav} from "./components/sitenav/SiteNav.tsx";
import React from 'react';
import './i18n.ts';
import store from "./store.ts";
import {Provider} from "react-redux";
import Import from "./pages/Import.tsx";
import Create from "./pages/Create.tsx";
import Profile from "./pages/Profile.tsx";
import Authed from "./pages/Authed.tsx";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <h1 className="py-2 text-center text-4xl font-bold text-primary uppercase">Flashcards</h1>
            <SiteNav />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<Learn />} />
                    <Route path="history" element={<History />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="authed" element={<Authed />} />
                    <Route path="import" element={<Import />} />
                    <Route path="create" element={<Create />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
