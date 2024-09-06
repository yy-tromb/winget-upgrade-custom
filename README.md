# winget-upgrade-custom  
winget upgrade customly and in parallel

## for use  

This script is for Node.js  
You can run this script on Node.js  
or [binary here](https://github.com/yy-tromb/winget-upgrade-custom/releases)

## Usage  
make `app_filter.json`,and this tool ignore the app that written in that file.  
or execute like this `node winget-upgrade-custom.js "path_to_app_filter"`  

### for example  

```app_filter.json
[  
    {  
        "name": "Android Studio",  
        "ID": "Google.AndroidStudio"  
    },  
    {  
        "ID":"Mozilla.Firefox.DeveloperEdition"
        "source":"winget"  
    }  
]  
```
