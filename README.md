# ⧮ Hardware workshop
**@ NodeConf EU 2014!**



## Prerequisites
1. Have a littleBits account to associate your cloudBit to; [Create account](https://littlebits.cc/signup).
2. Have a Heroku account to host a webhook endpoint for your cloudBit (also, the heroku gem).
3. Visit Colin, tell him the email used for your littleBits account, get a cloudBit.
4. Get `ACCESS_TOKEN` and `CLOUDBIT_ID` from [Cloud Control](control.littlebitscloud.cc)



## Lessons

##### Lesson 1: Write to cloudBit
1. Try default output
  ```
  curl -i -XPOST \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v2/devices/CLOUDBIT_ID/output
  ````

2. Try 50% output for 5 seconds
  ```
  curl -i -XPOST \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v2/devices/CLOUDBIT_ID/output \
  -d percent=50 \
  -d duration_ms=5000
  ```

3. Investigate the HTTP API docs for how you can send a perpetual output percentage to your cloudBit

##### Lesson 2: Read from cloudBit
Replace `YOUR_APP` with the application name you would like.

1. Deploy the demo cloudBit reader app to Heroku

  ```
  git clone git@github.com:littlebits/workshop-nodeconfeu-2014.git \
  && cd workshop-nodeconfeu-2014 \
  && heroku apps:create YOUR_APP \
  && git remote add heroku git@heroku.com:YOUR_APP.git \
  && git push heroku
  ```

2. Tell the app to read from your cloudBit

  ```
  curl -i -XPOST \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v2/subscriptions \
  -d publisher_id=CLOUDBIT_ID \
  -d subscriber_id=http://YOUR_APP.heroku.com \
  -d publisher_events='["amplitude:delta:ignite"]'
  ```
3. Inspect your cloudBit's current "readers" (AKA subscribers)

  ```
  curl -H \
  "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v2/subscriptions?publisher_id=CLOUDBIT_ID
  ```
4. Stop reading

  ```
  curl -H -XDELETE \
  "Authorization: Bearer ACCESS_TOKEN" \
  https://api-http.littlebitscloud.cc/v2/subscriptions \
  -d publisher_id=CLOUDBIT_ID \
  -d subscriber_id=http://YOUR_APP.heroku.com
  ```
5. Investigate the HTTP API docs for how you can make one cloudBit read from another

#### Lesson 3: Make a mash-up!

Ok, not really a lesson. Create an original mashup between your cloudBit and another service that does something awesome.
Best mash-up wins some littleBits including a cloudBit :)

## Resources
- cloudBit Cloud Control app: http://littlebits.cc/cloudstart
- littleBits Cloud HTTP API docs: http://developer.littlebitscloud.cc
- HTTP API library: https://github.com/littlebits/cloud-client-api-http