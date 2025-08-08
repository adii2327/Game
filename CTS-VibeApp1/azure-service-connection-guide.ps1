# ================================================================================================
# Azure DevOps Service Connection Setup Guide
# ================================================================================================
# This guide helps you set up the Azure Service Connection needed for CI/CD deployment
# ================================================================================================

# STEP 1: CREATE AZURE SERVICE CONNECTION
# ================================================================================================

Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "🔧 Azure DevOps Service Connection Setup Guide" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 REQUIRED INFORMATION:" -ForegroundColor Green
Write-Host "   👉 Azure Subscription ID" -ForegroundColor White
Write-Host "   👉 Azure Resource Group Name" -ForegroundColor White
Write-Host "   👉 Azure App Service Name" -ForegroundColor White
Write-Host ""

# Get Azure subscription information
Write-Host "🔍 Getting Azure subscription information..." -ForegroundColor Yellow

try {
    $subscriptions = az account list --query "[].{name:name, id:id, isDefault:isDefault}" -o table
    Write-Host "📊 Available Azure Subscriptions:" -ForegroundColor Green
    Write-Host $subscriptions -ForegroundColor White
    
    $defaultSub = az account show --query "{name:name, id:id}" -o json | ConvertFrom-Json
    Write-Host ""
    Write-Host "✅ Current Default Subscription:" -ForegroundColor Green
    Write-Host "   Name: $($defaultSub.name)" -ForegroundColor White
    Write-Host "   ID: $($defaultSub.id)" -ForegroundColor White
    
} catch {
    Write-Host "❌ Failed to get Azure subscription info. Please ensure you're logged in to Azure CLI." -ForegroundColor Red
    Write-Host "   Run: az login" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "🛠️  MANUAL SETUP STEPS FOR AZURE DEVOPS:" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1️⃣  Go to Azure DevOps:" -ForegroundColor White
Write-Host "   👉 https://dev.azure.com/Vibects12/" -ForegroundColor Cyan
Write-Host ""

Write-Host "2️⃣  Navigate to Project Settings:" -ForegroundColor White
Write-Host "   👉 Click on your project" -ForegroundColor Cyan
Write-Host "   👉 Go to 'Project Settings' (bottom left)" -ForegroundColor Cyan
Write-Host "   👉 Under 'Pipelines', click 'Service connections'" -ForegroundColor Cyan
Write-Host ""

Write-Host "3️⃣  Create New Service Connection:" -ForegroundColor White
Write-Host "   👉 Click 'Create service connection'" -ForegroundColor Cyan
Write-Host "   👉 Select 'Azure Resource Manager'" -ForegroundColor Cyan
Write-Host "   👉 Choose 'Service principal (automatic)'" -ForegroundColor Cyan
Write-Host "   👉 Click 'Next'" -ForegroundColor Cyan
Write-Host ""

Write-Host "4️⃣  Configure Connection:" -ForegroundColor White
Write-Host "   👉 Subscription: Select your Azure subscription" -ForegroundColor Cyan
Write-Host "   👉 Resource Group: Select your resource group" -ForegroundColor Cyan
Write-Host "   👉 Service connection name: 'Azure-Service-Connection'" -ForegroundColor Cyan
Write-Host "   👉 Description: 'CTS VibeApp Deployment Connection'" -ForegroundColor Cyan
Write-Host "   👉 Check 'Grant access permission to all pipelines'" -ForegroundColor Cyan
Write-Host "   👉 Click 'Save'" -ForegroundColor Cyan
Write-Host ""

Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "🔄 PIPELINE SETUP STEPS:" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1️⃣  Create New Pipeline:" -ForegroundColor White
Write-Host "   👉 Go to 'Pipelines' in Azure DevOps" -ForegroundColor Cyan
Write-Host "   👉 Click 'Create Pipeline'" -ForegroundColor Cyan
Write-Host "   👉 Select 'Azure Repos Git'" -ForegroundColor Cyan
Write-Host "   👉 Choose your repository: 'CTS-VibeApp-Enhanced'" -ForegroundColor Cyan
Write-Host ""

Write-Host "2️⃣  Configure Pipeline:" -ForegroundColor White
Write-Host "   👉 Select 'Existing Azure Pipelines YAML file'" -ForegroundColor Cyan
Write-Host "   👉 Path: '/azure-pipelines.yml'" -ForegroundColor Cyan
Write-Host "   👉 Click 'Continue'" -ForegroundColor Cyan
Write-Host ""

Write-Host "3️⃣  Update Pipeline Variables:" -ForegroundColor White
Write-Host "   👉 Before running, update these variables in azure-pipelines.yml:" -ForegroundColor Cyan
Write-Host "       - webAppName: 'your-actual-app-service-name'" -ForegroundColor Yellow
Write-Host "       - azureSubscription: 'Azure-Service-Connection'" -ForegroundColor Yellow
Write-Host ""

Write-Host "4️⃣  Run Pipeline:" -ForegroundColor White
Write-Host "   👉 Click 'Save and run'" -ForegroundColor Cyan
Write-Host "   👉 Monitor the build and deployment process" -ForegroundColor Cyan
Write-Host ""

Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "📁 FILES TO VERIFY:" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan

$files = @(
    "azure-pipelines.yml",
    "package.json",
    "app.js",
    "views/",
    "public/"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file (missing)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "🎯 NEXT ACTIONS:" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Complete the Azure DevOps setup steps above" -ForegroundColor White
Write-Host "2. Update the webAppName in azure-pipelines.yml" -ForegroundColor White
Write-Host "3. Run the Azure DevOps pipeline" -ForegroundColor White
Write-Host "4. Monitor deployment progress" -ForegroundColor White
Write-Host "5. Test your deployed application" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Your CTS VibeApp Enhanced will be automatically deployed!" -ForegroundColor Green
Write-Host "=============================================================================" -ForegroundColor Cyan
