dev:
	PORT=8888 NODE_ENV=dev foreman start -f Procfile.dev

deploy:
	git push git@heroku.com:cloud-sms-hack.git master

# For Heroku

logs:
	heroku logs --tail