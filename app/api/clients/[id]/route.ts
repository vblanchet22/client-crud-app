import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, { params }: any) {
    const client = await prisma.client.findUnique({ where: { id: parseInt(params.id) } });
    return NextResponse.json(client);
}

export async function PUT(req: Request, { params }: any) {
    const data = await req.json();
    const updated = await prisma.client.update({ where: { id: parseInt(params.id) }, data });
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
    await prisma.client.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ success: true });
}
