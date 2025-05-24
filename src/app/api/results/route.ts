import { connect } from '@/lib/db';
import { Submission } from '@/lib/models';
import { NextResponse } from 'next/server';

export async function GET() {
  await connect();
  const submissions = await Submission.find();
  const vibes: Record<string, number> = {};
  let total = 0;

  submissions.forEach((sub: any) => {
    sub.answers.forEach((ans: any) => {
      vibes[ans.selectedVibe] = (vibes[ans.selectedVibe] || 0) + 1;
      total++;
    });
  });

  return NextResponse.json({ vibes, total });
}