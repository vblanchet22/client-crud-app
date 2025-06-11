export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <head>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />
        </head>
        <body>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <a className="navbar-brand" href="/">ClientApp</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item"><a className="nav-link" href="/clients/add">Ajouter</a></li>
                </ul>
            </div>
        </nav>
        <main className="container mt-4">
            {children}
        </main>
        </body>
        </html>
    );
}
