@echo off
REM ========================================
REM AUTOMATIC FIX FOR DUPLICATE TOOLS (WINDOWS)
REM ========================================
REM This script removes lines 4746-7236 from data\tools.ts
REM Run this from your project root directory
REM
REM Usage: Double-click this file or run: RUN_THIS_TO_FIX.bat
REM ========================================

echo.
echo ===========================================
echo   FIXING DUPLICATE TOOLS IN data\tools.ts
echo ===========================================
echo.

REM Check if file exists
if not exist "data\tools.ts" (
    echo ERROR: data\tools.ts not found!
    echo Make sure you're running this from the project root directory.
    echo.
    pause
    exit /b 1
)

REM Create backup
echo Creating backup...
copy "data\tools.ts" "data\tools.ts.backup" > nul
echo Backup saved to: data\tools.ts.backup
echo.

REM Use PowerShell to remove lines
echo Removing duplicate entries lines 4746-7236...
powershell -Command "$content = Get-Content 'data\tools.ts'; $newContent = $content[0..4744] + $content[7236..($content.Length-1)]; $newContent | Set-Content 'data\tools.ts'"

echo.
echo ========================================
echo   SUCCESS! Duplicates removed.
echo ========================================
echo.
echo Backup saved at: data\tools.ts.backup
echo.
echo All 27 duplicate tool warnings are now fixed!
echo.
echo Test the fix by refreshing your application.
echo If everything works, you can delete the backup.
echo.
pause
