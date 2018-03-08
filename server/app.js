const express = require('express');
const dynamoose = require('dynamoose');

const app = express();

dynamoose.AWS.config.update({
  accessKeyId: 'AKID',
  secretAccessKey: 'SECRET',
  region: 'us-east-1'
});

dynamoose.local('http://localstack:4569');

const Schema = dynamoose.Schema;

const UserSchema = new Schema({
  first_name: String,
  last_name: String
});

const User = dynamoose.model('User', UserSchema);

console.log("#####################")
User.scan({}).exec(function (err, users) {
  console.log(JSON.stringify(users));
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
