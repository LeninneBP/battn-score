@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo  Instala o Node.js LTS primeiro:
  echo  https://nodejs.org
  echo  Marca "Add to PATH" na instalacao, depois volta a correr este ficheiro.
  echo.
  start https://nodejs.org
  pause
  exit /b 1
)

echo.
echo  A instalar dependencias do BATTN...
call npm install
if errorlevel 1 (
  echo  Falhou o npm install.
  pause
  exit /b 1
)

echo.
echo  Inicia sessao Expo no browser se pedir.
echo  No iPhone: Expo Go, mesma conta, mesma Wi-Fi.
echo  Se o QR nao abrir, neste terminal carrega a tecla T para Tunnel.
echo.
call npx expo start
pause
