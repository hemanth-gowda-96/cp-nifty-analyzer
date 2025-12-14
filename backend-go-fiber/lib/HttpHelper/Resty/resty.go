package resty

import (
	"github.com/go-resty/resty/v2"
)

func Get(url string, headers map[string]string, queryParams map[string]string) (*resty.Response, error) {
	client := resty.New()
	req := client.R()
	// Set default User-Agent if not provided
	if _, ok := headers["User-Agent"]; !ok {
		req.SetHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
	}
	for k, v := range headers {
		req.SetHeader(k, v)
	}
	if queryParams != nil {
		req.SetQueryParams(queryParams)
	}
	return req.Get(url)
}

func Post(url string, headers map[string]string, body interface{}) (*resty.Response, error) {
	client := resty.New()
	req := client.R()
	for k, v := range headers {
		req.SetHeader(k, v)
	}
	req.SetBody(body)
	return req.Post(url)
}
