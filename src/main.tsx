import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Learn from "./pages/Learn.tsx";
import Register from "./pages/Register.tsx";
import {SiteNav} from "./components/sitenav/SiteNav.tsx";
import React from 'react';
import './i18n.ts';
import store from "./store.ts";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <h1 className="py-2 text-center text-4xl font-bold text-indigo-500 uppercase">Flashcards</h1>
            <SiteNav />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="learn" element={<Learn />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
