package Apis

import (
	"io"
	"net/http"
)

func handleThumbnailsResponse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Content-Type", "application/json")

	var ids string = r.URL.Query().Get("ids")
	response, errorMessage := http.Get("https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=" + ids + "&size=420x420&format=Png&isCircular=false")
	if errorMessage != nil {
		return 
	}

	defer response.Body.Close()
	io.Copy(w, response.Body)
}

func ConnectFetchAvatarHeadshot() {
	http.HandleFunc("/api/fetchAvatarHeadshot", handleThumbnailsResponse)
}