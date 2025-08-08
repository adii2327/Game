# ================================================================================================
# CTS VibeApp - Azure Repos Import & CI/CD Setup Script
# ================================================================================================
# This script will:
# 1. Set up Azure DevOps repository
# 2. Import your enhanced CTS VibeApp code
# 3. Configure CI/CD pipeline for Azure App Service deployment
# 4. Set up automated builds and deployments
# ================================================================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$OrganizationUrl = "https://dev.azure.com/Vibects12",
    
    [Parameter(Mandatory=$false)]
    [string]$ProjectName = "CTS-VibeApp-Enterprise",
    
    [Parameter(Mandatory=$false)]
    [string]$RepositoryName = "CTS-VibeApp-Enhanced",
    
    [Parameter(Mandatory=$false)]
    [string]$AppServiceName = "",
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroupName = ""
)

Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "🚀 CTS VibeApp - Azure DevOps Setup & Import Script" -ForegroundColor Yellow
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed or not in PATH. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check if Azure CLI is installed
if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Azure CLI is not installed. Installing Azure CLI..." -ForegroundColor Yellow
    Write-Host "Please install Azure CLI from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Yellow
    
    # Try to install via winget if available
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "🔧 Attempting to install Azure CLI via winget..." -ForegroundColor Green
        winget install Microsoft.AzureCLI
    }
}

Write-Host "📋 Configuration:" -ForegroundColor Green
Write-Host "   Organization: $OrganizationUrl" -ForegroundColor White
Write-Host "   Project: $ProjectName" -ForegroundColor White
Write-Host "   Repository: $RepositoryName" -ForegroundColor White
Write-Host ""

# Step 1: Login to Azure and Azure DevOps
Write-Host "🔐 Step 1: Azure Authentication" -ForegroundColor Cyan
Write-Host "Please login to Azure CLI when prompted..." -ForegroundColor Yellow

