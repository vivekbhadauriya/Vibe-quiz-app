import { connect } from '@/lib/db';
import { Submission } from '@/lib/models';
import { NextResponse } from 'next/server';
import { io } from '../socket';

export async function POST(req: Request) {
  await connect();
  const body = await req.json();
  const submission = await Submission.create(body);

  // Emit event to all clients
  if (io) {
    io.emit('newSubmission');
  }

  return NextResponse.json({ success: true });
}