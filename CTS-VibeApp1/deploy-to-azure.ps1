# Azure Deployment Script for CTS VibeApp
Write-Host "=== CTS VibeApp Azure Deployment Helper ===" -ForegroundColor Green

# Step 1: Open Azure Portal
Write-Host "`n1. Opening Azure Portal..." -ForegroundColor Yellow
Start-Process "https://portal.azure.com"

# Step 2: Check deployment package
Write-Host "`n2. Deployment Package Status:" -ForegroundColor Yellow
$zipPath = "cts-vibeapp-deployment.zip"
if (Test-Path $zipPath) {
    Write-Host "   ✓ Deployment package found: $zipPath" -ForegroundColor Green
    $zipSize = (Get-Item $zipPath).Length / 1MB
    Write-Host "   ✓ Package size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Green
}
else {
    Write-Host "   ✗ Deployment package not found - creating one..." -ForegroundColor Red
    
    $items = @(
        "app.js",
        "package.json", 
        "package-lock.json",
        "web.config",
        "public",
        "views"
    )
    
    Compress-Archive -Path $items -DestinationPath $zipPath -Force
    Write-Host "   ✓ Deployment package created: $zipPath" -ForegroundColor Green
}

# Step 3: Display deployment instructions
Write-Host "`n3. AZURE DEPLOYMENT STEPS:" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan

Write-Host "`nOPTION 1: Deploy to Existing App Service" -ForegroundColor Green
Write-Host "1. Go to Azure Portal (opened above)"
Write-Host "2. Navigate to 'All Resources'"
Write-Host "3. Find an existing App Service you can access"
Write-Host "4. Click the App Service name"
Write-Host "5. Go to 'Advanced Tools' → Click 'Go'"
Write-Host "6. In Kudu console: Tools → Zip Push Deploy"
Write-Host "7. Drag and drop: $zipPath"

Write-Host "`nOPTION 2: GitHub Integration" -ForegroundColor Green  
Write-Host "1. In App Service → 'Deployment Center'"
Write-Host "2. Source: GitHub"
Write-Host "3. Repository: adii2327/Game"
Write-Host "4. Branch: main"
Write-Host "5. App path: CTS-VibeApp1"

Write-Host "`nOPTION 3: Ask Team Lead for Access" -ForegroundColor Green
Write-Host "1. Request access to existing resource group"
Write-Host "2. Get specific App Service name to use"
Write-Host "3. Ensure you have 'Contributor' role"

Write-Host "`n4. Your App Will Be Available At:" -ForegroundColor Yellow
Write-Host "   https://[app-service-name].azurewebsites.net" -ForegroundColor Cyan

Write-Host "`n=== Ready for Azure Deployment! ===" -ForegroundColor Green
