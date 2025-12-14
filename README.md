# CP Nifty Analyzer

A comprehensive tool for analyzing Nifty market data, specifically focusing on options and strike prices. This application combines a high-performance Go backend with a modern web frontend.

## 🚀 Features

- **Real-time Data Analysis**: Fetches and analyzes NSE (National Stock Exchange) data via a background scheduler.
- **Options Chain Analysis**: capable of parsing and storing complex option chain data (Call/Put options, Strike Prices).
- **Single Binary Deployment**: The frontend is bundled directly into the Go binary for easy distribution and deployment.
- **Robust Backend**: Built with Go and the Fiber web framework for high performance and low latency.
- **Persistent Storage**: Uses SQLite with GORM for reliable and zero-config data storage.
- **Automated Scheduling**: Includes a built-in scheduler to fetch market data at configurable intervals (default: 30s).

## 🛠️ Tech Stack

### Backend

- **Language**: Go (Golang) 1.24+
- **Framework**: [Fiber v2](https://gofiber.io/) - Express-inspired web framework for Go.
- **Database**: SQLite (via `modernc.org/sqlite` and `gorm`).
- **ORM**: [GORM](https://gorm.io/) - The fantastic ORM library for Golang.
- **Networking**: `go-resty` for HTTP client operations.

### Frontend

- **Framework**: Next.js (Static Export).
- **Integration**: Compiled static files are embedded into the Go binary using `embed`.

## 📂 Project Structure

```
cp-nifty-analyzer/
├── backend-go-fiber/    # Main Go application
│   ├── main.go          # Application entry point & server configuration
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic and data processing
│   ├── lib/             # Shared libraries (Database, etc.)
│   ├── models/          # GORM database models
│   ├── static/          # Embedded frontend static files
│   └── go.mod           # Go module definitions
├── data/                # Data storage (SQLite DB)
└── README.md            # You are here
```

## ⚡ Getting Started

### Prerequisites

- [Go](https://go.dev/dl/) (version 1.24 or higher)

### Installation & Running

1.  Navigate to the backend directory:

    ```bash
    cd backend-go-fiber
    ```

2.  Install dependencies:

    ```bash
    go mod tidy
    ```

3.  Run the application:
    ```bash
    go run main.go
    ```

The server will start on port `3005`.
Open [http://localhost:3005](http://localhost:3005) in your browser to view the application.

## 📦 Building for Production

To build a standalone executable that includes the frontend:

1.  Ensure your frontend static files are in `backend-go-fiber/static`.
2.  Build the binary:
    ```bash
    cd backend-go-fiber
    go build -o cp-nifty-analyzer.exe main.go
    ```
3.  Run the executable:
    ```bash
    ./cp-nifty-analyzer.exe
    ```

## 🔄 Scheduler

The application includes an internal scheduler (`utils/scheduler`) that runs automatically on startup. It is configured to fetch fresh data every 30 seconds.

## 📝 License

[MIT](LICENSE)
