sudo apt install nodejs
sudo apt install mongodb
sudo apt install npm
sudo service mongodb start
npm install express
npm install mongodb
npm install path
npm install jade
npm install assert
npm install body-parser
node server.js &
echo $'node server.js &\nfirefox http://localhost:3030'> start.sh
chmod +x start.sh
./start.sh

