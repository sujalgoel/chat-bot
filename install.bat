@echo off

echo Installing/updating bot dependencies
call npm i --only=production --loglevel=warn >NUL

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)