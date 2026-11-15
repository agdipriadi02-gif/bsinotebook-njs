@echo off
title Push BSI Notebook ke GitHub
set "PATH=C:\laragon\bin\git\cmd;%PATH%"
cd /d "C:\laragon\www\bsi-notebook-next"

echo ===================================================
echo       UPLOAD BSI NOTEBOOK KE GITHUB REPOSITORY
echo ===================================================
echo.
echo Sedang melakukan upload (git push) ke GitHub...
echo (Jika muncul jendela popup browser, silakan klik "Sign in with your browser" / "Authorize")
echo.

git push -u origin main

echo.
echo ===================================================
echo Selesai! Silakan cek https://github.com/agdipriadi02-gif/bsinotebook-njs
echo ===================================================
pause
