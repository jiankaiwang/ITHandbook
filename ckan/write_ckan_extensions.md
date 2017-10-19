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

```python
from pylons import config
import ckan.plugins as plugins

# use the env function
import ckan.lib.helpers as h

# customized function
# desc : return a string based on current language selected, english or chinese
# para : a english string and a chinese string
def getLangLabel(en,tw):
    if h.lang() == "en":
        return en
    elif h.lang() == "zh_TW":
        return tw

...
```

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

### Add CSS/JS Resource by fanstatic
----

* create a css/js under `fanstatic` folder

* add a resource under `plugins.IConfigurer` on `plugin.py`

```python
import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

class CdcframePlugin(plugins.SingletonPlugin):
    plugins.implements(plugins.IConfigurer)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        
        # notice the resource name cdcframe
        toolkit.add_resource('fanstatic', 'cdcframe')
```

* edit or create the extension's `templates/base.html` and use `resource` to import the css

```html
{% ckan_extends %}

{% block styles %}
  {{ super() }}

  {# Import example_theme.css using Fanstatic.
     'example_theme/' is the name that the example_theme/fanstatic directory
     was registered with when the toolkit.add_resource() function was called.
     'example_theme.css' is the path to the CSS file, relative to the root of
     the fanstatic directory. #}
  {% resource 'cdcframe/example_theme.css' %}
{% endblock %}
```







