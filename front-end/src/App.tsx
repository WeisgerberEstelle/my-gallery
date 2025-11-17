import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GalleryPage from "./pages/GalleryPage";
import ArtworkDetail from "./pages/ArtworkDetail";
import Login from "./pages/Login";
import NewArtwork from "./pages/NewArtwork";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <div className="bg-white text-gray-900">
            <Header />
            <main className="px-4 py-6">
                <Routes>
                    <Route path="/" element={<GalleryPage />} />
                    <Route path="/artworks/:id" element={<ArtworkDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/new" element={<NewArtwork />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}
