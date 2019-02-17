game.dominos = {};
game.dominos.pioche = []; 
game.dominos.leDomino = {};
game.dominos.board = []

class Domino {
  constructor (id, side1, side2) {
    this.id = id;
    this.side1 = side1;
    this.side2 = side2;
    this.lien = document.getElementById(id);
    this.par = document.getElementById('board');
    this.c = 0;
    this.ag = 0; 

    this.clique = (event) => {
      this.c = 0
      this.c += 1
      if (this.c === 1) {
        console.log(this);
        this.par.appendChild(this.lien);
        this.lien.style.position = 'absolute';
        this.lien.style.left = event.clientX-10+'px';    
        this.lien.style.top = event.clientY-20+'px'; 
        document.addEventListener("mousemove", this.maousemauve);
        this.par.addEventListener("wheel", this.rotate);
        this.par.addEventListener("click", this.secondClick);
      }                                    
    }

    this.secondClick = (event) => {
      this.c +=1
      if (this.c === 2) {
        this.lien.style.left = ((Math.round(parseInt(this.lien.style.left, 10) /10))*10)+2+"px";    
        this.lien.style.top = ((Math.round(parseInt(this.lien.style.top, 10) /10))*10)+2+"px";
        var posx = (parseInt(this.lien.style.left, 10)+8)/10; 
        var posy = (parseInt(this.lien.style.top, 10)+8)/10;
        var side1 = this.side1;
        var side2 = this.side2;
        document.removeEventListener("mousemove", this.maousemauve);
        this.par.removeEventListener("wheel", this.rotate); 
        this.lien.removeEventListener("click", this.clique);
        if (game.tour === 0) {
          if (this.ag === 0) {
            game.dominos.premierPlacementVerti(posx, posy, side1, side2, this.ag);
          }
        else
          if(this.ag === 180) {
            game.dominos.premierPlacementVerti(posx, posy, side2, side1, this.ag);
          }
        else
          if (this.ag === 90) {
            game.dominos.premierPlacementHori(posx, posy, side2, side1, this.ag);
          }
        else
          if (this.ag === 270) {
            game.dominos.premierPlacementHori(posx, posy, side1, side2, this.ag);
          }
          game.tour = 1;
          game.dominos.lastRotate = this.ag;
          game.players.win(); 
        }
      else {
            if (this.ag === 0 || this.ag === 180) {
              game.dominos.FixPosVertiStart(posx, posy, side1, side2, this.lien, this.ag, this.par, this.clique, this.secondClick);
            }
          else
            if (this.ag === 90 || this.ag === 270) {
              game.dominos.FixPosHoriStart(posx, posy, side2, side1, this.lien, this.ag, this.par, this.clique, this.secondClick);
            }
        }// Else if game tour != 0
      }
    }          

    this.maousemauve = (event) => {           
      if (this.c === 1) {
        this.lien.style.left = event.clientX-10+'px';    
        this.lien.style.top = event.clientY-20+'px';
      }
    } 


    this.rotate = (event) => {        
      if (this.c === 1) {     
        this.ag += 90;
        this.lien.style.transform = 'rotate('+this.ag+'deg)';
        if (this.ag === 360) {
          this.ag = 0;
        }
      }
    }

    

    this.lien.onclick = this.clique;
    game.dominos.pioche.push(this.lien);            
  }
}

game.dominos.generateDominos = function() {
  var d0 =   new Domino("d0", 0, 0);
  var d1 =   new Domino("d1", 0, 1);
  var d2 =   new Domino("d2", 0, 2);
  var d3 =   new Domino("d3", 0, 3);
  var d4 =   new Domino("d4", 0, 4);
  var d5 =   new Domino("d5", 0, 5);
  var d6 =   new Domino("d6", 0, 6);
  var d7 =   new Domino("d7", 1, 1);
  var d8 =   new Domino("d8", 1, 2);
  var d9 =   new Domino("d9", 1, 3);
  var d10 =   new Domino("d10", 1, 4);
  var d11 =   new Domino("d11", 1, 5);
  var d12 =   new Domino("d12", 1, 6);
  var d13 =   new Domino("d13", 2, 2);
  var d14 =   new Domino("d14", 2, 3);
  var d15 =   new Domino("d15", 2, 4);
  var d16 =   new Domino("d16", 2, 5);
  var d17 =   new Domino("d17", 2, 6);
  var d18 =   new Domino("d18", 3, 3);
  var d19 =   new Domino("d19", 3, 4);
  var d20 =   new Domino("d20", 3, 5);
  var d21 =   new Domino("d21", 3, 6);
  var d22 =   new Domino("d22", 4, 4);
  var d23 =   new Domino("d23", 4, 5);
  var d24 =   new Domino("d24", 4, 6);
  var d25 =   new Domino("d25", 5, 5);
  var d26 =   new Domino("d26", 5, 6);
  var d27 =   new Domino("d27", 6, 6);
  var d28 =   new Domino("d28", -1, -1);
}

