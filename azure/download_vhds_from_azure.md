# Download VHDs from AZURE


## in Powershell

* login in azure service

```bash
# login azure cloud service with account and password
Add-AzureAccount

# login without typing account and password
# step.1 download the publishsettings file from azure to D:\example
Get-AzurePublishSettingsFile

# step.2 import this file
Import-AzurePublishSettingsFile –PublishSettingsFile "D:\example\****\**-credentials.publishsettings" 
```

* Save-AzureVhd cmdlet [[official document](https://msdn.microsoft.com/zh-tw/library/azure/dn495297.aspx)] : 

```bash
# prototype
Save-AzureVhd 
    [-Source] <Uri> 
    [-LocalFilePath] <FileInfo> 
    [[-NumberOfThreads] <Int32> ] 
    [[-StorageKey] <String> ] 
    [[-OverWrite]] 
    [ <CommonParameters>]
```

```
# example 
# -OverWrite : overwrite file if it exists
$sourceVHD = "https://example.blob.core.windows.net/exmaple/example.vhd"
$destinationVHD = "D:\example\example.vhd"
Save-AzureVhd -Source $sourceVHD -LocalFilePath $destinationVHD -NumberOfThreads 5 -OverWrite
```

