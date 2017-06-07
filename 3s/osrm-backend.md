# OSRM Backend Service

<script type="text/javascript" src="../js/general.js"></script>

### Build a Service
---

* Install necessary packages

```bash
$ sudo apt install build-essential git cmake pkg-config \
libbz2-dev libstxxl-dev libstxxl1v5 libxml2-dev \
libzip-dev libboost-all-dev lua5.2 liblua5.2-dev libtbb-dev
```

* install the service

```bash
# download the source code
# use osrm version 5.7.0 as an example
$ wget https://github.com/Project-OSRM/osrm-backend/archive/v5.7.0.tar.gz
$ tar -xzf v5.7.0.tar.gz
$ cd osrm-backend-5.7.0

# compile and install
$ mkdir -p build
$ cd build
$ cmake ..
$ cmake --build .
$ sudo cmake --build . --target install
```

* Download the necessary data (taiwan-latest.osm)

```bash
# get taiwan data as an example
$ wget http://download.geofabrik.de/asia/taiwan-latest.osm.pbf
```

* Prepare osm resource and start the routing service

```bash
# profiles/car.lua in git repository
# uncompress the file
$ osrm-extract taiwan-latest.osm.pbf -p ../profiles/car.lua

# prepare node information
$ osrm-contract taiwan-latest.osrm

# start route service
$ osrm-routed taiwan-latest.osrm
```

* Access the service by the browser or curl 

```bash
curl http://127.0.0.1:5000/route/v1/driving/13.388860,52.517037;13.385983,52.496891?steps=true
```










