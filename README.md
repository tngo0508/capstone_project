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

---

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

- keep django run forever on server (just for testing)

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

---

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

> _`jupyter-nbconvert` not found_

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
10 3,15 * * * cd ~/capstone_project/backend/stocks/webscraper && /usr/local/bin/jupyter nbconvert --to script build_ML_model.ipynb > ~/jupyter_nb_convert.log 2>&1
15 3,15 * * * cd ~/capstone_project/backend/stocks/webscraper && python3 build_ML_model.py > ~/run_build_ML_model.log 2>&1
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

### Deployment

Please refer to this [this guide](https://rahmonov.me/posts/run-a-django-app-with-nginx-gunicorn-and-supervisor/). We are using **_supervisor_** and **_gunicorn_** to deploy the backend.

- install supervisor and gunicorn

```
sudo apt-get install supervisor
sudo python3 -m pip install gunicorn
```

- Create config file for supervisor

```
sudo vim /etc/supervisor/conf.d/capstone_project.conf
```

Content of config file

> [program:capstone]
> command=sudo gunicorn backend.wsgi --daemon
>
> directory=/home/tngo0508_gmail_com/capstone_project/backend
>
> user=tngo0508_gmail_com
>
> autostart=true
>
> autorestart=true
>
> stderr_logfile=/var/log/capstone_project.err.log
>
> stdout_logfile=/var/log/capstone_project.out.lo

Save, then execute the following commands to make the changes into effect

```
sudo supervisorctl reread
sudo supervisorctl update
```

Check to see if everything is working

```
ps ax | grep gunicorn
sudo supervisorctl status myproject
```

# CREDIT AND REFERENCE LINKS

Some of the code are inspired from one of the following linkss

1. https://www.youtube.com/watch?v=PKwu15ldZ7k&ab_channel=WebDevSimplified
2. https://temp-mail.org/en/
3. https://www.valentinog.com/blog/webpack-django/
4. https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
5. https://jsonplaceholder.typicode.com/
6. https://github.com/satssehgal/MLAPLI/
7. https://www.deploymachinelearning.com/
8. https://mmonit.com/monit/
9. http://supervisord.org/
10. https://stocknewsapi.com/
11. https://mdbootstrap.com/docs/react/getting-started/quick-start/
12. https://codesandbox.io/s/peaceful-wood-b4uen?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark
13. https://medium.com/get-it-working/get-googles-firestore-working-with-react-c78f198d2364
14. https://blog.logrocket.com/user-authentication-firebase-react-apps/
15. https://rpj.bembi.dev/#mask
16. https://github.com/VincentGarreau/particles.js/
17. https://github.com/bradtraversy/design-resources-for-developers#product--image-mockups
18. https://shotsnapp.com/
19. https://medium.com/@zackliutju/building-react-and-django-web-application-and-deploy-it-on-google-cloud-545f06eb5521
20. https://www.techiediaries.com/create-react-app-django/
21. https://cloud.google.com/solutions/chrome-desktop-remote-on-compute-engine
22. https://bezkoder.com/react-firestore-crud/
23. https://www.react-spring.io/
24. https://www.tiny.cloud/
25. https://www.youtube.com/watch?v=NgWGllOjkbs&ab_channel=RemyFamily
26. https://picfont.com/
27. https://lottiefiles.com/
28. https://blog.logrocket.com/a-practical-guide-to-integrating-google-maps-in-react/
29. https://codepen.io/davidelvar/pen/dYMgrR
30. https://www.emailjs.com/
31. https://crontab.guru/
32. https://medium.com/@thabo_65610/three-ways-to-automate-python-via-jupyter-notebook-d14aaa78de9
33. https://realpython.com/python-logging/
34. https://www.codegrepper.com/code-examples/python/This+version+of+ChromeDriver+only+supports+Chrome+version+80
35. https://tutorialedge.net/python/python-logging-best-practices/
36. https://rahmonov.me/posts/run-a-django-app-with-nginx-gunicorn-and-supervisor/
37. https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/gunicorn/

```

```
