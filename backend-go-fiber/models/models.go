package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type NSEOCTotalOIRatio struct {
	ID              string    `gorm:"primaryKey;type:text" json:"id"`
	CETotalOI       int64     `json:"ce_total_oi"`
	PETotalOI       int64     `json:"pe_total_oi"`
	UnderlyingValue float64   `json:"underlying_value" gorm:"default:0"`
	LastFetchedDate time.Time `json:"last_fetched_date"`
	Ratio           float64   `json:"ratio"`
	CreatedDate     time.Time `json:"created_date" gorm:"autoCreateTime"`
	LastUpdatedDate time.Time `json:"last_updated_date" gorm:"autoUpdateTime"`
}

// BeforeCreate hook to generate UUID before creating record
func (n *NSEOCTotalOIRatio) BeforeCreate(tx *gorm.DB) error {
	if n.ID == "" {
		n.ID = uuid.New().String()
	}
	return nil
}

type NSECallNPutOIRations struct {
	ID                string    `gorm:"primaryKey;type:text" json:"id"`
	UnderlyingValue   float64   `json:"underlying_value" gorm:"default:0"`
	SumOICe           int64     `json:"sum_oi_ce"`
	SumOIPe           int64     `json:"sum_oi_pe"`
	SumChangeInOICe   int64     `json:"sum_change_in_oi_ce"`
	SumChangeInOIPe   int64     `json:"sum_change_in_oi_pe"`
	RatioOICe         float64   `json:"ratio_oi_ce"`
	RatioOIPe         float64   `json:"ratio_oi_pe"`
	RatioChangeInOICe float64   `json:"ratio_change_in_oi_ce"`
	RatioChangeInOIPe float64   `json:"ratio_change_in_oi_pe"`
	CreatedDate       time.Time `json:"created_date" gorm:"autoCreateTime"`
	LastFetchedDate   time.Time `json:"last_fetched_date"`
	LastUpdatedDate   time.Time `json:"last_updated_date" gorm:"autoUpdateTime"`
}

// BeforeCreate hook to generate UUID before creating record
func (n *NSECallNPutOIRations) BeforeCreate(tx *gorm.DB) error {
	if n.ID == "" {
		n.ID = uuid.New().String()
	}
	return nil
}

// simple health check table
type HealthCheck struct {
	ID        string    `gorm:"primaryKey;type:text" json:"id"`
	CheckedAt time.Time `json:"checked_at" gorm:"autoCreateTime"`
}

// BeforeCreate hook to generate UUID before creating record
func (h *HealthCheck) BeforeCreate(tx *gorm.DB) error {
	if h.ID == "" {
		h.ID = uuid.New().String()
	}
	return nil
}
