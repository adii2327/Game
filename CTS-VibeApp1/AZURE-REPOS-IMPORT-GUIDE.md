# Azure Repos Import Guide

## Option 1: Import via Azure DevOps Web Interface

1. **Navigate to Azure DevOps:**
   - Go to: https://dev.azure.com
   - Select your organization

2. **Create New Project:**
   - Click "New Project"
   - Name: "CTS-VibeApp-Enterprise"
   - Visibility: Private
   - Click "Create"

3. **Import Repository:**
   - Go to "Repos" → "Files"
   - Click "Import a repository"
   - Clone URL: https://github.com/adii2327/Game.git
   - Repository name: CTS-VibeApp
   - Click "Import"

## Option 2: Manual Git Commands

```powershell
# Add Azure Repos as a new remote
git remote add azure https://dev.azure.com/YOUR_ORG/CTS-VibeApp-Enterprise/_git/CTS-VibeApp

# Push to Azure Repos
git push azure main

# Set Azure as default remote (optional)
git remote set-url origin https://dev.azure.com/YOUR_ORG/CTS-VibeApp-Enterprise/_git/CTS-VibeApp
```

## Option 3: Create New Azure Repo and Push

```powershell
# Clone current repo to new directory
git clone https://github.com/adii2327/Game.git cts-vibeapp-azure
cd cts-vibeapp-azure

# Remove old remote and add Azure remote
git remote remove origin
git remote add origin https://dev.azure.com/YOUR_ORG/CTS-VibeApp-Enterprise/_git/CTS-VibeApp

# Push to Azure
git push -u origin main
```

## Important Notes:

1. **Authentication:** You'll need Personal Access Token (PAT) for Azure DevOps
2. **Repository URL Format:** https://dev.azure.com/[organization]/[project]/_git/[repository]
3. **Replace YOUR_ORG with your actual Azure DevOps organization name**

## Next Steps After Import:

1. Set up CI/CD pipeline
2. Configure Azure App Service deployment
3. Set up branch policies (optional)
4. Configure notifications
