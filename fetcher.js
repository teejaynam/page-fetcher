const request = require('request');
const fs = require('fs');
const readline = require('readline');


const URL = process.argv[2];
const FILE = process.argv[3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (fs.existsSync(FILE)) {
  rl.question("File exists! Do you want to overwrite it? (y/n) ", answer => {
    if (answer.toLowerCase() === 'y') {
      downloadURL();
    } else {
      console.log("Download aborted!");
      rl.close();
    }
  });
} else {
  downloadURL();
}


const downloadURL = function() {
  request(URL, (error, response, body) => {
    console.log('statusCode:', response && response.statusCode);

    if (response.statusCode === 200) {
      console.log("Successfully downloaded");
    } else if (response.statusCode >= 400 && response.statusCode <= 599) {
      console.log('Error! Exiting program :', error);
      process.exit();
    }

    fs.writeFile(FILE, body, err => {
      if (err) {
        console.log("Error saving file! Maybe error with filepath!");
        console.log(err);
        process.exit();
      } else {
        console.log("File saved! : ", FILE);
      }
      rl.close();
    });

  });
};