# capstone_project

## Frontend

- create a file name _.env.local_ under **frontend** directory

```env
REACT_APP_FIREBASE_API_KEY={your firebase api key}
REACT_APP_FIREBASE_AUTH_DOMAIN={can be found on firebase}
REACT_APP_FIREBASE_PROJECT_ID={can be found on firebase}
REACT_APP_FIREBASE_STORAGE_BUCKET={can be found on firebase}
REACT_APP_FIREBASE_MESSAGING_SENDER_ID={firebase info}
REACT_APP_FIREBASE_APP_ID={firebase info}
REACT_APP_MAILCHIMP_URL={mailchimp url}
REACT_APP_EMAIL_JS_SERVICE_ID={emailjs info}
REACT_APP_EMAIL_JS_TEMPLATE_ID={emailjs info}
REACT_APP_EMAIL_JS_USER_ID={emailjs info}
REACT_APP_TINYMCE_API_KEY={editor api key}
REACT_APP_GOOGLE_MAP_API_KEY={google map api key}
```

___

## Backend

- set up google compute engine
- clone project on google virtual machine
- execute the followings commands

```bash
sudo apt-get update
sudo apt-get install python3-pip
```

- use vim and edit requirements.txt under **backend** directory
  - in requirements.txt, delete pywin32
- install all python dependencies

```bash
sudo pip3 install -r requirements.txt
```

- make sure to have following in django settings

```django.settings
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = False
ALLOWED_HOSTS = ['*']
```

- go to webscraper directory and give user permission to execute binary file

```bash
cd /home/user_name/capstone_project/backend/stocks/webscraper/linux
chmod +x chomedriver
```

- install chrome binary

```bash
wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb
sudo dpkg --install chrome-remote-desktop_current_amd64.deb
sudo apt install --assume-yes --fix-broken

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

- keep django run forever on server

```bash
nohup sudo python3 manage.py runserver 0.0.0.0:8000
```

Then, close the ssh-agent

- Set up SSL by following [this guide](https://www.digitalocean.com/community/questions/how-can-i-add-ssl-certificate-to-my-django-website). The information below can be helpful while following the guide.
  - On google server, move **brandvalueanalysis.net.conf** (under backend directory) to **/etc/apache2/sites-available/brandvalueanalysis.net.conf**

  ```config
  # /etc/apache2/sites-available/brandvalueanalysis.net.conf
  # set up virtual host, reverse proxy, and ssl on Apache for your domain
  # your domain must be purchased from somewhere (e.g. google domain, namecheap, etc.)
  <VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName brandvalueanalysis.net # your domain
    ServerAlias www.brandvalueanalysis.net
    DocumentRoot /var/www/brandvalueanalysis.net
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    ProxyPreserveHost On
    ProxyPass / http://localhost:8000/
  RewriteEngine on
  RewriteCond %{SERVER_NAME} =brandvalueanalysis.net [OR]
  RewriteCond %{SERVER_NAME} =www.brandvalueanalysis.net
  RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
  </VirtualHost>
  ```

  - the certbot is going to auto renew the SSL certificate. But if you want to manual check or renew SSL, do the following

  ```bash
  sudo systemctl status certbot.timer
  sudo certbot renew --dry-run
  ```

___

## Useful commands

### Run automation of the webscraper

```bash
cd path/to/capstone/backend
python -m stocks.webscraper.auto_scrape
```

### Convert Jupyter Notebook to python script

```bash
cd path/to/capstone/backend/stocks/webscraper/
jupyter nbconvert --to script build_ML_model.ipynb
```

**Note** : if you get the error:

> *`jupyter-nbconvert` not found*

install the following dependency

```bash
sudo apt-get install jupyter-nbconvert
```

### Build Machine Learning Model

```bash
python build_ML_model.py
```

### Keep the latest 10 files delete the rest

```bash
cd path/to/dataset/
ls -1tr | head -n -10 | xargs -d '\n' rm -f --
```

### Set up python3 environment

Create virtual environment

```bash
python3 -m venv /path/to/new/virtual/environment
```

Run following to activate the virtual environment

```bash
source /path/to/new/virtual/environment/bin
```

### Set up task scheduler using Cron

Execute the following command

```bash
crontab -e
```

```Cron
0 */3 * * * cd /home/thomas/Desktop/capstone_project/backend && /home/thomas/Desktop/capstone_project/capstone/bin/python -m stocks.webscraper.auto_scrape

10 * * * * cd /home/thomas/Desktop/capstone_project/backend/stocks/webscraper && /home/thomas/Desktop/capstone_project/capstone/bin/jupyter nbconvert --to script build_ML_model.ipynb > ~/Desktop/test/build_ML_model.log 2>&1

15 * * * * cd /home/thomas/Desktop/capstone_project/backend/stocks/webscraper && /home/thomas/Desktop/capstone_project/capstone/bin/python build_ML_model.py > ~/Desktop/test/run_build_ML_model.log 2>&1

0 */12 * * * cd /home/thomas/Desktop/capstone_project/backend/stocks/webscraper/dataset && ls -1tr | head -n -10 | xargs -t -d '\n' rm -f -- > ~/Desktop/test/deleted_files.log 2>&1
```

### Current set up on Google Compute Engine (server)

```Cron
0 */12 * * * cd ~/capstone_project/backend && sudo python3 -m stocks.webscraper.auto_scrape
10 * * * * cd ~/capstone_project/backend/stocks/webscraper && /usr/local/bin/jupyter nbconvert --to script build_ML_model.ipynb > ~/jupyter_nb_convert.log 2>&1
15 * * * * cd ~/capstone_project/backend/stocks/webscraper && python3 build_ML_model.py > ~/run_build_ML_model.log 2>&1
0 */12 * * * cd ~/capstone_project/backend/stocks/webscraper/dataset && ls -1tr | head -n -10 | xargs -t -d '\n' rm -f -- > ~/deleted_files.log 2>&1
```

List cron jobs

```bash
crontab -l
```

Remove task scheduler

```bash
crontab -r
```

Check Cron log file

```bash
grep CRON /var/log/syslog
```
