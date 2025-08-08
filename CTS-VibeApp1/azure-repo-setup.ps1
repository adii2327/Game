# ================================================================================================
# Quick Azure Repos Setup Script
# ================================================================================================

Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "🚀 Quick Azure DevOps Repository Setup" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Show available options
Write-Host "📋 REPOSITORY CREATION OPTIONS:" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Your Azure DevOps: https://dev.azure.com/Vibects12/" -ForegroundColor White
Write-Host ""
Write-Host "Choose one of these repository names:" -ForegroundColor Yellow
Write-Host "   1. CTS-VibeApp-Enhanced" -ForegroundColor Cyan
Write-Host "   2. CTS-VibeApp" -ForegroundColor Cyan
Write-Host "   3. VibeApp-Enterprise" -ForegroundColor Cyan
Write-Host "   4. TeamProductivityApp" -ForegroundColor Cyan
Write-Host "   5. Custom name of your choice" -ForegroundColor Cyan
Write-Host ""

# Get user input for repository name
$repoName = Read-Host "Enter your preferred repository name (or press Enter for 'CTS-VibeApp')"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "CTS-VibeApp"
}

Write-Host ""
Write-Host "✅ Repository name selected: $repoName" -ForegroundColor Green

# Step 2: Get project name
$projectName = Read-Host "Enter your Azure DevOps project name (or press Enter for 'CTS-Enterprise')"
if ([string]::IsNullOrWhiteSpace($projectName)) {
    $projectName = "CTS-Enterprise"
}

Write-Host ""
Write-Host "✅ Project name: $projectName" -ForegroundColor Green

# Step 3: Construct the repository URL
$azureRepoUrl = "https://dev.azure.com/Vibects12/$projectName/_git/$repoName"
Write-Host ""
Write-Host "📍 Your repository URL will be:" -ForegroundColor Yellow
Write-Host "   $azureRepoUrl" -ForegroundColor White

# Step 4: Setup Git remote
Write-Host ""
Write-Host "🔧 Setting up Git remote..." -ForegroundColor Yellow

try {
    # Remove existing azure remote if it exists
    $existingRemote = git remote get-url azure 2>$null
    if ($existingRemote) {
        Write-Host "🔄 Updating existing Azure remote..." -ForegroundColor Blue
        git remote set-url azure $azureRepoUrl
    } else {
        Write-Host "➕ Adding new Azure remote..." -ForegroundColor Blue
        git remote add azure $azureRepoUrl
    }
    
    Write-Host "✅ Git remote configured successfully!" -ForegroundColor Green
    
    # Show current remotes
    Write-Host ""
    Write-Host "📋 Current Git remotes:" -ForegroundColor Yellow
    git remote -v
    
} catch {
    Write-Host "❌ Error configuring Git remote: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 5: Provide manual instructions
Write-Host ""
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "📋 MANUAL STEPS TO COMPLETE:" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1️⃣  Create Repository in Azure DevOps:" -ForegroundColor White
Write-Host "   👉 Go to: https://dev.azure.com/Vibects12/" -ForegroundColor Cyan
Write-Host "   👉 Select or create project: $projectName" -ForegroundColor Cyan
Write-Host "   👉 Go to Repos > New repository" -ForegroundColor Cyan
Write-Host "   👉 Name: $repoName" -ForegroundColor Cyan
Write-Host "   👉 Type: Git" -ForegroundColor Cyan
Write-Host "   👉 Initialize: UNCHECKED (we'll push existing code)" -ForegroundColor Cyan
Write-Host "   👉 Click Create" -ForegroundColor Cyan
Write-Host ""

Write-Host "2️⃣  Push Your Code:" -ForegroundColor White
Write-Host "   👉 After creating the repository, run:" -ForegroundColor Cyan
Write-Host "       git push azure main" -ForegroundColor Yellow
Write-Host ""

Write-Host "3️⃣  Set up Pipeline:" -ForegroundColor White
Write-Host "   👉 Go to Pipelines > Create Pipeline" -ForegroundColor Cyan
Write-Host "   👉 Select Azure Repos Git" -ForegroundColor Cyan
Write-Host "   👉 Choose your repository: $repoName" -ForegroundColor Cyan
Write-Host "   👉 Select 'Existing Azure Pipelines YAML file'" -ForegroundColor Cyan
Write-Host "   👉 Path: /azure-pipelines.yml" -ForegroundColor Cyan
Write-Host ""

Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "🎯 ALTERNATIVE: Import from GitHub" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "If you prefer to import your existing GitHub repository:" -ForegroundColor White
Write-Host "   👉 In Azure DevOps Repos, click 'Import a repository'" -ForegroundColor Cyan
Write-Host "   👉 Clone URL: https://github.com/adii2327/Game.git" -ForegroundColor Cyan
Write-Host "   👉 Repository name: $repoName" -ForegroundColor Cyan
Write-Host "   👉 Click Import" -ForegroundColor Cyan
Write-Host ""

Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "📞 Need Help?" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "   If the repository name is not available, try:" -ForegroundColor White
Write-Host "   - $repoName-v2" -ForegroundColor Cyan
Write-Host "   - $repoName-2025" -ForegroundColor Cyan
Write-Host "   - TeamApp-CTS" -ForegroundColor Cyan
Write-Host "   - Any custom name you prefer" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Ready to deploy your enhanced CTS VibeApp!" -ForegroundColor Green
Write-Host "=============================================================================" -ForegroundColor Cyan