game.dominos.shuffle = function(array) {
  let len = array.length - 1;
  let dominos = array.slice(0);
  for  ( var i = len; i >= 0 ; i--){
    var j = Math.floor(Math.random() * (dominos.length - 1));
    temp = dominos.splice(j, 1);
    array[i] = temp[0]; 
  }
}

game.dominos.setPioche = function(array) {
  let len = array.length-1 ;
  for (var i = 0; i <= len; i++) {
    par = document.getElementById('pioche'),
    son = array[i],
    old = par.childNodes[i];
    par.replaceChild(son, old);
  }
}

game.dominos.hands = function() {
  var nb = game.players.board.length;
    if (nb === 2) {
      for (var i = 0; i < 7; i++) {
        for (var j = 1; j <= nb; j++) {
          let dom = document.getElementById('pioche').childNodes[1];
          document.getElementById('hand'+j).appendChild(dom);
        }
      }
    }
  else {
    for (var i = 0; i < 6; i++) {
      for (var j = 1; j <= nb; j++) {
        let dom = document.getElementById('pioche').childNodes[1];
        document.getElementById('hand'+j).appendChild(dom);
      }
    }
  }
}

game.dominos.pox = function (x, y, i, j, s, dispo, ag) {
  var pox = document.querySelector(".square[pos-x='"+(x+i)+"'][pos-y='"+(y+j)+"']");
    pox.setAttribute("value", s);
    pox.setAttribute("dispo", dispo);
    pox.setAttribute("ag", ag);
    return pox;
}

game.dominos.premierPlacementVerti = function(x, y, s1, s2, ag) {
  for (var i = -2; i < 4; i++) {
    for(var j = -2; j < 6; j++) {  
      if ((y-1) < (y+j) && (y+j) < (y+4) && (x-1) < (x+i) && (x+i) < (x+2)) {
        if ((j) === 0 || (j) === 1) {
          var pox = game.dominos.pox(x, y, i, j, s1,"occupée", ag);
        }
      else {
          var pox = game.dominos.pox(x, y, i, j, s2,"occupée", ag);
        }
      game.dominos.board.push(pox);
      }
    }
  }
}

game.dominos.premierPlacementHori = function(x, y, s1, s2, ag) {
  for (var i = -3; i < 5; i++) {
    for (var j = -1; j < 5; j++) {
      if (y < (y+j) && (y+j) < (y+3)) {
        if (i === -1 || i === 0) {
          var pox = game.dominos.pox(x, y, i, j, s1,"occupée", ag);
          game.dominos.board.push(pox);
        }
      else
        if (i === 1 || i === 2) {
          var pox = game.dominos.pox(x, y, i, j, s2,"occupée", ag);
          game.dominos.board.push(pox);      
        }
      }
    }
  }
}

game.dominos.retour = function(par, lien, ag, fnct1, fnct2) {
      var main = "hand"+game.players.tour;
        par.removeEventListener("click", fnct2);
        var hand = document.getElementById(main);
        lien.style.position = "static";
        lien.style.left = 0;
        lien.style.top = 0;
        lien.style.transform = 'rotate('+0+'deg)';
        ag = 0;
        lien.addEventListener("click", fnct1);
        hand.appendChild(lien);
    }


