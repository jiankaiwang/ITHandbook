# 調整主選單

<script type="text/javascript" src="../js/general.js"></script>

### 將主選單改成「最新消息|資料集|群組|開發人員|資料建議|應用展示|常見問題」
---

* 修改路徑

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates
  |- header.html
```

* 修改內容如下

```bash
<header class="navbar navbar-static-top masthead">
  {% block header_debug %}
    {% if g.debug and not g.debug_supress_header %}
      <div class="debug">Controller : {{ c.controller }}<br/>Action : {{ c.action }}</div>
    {% endif %}
  {% endblock %}
  <div class="container">
    <button data-target=".nav-collapse" data-toggle="collapse" class="btn btn-navbar" type="button">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    {# The .header-image class hides the main text and uses image replacement for the title #}
    <hgroup class="{{ g.header_class }} pull-left">

      {% block header_logo %}
        {% if g.site_logo %}
          <a class="logo" href="{{ h.url('home') }}"><img src="{{ h.url_for_static_or_external(g.site_logo) }}" alt="{{ g.site_title }}" title="{{ g.site_title }}" /></a>
        {% else %}
          <h1>
            <a href="{{ h.url('home') }}">{{ g.site_title }}</a>
          </h1>
          {% if g.site_description %}<h2>{{ g.site_description }}</h2>{% endif %}
        {% endif %}
      {% endblock %}

    </hgroup>

    <div class="nav-collapse collapse">

      {# customized remove organization on the menu #}
      {# ('organizations_index', _('Organizations')), #}
      {# ('about', _('About')) #}
      {% block header_site_navigation %}
        <nav class="section navigation">
          <ul class="nav nav-pills">
            <li>
              <a href="{{ _('{0}blog').format(h.url_for(controller='home', action='index')) }}">
		{{ h.getLangLabel("News","最新消息") }}
              </a>
            </li>
            {% if c.userobj.sysadmin %}
              {{ h.build_nav_main(
                ('search', _('Datasets'))
              ) }}
              {{ h.build_nav_main(
                ('organizations_index', _('Organizations')),
                ('group_index', _('Groups'))
              ) }}
            {% else %}
            {% block header_site_navigation_tabs %}
              {{ h.build_nav_main(
                ('search', _('Datasets')),
                ('group_index', _('Groups'))
              ) }}
            {% endblock %}
            {% endif %}
            <li>
              <a href="{{ _('{0}pages/developer').format(h.url_for(controller='home', action='index')) }}">
                {{ h.getLangLabel("Developer","開發人員") }}
              </a>
            </li>
            <li>
              <a href="{{ _('{0}pages/suggestion').format(h.url_for(controller='home', action='index')) }}">
                {{ h.getLangLabel("Suggestion","資料建議") }}
              </a>
            </li>
            <li>
              <a href="{{ _('{0}pages/application').format(h.url_for(controller='home', action='index')) }}">
                {{ h.getLangLabel("Application","應用展示") }}
              </a>
            </li>
            <li>
              <a href="{{ _('{0}pages/qa').format(h.url_for(controller='home', action='index')) }}">
                {{ h.getLangLabel("Q & A","常見問題") }}
              </a>
            </li>
          </ul>
        </nav>
      {% endblock %}

      {% block header_site_search %}
        <form class="section site-search simple-input" action="{% url_for controller='package', action='search' %}" method="get">
          <div class="field">
            <label for="field-sitewide-search">{% block header_site_search_label %}{{ _('Search Datasets') }}{% endblock %}</label>
            <input id="field-sitewide-search" type="text" name="q" placeholder="{{ _('Search') }}" />
            <button class="btn-search" type="submit"><i class="icon-search"></i></button>
          </div>
        </form>
      {% endblock %}

    </div>
  </div>
</header>
```