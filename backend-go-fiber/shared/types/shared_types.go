package SharedTypes

type ApiResponse struct {
	Code    string
	Message string
	Data    any
}

type ServiceResponse struct {
	Code    string
	Message string
	Data    any
	Error   error
}