game.dominos.tcheck = function(x, y, a, b, s1, s2, lien, ag, resultat, cas, par, fnct1, fnct2) {
  var valstart = parseInt(game.dominos.board[0].getAttribute("value"));
  var valend = parseInt(game.dominos.board[game.dominos.board.length-1].getAttribute("value"));
  lien.style.top = (y*10)+a+"px";
  lien.style.left = (x*10)+b+"px";     
  var posx = (parseInt(lien.style.left, 10)+8)/10; 
  var posy = (parseInt(lien.style.top, 10)+8)/10;
  if (s1 === valstart || s2 === valstart) {
   if (cas == "cas1") {
       if (ag === 0 || ag === 180) {
        if (s1 === valstart) {
         lien.style.transform = 'rotate('+180+'deg)';
         game.dominos.autrePlacementVerti(posx, posy, s2, s1, lien, resultat, 180);
        }
      else
        if (s2 === valstart) {
          lien.style.transform = 'rotate('+0+'deg)';
         game.dominos.autrePlacementVerti(posx, posy, s1, s2, lien, resultat, 0);
        }
       }
       if (ag === 90 || ag === 270) {
        if (s1 === valstart) {
         lien.style.transform = 'rotate('+270+'deg)';
         game.dominos.autrePlacementHori(posx, posy, s2, s1, lien, resultat, 270);
       }
       else
        if (s2 === valstart) {
          lien.style.transform = 'rotate('+90+'deg)';
         game.dominos.autrePlacementHori(posx, posy, s1, s2, lien, resultat, 90);
        }
       }
   }
   else
    if (cas == "cas2") {
       if (ag === 0 || ag === 180) {
        if (s1 === valstart) {
         lien.style.transform = 'rotate('+0+'deg)';
         game.dominos.autrePlacementVerti(posx, posy, s1, s2, lien, resultat, 0);
        }
      else
        if (s2 === valstart) {
          lien.style.transform = 'rotate('+180+'deg)';
         game.dominos.autrePlacementVerti(posx, posy, s2, s1, lien, resultat, 180);
        }
       }
       if (ag === 90 || ag === 270) {
        if (s1 === valstart) {
         lien.style.transform = 'rotate('+90+'deg)';
         game.dominos.autrePlacementHori(posx, posy, s1, s2, lien, resultat, 90);
       }
       else
        if (s2 === valstart) {
          lien.style.transform = 'rotate('+270+'deg)';
         game.dominos.autrePlacementHori(posx, posy, s2, s1, lien, resultat, 270);
        }
       }
   }
 }
 else {game.dominos.retour(par, lien, ag, fnct1, fnct2)}
}

var alors = function(x, r, t) {
              if (r == "start") {
                game.dominos.board.unshift(x);
              }
            else
              if (r == "startdown"){
                t.unshift(x);
              }
            else
              if (r == "end") {
                t.unshift(x);
              }
            }

game.dominos.autrePlacementVerti = function(x, y, s1, s2, lien, resultat, ag) {
  var tableauTemporaire = [];
      for (var i = 1; i > -1; i--) {
        for (var j = 3; j > -1; j--) {
          if (j === 0 || j === 1) {
            var pox = game.dominos.pox(x, y, i, j, s1,"occupée", ag);
            alors(pox, resultat, tableauTemporaire);
          }
          else
            if (j === 2 || j === 3) {
              var pox = game.dominos.pox(x, y, i, j, s2,"occupée", ag);
              alors(pox, resultat, tableauTemporaire);
          }
        }
      }
  if (tableauTemporaire.length != 0) {
    var index = 0;
    var len = game.dominos.board.length;
    if (resultat == "end") {
    for (var i = len; i < len+8; i++) {
      game.dominos.board[i] = tableauTemporaire[index];
      index++;
    }
  }
  else
    if (resultat == "startdown") {
      for (var i = 0; i < tableauTemporaire.length; i++) {
        game.dominos.board.unshift(tableauTemporaire[i]);
      }
    }
  }

}

