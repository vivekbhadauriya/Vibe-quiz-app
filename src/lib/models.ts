import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({ text: String, vibe: String });
const QuestionSchema = new mongoose.Schema({ text: String, options: [OptionSchema] });
const SubmissionSchema = new mongoose.Schema({ answers: [{ questionId: String, selectedVibe: String }], createdAt: { type: Date, default: Date.now }});

export const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
export const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);