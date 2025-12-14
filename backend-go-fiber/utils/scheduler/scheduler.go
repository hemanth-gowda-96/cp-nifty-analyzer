package scheduler

import (
	nseIntegration "backend-go-fiber/lib/NSEIntegration"
	"log"
	"time"
)

// SchedulerConfig holds the configuration for the scheduler
type SchedulerConfig struct {
	IntervalSeconds int  // Interval in seconds between each execution
	RunOnStart      bool // Whether to run immediately on start
}

// Scheduler manages periodic execution of NSE option chain fetching
type Scheduler struct {
	config   SchedulerConfig
	ticker   *time.Ticker
	stopChan chan bool
	running  bool
}

// NewScheduler creates a new scheduler instance with the given configuration
func NewScheduler(config SchedulerConfig) *Scheduler {
	return &Scheduler{
		config:   config,
		stopChan: make(chan bool),
		running:  false,
	}
}

// Start begins the scheduler execution
func (s *Scheduler) Start() {
	if s.running {
		log.Println("Scheduler is already running")
		return
	}

	s.running = true
	log.Printf("Starting NSE Option Chain scheduler with interval: %d seconds\n", s.config.IntervalSeconds)

	// Run immediately if configured
	if s.config.RunOnStart {
		log.Println("Running initial fetch...")
		s.fetchData()
	}

	// Create ticker with configured interval
	s.ticker = time.NewTicker(time.Duration(s.config.IntervalSeconds) * time.Second)

	// Start the scheduler loop in a goroutine
	go func() {
		for {
			select {
			case <-s.ticker.C:
				s.fetchData()
			case <-s.stopChan:
				log.Println("Scheduler stopped")
				return
			}
		}
	}()

	log.Println("Scheduler started successfully")
}

// Stop gracefully stops the scheduler
func (s *Scheduler) Stop() {
	if !s.running {
		log.Println("Scheduler is not running")
		return
	}

	log.Println("Stopping scheduler...")
	s.running = false

	if s.ticker != nil {
		s.ticker.Stop()
	}

	s.stopChan <- true
	close(s.stopChan)
}

// fetchData executes the NSE option chain data fetch
func (s *Scheduler) fetchData() {
	// Load IST timezone
	loc, err := time.LoadLocation("Asia/Kolkata")
	if err != nil {
		log.Printf("Error loading timezone: %v\n", err)
		return
	}

	// Get current time in IST
	nowIST := time.Now().In(loc)
	currentHour := nowIST.Hour()
	currentWeekday := nowIST.Weekday()

	// Check if current day is a weekday (Monday to Friday)
	if currentWeekday == time.Saturday || currentWeekday == time.Sunday {
		log.Printf("Skipping fetch - Weekend (Saturday/Sunday). Current day: %s, Time: %s\n",
			currentWeekday.String(), nowIST.Format("02 Jan 2006, 03:04 PM"))
		return
	}

	// Check if current time is between 9 AM (9) and 4 PM (16)
	if currentHour < 9 || currentHour >= 16 {
		log.Printf("Skipping fetch - Outside trading hours (9 AM - 4 PM IST). Current time: %s\n", nowIST.Format("02 Jan 2006, 03:04 PM"))
		return
	}

	log.Println("Fetching NSE Option Chain data...")
	startTime := time.Now()

	result := nseIntegration.GetNesOptionChainLive()

	duration := time.Since(startTime)

	if result.Error != nil {
		log.Printf("Error fetching NSE data: %s (took %v)\n", result.Message, duration)
		log.Printf("Error details: %v\n", result.Error)
	} else {
		log.Printf("Successfully fetched NSE data: %s (took %v)\n", result.Message, duration)
	}
}

// IsRunning returns whether the scheduler is currently running
func (s *Scheduler) IsRunning() bool {
	return s.running
}

// UpdateInterval updates the scheduler interval (requires restart to take effect)
func (s *Scheduler) UpdateInterval(intervalSeconds int) {
	s.config.IntervalSeconds = intervalSeconds
	log.Printf("Scheduler interval updated to %d seconds (restart required)\n", intervalSeconds)
}
