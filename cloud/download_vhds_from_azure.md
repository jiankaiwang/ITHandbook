# Download VHDs from AZURE

<script type="text/javascript" src="../js/general.js"></script>

###

```bash
# login azure cloud service
Add-AzureAccount

# download from azure to local
$sourceVHD = "https://example.blob.core.windows.net/exmaple/example.vhd"
$destinationVHD = "D:\example\example.vhd"

# save from azure cloud to local file
Save-AzureVhd -Source $sourceVHD -LocalFilePath $destinationVHD -NumberOfThreads 5
```

