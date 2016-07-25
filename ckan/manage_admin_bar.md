# 調整管理狀態列

<script type="text/javascript" src="../js/general.js"></script>

### 將上方狀態列改成「English|中文(台灣)|登入|註冊」
---

* 將上方的 「登入|註冊」 bar 改成含有「English|中文(台灣)|登入|註冊」

* 修改路徑

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates
  |- header.html
```

* 並加入 snippets/customized_language_selector.html 即可

```bash
...
{% block header_account %}
  <header class="account-masthead">
    <div class="container">
      {% block header_account_container_content %}
        {% if c.userobj %}
          <div class="account avatar authed" data-module="me" data-me="{{ c.userobj.id }}">
            <ul class="unstyled">
              {% block header_account_logged %}
              {% if c.userobj.sysadmin %}
                <li>
                  <a href="{{ h.url_for(controller='admin', action='index') }}" title="{{ _('Sysadmin settings') }}">
                    <i class="icon-legal" aria-hidden="true"></i>
                    <span class="text">{{ _('Admin') }}</span>
                  </a>
                </li>
              {% endif %}
              {# customized #}
              {% snippet "snippets/customized_language_selector.html" %}
              <li>
                <a href="{{ h.url_for(controller='user', action='read', id=c.userobj.name) }}" class="image" title="{{ _('View profile') }}">
                  {{ h.gravatar((c.userobj.email_hash if c and c.userobj else ''), size=22) }}
                  <span class="username">{{ c.userobj.display_name }}</span>
                </a>
              </li>
              {% set new_activities = h.new_activities() %}
              <li class="notifications {% if new_activities > 0 %}notifications-important{% endif %}">
                {% set notifications_tooltip = ngettext('Dashboard (%(num)d new item)', 'Dashboard (%(num)d new items)', new_activities) %}
                <a href="{{ h.url_for(controller='user', action='dashboard') }}" title="{{ notifications_tooltip }}">
                  <i class="icon-dashboard" aria-hidden="true"></i>
                  <span class="text">{{ _('Dashboard') }}</span>
                  <span class="badge">{{ new_activities }}</span>
                </a>
              </li>
              {% block header_account_settings_link %}
                <li>
                  <a href="{{ h.url_for(controller='user', action='edit', id=c.userobj.name) }}" title="{{ _('Edit settings') }}">
                    <i class="icon-cog" aria-hidden="true"></i>
                    <span class="text">{{ _('Settings') }}</span>
                  </a>
                </li>
              {% endblock %}
              {% block header_account_log_out_link %}
                <li>
                  <a href="{{ h.url_for('/user/_logout') }}" title="{{ _('Log out') }}">
                    <i class="icon-signout" aria-hidden="true"></i>
                    <span class="text">{{ _('Log out') }}</span>
                  </a>
                </li>
              {% endblock %}
              {% endblock %}
            </ul>
          </div>
        {% else %}
          <nav class="account not-authed">
            <ul class="unstyled">
              {# customized #}
              {% block header_account_notlogged %}
              {% snippet "snippets/customized_language_selector.html" %}
              <li>{% link_for _('Log in'), controller='user', action='login' %}</li>
              {% if h.check_access('user_create') %}
                <li>{% link_for _('Register'), controller='user', action='register', class_='sub' %}</li>
              {% endif %}
              {% endblock %}
            </ul>
          </nav>
        {% endif %}
      {% endblock %}
    </div>
  </header>
{% endblock %}
...
```

### 將下方狀態列改成「English|中文(台灣)|登入|註冊」
---

* 但登入後僅保留 「English|中文(台灣)」

* 修改路徑

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates
  |- footer.html                  # footer 主要內容
  |- header_in_footer.html        # 加入語言選項
```

* 修改 ** header_in_footer.html ** 內容如下，修改後加入 footer.html 即可。

```bash
{% block header_account %}
  <header class="account-masthead" style="background: none;">
    <div class="container">
      {% block header_account_container_content %}
        {% if c.userobj %}
          <nav class="account not-authed">
            <ul class="unstyled">
              {# cdc #}
              {% snippet "snippets/customized_language_selector.html" %}
            </ul>
          </nav>
        {% else %}
          <nav class="account not-authed">
            <ul class="unstyled">
              {# cdc #}
              {% block header_account_notlogged %}
              {% snippet "snippets/customized_language_selector.html" %}
              <li>{% link_for _('Log in'), controller='user', action='login' %}</li>
              {% if h.check_access('user_create') %}
                <li>{% link_for _('Register'), controller='user', action='register', class_='sub' %}</li>
              {% endif %}
              {% endblock %}
            </ul>
          </nav>
        {% endif %}
      {% endblock %}
    </div>
  </header>
{% endblock %}
```

