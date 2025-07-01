export default function handler(req, res) {
  res.status(200).json([
    { id: 'dairy', name: 'Dairy' },
    { id: 'produce', name: 'Produce' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'seafood', name: 'Seafood' },
  ]);
} 