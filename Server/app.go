package main

import (
	Apis "EasyDonation/Server/apis"
	Pages "EasyDonation/Server/pages"
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Starting Server @ :8080")

	Pages.ConnectHome()
	Apis.ConnectFetchAvatarHeadshot()
	Apis.ConnectSearchUsers()
	Apis.ConnectGetUser()

	log.Fatal(http.ListenAndServe(":8080", nil))
}