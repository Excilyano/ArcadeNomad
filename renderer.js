// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require("fs");
let games = [];
let selected;

function loadGamesStructures() {
  fs.readdir("games", function(err, dir) {
    let index = 0;
    for(let folderPath of dir) {
      let game = new Object();
      game.id = index;
      game.name = folderPath;
      game.icon = "games/" + folderPath + "/icon.png";
      game.pic = "games/" + folderPath + "/picture.png";
      game.exe = "games/" + folderPath + "/game.exe";
      game.description = "games/" + folderPath + "/description.html";
      games.push(game);
      index++;
    }
    
    let carousel = document.getElementById("carousel");
    let iconsHTML = "";
    for(let game of games) {
      let elem = document.createElement("img");
      elem.addEventListener("click", function() {loadDetails(game.id);});
      elem.src = game.icon;
      elem.alt = game.name;
      elem.id = "icon" + game.id;
      // iconsHTML += "<img src=\"" + game.icon + "\" alt=\"" + game.name + "\" onclick=\"loadBigPicture(" + game.id + ")\" id=\"icon" + game.id + "\">";
      carousel.appendChild(elem);
    }
    // carousel.innerHTML = iconsHTML;
    selected = 0;
    loadDetails(0);
  });
}

function loadDetails(index) {
  document.getElementById("icon" + selected).classList.remove("selected-icon");
  let game = games[index];

  let elem = document.createElement("img");
  elem.src = game.pic;
  elem.alt = game.name;

  let picture = document.getElementById("picture");
  while(picture.firstChild) picture.removeChild(picture.lastChild);
  picture.appendChild(elem);
  //pictureHTML = "<img src=\"" + game.pic + "\" alt=\"" + game.name + "\">";
  
  fs.readFile(game.description, function(err, data) {
    document.getElementById("description").innerHTML = data;
  })

  document.getElementById("icon" + index).classList.add("selected-icon");
  selected = index;
  //document.getElementById("picture").innerHTML = pictureHTML;
  
}

loadGamesStructures();