# Azure App Service Creation Guide for CTS VibeApp

Write-Host "=== Creating Azure App Service for CTS VibeApp ===" -ForegroundColor Green

Write-Host "`n📋 Step-by-Step App Service Creation:" -ForegroundColor Yellow

Write-Host "`n1. In Azure Portal:" -ForegroundColor Cyan
Write-Host "   - Click '+ Create a resource'"
Write-Host "   - Search for 'Web App'"
Write-Host "   - Click 'Create'"

Write-Host "`n2. Basic Settings:" -ForegroundColor Cyan
Write-Host "   📝 Subscription: [Select your CTS subscription]"
Write-Host "   📂 Resource Group: [Use existing team resource group]"
Write-Host "   🏷️  Name: cts-vibeapp-2025 (or similar available name)"
Write-Host "   📤 Publish: Code"
Write-Host "   🔧 Runtime stack: Node 18 LTS (or Node 20 LTS)"
Write-Host "   🖥️  Operating System: Linux (recommended) or Windows"
Write-Host "   🌍 Region: [Same as your resource group]"

Write-Host "`n3. App Service Plan:" -ForegroundColor Cyan
Write-Host "   💰 Pricing tier: F1 (Free) for testing"
Write-Host "   📈 Or B1 (Basic) for better performance"

Write-Host "`n4. After Creation:" -ForegroundColor Cyan
Write-Host "   ✅ Wait for deployment to complete"
Write-Host "   🌐 Your app URL will be: https://[app-name].azurewebsites.net"
Write-Host "   📦 Deploy using the zip file: cts-vibeapp-final-deployment.zip"

Write-Host "`n🚨 Common Issues & Solutions:" -ForegroundColor Red

Write-Host "`n❌ Issue: 'Name already taken'" -ForegroundColor Yellow
Write-Host "   ✅ Solution: Try variations like:"
Write-Host "      - cts-vibeapp-2025-v2"
Write-Host "      - cts-vibeapp-july2025"
Write-Host "      - vibeapp-cts-[your-initials]"

Write-Host "`n❌ Issue: 'No permission to create resources'" -ForegroundColor Yellow
Write-Host "   ✅ Solution: Ask your admin for:"
Write-Host "      - Contributor role on Resource Group"
Write-Host "      - Or use existing App Service"

Write-Host "`n❌ Issue: 'App Service not responding'" -ForegroundColor Yellow
Write-Host "   ✅ Solution:"
Write-Host "      - Check App Service status (should be 'Running')"
Write-Host "      - Restart the App Service"
Write-Host "      - Check Application logs"

Write-Host "`n📦 Deployment Package Ready:" -ForegroundColor Green
Write-Host "   File: cts-vibeapp-final-deployment.zip"
Write-Host "   Size: 53 KB"
Write-Host "   Features: Enhanced with all new functionality"

Write-Host "`n🎯 Next Steps:" -ForegroundColor Green
Write-Host "   1. Create or find your App Service"
Write-Host "   2. Deploy the zip package"
Write-Host "   3. Test the app URL"
Write-Host "   4. Verify all features work"
