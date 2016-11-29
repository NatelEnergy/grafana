echo %cd%
dir
cd emails
echo %cd%

npm install
gem install premailer
grunt

cd ..
echo %cd%