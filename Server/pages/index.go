package Pages

import (
	"net/http"
)

func handleResponse(w http.ResponseWriter, r *http.Request) {
	if (r.URL.Path != "/") {
		return  
	}
}

func ConnectIndex() {
	http.HandleFunc("/", handleResponse)
}