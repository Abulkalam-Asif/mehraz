@echo off

REM Define the source and destination directories
set SOURCE_DIR=D:\firebase\firebase-emulator-data\mehraz
set BACKUP_DIR=D:\firebase\firebase-emulator-data\mehraz_backup_%DATE:/=-%_%TIME::=-%

echo Killing ports...
REM Kill the ports
call npx kill-port 9099 5001 8080 9000 9199
if %errorlevel% neq 0 (
    echo Error killing ports
    exit /b %errorlevel%
)

echo Copying directory...
REM Copy the directory
xcopy "%SOURCE_DIR%" "%BACKUP_DIR%" /E /I /Y
if %errorlevel% neq 0 (
    echo Error copying directory
    exit /b %errorlevel%
)

echo Starting Firebase emulators...
REM Start the Firebase emulators
call firebase emulators:start --import "%SOURCE_DIR%" --export-on-exit "%SOURCE_DIR%"
if %errorlevel% neq 0 (
    echo Error starting Firebase emulators
    exit /b %errorlevel%
)

pause
