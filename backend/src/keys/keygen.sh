#!/bin/bash

openssl genrsa -out ACCESS_TOKEN_PRIVATE_KEY.pem 2048
openssl rsa -in ACCESS_TOKEN_PRIVATE_KEY.pem -pubout -out ACCESS_TOKEN_PUBLIC_KEY.pem
openssl genrsa -out REFRESH_TOKEN_PRIVATE_KEY.pem 2048
openssl rsa -in REFRESH_TOKEN_PRIVATE_KEY.pem -pubout -out REFRESH_TOKEN_PUBLIC_KEY.pem