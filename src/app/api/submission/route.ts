import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/lib/db';
import { Submission } from '@/lib/models';
import { io } from '../socket';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  if (req.method === 'POST') {
    const sub = await Submission.create(req.body);
    // Emit live update
    io.emit('newSubmission', sub);
    res.status(201).json(sub);
  }
}