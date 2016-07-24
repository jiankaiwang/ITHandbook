# ckanext-pages

<script type="text/javascript" src="../js/general.js"></script>

* ckanext-pages source 
  * 原 ckan 模組 : [https://github.com/ckan/ckanext-pages](https://github.com/ckan/ckanext-pages) 
  * 自製模組 (by forking) : [https://github.com/jiankaiwang/ckanext-pages](https://github.com/jiankaiwang/ckanext-pages)

### 下載並安裝
---

* 透過 github 直接安裝於 ckan 中

```bash
# 進入虛擬環境
. /usr/lib/ckan/default/bin/activate

# 透過 pip 進行安裝
pip install -e 'git+https://github.com/ckan/ckanext-pages.git#egg=ckanext-pages'

# 安裝完後會置於底下環境
/usr/lib/ckan/default/src/ckanext-pages/
  |- ckanext/pages/
    |- theme/
      |- templates_main/
        |- header.html	# 登入後的編輯窗格
        |- ckanext_pages/
          |- page.html  # page 的網站地圖(注意 plugin 中的 after_map 定義), 主呈現頁面
          |- blog.html  # blog 的網站地圖, 注意 plugin 中的 after_map 定義
          |- blog.list  # blog 
            |- snippets/pages_list.html # blog 與 pages 的列表
          |- base_form.html  # 修改 page 或 blog 的編輯表格
    |- plugin.py : 修改主選單
```

### 使用 pages plugin
---

```bash
# 於組態檔中使用此 plugin
vim /etc/ckan/default/production.ini

# 並於 ckan.plugins 中加入 pages
ckan.plugins = pages

# ckeanext-pages settings : 使用不同的 editor，預設為 markdown
#ckanext.pages.editor = ckeditor
```

### 修改欄位資訊
---

* 主要修改欄位資料位置如下

```bash
/usr/lib/ckan/default/src/ckanext-pages/
  |- ckanext/pages/
    |- actions.py # schema, __page_list, _page_update
    |- controller.py # org_edit, group_edit
    |- db.py # init_db x 2 (sql 指令, 有新增要加上 DROP TABLE ckanext_pages; 無則刪除此行)
    |- plugin.py (TextBoxView,, build_pages_nav_main x 2)  # 同時也是修改 page 與 blog 主選單
      |- theme/
        |- templates_main/
          |- ckanext_pages/
            |- base_form.html  # 修改欄位
```

* 修改 actions.py 內容如下

```python
...

{# customized : add english and chinese #}
schema = {
    'id': [p.toolkit.get_validator('ignore_empty'), unicode],
    'title': [p.toolkit.get_validator('not_empty'), unicode],
    'ename': [p.toolkit.get_validator('not_empty'), unicode],
    'cname': [p.toolkit.get_validator('not_empty'), unicode],
    'name': [p.toolkit.get_validator('not_empty'), unicode,
             p.toolkit.get_validator('name_validator'), page_name_validator],
    'content': [p.toolkit.get_validator('ignore_missing'), unicode],
    'econtent': [p.toolkit.get_validator('ignore_missing'), unicode],
    'page_type': [p.toolkit.get_validator('ignore_missing'), unicode],
  #  'lang': [p.toolkit.get_validator('not_empty'), unicode],
    'order': [p.toolkit.get_validator('ignore_missing'),
              unicode],
    'private': [p.toolkit.get_validator('ignore_missing'),
                p.toolkit.get_validator('boolean_validator')],
    'group_id': [p.toolkit.get_validator('ignore_missing'), unicode],
    'user_id': [p.toolkit.get_validator('ignore_missing'), unicode],
    'created': [p.toolkit.get_validator('ignore_missing'),
                p.toolkit.get_validator('isodate')],
    'publish_date': [not_empty_if_blog,
                     p.toolkit.get_validator('ignore_missing'),
                     p.toolkit.get_validator('isodate')],
}

...

def _pages_list(context, data_dict):
  ...
  # customized : 
  for pg in out:
      parser = HTMLFirstImage()
      parser.feed(pg.content)
      img = parser.first_image
      pg_row = {'title': pg.title,
                'ename': pg.ename,
                'cname': pg.cname,
                'content': pg.content,
                'econtent': pg.econtent,
                'name': pg.name,
                'publish_date': pg.publish_date.isoformat() if pg.publish_date else None,
                'group_id': pg.group_id,
                'page_type': pg.page_type,
               }
      if img:
          pg_row['image'] = img
      extras = pg.extras
      if extras:
          pg_row.update(json.loads(pg.extras))
      out_list.append(pg_row)
  return out_list

...

def _pages_update(context, data_dict):
  ...
  items = ['title', 'ename', 'cname', 'content', 'econtent', 'name', 'private',
             'order', 'page_type', 'publish_date']
  ...
```

* 修改 controller.py 內容如下

```python
def group_edit(self, id, page=None, data=None, errors=None, error_summary=None):
    ...
    
    if p.toolkit.request.method == 'POST' and not data:
        data = p.toolkit.request.POST
        # customized
        items = ['title', 'ename', 'cname', 'name', 'content', 'econtent', 'private']
        # update config from form
        for item in items:
            if item in data:
                _page[item] = data[item]
        _page['org_id'] = p.toolkit.c.group_dict['id']
        _page['page'] = page
        try:
            junk = p.toolkit.get_action('ckanext_pages_update')(
                data_dict=_page
            )
        except p.toolkit.ValidationError, e:
            errors = e.error_dict
            error_summary = e.error_summary
            return self.group_edit(id, '/' + page, data,
                             errors, error_summary)
        p.toolkit.redirect_to(p.toolkit.url_for('group_pages', id=id, page='/' + _page['name']))
        
        ...
        
def org_edit(self, id, page=None, data=None, errors=None, error_summary=None):
    
    ...

    if p.toolkit.request.method == 'POST' and not data:
        data = p.toolkit.request.POST
        # customized
        items = ['title', 'ename', 'cname', 'name', 'content', 'econtent', 'private']
        # update config from form
        for item in items:
            if item in data:
    ...
```

* 修改 db.py 內容如下
  1. 若有新增，則要加上 DROP TABLE ckanext_pages;
  2. 若無新增，則再將 DROP TABLE ckanext_pages; 移除

```python
def init_db(model):

  ...

  # We will just try to create the table.  If it already exists we get an
  # error but we can just skip it and carry on.
  
  # customized
  sql = '''
                CREATE TABLE ckanext_pages (
                    id text NOT NULL,
                    title text,
                    ename text,
                    cname text,
                    name text,
                    content text,
                    econtent text,
                    lang text,
                    "order" text,
                    private boolean,
                    group_id text,
                    user_id text NOT NULL,
                    created timestamp without time zone,
                    modified timestamp without time zone
                );
    '''
  
  ...
  
  pages_table = sa.Table('ckanext_pages', model.meta.metadata,
      sa.Column('id', types.UnicodeText, primary_key=True, default=make_uuid),
      sa.Column('title', types.UnicodeText, default=u''),
      sa.Column('ename', types.UnicodeText, default=u''),
      sa.Column('cname', types.UnicodeText, default=u''),
      sa.Column('name', types.UnicodeText, default=u''),
      sa.Column('content', types.UnicodeText, default=u''),
      sa.Column('econtent', types.UnicodeText, default=u''),
      sa.Column('lang', types.UnicodeText, default=u''),
      sa.Column('order', types.UnicodeText, default=u''),
      sa.Column('private',types.Boolean,default=True),
      sa.Column('group_id', types.UnicodeText, default=None),
      sa.Column('user_id', types.UnicodeText, default=u''),
      sa.Column('publish_date', types.DateTime),
      sa.Column('page_type', types.DateTime),
      sa.Column('created', types.DateTime, default=datetime.datetime.utcnow),
      sa.Column('modified', types.DateTime, default=datetime.datetime.utcnow),
      sa.Column('extras', types.UnicodeText, default=u'{}'),
      extend_existing=True
  )
  
```

* 修改 plugin.py 內容

```python
def build_pages_nav_main(*args):
  ...
  
  for page in pages_list:
      if page['page_type'] == 'blog':
          # customized
          link = h.link_to( h.getLangLabel(page['ename'], page['cname']),
                           h.url_for('/blog/' + str( page['name'] )))
      else:
          # customized
          link = h.link_to( h.getLangLabel(page['ename'], page['cname']),
                           h.url_for('/pages/' + str( page['name'] )))

      if page['name'] == page_name:
          li = h.literal('<li class="active">') + link + h.literal('</li>')
      else:
          li = h.literal('<li>') + link + h.literal('</li>')
      output = output + li
  
  ...
  
def TextBoxView(p.SingletonPlugin):
  ...
  
  def info(self):
      schema = {
          'content': [ignore_missing],
          'econtent': [ignore_missing],
      }

      # customized
      return {'name': 'wysiwyg',
              'ename': 'Free Text',
              'cname': 'Free Text',
              'title': 'Free Text',
              'icon': 'pencil',
              'iframed': False,
              'schema': schema,
              }
  
  ...
```

* 安裝此 plugin.py

```bash
# 透過 setup.py 安裝
cd /usr/lib/ckan/default/src/ckanext-pages/
python ./setup.py install

# 重啟 ckan
sudo restart ckan
```

* 設計新的編輯畫面

```bash
# 
/usr/lib/ckan/default/src/ckanext-pages/
  |- ckanext/pages/
    |- theme/
      |- templates_main/
        |- ckanext_pages/
          |- base_form.html  # 修改欄位
```

* 修改內容如下

```html

```


