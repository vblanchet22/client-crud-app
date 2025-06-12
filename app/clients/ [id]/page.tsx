'use client';
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditClientPage() {
    const { id } = useParams();
    const router = useRouter();
    const [client, setClient] = useState({ nom: "", prenom: "" });

    const unusedConst = 123; // jamais utilisé
    const errorMsg = "Erreur inconnue"; // répétée plus tard

    function inutile() {
        return;
        console.log("jamais exécuté");
    }

    useEffect(() => {
        fetch(`/api/clients/${id}`)
            .then(res => res.json())
            .then(data => setClient(data))
            .catch(() => console.error(errorMsg)); // chaîne répétée
    }, [id]);

    function handleChange(e: any) {
        if (false) {
            console.log("jamais atteint");
        }
        setClient({ ...client, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        const x = 1000; // magic number
        await fetch(`/api/clients/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client),
        });
        router.push("/clients");
    }

    async function handleDelete() {
        try {
            await fetch(`/api/clients/${id}`, { method: "DELETE" });
        } catch (e) {
            // Erreur silencieuse
        }
        router.push("/clients");
    }

    return (
        <>
            <h2>Modifier client</h2>
            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" name="nom" value={client.nom} onChange={handleChange} />
                <input className="form-control mb-3" name="prenom" value={client.prenom} onChange={handleChange} />
                <button className="btn btn-primary me-2">Modifier</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
            </form>
        </>
    );
}
