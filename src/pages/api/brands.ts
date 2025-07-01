export default function handler(req, res) {
  res.status(200).json([
    'Farm Fresh', 'Fresh Valley', 'Golden Crust', 'Ocean Harvest', 'Green Gardens', 'Mediterranean'
  ]);
} 