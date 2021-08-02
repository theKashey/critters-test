> This is a reproduction to pair with https://github.com/GoogleChromeLabs/critters/issues/78
> 
> This adds https://github.com/theKashey/used-styles to the comparison

## Get started
>Note: use `127.0.0.1:3000` if using OSX
```bash
git clone git@github.com:danielroe/critters-test.git
cd critters-test
yarn && yarn build

# Test with critters enabled
# https://httpd.apache.org/docs/2.4/programs/ab.html
CRITTERS=true yarn start
ab -n 100 -c 5 http://localhost:3000/

# Test with used-styles enabled
# https://httpd.apache.org/docs/2.4/programs/ab.html
USED_STYLES=true yarn start
ab -n 100 -c 5 http://localhost:3000/


# Test without critters
yarn start
ab -n 100 -c 5 http://localhost:3000/
```

## Results

### Without critters

```
Document Path:          /
Document Length:        25395 bytes

Concurrency Level:      5
Time taken for tests:   1.624 seconds
Complete requests:      100
Failed requests:        98
   (Connect: 0, Receive: 0, Length: 98, Exceptions: 0)
Total transferred:      2562078 bytes
HTML transferred:       2539678 bytes
Requests per second:    61.57 [#/sec] (mean)
Time per request:       81.215 [ms] (mean)
Time per request:       16.243 [ms] (mean, across all concurrent requests)
Transfer rate:          1540.38 [Kbytes/sec] received
 ```

### With critters
> adds 13kb of 390 possible  
```
Document Path:          /
Document Length:        23620 bytes

Concurrency Level:      5
Time taken for tests:   25.948 seconds
Complete requests:      100
Failed requests:        99
   (Connect: 0, Receive: 0, Length: 99, Exceptions: 0)
Total transferred:      2384580 bytes
HTML transferred:       2362180 bytes
Requests per second:    3.85 [#/sec] (mean)
Time per request:       1297.417 [ms] (mean)
Time per request:       259.483 [ms] (mean, across all concurrent requests)
Transfer rate:          89.74 [Kbytes/sec] received
```

### With used-styles
> adds 38kb of 390 possible
```
Document Path:          /
Document Length:        64406 bytes

Concurrency Level:      5
Time taken for tests:   1.674 seconds
Complete requests:      100
Failed requests:        86
(Connect: 0, Receive: 0, Length: 86, Exceptions: 0)
Total transferred:      6463086 bytes
HTML transferred:       6440686 bytes
Requests per second:    59.72 [#/sec] (mean)
Time per request:       83.722 [ms] (mean)
Time per request:       16.744 [ms] (mean, across all concurrent requests)
Transfer rate:          3769.40 [Kbytes/sec] received
```
