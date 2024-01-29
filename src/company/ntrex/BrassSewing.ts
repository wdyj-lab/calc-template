
const widthOptions = [
  { key: "2mm", label: "2mm", value: 2 },
  { key: "3mm", label: "3mm", value: 3 },
  { key: "5mm", label: "5mm", value: 5 },
  { key: "6mm", label: "6mm", value: 6 },
  { key: "8mm", label: "8mm", value: 8 },
  { key: "10mm", label: "10mm", value: 10 },
  { key: "12mm", label: "12mm", value: 12 },
  { key: "15mm", label: "15mm", value: 15 },
  { key: "16mm", label: "16mm", value: 16 },
  { key: "18mm", label: "18mm", value: 18 },
  { key: "20mm", label: "20mm", value: 20 },
  { key: "25mm", label: "25mm", value: 25 },
  { key: "30mm", label: "30mm", value: 30 },
  { key: "40mm", label: "40mm", value: 40 },
  { key: "50mm", label: "50mm", value: 50 },
  { key: "60mm", label: "60mm", value: 60 },
  { key: "70mm", label: "70mm", value: 70 },
  { key: "80mm", label: "80mm", value: 80 },
  { key: "90mm", label: "90mm", value: 90 },
  { key: "100mm", label: "100mm", value: 100 },
]

const heightOptions = [
  { key: "500mm", label: "500mm", value: 500 },
  { key: "1000mm", label: "1000mm", value: 1000 },
]

const priceList = {
  ['SEWING: 2x500x']: 400, ['SEWING: 3x500x']: 800, ['SEWING: 5x500x']: 1700, ['SEWING: 6x500x']: 2500, ['SEWING: 8x500x']: 4200, ['SEWING: 10x500x']: 6600, ['SEWING: 12x500x']: 9500, ['SEWING: 15x500x']: 14600, ['SEWING: 16x500x']: 16500, ['SEWING: 18x500x']: 20900,
  ['SEWING: 2x1000x']: 700, ['SEWING: 3x1000x']: 1300, ['SEWING: 5x1000x']: 3300, ['SEWING: 6x1000x']: 4900, ['SEWING: 8x1000x']: 8400, ['SEWING: 10x1000x']: 13000, ['SEWING: 12x1000x']: 18800, ['SEWING: 15x1000x']: 29000, ['SEWING: 16x1000x']: 32900, ['SEWING: 18x1000x']: 41700,
  ['SEWING: 20x500x']: 25700, ['SEWING: 25x500x']: 40300, ['SEWING: 30x500x']: 57700, ['SEWING: 40x500x']: 102800, ['SEWING: 50x500x']: 160200, ['SEWING: 60x500x']: 230700, ['SEWING: 70x500x']: 314000, ['SEWING: 80x500x']: 410200, ['SEWING: 90x500x']: 519000, ['SEWING: 100x500x']: 640500,
  ['SEWING: 20x1000x']: 51400, ['SEWING: 25x1000x']: 80100, ['SEWING: 30x1000x']: 115400, ['SEWING: 40x1000x']: 205200, ['SEWING: 50x1000x']: 320300, ['SEWING: 60x1000x']: 461300, ['SEWING: 70x1000x']: 627900, ['SEWING: 80x1000x']: 82000, ['SEWING: 90x1000x']: 1037700, ['SEWING: 100x1000x']: 1281000,
}

export { widthOptions, heightOptions, priceList }