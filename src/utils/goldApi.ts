export async function fetchOriginalGoldData() {
  try {
    const today = new Date();
    const endDateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
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

    // We fetch without Next.js caching in the util if called from client, 
    // or we can use fetch cache if called from server.
    // For admin, we want fresh data usually. Let's set revalidate to 0 for admin, or keep 21600.
    // We'll just use the default fetch or pass an option.
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify(payload),
        next: { revalidate: 21600 } // keep cache
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const json = await response.json();
    return json.list || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
