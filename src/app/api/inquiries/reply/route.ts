import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const INQUIRIES_FILE = path.join(process.cwd(), 'src', 'data', 'inquiries.json');

export async function POST(request: Request) {
  try {
    const { id, reply } = await request.json();

    if (!id || !reply) {
      return NextResponse.json({ error: 'Missing id or reply' }, { status: 400 });
    }

    if (!fs.existsSync(INQUIRIES_FILE)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf8'));
    const index = inquiries.findIndex((i: any) => i.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Add reply
    inquiries[index].reply = reply;
    inquiries[index].replyCreatedAt = new Date().toISOString();

    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf8');

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
