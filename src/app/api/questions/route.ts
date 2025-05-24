import { connect } from '@/lib/db';
import { Question } from '@/lib/models';
import { NextResponse } from 'next/server';

export async function GET() {
  await connect();
  const questions = await Question.find();
  return NextResponse.json(questions);
}