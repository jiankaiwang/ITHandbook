# 透過 API 上傳至國發會

<script type="text/javascript" src="../js/general.js"></script>

### 加入上傳 icon
---

* 修改 ** templates/package/read_base.html ** 頁面

```html

{# ... #}

  {# customized : upload to NDC #}
  {% if request.method == "GET" %}
    {# at the beginning, not submitting #}
    <form method="post" name="upload" action="#" class="sumbit-form">
      <button class="btn btn-primary" name="save" type="submit" style="display: inline-block;" value="DataGovTW">
        <i class="icon-cloud-upload"></i>
        {{ h.getLangLabel("Submit to Data.gov.tw", resourceStatus) }}
      </button>
    </form>
  {% elif request.method == "POST" and h.getPostRequestParamValue(request.body, "save") == "DataGovTW" %}
      <button class="btn btn-danger" name="save" type="submit" value="DataGovTW">
        <i class="icon-repeat"></i>
        {#{{ h.getLangLabel("Submitting","正在上傳") }}#}
        {{ pkg }}
      </button>
      {# refresh for prepare data submitting #}
      {#{% set activate = h.uploadToDataGovTWBody(pkg.id) %}#}
      {#<meta http-equiv="refresh" content="15;url=#"></meta>i#}
  {% endif %}

{# ... #}

```



