#!/usr/bin/fish
cd ./django || exit
python3 -m venv .venv
source .venv/bin/activate.fish
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver &
cd ../pdfapp || exit
npm install --force
npm start &