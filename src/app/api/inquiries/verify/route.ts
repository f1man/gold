import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const INQUIRIES_FILE = path.join(process.cwd(), 'src', 'data', 'inquiries.json');

export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();

    if (!id || !password) {
      return NextResponse.json({ error: 'Missing id or password' }, { status: 400 });
    }

    if (!fs.existsSync(INQUIRIES_FILE)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf8'));
    const inquiry = inquiries.find((i: any) => i.id === id);

    if (!inquiry) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    if (inquiry.password !== password) {
      return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      inquiry: {
        id: inquiry.id,
        title: inquiry.title,
        content: inquiry.content,
        author: inquiry.author,
        createdAt: inquiry.createdAt,
        reply: inquiry.reply,
        replyCreatedAt: inquiry.replyCreatedAt
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
