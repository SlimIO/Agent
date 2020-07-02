$params = @{
    Name           = "SlimIO Agent"
    BinaryPathName = '"F:\NodeJS\node.exe" "F:\Code\SlimIO\Agent\index.js"'
    DisplayName    = "SlimIO Agent"
    StartupType    = "Automatic"
    Description    = "The SlimIO monitoring Agent"
}
New-Service @params
