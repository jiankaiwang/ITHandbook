# Write CKAN Extensions

<script type="text/javascript" src="../js/general.js"></script>

### Create a new extension

```bash
$ . /usr/lib/ckan/default/bin/activate
$ cd /usr/lib/ckan/default/src

# CKAN extension names have to begin with ckanext-
$ paster --plugin=ckan create -t ckanext ckanext-cdcframe
$ cd /usr/lib/ckan/default/src/ckanext-cdcframe
```