<<<<<<< HEAD
# Elite Gaming Tournament Platform

**A world-class esports tournament platform with RGB gaming aesthetics, multi-game support, and zero infrastructure cost.**

🌐 **Live Demo:** http://localhost:3000  
📚 **Documentation:** [Setup Guide](./DEPLOYMENT.md)

---

## 🎮 Features

### For Players
- ✅ **Multi-Game Support:** Valorant, PUBG, BGMI, Free Fire
- ✅ **Social Login:** Google, Facebook OAuth in 2 clicks
- ✅ **Smart Filters:** Browse tournaments by game and tier
- ✅ **Dynamic Registration:** Add/remove players with live pricing
- ✅ **Secure Payments:** Razorpay (0% UPI fees!) + Stripe
- ✅ **Instant Confirmation:** "You will be added soon in our group" success dialogue

### For Admins
- ✅ **Revenue Dashboard:** Real-time stats and analytics
- ✅ **Tournament Management:** Create, edit, delete competitions
- ✅ **Per-Person Pricing:** Set fee per player, system calculates total
- ✅ **Payment Tracking:** Razorpay/Stripe integration with webhooks

### Technical Excellence
- ⚡ **Next.js 15** with React 19 server components
- 🎨 **RGB Gaming Theme** with glassmorphic effects & Framer Motion animations
- 🔐 **NextAuth.js** for secure authentication with Prisma adapter
- 💾 **PostgreSQL** via Prisma ORM with TypeScript
- 💳 **Dual Payment Gateways** for global reach
- 🆓 **100% Free Hosting** on Vercel + Neon + Upstash

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## 📂 Project Structure

```
d:/torna/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── auth/         # Login, Register pages
│   │   ├── tournaments/  # Listing, Registration, Payment
│   │   ├── admin/        # Dashboard for admins
│   │   └── api/          # Backend API routes
│   ├── components/
│   │   ├── sections/     # Homepage sections (Hero, Games, etc.)
│   │   └── ui/           # Reusable UI components (Navbar, etc.)
│   └── lib/              # Utilities, auth config, Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
└── tailwind.config.ts    # Custom RGB theme
```

---

## 🎨 Design System

### RGB Color Palette
- **Primary:** Electric Blue (hsl 230°)
- **Secondary:** Cyber Purple (hsl 280°)
- **Accent:** Plasma Pink (hsl 330°)
- **Neon Effects:** 6 vibrant glow colors

### Key Effects
- Glassmorphic cards with backdrop blur
- Animated RGB gradient borders
- Neon glow on hover
- Floating orb animations
- Scroll-driven fade-ins

---

## 💰 Pricing Model

**Per-Person Calculation:**
- Admin sets: ₹500 per person
- Team registers: 5 players
- **Total:** ₹2,500

**Revenue Split:**
- Prize Pool: 60-80%
- Platform Profit: 20-40%

**Payment Fees:**
- Razorpay UPI: 0% ✅
- Razorpay Cards: 2%
- Stripe: 2.9% + $0.30

---

## 🔐 Authentication

### Supported Methods
1. **Google OAuth** - One-click sign-in
2. **Facebook OAuth** - Social login
3. **Email/Password** - Traditional with bcrypt hashing

### Session Management
- JWT-based sessions
- Prisma adapter for database persistence
- Automatic session refresh

---

## 🏆 Tournament Flow

1. **Browse** → Filter by game (Valorant/PUBG/BGMI/Free Fire) and tier (Grassroots/Challenger/Elite)
2. **Register** → Create team, add players with game IDs (auto-validated!)
3. **Pay** → Choose Razorpay (India) or Stripe (International)
4. **Success** → See "You will be added soon in our group" message
5. **Join** → Receive WhatsApp group invitation

---

## 📊 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | TailwindCSS, Framer Motion |
| **Auth** | NextAuth.js, bcrypt |
| **Database** | PostgreSQL, Prisma ORM |
| **Payments** | Razorpay, Stripe |
| **Hosting** | Vercel (FREE) |
| **Database** | Neon PostgreSQL (FREE) |
| **Cache** | Upstash Redis (FREE) |

---

## 🌍 Deployment

### Free Hosting (Supports 1,000-5,000 MAU)
- **Vercel:** Unlimited deployments, 100GB bandwidth/month
- **Neon PostgreSQL:** 512MB RAM, 3GB storage
- **Upstash Redis:** 10,000 commands/day

### Deploy Now
```bash
# Push to GitHub
git push origin main

# Deploy to Vercel
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step guide!

---

## 📈 Roadmap

### Completed (50%)
- ✅ Project setup with Next.js 15
- ✅ Authentication system
- ✅ RGB gaming UI/UX
- ✅ Tournament listing & registration
- ✅ Payment integration

### In Progress
- 🔄 Admin dashboard enhancements
- 🔄 WhatsApp/Discord automation
- 🔄 Game API integrations (Riot, PUBG, Free Fire)

### Planned
- 📅 Live match brackets
- 📅 Player stats & leaderboards
- 📅 KYC verification for high-stakes tournaments
- 📅 Live streaming integration

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use for commercial projects!

---

## 🆘 Support

- **Issues:** GitHub Issues
- **Questions:** Create a Discussion
- **Email:** support@yourdomain.com

---

**Built with ❤️ for the gaming community**

🎮 **Start your esports empire today!** 🚀
=======
# tourna-gaming
>>>>>>> f1c04fad2ffdc56ec6cb18ff4d33e0389d51f76e