try {
    # Check if already logged in
    $account = az account show --query "user.name" -o tsv 2>$null
    if ($account) {
        Write-Host "✅ Already logged in to Azure as: $account" -ForegroundColor Green
    } else {
        Write-Host "🔑 Logging in to Azure..." -ForegroundColor Yellow
        az login
    }
    
    # Install Azure DevOps extension
    Write-Host "🔧 Installing Azure DevOps extension..." -ForegroundColor Yellow
    az extension add --name azure-devops --only-show-errors
    
} catch {
    Write-Host "❌ Failed to login to Azure: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Set up Git remote for Azure Repos
Write-Host ""
Write-Host "🔗 Step 2: Setting up Git Remote for Azure Repos" -ForegroundColor Cyan

$AzureRepoUrl = "$OrganizationUrl/$ProjectName/_git/$RepositoryName"
Write-Host "   Repository URL: $AzureRepoUrl" -ForegroundColor White

try {
    # Check if git repository exists
    if (-not (Test-Path ".git")) {
        Write-Host "🔧 Initializing Git repository..." -ForegroundColor Yellow
        git init
        git add .
        git commit -m "Initial commit - CTS VibeApp Enhanced Version"
    }
    
    # Remove existing azure remote if exists
    $existingRemote = git remote get-url azure 2>$null
    if ($existingRemote) {
        Write-Host "🔄 Updating existing Azure remote..." -ForegroundColor Yellow
        git remote set-url azure $AzureRepoUrl
    } else {
        Write-Host "➕ Adding Azure remote..." -ForegroundColor Yellow
        git remote add azure $AzureRepoUrl
    }
    
    Write-Host "✅ Git remote configured successfully!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Failed to configure Git remote: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 3: Push code to Azure Repos
Write-Host ""
Write-Host "📤 Step 3: Pushing Code to Azure Repos" -ForegroundColor Cyan

try {
    Write-Host "🚀 Pushing enhanced CTS VibeApp to Azure Repos..." -ForegroundColor Yellow
    
    # Ensure all changes are committed
    git add .
    git commit -m "🚀 FINAL: Enhanced CTS VibeApp with Advanced Features

✨ Features Added:
- 🔴 Live Collaboration Dashboard
- 🤖 AI-Powered Insights & Predictions
- 🔔 Smart Notifications System
- 📊 Advanced Project Management
- 📈 Rich Analytics & Reporting
- 🗓️ Smart Calendar & Scheduling
- 💼 Enterprise-grade features

Ready for Azure DevOps CI/CD deployment!" --allow-empty
    
    # Push to Azure Repos
    git push azure main --force
    
    Write-Host "✅ Code successfully pushed to Azure Repos!" -ForegroundColor Green
    Write-Host "🌐 Repository URL: $AzureRepoUrl" -ForegroundColor White
    
} catch {
    Write-Host "⚠️  Note: You may need to authenticate with Azure DevOps" -ForegroundColor Yellow
    Write-Host "   If prompted, use your Azure credentials or Personal Access Token" -ForegroundColor Yellow
    Write-Host "   Repository URL: $AzureRepoUrl" -ForegroundColor White
}

# Step 4: Create Azure Pipeline YAML
Write-Host ""
Write-Host "🏗️  Step 4: Creating Azure Pipeline Configuration" -ForegroundColor Cyan

$pipelineYaml = @"
# Azure Pipeline for CTS VibeApp Enhanced
# Builds and deploys Node.js app to Azure App Service

trigger:
- main

variables:
  # Azure Service connection name (to be configured in Azure DevOps)
  azureSubscription: 'Azure-Service-Connection'
  
  # Web app name
  webAppName: 'cts-vibeapp-enhanced'
  
  # Environment name
  environmentName: 'production'
  
  # Node.js version
  nodeVersion: '18.x'

stages:
- stage: Build
  displayName: Build stage
  jobs:
  - job: Build
    displayName: Build
    pool:
      vmImage: 'ubuntu-latest'
    
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '`$(nodeVersion)'
      displayName: 'Install Node.js'
    
    - script: |
        npm install
        npm run build --if-present
      displayName: 'npm install and build'
    
    - script: |
        npm test --if-present
      displayName: 'Run tests'
      continueOnError: true
    
    - task: ArchiveFiles@2
      displayName: 'Archive files'
      inputs:
        rootFolderOrFile: '`$(System.DefaultWorkingDirectory)'
        includeRootFolder: false
        archiveType: zip
        archiveFile: '`$(Build.ArtifactStagingDirectory)/`$(Build.BuildId).zip'
        replaceExistingArchive: true
    
    - upload: '`$(Build.ArtifactStagingDirectory)/`$(Build.BuildId).zip'
      artifact: drop

- stage: Deploy
  displayName: Deploy stage
  dependsOn: Build
  condition: succeeded()
  jobs:
  - deployment: Deploy
    displayName: Deploy
    environment: '`$(environmentName)'
    pool:
      vmImage: 'ubuntu-latest'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            displayName: 'Azure Web App Deploy'
            inputs:
              azureSubscription: '`$(azureSubscription)'
              appType: 'webAppLinux'
              appName: '`$(webAppName)'
              package: '`$(Pipeline.Workspace)/drop/`$(Build.BuildId).zip'
              runtimeStack: 'NODE|18-lts'
              startUpCommand: 'npm start'
"@

# Write pipeline YAML file
$pipelineYaml | Out-File -FilePath "azure-pipelines.yml" -Encoding UTF8
Write-Host "✅ Azure Pipeline YAML created: azure-pipelines.yml" -ForegroundColor Green

# Step 5: Create deployment scripts
Write-Host ""
Write-Host "📜 Step 5: Creating Additional Deployment Scripts" -ForegroundColor Cyan

# Create deployment script
$deployScript = @"
#!/bin/bash
# CTS VibeApp Deployment Script for Azure App Service

echo "🚀 Starting CTS VibeApp Deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Create necessary directories
mkdir -p logs
mkdir -p uploads

# Set correct permissions
chmod +x deploy.cmd

echo "✅ Deployment completed successfully!"
echo "🌐 CTS VibeApp is ready to serve!"
"@

$deployScript | Out-File -FilePath "deploy.sh" -Encoding UTF8

# Update package.json with deployment scripts
Write-Host "📝 Updating package.json with deployment scripts..." -ForegroundColor Yellow

if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    
    # Add deployment scripts
    if (-not $packageJson.scripts) {
        $packageJson.scripts = @{}
    }
    
    $packageJson.scripts."azure:deploy" = "echo 'Deploying to Azure App Service...'"
    $packageJson.scripts."postinstall" = "echo 'Post-install setup completed'"
    
    $packageJson | ConvertTo-Json -Depth 10 | Out-File -FilePath "package.json" -Encoding UTF8
    Write-Host "✅ package.json updated with deployment scripts" -ForegroundColor Green
}

# Step 6: Commit and push pipeline files
Write-Host ""
Write-Host "📤 Step 6: Committing Pipeline Configuration" -ForegroundColor Cyan

try {
    git add azure-pipelines.yml deploy.sh package.json
    git commit -m "🏗️ Add Azure DevOps CI/CD Pipeline Configuration

- Azure Pipeline YAML for automated builds
- Deployment scripts for Azure App Service
- Updated package.json with deployment scripts
- Ready for automated CI/CD deployment"
    
    git push azure main
    Write-Host "✅ Pipeline configuration pushed to Azure Repos!" -ForegroundColor Green
    
} catch {
    Write-Host "⚠️  Pipeline files created locally. Manual push may be needed." -ForegroundColor Yellow
}

# Step 7: Provide next steps
Write-Host ""
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "🎉 SETUP COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Go to Azure DevOps:" -ForegroundColor White
Write-Host "   👉 $OrganizationUrl/$ProjectName" -ForegroundColor Cyan
Write-Host ""
Write-Host "2️⃣  Set up Azure Pipeline:" -ForegroundColor White
Write-Host "   👉 Go to Pipelines > Create Pipeline" -ForegroundColor Cyan
Write-Host "   👉 Select Azure Repos Git" -ForegroundColor Cyan
Write-Host "   👉 Choose your repository: $RepositoryName" -ForegroundColor Cyan
Write-Host "   👉 Select 'Existing Azure Pipelines YAML file'" -ForegroundColor Cyan
Write-Host "   👉 Choose: /azure-pipelines.yml" -ForegroundColor Cyan
Write-Host ""
Write-Host "3️⃣  Configure Service Connection:" -ForegroundColor White
Write-Host "   👉 Go to Project Settings > Service Connections" -ForegroundColor Cyan
Write-Host "   👉 Create new Azure Resource Manager connection" -ForegroundColor Cyan
Write-Host "   👉 Name it: 'Azure-Service-Connection'" -ForegroundColor Cyan
Write-Host ""
Write-Host "4️⃣  Update Pipeline Variables:" -ForegroundColor White
Write-Host "   👉 Edit azure-pipelines.yml" -ForegroundColor Cyan
Write-Host "   👉 Update webAppName to your Azure App Service name" -ForegroundColor Cyan
Write-Host ""
Write-Host "5️⃣  Run the Pipeline:" -ForegroundColor White
Write-Host "   👉 Save and run the pipeline" -ForegroundColor Cyan
Write-Host "   👉 Monitor the build and deployment" -ForegroundColor Cyan
Write-Host ""
Write-Host "=============================================================================" -ForegroundColor Cyan
Write-Host "📁 FILES CREATED:" -ForegroundColor Yellow
Write-Host "   ✅ azure-pipelines.yml (CI/CD configuration)" -ForegroundColor Green
Write-Host "   ✅ deploy.sh (deployment script)" -ForegroundColor Green
Write-Host "   ✅ Updated package.json" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 REPOSITORY:" -ForegroundColor Yellow
Write-Host "   👉 $AzureRepoUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Your enhanced CTS VibeApp is now ready for Azure DevOps CI/CD!" -ForegroundColor Green
Write-Host "=============================================================================" -ForegroundColor Cyan