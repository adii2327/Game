# Azure FTP Deployment Script
# Get FTP credentials from Azure Portal: App Service → Deployment Center → FTPS credentials

Write-Host "=== Azure FTP Deployment Guide ===" -ForegroundColor Green

Write-Host "`n1. Get FTP Credentials from Azure Portal:" -ForegroundColor Yellow
Write-Host "   - Go to your App Service"
Write-Host "   - Click 'Deployment Center'"
Write-Host "   - Go to 'FTPS credentials' tab"
Write-Host "   - Copy FTP endpoint, username, and password"

Write-Host "`n2. Deployment Package:" -ForegroundColor Yellow
Write-Host "   📦 File: cts-vibeapp-final-deployment.zip"
Write-Host "   📊 Size: 53 KB"
Write-Host "   ✨ Features: Enhanced with Tasks, Chat, Calendar, Analytics"

Write-Host "`n3. Upload Steps:" -ForegroundColor Yellow
Write-Host "   - Use any FTP client (FileZilla, WinSCP, or PowerShell)"
Write-Host "   - Connect to your App Service FTP endpoint"
Write-Host "   - Upload to: /site/wwwroot/"
Write-Host "   - Extract the zip file on the server"

Write-Host "`n4. PowerShell FTP Upload (Alternative):" -ForegroundColor Yellow
Write-Host "   # Replace with your actual FTP details"
Write-Host "   `$ftpServer = 'ftps://your-app-name.scm.azurewebsites.net'"
Write-Host "   `$username = 'your-app-name\`$your-app-name'"
Write-Host "   `$password = 'your-ftp-password'"

Write-Host "`n✅ Your app will be available at:" -ForegroundColor Green
Write-Host "   https://your-app-name.azurewebsites.net" -ForegroundColor Cyan

Write-Host "`n🆕 New Features Available After Deployment:" -ForegroundColor Green
Write-Host "   🎯 Task Management: /tasks"
Write-Host "   💬 Team Chat: /chat"
Write-Host "   📅 Calendar: /calendar"
Write-Host "   📊 Analytics: /analytics"
