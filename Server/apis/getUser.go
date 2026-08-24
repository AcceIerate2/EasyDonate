package Apis

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

const getUserUrlEndpoint = "https://users.roblox.com/v1/usernames/users"

func handleUserResponse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Content-Type", "application/json")

	username := r.URL.Query().Get("username")
	fmt.Println(username)

	data := map[string]any {
		"usernames": []string{username},
		"excludeBannedUsers": true,
	}

	_json, errorMessage := json.Marshal(data)
	if (errorMessage != nil) {
		http.Error(w, "Failed to Jsonify Data", http.StatusInternalServerError)
		return 
	}

	response, errorMessage := http.Post(getUserUrlEndpoint, "application/json", bytes.NewReader(_json))
	if (errorMessage != nil) {
		http.Error(w, "Failed to get specific user data", http.StatusBadGateway)
		return 
	}

	defer response.Body.Close()
	io.Copy(w, response.Body)
}

func ConnectGetUser() {
	http.HandleFunc("/api/getUser", handleUserResponse)	
}