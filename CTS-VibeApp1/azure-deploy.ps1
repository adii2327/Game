# Azure Deployment Script for CTS VibeApp
# This script helps deploy to Azure without Azure CLI

Write-Host "=== CTS VibeApp Azure Deployment Helper ===" -ForegroundColor Green

# Step 1: Check if user can access Azure Portal
Write-Host "`n1. Opening Azure Portal..." -ForegroundColor Yellow
Start-Process "https://portal.azure.com"

Write-Host "`n2. Deployment Package Ready:" -ForegroundColor Yellow
$zipPath = "cts-vibeapp-deployment.zip"
if (Test-Path $zipPath) {
    Write-Host "   ✓ Deployment package found: $zipPath" -ForegroundColor Green
    $zipSize = (Get-Item $zipPath).Length / 1MB
    Write-Host "   ✓ Package size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Green
} else {
    Write-Host "   ✗ Deployment package not found!" -ForegroundColor Red
    Write-Host "   Creating deployment package..." -ForegroundColor Yellow
    
    # Create deployment package
    $exclude = @("node_modules", ".git", ".vscode", "*.zip", "azure-deploy.ps1")
    $files = Get-ChildItem -Path . -Recurse | Where-Object { 
        $_.FullName -notmatch ($exclude -join "|") 
    }
    
    Compress-Archive -Path $files.FullName -DestinationPath $zipPath -Force
    Write-Host "   ✓ Deployment package created: $zipPath" -ForegroundColor Green
}
}

Write-Host "`n3. Manual Deployment Steps:" -ForegroundColor Yellow
Write-Host "   📝 Follow these steps in Azure Portal:" -ForegroundColor Cyan
Write-Host "   
   STEP A: Find Existing Resources
   1. In Azure Portal, go to 'All resources'
   2. Look for App Services (web app icon)
   3. Or go to 'Resource groups' and find your team's group
   
   STEP B: Deploy to Existing App Service
   1. Click on an available App Service
   2. Go to 'Advanced Tools' → 'Go' (opens Kudu)
   3. In Kudu: Tools → Zip Push Deploy
   4. Upload: $zipPath
   
   STEP C: Alternative - GitHub Deploy
   1. In App Service → Deployment Center
   2. Choose GitHub as source
   3. Repository: adii2327/Game
   4. Branch: main
   5. App path: CTS-VibeApp1
" -ForegroundColor White

Write-Host "`n4. Expected App URL Format:" -ForegroundColor Yellow
Write-Host "   https://[app-service-name].azurewebsites.net" -ForegroundColor Cyan

Write-Host "`n5. Need Help?" -ForegroundColor Yellow
Write-Host "   - Contact your Azure admin for resource access" -ForegroundColor White
Write-Host "   - Ask team lead for specific App Service name" -ForegroundColor White
Write-Host "   - Check if you have 'Contributor' role on any resource group" -ForegroundColor White

Write-Host "`n=== Deployment package ready for upload! ===" -ForegroundColor Green
