package Apis

import (
	"io"
	"net/http"
	"net/url"
)

const robloxUrl string = "https://users.roblox.com/v1/users/search?keyword=" 
 
func handleKeywordResponse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Content-Type", "application/json")

	username := r.URL.Query().Get("username")
	response, errorMessage := http.Get(robloxUrl + url.QueryEscape(username))
	if errorMessage != nil {
		http.Error(w, "Failed to get usernames", http.StatusBadGateway)
		return
	}
	
	defer response.Body.Close()
	io.Copy(w, response.Body)
}

func ConnectSearchUsers() {
	http.HandleFunc("/api/searchUsers", handleKeywordResponse)
}