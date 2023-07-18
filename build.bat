node --experimental-sea-config sea-config.json
for /F "tokens=*" %%n IN ('where.exe node') DO @(copy "%%n" winget-upgrade-custom.exe)
signtool remove /s winget-upgrade-custom.exe
npx postject winget-upgrade-custom.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
