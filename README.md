# FinChan

![*Screencapture*](https://gyazo.com/30ac147fe03d29b1bf96752a9449cab3 "Screenshot")

## MEAN stack old-school imageboard project

So far supports only images. Plan is to add more functionalities in the future.

Server needs dbConfig.json file to authenticate into MongoDB instance.
Here's a template for the file:

```
{
  "username": "USERNAME",
  "password": "PASSWORD",
  "hostaddress": "HOSTADDR",
  "port": "PORTNUMBER",
  "database": "DBNAME"
}
```

When you extract the repo, remember to run
```
npm install
```
for both front and back-end.
