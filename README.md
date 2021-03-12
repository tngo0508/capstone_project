# capstone_project

## Installation Instruction

### Frontend

- create a file name _.env.local_ under **frontend** directory

```
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

### Backend

- set up google compute engine
- clone project on google virtual machine
- execute the followings commands

```
sudo apt-get update
sudo apt-get install python3-pip
```

- use vim and edit requirements.txt under **backend** directory
  - in requirements.txt, delete pywin32
- install all python dependencies

```
sudo pip3 install -r requirements.txt
```

- make sure to have following in django settings

```
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = False
ALLOWED_HOSTS = ['*']
```

- go to webscraper directory and give user permission to execute binary file

```
cd /home/user_name/capstone_project/backend/stocks/webscraper/linux
chmod +x chomedriver
```

- install chrome binary

```
wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb
sudo dpkg --install chrome-remote-desktop_current_amd64.deb
sudo apt install --assume-yes --fix-broken

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

- keep django run forever on server

```
nohup sudo python3 manage.py runserver 0.0.0.0:80
```

- set up SSL by following [this guide](https://www.digitalocean.com/community/questions/how-can-i-add-ssl-certificate-to-my-django-website). The followings can be helpful while following the guide.
  - On google server, move **brandvalueanalysis.net.conf** (under backend directory) to **/etc/apache2/sites-available/brandvalueanalysis.net.conf**
  ```
  # /etc/apache2/sites-available/brandvalueanalysis.net.conf
  # set up virtual host, reverse proxy, and ssl on Apache for your domain
  # your domain must be purchased from somewhere (e.g. google domain, namecheap, etc.)
  <VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName brandvalueanalysis.net
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
  ```
  sudo systemctl status certbot.timer
  sudo certbot renew --dry-run
  ```
