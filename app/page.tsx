"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Client = {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    adresse: string;
    codePostal: string;
    ville: string;
};

export default function HomePage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "admin" && password === "admin") {
            localStorage.setItem("logged", "true");
            setIsLoggedIn(true);
        } else {
            alert("Identifiants incorrects");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("logged");
        setIsLoggedIn(false);
    };

    const fetchClients = async () => {
        const res = await fetch(`/api/clients?nom=${nom}&prenom=${prenom}`);
        const data = await res.json();
        setClients(data);
    };

    useEffect(() => {
        if (localStorage.getItem("logged") === "true") {
            setIsLoggedIn(true);
            fetchClients();
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) fetchClients();
    }, [nom, prenom]);

    if (!isLoggedIn) {
        return (
            <div className="container mt-5">
                <h2 className="mb-4">Connexion</h2>
                <div className="mb-3">
                    <label className="form-label">Nom d'utilisateur</label>
                    <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-primary" onClick={handleLogin}>Se connecter</button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Liste des clients</h2>
                <div>
                    <Link href="/clients/add" className="btn btn-success me-2">Ajouter un client</Link>
                    <button className="btn btn-secondary" onClick={handleLogout}>Déconnexion</button>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <input
                        className="form-control"
                        placeholder="Rechercher par nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div className="col">
                    <input
                        className="form-control"
                        placeholder="Rechercher par prénom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>
            </div>

            <table className="table table-bordered">
                <thead className="table-light">
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date de naissance</th>
                    <th>Adresse</th>
                    <th>CP</th>
                    <th>Ville</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.nom}</td>
                        <td>{client.prenom}</td>
                        <td>{client.dateNaissance}</td>
                        <td>{client.adresse}</td>
                        <td>{client.codePostal}</td>
                        <td>{client.ville}</td>
                        <td>
                            <Link href={`/clients/${client.id}`} className="btn btn-sm btn-warning">Modifier</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
