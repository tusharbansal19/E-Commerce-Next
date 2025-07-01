import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    'Farm Fresh', 'Fresh Valley', 'Golden Crust', 'Ocean Harvest', 'Green Gardens', 'Mediterranean'
  ]);
} 