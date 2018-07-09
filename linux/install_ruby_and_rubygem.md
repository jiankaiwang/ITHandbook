# install ruby and rubygem



###install ruby
---

```Bash
wget http://ftp.ruby-lang.org/pub/ruby/2.1/ruby-2.1.1.tar.gz
tar xvzf ruby-2.1.1.tar.gz
cd ruby-2.1.1
./configure --prefix=/usr
make
sudo make install
```

###install rubygem

```Bash
wget http://production.cf.rubygems.org/rubygems/rubygems-1.8.25.tgz
tar xvzf rubygems-1.8.25.tgz
cd rubygems-1.8.25
sudo ruby setup.rb config
sudo ruby setup.rb setup
sudo ruby setup.rb install
```