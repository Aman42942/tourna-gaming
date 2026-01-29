# Elite Gaming Tournament Platform - Setup Guide

## 🚀 Deployment Guide (100% Free!)

### Prerequisites
- GitHub account
- Email account for service signups

---

## 1. Database Setup (Neon PostgreSQL - FREE)

### Steps:
1. Go to **https://neon.tech**
2. Sign up with GitHub
3. Create new project: "gaming-tournaments"
4. Copy connection string (looks like):
   ```
   postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb
   ```
5. Save for later!

---

## 2. Redis Setup (Upstash - FREE)

### Steps:
1. Go to **https://upstash.com**
2. Click "Get Started"
3. Create Redis database
4. Copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

---

## 3. OAuth Providers Setup

### Google OAuth (FREE)
1. Go to **https://console.cloud.google.com**
2. Create new project: "Tournament Platform"
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials:
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://yourdomain.vercel.app/api/auth/callback/google`
5. Copy Client ID & Secret

### Facebook OAuth (FREE)
1. Go to **https://developers.facebook.com**
2. Create new app → Consumer
3. Add "Facebook Login" product
4. **Valid OAuth Redirect URIs**:
   - `http://localhost:3000/api/auth/callback/facebook`
   - `https://yourdomain.vercel.app/api/auth/callback/facebook`
5. Copy App ID & App Secret

---

## 4. Payment Gateways

### Razorpay (India - FREE to setup)
1. Go to **https://razorpay.com**
2. Sign up as business
3. Go to Settings → API Keys
4. Generate Test Keys (for development)
5. Copy Key ID & Key Secret

### Stripe (International - FREE to setup)
1. Go to **https://stripe.com**
2. Create account
3. Get API keys from Developers section
4. Copy Publishable Key & Secret Key

---

## 5. Deploy to Vercel (FREE)

### Steps:
1. Push code to GitHub repository
2. Go to **https://vercel.com**
3. Click "New Project"
4. Import your GitHub repo
5. Add Environment Variables:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://yourdomain.vercel.app"
NEXTAUTH_SECRET="generate-random-32-char-string"

# Google OAuth  
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Facebook OAuth
FACEBOOK_CLIENT_ID="..."
FACEBOOK_CLIENT_SECRET="..."

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Redis
UPSTASH_REDIS_URL="..."
UPSTASH_REDIS_TOKEN="..."
```

6. Click **Deploy**!

---

## 6. Initialize Database

After deployment:
```bash
# Push Prisma schema to Neon
npx prisma db push

# Generate Prisma client
npx prisma generate
```

---

## 🎉 Your Platform is LIVE!

**Free Hosting Limits:**
- **Vercel:** Unlimited deployments, 100GB bandwidth/month
- **Neon:** 512MB RAM, 3GB storage (enough for 10K+ users)
- **Upstash:** 10,000 commands/day

**When You Need to Upgrade:**
- Vercel: >100GB bandwidth/month ($20/month)
- Neon: >3GB database ($19/month)
- Upstash: >10K requests/day ($22/month)

**Estimated capacity on FREE tier:** 1,000-5,000 monthly active users!

---

## 📱 WhatsApp Integration (Optional)

For automated group invitations:

1. **WhatsApp Business API** (Paid):
   - Whapi.Cloud - $49/month for 1,000 messages
   - Wassenger - Free tier: 100 messages/month

2. **Setup**:
   ```env
   WHATSAPP_API_URL="..."
   WHATSAPP_API_TOKEN="..."
   ```

3. **Implementation**:
   - After payment success → Call WhatsApp API
   - Send group invite link
   - Message: "Welcome to [Tournament]! Join our group: [link]"

---

## 🛡️ Security Checklist

Before going live:
- [ ] Change `NEXTAUTH_SECRET` to random 32-character string
- [ ] Switch Razorpay/Stripe to LIVE keys (not test)
- [ ] Enable HTTPS only (Vercel does this automatically)
- [ ] Add rate limiting to API routes
- [ ] Set up error logging (Sentry free tier)

---

## 📊 Monitoring (FREE)

**Vercel Analytics:**
- Automatic page views tracking
- Performance metrics
- No setup needed!

**Prisma Studio:**
```bash
npx prisma studio
```
- Visual database browser
- Manage data through UI

---

## 🎮 Test Your Platform

1. **Register:** Create account with email
2. **Browse:** Filter tournaments
3. **Register Team:** Add 5 players with Valorant IDs
4. **Payment:** Use Razorpay test mode:
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: Any future date
5. **Success:** See "You will be added soon in our group"!

---

## 💰 Revenue Projections

**Scenario:** 100 teams/month, ₹2,000 avg entry fee

- **Gross Revenue:** ₹2,00,000/month
- **Prize Pools (70%):** ₹1,40,000
- **Platform Profit (30%):** ₹60,000/month
- **Razorpay Fees (2% on cards):** ₹400
- **Net Profit:** ₹59,600/month

**Using UPI (0% fees):** ₹60,000/month profit!

---

## 🆘 Support

**Community:**
- GitHub Issues for bugs
- Discord for help (create your own!)

**Platform is ready for launch!** 🚀
