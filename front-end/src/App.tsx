import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GalleryPage from "./pages/GalleryPage";
import ArtworkDetail from "./pages/Artwork/ArtworkDetail";
import Login from "./pages/Login";
import NewArtwork from "./pages/Artwork/NewArtwork";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminGallery from "./pages/AdminGallery";
import EditArtworkPage from "./pages/Artwork/EditArtwork";

export default function App() {
    return (
        <div className="bg-white text-gray-900">
            <Header />
            <main className="px-4 py-6">
                <Routes>
                    <Route path="/" element={<GalleryPage />} />
                    <Route path="/artworks/:id" element={<ArtworkDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/admin/gallery"
                        element={
                            <ProtectedRoute requiredRoles={["admin", "gallery_owner"]}>
                                <AdminGallery />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/new"
                        element={
                            <ProtectedRoute requiredRoles={["admin", "gallery_owner"]}>
                                <NewArtwork />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit/:id"
                        element={
                            <ProtectedRoute requiredRoles={["admin", "gallery_owner"]}>
                                <EditArtworkPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}
