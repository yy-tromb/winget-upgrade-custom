# winget-upgrade-custom  
winget upgrade customly and in parallel

## for run  
This is runned on Node.js  
or [binary here (build as Node.js Single executable applications)](https://github.com/yy-tromb/winget-upgrade-custom/releases)  
  
[※About Node.js Single executable applications](https://nodejs.org/api/single-executable-applications.html)  

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

## build
You can build as [Node.js Single executable applications](https://nodejs.org/api/single-executable-applications.html).  
If your machine is Windows machine, you can use [/build.bat](https://github.com/yy-tromb/winget-upgrade-custom/blob/main/build.bat), automatic build script.
