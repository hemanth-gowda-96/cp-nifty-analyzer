This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- 📈 Live NSE Option Chain OI Ratio dashboard
- 🗃️ Historical OI ratio and call/put data tables
- 📊 Interactive area chart for OI ratio trends
- 🔄 Auto-refresh and manual refresh for live data
- 🕒 Backend background task for scheduled data fetch (10am–4pm)
- 🗄️ SQLite + Prisma integration
- 🐳 Docker & docker-compose support for full stack
- 🧑‍💻 Modern, responsive UI with Tailwind CSS
- 🩺 Health checks and robust error handling

---

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running with Docker

1. Build and start the Next.js app:

   ```bash
   docker-compose up --build
   ```

   - The app will be available at [http://localhost:3000](http://localhost:3000)
   

2. To stop the services:
   ```bash
   docker-compose down
   ```

### Environment Variables

- The default SQLite database is set in `prisma/schema.prisma` as:
   `file:./lib/database/db.sqlite`
   (No environment variable needed)

### Database Migrations


If you need to run Prisma migrations, use:

```bash
npx prisma migrate dev
```

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

GET https://www.nseindia.com/api/option-chain-v3?type=Indices&symbol=NIFTY&expiry=09-Dec-2025
