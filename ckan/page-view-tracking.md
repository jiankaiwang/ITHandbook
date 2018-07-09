# Page-View-Tracking



### Configuration
---

* Set configuration file (development.ini or production.ini)

```ini
[app:main]
ckan.tracking_enabled = true
```

* Setup a cron job to update the tracking summary data.

```bash
# edit the crontab 
$ sudo vim /etc/crontab

# set the job executed hourly
1 * * * * root /usr/lib/ckan/default/bin/paster --plugin=ckan tracking update -c /etc/ckan/default/production.ini && /usr/lib/ckan/default/bin/paster --plugin=ckan search-index rebuild -r -c /etc/ckan/default/production.ini
```


