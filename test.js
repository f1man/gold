const url = "https://koreagoldx.co.kr/api/price/chart/list";

const today = new Date();
const endDateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);
const startDateStr = `${lastYear.getFullYear()}.${String(lastYear.getMonth() + 1).padStart(2, '0')}.${String(lastYear.getDate()).padStart(2, '0')}`;

const payload = {
    "srchDt": "1년",
    "type": "Au",
    "dataDateStart": startDateStr,
    "dataDateEnd": endDateStr
};

fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "Mozilla/5.0"
    },
    body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data.list.slice(0, 2), null, 2)))
.catch(err => console.error("Fetch error:", err));
