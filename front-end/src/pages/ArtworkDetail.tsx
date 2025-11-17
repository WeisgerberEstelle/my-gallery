import { useParams } from 'react-router-dom';

export default function ArtworkDetail() {
    const { id } = useParams();

    return <div className="p-2">Détail œuvre #{id}</div>
}
