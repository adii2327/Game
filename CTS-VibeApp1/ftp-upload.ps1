# FTP Upload Instructions for Azure App Service

# Step 1: Get FTP Credentials from Azure Portal
# - Go to your App Service
# - Click "Deployment Center" 
# - Click "FTPS credentials" tab
# - Copy the FTP endpoint, username, and password

# Step 2: Use PowerShell to upload via FTP
$ftpServer = "ftps://your-app-name.scm.azurewebsites.net"
$username = "your-app-name\`$your-app-name"  # Note: includes app name twice
$password = "your-ftp-password"
$localFile = "cts-vibeapp-deployment.zip"
$remotePath = "/site/wwwroot/"

# PowerShell FTP upload function
function Upload-ToFTP {
    param($ftpServer, $username, $password, $localFile, $remotePath)
    
    $ftpRequest = [System.Net.FtpWebRequest]::Create("$ftpServer$remotePath$(Split-Path $localFile -Leaf)")
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)
    $ftpRequest.EnableSsl = $true
    
    $fileContent = [System.IO.File]::ReadAllBytes($localFile)
    $ftpRequest.ContentLength = $fileContent.Length
    
    $requestStream = $ftpRequest.GetRequestStream()
    $requestStream.Write($fileContent, 0, $fileContent.Length)
    $requestStream.Close()
    
    $response = $ftpRequest.GetResponse()
    Write-Host "Upload completed: $($response.StatusDescription)"
    $response.Close()
}

# Uncomment and modify these lines with your actual FTP credentials:
# Upload-ToFTP -ftpServer $ftpServer -username $username -password $password -localFile $localFile -remotePath $remotePath

Write-Host "Instructions:"
Write-Host "1. Get FTP credentials from Azure Portal"
Write-Host "2. Update the variables above with your credentials"
Write-Host "3. Run the Upload-ToFTP function"
