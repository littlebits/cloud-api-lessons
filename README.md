nodeconfeu
==========

## Prerequisites:
- sign up for an account on littlebits.cc
- come visit Colin and get a cloudBit
- heroku account to receive cloudBit input data


## littleBits API
- docs: http://developer.littlebitscloud.cc
- cloudBit Cloud Control: http://littlebits.cc/cloudstart


## Send to cloudBit output:

- get access token & cloudBit ID from Cloud Control


#### sample CURLS [remember to replace TOKEN and DEVICE_ID]

Default params [full output for 3 seconds]:

```
curl -i -XPOST -H "Authorization: Bearer TOKEN" https://api-http.littlebitscloud.cc/v2/devices/DEVICE_ID/output
````

Custom params [half output for 5 seconds]:

```
curl -i -XPOST -H "Authorization: Bearer TOKEN" https://api-http.littlebitscloud.cc/v2/devices/DEVICE_ID/output -d percent=50 -d duration_ms=5000
```


## Receive from cloudBit input:

- get sample code from 
- create heroku app: run `heroku apps:create <whatever-project-name?>`
- create a subscription from your cloudBit to your endpoint


#### sample CURLs [remember to replace TOKEN and DEVICE_ID]

Create a subscription [set cloudBit to ping your endpoint]:

```
curl -i -XPOST -H "Authorization: Bearer TOKEN" https://api-http.littlebitscloud.cc/v2/subscriptions -d publisher_id=DEVICE_ID -d subscriber_id=http://your-app.heroku.com -d publisher_events='["amplitude:delta:ignite"]'
```

Check your subscription:

```
curl -H "Authorization: Bearer TOKEN" https://api-http.littlebitscloud.cc/v2/subscriptions?publisher_id=DEVICE_ID
```