game.dominos.FixPosVertiStart = function(x, y, s1, s2, lien, ag, par, fnct1, fnct2) {
  var Ystart = parseInt(game.dominos.board[0].getAttribute("pos-y"));
  var Xstart = parseInt(game.dominos.board[0].getAttribute("pos-x"));
  var Ycomp = parseInt(game.dominos.board[7].getAttribute("pos-y"));
  var Xcomp = parseInt(game.dominos.board[7].getAttribute("pos-x"));
  var Yend = parseInt(game.dominos.board[game.dominos.board.length-1].getAttribute("pos-y"));
  var Xend = parseInt(game.dominos.board[game.dominos.board.length-1].getAttribute("pos-x"));
  var angleStart = parseInt(game.dominos.board[0].getAttribute("ag"));
  var angleEnd = parseInt(game.dominos.board[game.dominos.board.length-1].getAttribute("ag"));
  if (angleStart === 0 || angleStart === 180) {
    if (Ystart < Ycomp) {
      game.dominos.tcheck(Xstart, Ystart, -48, -8, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2) ;
      
    }
  else 
    if (Ystart > Ycomp) {
      game.dominos.tcheck(Xstart, Ystart, 2, -18, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;
  }
  }
else
  if (angleStart === 90 || angleStart === 270) {
    if (Xstart < Xcomp) {
    if (y <= Ystart && x >= Xstart) {
      game.dominos.tcheck(Xstart, Ystart, -48, -8, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2) ;//game.dominos.autrePlacementVerti(Xstart, Ystart, 48, 8, s1, s2, lien, "start", ag);
  }
else
  if (y < (Ystart+1) && x < Xstart) {
      game.dominos.tcheck(Xstart, Ystart, -28, -28, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2) ;//game.dominos.autrePlacementVerti(Xstart, Ystart, 48, 8, s1, s2, lien, "start", ag);

  }
else
  if (y > Ystart && x < Xstart) {
      game.dominos.tcheck(Xstart, Ystart, -8, -28, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;

  }
else
  if (y > (Ystart+1) && x > (Xstart-1)) {
      game.dominos.tcheck(Xstart, Ystart, 12, -8, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;
  }
  }
else
  if (Xstart > Xcomp) {
    if (y < Ystart && x > (Xstart-1)) {
      game.dominos.tcheck(Xstart, Ystart, -38, 2, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2) ;
  }
else
  if (y < Ystart && x < Xstart) {
      game.dominos.tcheck(Xstart, Ystart, -58, -18, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2) ;

  }
else
  if (y > (Ystart-1) && x < Xstart) {
      game.dominos.tcheck(Xstart, Ystart, 2, -18, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;

  }
else
  if (y > (Ystart-1) && x > (Xstart-1)) {
      game.dominos.tcheck(Xstart, Ystart, -18, +2, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;
  }
  }
  }
  
}

game.dominos.autrePlacementHori = function(x, y, s1, s2, lien, resultat, ag) {
  var tableauTemporaire = [];
      for (var i = 2; i > -2; i--) {
        for (var j = 2; j > 0; j--) {
          if (i === -1 || i === 0) {
            var pox = game.dominos.pox(x, y, i, j, s1,"occupée", ag);
            alors(pox, resultat, tableauTemporaire);
          }
          else
            if (i === 1 || i === 2) {
              var pox = game.dominos.pox(x, y, i, j, s2,"occupée", ag);
              alors(pox, resultat, tableauTemporaire);
          }
        }
      }
  if (tableauTemporaire.length != 0) {
    var index = 0;
    var len = game.dominos.board.length;
    if (resultat == "end") {
    for (var i = len; i < len+8; i++) {
      game.dominos.board[i] = tableauTemporaire[index];
      index++;
    }
  }
  else
    if (resultat == "startdown") {
      for (var i = 0; i < tableauTemporaire.length; i++) {
        game.dominos.board.unshift(tableauTemporaire[i]);
      }
    }
  }

}

game.dominos.FixPosHoriStart = function(x, y, s1, s2, lien, ag, par, fnct1, fnct2) {
  var Ystart = parseInt(game.dominos.board[0].getAttribute("pos-y"));
  var Xstart = parseInt(game.dominos.board[0].getAttribute("pos-x"));
  var Ycomp = parseInt(game.dominos.board[7].getAttribute("pos-y"));
  var Xcomp = parseInt(game.dominos.board[7].getAttribute("pos-x"));
  var Yend = parseInt(game.dominos.board[game.dominos.board.length-1].getAttribute("pos-y"));
  var Xend = parseInt(game.dominos.board[game.dominos.board.length-1].getAttribute("pos-x"));
  var angleStart = parseInt(game.dominos.board[0].getAttribute("ag"));
  var angleEnd = parseInt(game.dominos.board[game.dominos.board.length-1].getAttribute("ag"));
  if (angleStart === 0 || angleStart === 180) {
    if (Ystart < Ycomp) {
      if (x < (Xstart+1) && y > (Ystart-1)) {
      game.dominos.tcheck(Xstart, Ystart, -18, -38, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2);
    }
  else
    if (x < (Xstart+1) && y < (Ystart)) {
      game.dominos.tcheck(Xstart, Ystart, -38, -18, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2);
    }
  else
    if (x > Xstart && y > (Ystart-1)) {
      game.dominos.tcheck(Xstart, Ystart, -18, 22, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;
    }
  else
    if (x > (Xstart) && y < (Ystart)) {
      game.dominos.tcheck(Xstart, Ystart, -38, 2, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;
    }
    }
    if (Ystart > Ycomp) {
      if (x < Xstart && y > (Ystart-1)) {
      game.dominos.tcheck(Xstart, Ystart, -8, -28, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2);
    }
  else
    if (x < Xstart && y < (Ystart)) {
      game.dominos.tcheck(Xstart, Ystart, -28, -48, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2);
    }
  else
    if (x > (Xstart-1) && y > (Ystart-1)) {
      game.dominos.tcheck(Xstart, Ystart, -8, -8, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;
    }
  else
    if (x > (Xstart-1) && y < (Ystart)) {
      game.dominos.tcheck(Xstart, Ystart, -28, 12, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;
    }
    }
  }
else
  if (angleStart === 90 || angleStart === 270) {
    if(Xstart < Xcomp) {
      game.dominos.tcheck(Xstart, Ystart, -18, -38, s1, s2, lien, ag, "start", "cas1", par, fnct1, fnct2);
    }
    if(Xstart > Xcomp) {
      game.dominos.tcheck(Xstart, Ystart, -28, +12, s1, s2, lien, ag, "startdown", "cas2", par, fnct1, fnct2) ;
    }
  }
}

