# Write CKAN Extensions

<script type="text/javascript" src="../js/general.js"></script>

### Create a new extension
---

```bash
$ . /usr/lib/ckan/default/bin/activate
$ cd /usr/lib/ckan/default/src

# CKAN extension names have to begin with ckanext-
$ paster --plugin=ckan create -t ckanext ckanext-cdcframe
$ cd /usr/lib/ckan/default/src/ckanext-cdcframe
```

### Modify the page
---

* the same path corresponding to the template folder

### Add the page
---

* add the resource

### Add Functions
---

* add in helpers.py

* add in plugins.py

```python
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

# import self-defined helpers.py
from helpers import *

class CdcmainlibPlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)
    
    # necessary to import self-defined functions/methods
    plugins.implements(plugins.ITemplateHelpers)

    # IConfigurer
    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'cdcmainlib')

    # set the corresponding function name 
    def get_helpers(self):
        # define in the helpers.py
        return { 'getLangLabel' : getLangLabel, \
                 'getLen' : getLen, \
                 'strReplace' : strReplace, \
                 'checkChineseTag' : checkChineseTag, \
                 'checkLangTag' : checkLangTag \
               }
```