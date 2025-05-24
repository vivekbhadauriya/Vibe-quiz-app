import 'dotenv/config'; // 
import { connect } from '@/lib/db';
import { Question } from '@/lib/models';

async function seed() {
  await connect();

  await Question.deleteMany();

  await Question.insertMany([
   
  {
    text: "How do you feel today?",
    options: [
      { text: "Excited", vibe: "energetic" },
      { text: "Calm", vibe: "chill" },
      { text: "Meh", vibe: "neutral" },
      { text: "Tired", vibe: "lazy" }
    ]
  },
  {
    text: "Pick a weekend activity:",
    options: [
      { text: "Hiking or sports", vibe: "adventurous" },
      { text: "Reading a book", vibe: "thinker" },
      { text: "Netflix & chill", vibe: "chill" },
      { text: "Sleeping in", vibe: "lazy" }
    ]
  },
  {
    text: "Your favorite music right now?",
    options: [
      { text: "Upbeat pop/EDM", vibe: "energetic" },
      { text: "Lo-fi/indie", vibe: "chill" },
      { text: "Classical/jazz", vibe: "thinker" },
      { text: "Whatever’s trending", vibe: "neutral" }
    ]
  },
  {
    text: "How do you handle stress?",
    options: [
      { text: "Exercise or move", vibe: "energetic" },
      { text: "Meditate or relax", vibe: "chill" },
      { text: "Overthink", vibe: "thinker" },
      { text: "Ignore it", vibe: "lazy" }
    ]
  },
  {
    text: "Pick a color that matches your mood:",
    options: [
      { text: "Yellow", vibe: "energetic" },
      { text: "Blue", vibe: "chill" },
      { text: "Purple", vibe: "thinker" },
      { text: "Gray", vibe: "neutral" }
    ]
  },
  {
    text: "Your ideal vacation?",
    options: [
      { text: "Adventure trip", vibe: "adventurous" },
      { text: "Beach resort", vibe: "chill" },
      { text: "City exploration", vibe: "thinker" },
      { text: "Staycation", vibe: "lazy" }
    ]
  },
  {
    text: "How do you start your day?",
    options: [
      { text: "With a workout", vibe: "energetic" },
      { text: "With coffee/tea", vibe: "chill" },
      { text: "With planning", vibe: "thinker" },
      { text: "Snooze alarm", vibe: "lazy" }
    ]
  },
  {
    text: "Which animal do you vibe with?",
    options: [
      { text: "Dolphin", vibe: "energetic" },
      { text: "Cat", vibe: "chill" },
      { text: "Owl", vibe: "thinker" },
      { text: "Sloth", vibe: "lazy" }
    ]
  },
  {
    text: "How do you prefer to socialize?",
    options: [
      { text: "Big parties", vibe: "energetic" },
      { text: "Small gatherings", vibe: "chill" },
      { text: "Deep 1-on-1 talks", vibe: "thinker" },
      { text: "Online only", vibe: "neutral" }
    ]
  },
  {
    text: "What’s your go-to comfort food?",
    options: [
      { text: "Pizza", vibe: "energetic" },
      { text: "Ice cream", vibe: "chill" },
      { text: "Chocolate", vibe: "thinker" },
      { text: "Chips", vibe: "lazy" }
    ]
  }

  ]);

  console.log('✅ Database seeded!');
  process.exit();
}

seed();
