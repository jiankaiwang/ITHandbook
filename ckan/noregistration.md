# ckanext-noregistration

<script type="text/javascript" src="../js/general.js"></script>

### Install
---

* The module would deny the user register on page /user/register

```bash
# the sandbox mode
. /usr/lib/ckan/default/bin/activate

# clone the package
pip install -e git+https://github.com/ogdch/ckanext-noregistration.git#egg=ckanext-noregistration

# move to the directory
cd /usr/lib/ckan/default/src/ckanext-noregistration/

# install the module
python ./setup.py install

# edit the configuration
vim /etc/ckan/default/production.ini

# add the module
ckan.plugins = noregistration

# restart the service
sudo restart ckan
sudo status ckan
```