const fs = require('fs');
const path = 'src/app/admin/invoice/page.module.css';
let content = fs.readFileSync(path, 'utf8');

const colorMap = {
  '#FDF0F3': '#FDFBF7',
  '#FAE8EE': '#F5EFE6',
  '#F5EAF0': '#EFE8DD',
  '#3A2530': '#332919',
  '#9E6678': '#997A3D',
  '#C4A0AC': '#B89B65',
  '#E8A0B0': '#D4AF37',
  '#F2C4CE': '#E6C27A',
  '#D88498': '#C59B27',
  '#C97D8F': '#B8860B',
  '#F0D8DE': '#E8D2A7',
  '#F5E0E6': '#EFE2C8',
  '#FDF6F8': '#FCFBF9',
  '#FAF0F2': '#F9F6F0',
  '#FDE8EE': '#F8EED9',
  '#F5D5DF': '#F0DCB1',
  '158,102,120': '153,122,61',
  '242,196,206': '230,194,122',
  '232,160,176': '212,175,55',
  '201,122,143': '184,134,11',
  '#CDB0BA': '#C2B085',
  '#D8C0C8': '#CBBF9F'
};

for (const [oldColor, newColor] of Object.entries(colorMap)) {
  const regex = new RegExp(oldColor, 'gi');
  content = content.replace(regex, newColor);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Colors replaced successfully!');
