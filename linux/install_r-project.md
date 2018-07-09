# Install R-project



###From Source Code
---

* Download R-source from the [R-project](http://www.r-project.org/) website, the [CRAN] -> [Software] -> [R Sources]

* Create a folder prepared for R installation

```Bash
$ mkdir /home/<user>/rproject
```

* move the download source file to the folder and extract it 

```Bash
$ mv /home/<user>/下載/R-3.1.1.tar.gz /home/<user>/rproject
$ tar zvx -f /home/<user>/rproject/R-3.1.1.tar.gz
```

* Set the configure file 

```Bash
$ cd /home/<user>/rproject/R-3.1.1.tar.gz
$ ./configure --prefix=/home/<user>/rproject/ --enable-R-shlib
```

* make the source file

```Bash
$ make
```

* install the file compiled already

```Bash
$ make install
```

* add the path to the environment setting

```Bash
$ sudo vim ~/.bashrc
$ export PATH=/home/<user>/rproject/bin/:$PATH (add under # .bashrc)
```

* Make every user from the PC could access the R program [optional]

```Bash
$ chmod -R 777 /home/<user>/rproject
```

* Start with R programming

```Bash
$ R
```

* R script for test (test.r)

```R
listAll <- vector(mode="list",length=4)

for(i in 1:10) {
        listAll[[i]] <- sample(9,4,replace=T)
}

listAll
```

* Run R script

```Bash
$ Rscript ./test.r
```
