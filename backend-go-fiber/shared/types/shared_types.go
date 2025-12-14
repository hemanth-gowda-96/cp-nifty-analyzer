package SharedTypes

type ApiResponse struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

type ServiceResponse struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data"`
	Error   error  `json:"error"`
}
