# Kudu Direct Upload Script
# This helps upload directly to Azure App Service via Kudu

Write-Host "=== Kudu Direct Upload Guide ===" -ForegroundColor Green

Write-Host "`n1. Access Kudu Console:" -ForegroundColor Yellow
Write-Host "   URL Format: https://[app-name].scm.azurewebsites.net"
Write-Host "   Example: https://cts-vibeapp-2025.scm.azurewebsites.net"

Write-Host "`n2. Alternative Kudu Access:" -ForegroundColor Yellow
Write-Host "   - In Azure Portal → Your App Service"
Write-Host "   - Development Tools → Advanced Tools"
Write-Host "   - Click 'Go' button"

Write-Host "`n3. Upload Methods in Kudu:" -ForegroundColor Yellow
Write-Host "   Method A - Zip Deploy:"
Write-Host "     - Go to Tools → Zip Push Deploy"
Write-Host "     - Upload: cts-vibeapp-final-deployment.zip"
Write-Host ""
Write-Host "   Method B - File Manager:"
Write-Host "     - Click 'Debug console' → CMD"
Write-Host "     - Navigate to site/wwwroot/"
Write-Host "     - Drag files or use upload button"

Write-Host "`n4. Verify Deployment:" -ForegroundColor Yellow
Write-Host "   - Check https://[app-name].azurewebsites.net"
Write-Host "   - Should show your CTS VibeApp"

Write-Host "`n📦 Ready to Upload:" -ForegroundColor Green
Write-Host "   File: cts-vibeapp-final-deployment.zip (53 KB)"
Write-Host "   Contains: All enhanced features"
