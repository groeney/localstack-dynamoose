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

const user = new User({
	first_name: 'Alice',
	last_name: 'Jones'
})

user.save(function (err) {
  if(err) { return console.log(err); }
  console.log('Ta-da!');
});

User.scan({}).exec(function (err, users) {
	console.log("########## Users in DynamoDB-Local ###########")
	console.log(JSON.stringify(users));
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
