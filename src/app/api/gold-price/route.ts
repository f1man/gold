import { NextResponse } from 'next/server';

export const revalidate = 21600; // Cache for 6 hours (4 times a day)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '1년'; // Default to 1 year

    // Calculate dates
    const today = new Date();
    const endDateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
    // We want to fetch 1 year of data to have enough for the charts.
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const startDateStr = `${lastYear.getFullYear()}.${String(lastYear.getMonth() + 1).padStart(2, '0')}.${String(lastYear.getDate()).padStart(2, '0')}`;

    const url = "https://koreagoldx.co.kr/api/price/chart/list";
    const payload = {
        "srchDt": "1년",
        "type": "Au",
        "dataDateStart": startDateStr,
        "dataDateEnd": endDateStr
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch from Korea Gold Exchange: ${response.status}`);
    }

    const data = await response.json();

    // The data array comes in reverse chronological order (newest first).
    // We can just pass it directly.
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gold Price API Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
