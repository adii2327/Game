# Azure Repos Import and Deployment Script
# Run this after setting up your Azure DevOps project

param(
    [Parameter(Mandatory=$true)]
    [string]$AzureOrg,
    
    [Parameter(Mandatory=$true)]
    [string]$ProjectName = "CTS-VibeApp-Enterprise",
    
    [Parameter(Mandatory=$true)]
    [string]$RepoName = "CTS-VibeApp"
)

$azureRepoUrl = "https://dev.azure.com/$AzureOrg/$ProjectName/_git/$RepoName"

Write-Host "🚀 Starting Azure Repos Import Process..." -ForegroundColor Green
Write-Host "Target Repository: $azureRepoUrl" -ForegroundColor Yellow

# Check if git is available
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not in PATH"
    exit 1
}

# Check current git status
Write-Host "📋 Checking current repository status..." -ForegroundColor Blue
git status

# Add Azure remote
Write-Host "🔗 Adding Azure DevOps remote..." -ForegroundColor Blue
try {
    git remote add azure $azureRepoUrl
    Write-Host "✅ Azure remote added successfully" -ForegroundColor Green
} catch {
    Write-Host "ℹ️ Azure remote might already exist, updating..." -ForegroundColor Yellow
    git remote set-url azure $azureRepoUrl
}

# Show all remotes
Write-Host "📍 Current remotes:" -ForegroundColor Blue
git remote -v

# Push to Azure DevOps
Write-Host "📤 Pushing code to Azure DevOps..." -ForegroundColor Blue
Write-Host "You may be prompted for authentication..." -ForegroundColor Yellow

try {
    git push azure main
    Write-Host "✅ Code successfully pushed to Azure DevOps!" -ForegroundColor Green
} catch {
    Write-Host "❌ Push failed. Please check your credentials and try again." -ForegroundColor Red
    Write-Host "Make sure you have:" -ForegroundColor Yellow
    Write-Host "1. Created the project in Azure DevOps" -ForegroundColor Yellow
    Write-Host "2. Have proper permissions" -ForegroundColor Yellow
    Write-Host "3. Personal Access Token is valid" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to Azure DevOps: https://dev.azure.com/$AzureOrg/$ProjectName" -ForegroundColor White
Write-Host "2. Navigate to Pipelines → Create Pipeline" -ForegroundColor White
Write-Host "3. Choose Azure Repos Git → Select your repository" -ForegroundColor White
Write-Host "4. Select 'Existing Azure Pipelines YAML file'" -ForegroundColor White
Write-Host "5. Choose '/azure-pipelines.yml'" -ForegroundColor White
Write-Host "6. Configure your Azure App Service connection" -ForegroundColor White

Write-Host ""
Write-Host "📱 Azure App Service Integration:" -ForegroundColor Cyan
Write-Host "- Your pipeline will automatically deploy to Azure App Service" -ForegroundColor White
Write-Host "- Make sure to update the webAppName in azure-pipelines.yml" -ForegroundColor White
Write-Host "- Configure Azure service connection in project settings" -ForegroundColor White
