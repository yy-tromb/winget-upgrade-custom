# winget-upgrade-custom  
winget upgrade customly and in parallel

# for use  
This is runned on Node.js  
or [binary here](https://github.com/yy-tromb/winget-upgrade-custom/releases/tag/untagged-bfa9c874793dc21ad98c)

## Usage  
make `app_filters.json`,and this tool ignore that written in that file.  
for example  
```app_filters.json
[  
    {  
        "name": "Android Studio",  
        "ID": "Google.AndroidStudio"  
    },  
    {  
        "ID":"Mozilla.Firefox.DeveloperEdition"  
    }  
]  
```
