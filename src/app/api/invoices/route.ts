import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const INVOICES_FILE = path.join(process.cwd(), 'src', 'data', 'invoices.json');

export async function GET() {
  try {
    if (!fs.existsSync(INVOICES_FILE)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(INVOICES_FILE, 'utf8');
    const invoices = JSON.parse(data);
    
    // Latest first
    return NextResponse.json(invoices.reverse());
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read invoices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { receiptNum, currentDate, clientName, clientPhone, staffName, staffPhone, items } = body;

    if (!receiptNum) {
      return NextResponse.json({ error: 'Missing receipt number' }, { status: 400 });
    }

    let invoices: any[] = [];
    if (fs.existsSync(INVOICES_FILE)) {
      invoices = JSON.parse(fs.readFileSync(INVOICES_FILE, 'utf8'));
    }

    // Check if invoice already exists to update it
    const existingIndex = invoices.findIndex((inv: any) => inv.receiptNum === receiptNum);
    
    const invoiceData = {
      id: existingIndex >= 0 ? invoices[existingIndex].id : Date.now().toString(),
      receiptNum,
      currentDate,
      clientName,
      clientPhone,
      staffName,
      staffPhone,
      items,
      savedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      invoices[existingIndex] = invoiceData; // Update
    } else {
      invoices.push(invoiceData); // Create
    }

    fs.writeFileSync(INVOICES_FILE, JSON.stringify(invoices, null, 2), 'utf8');

    return NextResponse.json({ success: true, id: invoiceData.id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save invoice' }, { status: 500 });
  }
}
