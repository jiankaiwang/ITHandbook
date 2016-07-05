# 安裝 Plugin

<script type="text/javascript" src="../js/general.js"></script>

###安裝方式
---

* 此為 Jenkins 環境的工具，並非專指任一個專案，故回到 Jenkins 首頁。

* 選擇左側「管理 Jenkins」，選擇「管裡外掛程式」

* 選擇「可用的」，並選擇要安裝 plugin

* 點擊「下載並於重新啟動後安裝」即可。

###Report Violations
---

| 項目 | 內容 |
| -- | -- |
| Plugin ID | violations |
| Plugin name in Jenkins | Violations plugin |
| Download URL | [https://wiki.jenkins-ci.org/display/JENKINS/Violations](https://wiki.jenkins-ci.org/display/JENKINS/Violations) |

* The violations plug-in scans for violation xml files of particular types in the build workspace, gathers the violations and reports on the numbers for each type. The currently supported tools are:

| tool | url | description | language |
| -- | -- | -- | -- |
| checkstyle | [http://checkstyle.sourceforge.net/](http://checkstyle.sourceforge.net/) | - | - |
| pmd | [http://pmd.sourceforge.net/](http://pmd.sourceforge.net/) |  - | - |
| cpd | [http://pmd.sourceforge.net/cpd.html](http://pmd.sourceforge.net/cpd.html) |  - | - |
| findbugs | [http://findbugs.sourceforge.net/](http://findbugs.sourceforge.net/) |  - | - |
| pylint | [http://www.logilab.org/857](http://www.logilab.org/857) |  - | - |
| fxcop | [http://blogs.msdn.com/fxcop/](http://blogs.msdn.com/fxcop/) | 靜態程式碼分析 | Csharp |
| stylecop | [http://code.msdn.microsoft.com/sourceanalysis](http://code.msdn.microsoft.com/sourceanalysis) | 程式碼設計符合規範 | Csharp |
| simian | [http://www.redhillconsulting.com.au/products/simian/](http://www.redhillconsulting.com.au/products/simian/) | 找出高度相似度的程式碼區塊 | multiple, Java, C#. C++, Ruby, COBOL, ... , etc. |
| gendarme | [http://mono-project.com/Gendarme](http://mono-project.com/Gendarme) | - | - |
| jslint  | [http://www.jslint.com/lint.html](http://www.jslint.com/lint.html) | - | - |
| jcreport  | [http://www.jcoderz.org/fawkez/wiki/JcReport](http://www.jcoderz.org/fawkez/wiki/JcReport) | - | - |
| pep8 | [https://github.com/jcrocholl/pep8](https://github.com/jcrocholl/pep8) | - | - |
| codenarc | [http://codenarc.sourceforge.net/](http://codenarc.sourceforge.net/) |  - | - |
| perlcritic | [http://perlcritic.com/](http://perlcritic.com/) | - | - |


