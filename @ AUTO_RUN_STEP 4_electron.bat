@echo off
:: Lấy thư mục của file bat (bất kể move đi đâu)
cd /d "%~dp0apps\pos-desktop"

:: Chạy dev server
call pnpx electron .

pause
