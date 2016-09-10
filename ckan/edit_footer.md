# 修改 footer 內容

<script type="text/javascript" src="../js/general.js"></script>

### 客製化內容

* 修改路徑

```bash
/usr/lib/ckan/default/src/ckan/ckan/templates
  |- footer.html                  # footer 主要內容
```

* 內容如下

```html

<footer class="site-footer hp-footer-bg">
  <div class="container">
    {% block footer_content %}
    <div class="row">
        <div class="span2" style="text-align: center;">
                <a href="http://data.gov.tw/">
                        {{ h.getLangLabel("Taiwan Government Open Data","政府資料開放平臺") }}
                </a>
       </div>
        <div class="span3" style="text-align: center;">
		<a href="{{ h.url_for(controller='home', action='about') }}">
			{{ _('About {0}').format(h.getLangLabel("Center for Diseases Control Open Data","疾病管制署開放資料")) }}
                </a>
        </div>
        <div class="span2" style="text-align: center;">
                <a href="http://data.gov.tw/license">
			{{ h.getLangLabel("Open Government Data License","政府資料開放授權條款") }}
		</a>
        </div>
        <div class="span3" style="text-align: center;">
                <a href="{{ _('{0}pages/instruction').format(h.url_for(controller='home', action='index')) }}">
                  {{ h.getLangLabel("Platform Operation Guideline","資料開放平台操作手冊") }}
                </a>
        </div>
        <div class="span2" style="text-align: center;">
                <a href="#" style="font-size: 12px;"><i class="icon-github"></i> Github</a>
                <img src="{{ h.url_for_static('/base/images/od_80x15_blue.png') }}" />
        </div>
    </div>
    <div class="row" style="margin-top: 7px;">
      <div class="span2"></div>
      <div class="span8 footer-links" style="text-align: center;">
        {% block footer_nav %}
          <ul class="unstyled">
              <li>
              {{ h.getLangLabel("No.6, Linsen S. Rd., Zhongzheng Dist., Taipei City 100, Taiwan (R.O.C.)","10050 台北市中正區林森南路6號") }}
              </li>
              <li><a href="http://www.cdc.gov.tw">
	      {{ h.getLangLabel("Center for Diseases Control, Ministry of Health and Welfare Copyright © 2016","衛生福利部疾病管制署 Copyright © 2016") }}
	      </a></li>
              <li><a href="http://www.cdc.gov.tw">
                  <img src="{{ h.url_for_static('/base/images/cdc.png') }}" />
              </a></li>
          </ul>
        {% endblock %}
      </div>
      <div class="span2"></div>
    </div>
    {% endblock %}
  </div>

  {% block footer_debug %}
    {% if g.debug %}
      {% include 'snippets/debug.html' %}
    {% endif %}
  {% endblock %}

  {% snippet "header_in_footer.html" %}
</footer>
```