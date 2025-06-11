import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const nom = searchParams.get("nom") || "";
    const prenom = searchParams.get("prenom") || "";

    const clients = await prisma.client.findMany({
        where: {
            nom: { contains: nom, mode: "insensitive" },
            prenom: { contains: prenom, mode: "insensitive" },
        },
    });
    return NextResponse.json(clients);
}

export async function POST(req: Request) {
    const data = await req.json();
    const client = await prisma.client.create({ data });
    return NextResponse.json(client);
}
