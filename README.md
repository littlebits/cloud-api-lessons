# littleBits cloudBit API

## Example Lessons to Get Started

##### Developed for a ⧮ Hardware workshop at [NodeConf EU 2014](http://nodeconfeu.com/)



## Prerequisites
1. Have a littleBits account to associate your cloudBit to; [Create account](https://littlebits.cc/signup).
2. Have a Heroku account to host a webhook endpoint for your cloudBit (also, the heroku gem).
3. Visit Colin, tell him the email used for your littleBits account, get a cloudBit.
4. Get `ACCESS_TOKEN` and `CLOUDBIT_ID` from [Cloud Control](control.littlebitscloud.cc)



## Lessons

##### Lesson 1: Write to cloudBit

1. Try default output
  ```sh
  $ curl -i -XPOST \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v3/devices/CLOUDBIT_ID/output
  ```

2. Try 50% output for 5 seconds
  ```sh
  $ curl -i -XPOST \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v3/devices/CLOUDBIT_ID/output \
  -d percent=50 \
  -d duration_ms=5000
  ```

3. Investigate the HTTP API docs for how you can send a perpetual output percentage to your cloudBit


##### Lesson 2: Read from cloudBit

1. Get the cloudBit's current input voltage

  ```sh
  $ curl -i \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v3/devices/CLOUDBIT_ID/input
  ```

This will start a stream of values, you can stop by hitting `ctrl-c`. Each value
will be a `json` object with a bunch of metadata. The most useful one in most cases being:

`data.percent`

You will see the `percent` value near the end of the response, in the below example, `"percent":69`

```
data:{"type":"input","timestamp":1415472471048,"from":{"user":{"id":1323},"device":{"id":"1a2b3c4d5e6f","device":"littlebits-module-cloud","setup_version":"1.0.0","protocol_version":"1.1.0","firmware_version":"1.0.140820b","mac":"1a2b3c4d5e6f","hash":"XXXXXXXXXXXXXXXXXXXXXXXXXXX","ap":{"ssid":"MySuperInternet!","mac":"AA:BB:CC:DD:EE:FF","strength":100}},"server":{"id":"QkZVqqe"}},"percent":69,"absolute":709,"name":"amplitude","payload":{"percent":69,"absolute":709}}
```
<!--
  ```json
    data: {
      "type":"input",
      "timestamp":1415472471048,
      "from": {
        "user": { "id":1323 },
        "device": {
          "id":"1a2b3c4d5e6f",
          "device":"littlebits-module-cloud",
          "setup_version":"1.0.0",
          "protocol_version":"1.1.0",
          "firmware_version":"1.0.140820b",
          "mac":"1a2b3c4d5e6f",
          "hash":"XXXXXXXXXXXXXXXXXXXXXXXXXXX",
          "ap": {
            "ssid":"My Super Internet!",
            "mac":"AA:BB:CC:DD:EE:FF",
            "strength":100
          }
        },
        "server": {
          "id":"QkZVqqe"
        }
      },
      "percent":69,
      "absolute":709,
      "name":"amplitude",
      "payload": {
        "percent":69,
        "absolute":709
      }
    }
  ```
-->

##### Lesson 3: Read from cloudBit with remote app

Replace `YOUR_APP` with the application name you would like.

1. Deploy the demo cloudBit reader app to Heroku

  ```sh
  $ git clone git@github.com:littlebits/cloud-api-lessons.git \
  && cd cloud-api-lessons \
  && heroku apps:create YOUR_APP \
  && git push heroku
  ```

2. Tell the app to read from your cloudBit

  ```sh
  $ curl -i -XPOST \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v2/subscriptions \
  -d publisher_id=CLOUDBIT_ID \
  -d subscriber_id=http://YOUR_APP.herokuapp.com
  ```

3. Inspect your cloudBit's current "readers" (AKA subscribers)

  ```sh
  $ curl -H \
  "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v2/subscriptions?publisher_id=CLOUDBIT_ID
  ```

4. Stop reading

  ```sh
  $ curl -H -XDELETE \
  "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v2/subscriptions \
  -d publisher_id=CLOUDBIT_ID \
  -d subscriber_id=http://YOUR_APP.herokuapp.com
  ```

5. Investigate the HTTP API docs for how you can make one cloudBit read from another


#### Lesson 4: Make a mash-up!

Ok, not really a lesson. Create an original mashup between your cloudBit and
another service that does something awesome. Best mash-up wins some littleBits
including a cloudBit :)

## Resources
- cloudBit Cloud Control app: http://littlebits.cc/cloudstart
- littleBits Cloud HTTP API docs: http://developer.littlebitscloud.cc
- HTTP API library: https://github.com/littlebits/cloud-client-api-http
