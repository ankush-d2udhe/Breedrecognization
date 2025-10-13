@echo off
echo ========================================
echo   FarmSenseGlow - Vercel Deployment
echo ========================================
echo.

echo 1. Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 2. Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo 3. Deploying to Vercel...
call vercel --prod
if %errorlevel% neq 0 (
    echo Error: Deployment failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Deployment completed successfully!
echo ========================================
echo.
echo Your website is now live on Vercel.
echo Check your Vercel dashboard for the URL.
echo.
pause