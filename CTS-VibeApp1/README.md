# CTS VibeApp - Azure Web App

This is a Node.js Express web application configured for deployment to Azure App Service.

## App Details
- **Azure Web App Name**: `cts-vibeapp-2025`
- **Expected URL**: `https://cts-vibeapp-2025.azurewebsites.net`
- **Framework**: Node.js with Express
- **Template Engine**: EJS

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000`

## Azure Deployment

### Prerequisites
1. Create an Azure App Service with the name `cts-vibeapp-2025`
2. Ensure you have a GitHub repository for this project

### Automatic Deployment (GitHub Actions)

1. **Create Azure Web App**:
   - Go to Azure Portal
   - Create a new App Service
   - Name: `cts-vibeapp-2025`
   - Runtime stack: Node.js 18 LTS
   - Operating System: Linux (recommended) or Windows

2. **Configure GitHub Actions**:
   - In Azure Portal, go to your App Service
   - Navigate to "Deployment Center"
   - Choose "GitHub Actions"
   - Authorize GitHub and select your repository
   - This will automatically configure the publish profile secret

3. **Manual Secret Setup** (if needed):
   - Download the publish profile from Azure Portal
   - In GitHub repository, go to Settings > Secrets and variables > Actions
   - Create a new secret named `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Paste the publish profile content as the value

4. **Deploy**:
   - Push code to the `main` or `master` branch
   - GitHub Actions will automatically build and deploy
   - Check the Actions tab for deployment status

### Manual Deployment

You can also deploy using Azure CLI:

```bash
# Login to Azure
az login

# Deploy using zip
az webapp deployment source config-zip --resource-group <resource-group-name> --name cts-vibeapp-2025 --src <path-to-zip-file>
```

## Environment Variables

Set these in Azure App Service Configuration:
- `NODE_ENV`: production
- `PORT`: (automatically set by Azure)

## Files Overview

- `app.js` - Main Express server file
- `package.json` - Node.js dependencies and scripts
- `web.config` - IIS configuration for Azure Windows App Service
- `.deployment` - Azure deployment configuration
- `deploy.cmd` - Azure deployment script
- `.github/workflows/azure-webapps-node.yml` - GitHub Actions workflow

## URL Structure

After deployment, your app will be available at:
- Main site: `https://cts-vibeapp-2025.azurewebsites.net`
- About page: `https://cts-vibeapp-2025.azurewebsites.net/about`

## Multiple App Deployment

This app is configured with a unique name (`cts-vibeapp-2025`) to avoid conflicts with other deployments. Each app deployment should use a different `AZURE_WEBAPP_NAME` in the GitHub Actions workflow to maintain separate instances.

## Troubleshooting

1. **Build Failures**: Check the GitHub Actions logs
2. **Runtime Errors**: Check Azure App Service logs in the Azure Portal
3. **Connection Issues**: Verify the publish profile secret is correctly configured

## Support

For issues with Azure deployment, check:
- Azure App Service logs
- GitHub Actions workflow logs
- Azure Portal diagnostics
