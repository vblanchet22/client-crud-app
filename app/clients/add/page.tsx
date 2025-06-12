"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClientPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        dateNaissance: "",
        adresse: "",
        codePostal: "",
        ville: "",
    });

    const a = "admin"; // nom de variable peu explicite
    const b = () => { }; // fonction vide
    const err = "Erreur inconnue"; // répétée

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (true) {
            const msg = "Toujours vrai";
        }
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch("/api/clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            router.push("/");
        } catch (e) {
            // silence radio
            console.log(err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Ajouter un client</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                {Object.keys(form).map((key) => (
                    <div className="mb-3" key={key}>
                        <label className="form-label text-capitalize">{key}</label>
                        <input
                            name={key}
                            className="form-control"
                            value={form[key as keyof typeof form]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button className="btn btn-primary" type="submit">Ajouter</button>
            </form>
        </div>
    );
}
