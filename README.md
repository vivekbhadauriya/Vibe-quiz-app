# VibeCheck Quiz

A real-time, interactive quiz app to discover your vibe and see how the world is vibing—live!  
Built with **Next.js**, **Tailwind CSS**, **Framer Motion**, **MongoDB**, and **Socket.IO**.

---

## 🚀 Features

- 🎨 **Modern UI**: Responsive, animated, and theme-aware design.
- ⚡ **Real-Time Dashboard**: See live vibe stats update instantly.
- 🧠 **Randomized Quiz**: Each user gets 10 random questions from a large pool.
- ⏱️ **Quiz Timer**: 10 seconds per question, auto-advance with default vibe if unanswered.
- 📊 **Live Results**: View your vibe and global stats after submitting.
- 🌗 **Dark Mode**: Seamless light/dark theme toggle.
- 🌐 **MongoDB Atlas**: Scalable cloud database for questions and submissions.

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [Socket.IO](https://socket.io/)
- [Chart.js](https://www.chartjs.org/) (for results visualization)

---

## 📦 Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/vibe-check-quiz.git
cd vibe-check-quiz
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env.local` file in the root:

```
MONGODB_URI=your_mongodb_atlas_connection_string
# Add other provider secrets as needed
```

### 4. **Seed the Database with Questions**

Edit `scripts/seed.ts` and add your questions (or use the provided examples).  
Then run:

```bash
npx tsx scripts/seed.ts
```

### 5. **Run the Development Server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Real-Time Features (Socket.IO)

> **Note:** Vercel serverless functions do **not** support WebSockets.  
> For production, deploy your Socket.IO backend on [Render](https://render.com/), [Railway](https://railway.app/), or similar.  
> Update your frontend to connect to the deployed Socket.IO server.

---

## 🏗️ Project Structure

```
src/
  app/           # Next.js app routes (pages, API, etc.)
  components/    # Reusable React components (Header, QuestionCard, etc.)
  models/        # Mongoose models (Question, Submission, User)
  scripts/       # Seed scripts (seed.ts, questions.json)
  lib/           # DB connection, helpers
public/          # Static assets
```

---

## ✨ Customization

- **Add More Questions:**  
  Edit `scripts/questions.json` or `scripts/seed.ts` and re-seed your DB.
- **Change Vibe Logic:**  
  Update vibe calculation in `quiz/page.tsx` and `result/page.tsx`.
- **Add Providers:**  
  Configure more OAuth providers in `api/auth/[...nextauth]/route.ts`.

---



## 🖥️ Deployment

### Deploy Frontend (Vercel)

1. Push your code to GitHub.
2. Import the repo in [Vercel](https://vercel.com/).
3. Add environment variables in the Vercel dashboard.
4. Deploy!

### Deploy Real-Time Backend (Render/Railway)

1. Create a simple Node.js + Socket.IO server (see `/server.js` example).
2. Deploy to [Render](https://render.com/) or [Railway](https://railway.app/).
3. Update your frontend to connect to the backend’s public URL.

---

## 🙏 Credits

- Built by [Vivek Bhadauriya](https://github.com/vivekbhadauriya)
- Inspired by the need to check vibes, live!

---

## 📄 License

MIT License

---

**Enjoy discovering your vibe!**