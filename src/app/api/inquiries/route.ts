import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const INQUIRIES_FILE = path.join(process.cwd(), 'src', 'data', 'inquiries.json');

export async function GET() {
  try {
    if (!fs.existsSync(INQUIRIES_FILE)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(INQUIRIES_FILE, 'utf8');
    const inquiries = JSON.parse(data);
    
    // Return without password and content for list view
    const list = inquiries.map((item: any) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      createdAt: item.createdAt,
      hasReply: !!item.reply
    })).reverse(); // Latest first

    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read inquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, author, password } = body;

    if (!title || !content || !author || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let inquiries = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf8'));
    }

    const newInquiry = {
      id: crypto.randomUUID(),
      title,
      content,
      author,
      password, // Stored plainly for demo purposes
      createdAt: new Date().toISOString(),
      reply: null,
      replyCreatedAt: null
    };

    inquiries.push(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf8');

    return NextResponse.json({ success: true, id: newInquiry.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}
