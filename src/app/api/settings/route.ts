import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const settingsPath = path.join(process.cwd(), 'src', 'data', 'settings.json');

const defaultSettings = {
  pure_buy: { type: '+원', value: 0 },
  pure_sell: { type: '+원', value: 0 },
  k18_buy: { type: '+원', value: 0 },
  k18_sell: { type: '+원', value: 0 },
  k14_buy: { type: '+원', value: 0 },
  k14_sell: { type: '+원', value: 0 },
  plat_buy: { type: '+원', value: 0 },
  plat_sell: { type: '+원', value: 0 },
  silver_buy: { type: '+원', value: 0 },
  silver_sell: { type: '+원', value: 0 }
};

export async function GET() {
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf8');
      const parsed = JSON.parse(data);
      // Ensure backwards compatibility by checking if one of the specific new keys exists
      if (parsed.k18_buy) return NextResponse.json(parsed);
      return NextResponse.json(defaultSettings);
    }
    return NextResponse.json(defaultSettings);
  } catch (error) {
    console.error("Error reading settings:", error);
    return NextResponse.json(defaultSettings);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate vaguely
    if (!body.pure_buy || !body.k18_buy || !body.plat_buy || !body.silver_buy) {
      return NextResponse.json({ error: 'Invalid data structure' }, { status: 400 });
    }

    const dir = path.dirname(settingsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(settingsPath, JSON.stringify(body, null, 2), 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
