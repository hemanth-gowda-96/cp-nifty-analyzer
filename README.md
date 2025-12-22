# CP Nifty Analyzer

A comprehensive tool for analyzing Nifty market data, specifically focusing on options and strike prices. This application combines a high-performance Go backend with a modern web frontend.

## 🚀 Features

- **Real-time Data Analysis**: Fetches and analyzes NSE (National Stock Exchange) data via a background scheduler.
- **Options Chain Analysis**: capable of parsing and storing complex option chain data (Call/Put options, Strike Prices).
- **Single Binary Deployment**: The frontend is bundled directly into the Go binary for easy distribution and deployment.
- **Robust Backend**: Built with Go and the Fiber web framework for high performance and low latency.
- **Persistent Storage**: Uses SQLite with GORM for reliable and zero-config data storage.
- **Automated Scheduling**: Includes a built-in scheduler to fetch market data at configurable intervals (default: 30s).

### 🗺️ Planned Features

- [ ] **Multi-tenant Support**: Support for multiple users with independent configurations and watchlists.
- [ ] **Real-time Dashboards**: Dynamic visualization of option Greeks and IV.
- [ ] **Alerting System**: Webhook and Email notifications based on custom thresholds.
- [ ] **Export Options**: Export analysis data to Excel/CSV for further processing.

## 🛠️ Tech Stack

### Backend

- **Language**: Go (Golang) 1.24+
- **Framework**: [Fiber v2](https://gofiber.io/) - Fast, Express-inspired web framework.
- **Database**: SQLite (via `modernc.org/sqlite` and `gorm`).
- **ORM**: [GORM](https://gorm.io/) - Developer-friendly ORM for Golang.
- **Networking**: `go-resty` for robust HTTP communications.

### Frontend

- **Framework**: Next.js (Static Export).
- **Integration**: Compiled static files are embedded into the Go binary using `embed`.

## 📂 Project Structure

```bash
cp-nifty-analyzer/
├── backend-go-fiber/           # Main Go application
│   ├── main.go                 # server entry & config
│   ├── routes/                 # API route definitions
│   ├── services/               # Business logic
│   ├── lib/                    # Shared libraries (NSE, SQLite, Http)
│   ├── models/                 # Database schemas
│   ├── static/                 # Embedded frontend (bundled)
│   └── utils/                  # Utility functions & Scheduler
├── nextjs-version-deprecated/  # Frontend source code
├── data/                       # Local SQLite database storage
└── move_out_folder.sh          # Helper script to sync frontend build to backend
```

## ⚡ Getting Started

### Prerequisites

- [Go](https://go.dev/dl/) (1.24+)
- [Node.js](https://nodejs.org/) (for frontend changes)

### Installation & Running

1. **Backend**:

   ```bash
   cd backend-go-fiber
   go mod tidy
   go run main.go
   ```

2. **Frontend (Optional - for development)**:
   ```bash
   cd nextjs-version-deprecated
   npm install
   npm run dev
   ```

The server will start on port `3005`.
Open [http://localhost:3005](http://localhost:3005) in your browser.

## 📦 Production Build

To build the standalone executable:

1. **Build Frontend**:

   ```bash
   cd nextjs-version-deprecated
   npm run build
   cd ..
   ./move_out_folder.sh
   ```

2. **Build Backend**:
   ```bash
   cd backend-go-fiber
   go build -o cp-nifty-analyzer.exe main.go
   ```

## 🔄 Data Scheduler

The system automatically fetches fresh data from NSE every **30 seconds**. This is managed by the internal scheduler in `utils/scheduler`.

## 📝 License

[MIT](LICENSE)
