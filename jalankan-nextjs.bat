@echo off
title BSI Note Book - Next.js Server
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "C:\laragon\www\bsi-notebook-next"

echo ===================================================
echo     BSI NOTE BOOK - NEXT.JS AI STUDY ASSISTANT
echo ===================================================
echo Membuka di Google Chrome http://localhost:3000 ...
start "" "http://localhost:3000"

echo Menjalankan Next.js server...
npm start
pause

