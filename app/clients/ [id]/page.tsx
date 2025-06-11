'use client';
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditClientPage() {
    const { id } = useParams();
    const router = useRouter();
    const [client, setClient] = useState({ nom: "", prenom: "" });

    useEffect(() => {
        fetch(`/api/clients/${id}`)
            .then(res => res.json())
            .then(data => setClient(data));
    }, [id]);

    function handleChange(e: any) {
        setClient({ ...client, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        await fetch(`/api/clients/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client),
        });
        router.push("/clients");
    }

    async function handleDelete() {
        await fetch(`/api/clients/${id}`, { method: "DELETE" });
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
