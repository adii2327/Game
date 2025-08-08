# Azure DevOps Setup Instructions

## 1. Find Your Azure DevOps Organization

1. Go to: https://dev.azure.com
2. Sign in with your Azure account
3. Your organization URL will be: https://dev.azure.com/YOUR_ORGANIZATION_NAME

## 2. Create Personal Access Token (PAT)

1. Click on your profile picture (top right)
2. Select "Personal Access Tokens"
3. Click "New Token"
4. Settings:
   - Name: "CTS-VibeApp-Git-Access"
   - Expiration: 90 days (or custom)
   - Scopes: "Code (read & write)"
5. Click "Create"
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again)

## 3. Repository URL Format

Your Azure Repos URL will be:
```
https://dev.azure.com/YOUR_ORG_NAME/CTS-VibeApp-Enterprise/_git/CTS-VibeApp
```

## 4. Authentication Options

### Option A: Using Personal Access Token
Username: (leave blank or use your email)
Password: [Your PAT Token]

### Option B: Using Git Credential Manager (Recommended)
- Git will prompt for authentication
- Use your Azure AD credentials

## 5. Common Organization Names Format
- Usually: yourname-azure or yourcompany
- Could be: your email prefix before @
- Example: if email is john.doe@company.com, org might be "johndoe" or "company"
