package main

import (
	Pages "EasyDonation/Server/pages"
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Starting Server @ :8080")
	Pages.ConnectIndex()
	log.Fatal(http.ListenAndServe(":8080", nil))
}