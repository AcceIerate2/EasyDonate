package Apis

import (
	"net/http"
)

func handleResponse(w http.ResponseWriter, r *http.Request) {
	if (r.URL.Path) != "/api/searchUsers" {
		return 
	}
	
	return r.Response.Body
}

func Apis() {
	http.HandleFunc("/api/searchUsers", handleResponse)
}