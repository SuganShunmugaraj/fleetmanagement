@echo off
for /f "Tokens=*" %%f in ('dir /l/b/a-d') do (rename "%%f" "%%f")
for /f "delims=" %%a in ('dir /a:-d /o:n /b') do call :next "%%a"
pause
GOTO:EOF
:next
set "newname=%~nx1"

set "newname=%newname:32x32=_s%"
set "newname=%newname:32X32=_s%"
set "newname=%newname:64x64=_m%"
set "newname=%newname:64X64=_m%"
set "newname=%newname:128x128=_l%"
set "newname=%newname:128X128=_l%"
set "newname=%newname: =%"
set "newname=%newname:-_=_%"
set "newname=%newname:__=_%"


ren %1 "%newname%"