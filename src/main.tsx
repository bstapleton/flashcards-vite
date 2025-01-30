import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Learn from "./pages/Learn.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <h1 className="py-2 text-center text-4xl font-bold text-indigo-500 uppercase">Flashcards</h1>
        <nav id={'primary-nav'}>
            <ul>
                <li><a className={'link'} href={'/'}>Home</a></li>
                <li><a className={'link'} href={'/learn'}>Learn</a></li>
                <li><a className={'link'} href={'/login'}>Login</a></li>
            </ul>
        </nav>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="learn" element={<Learn />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </>
)
