function getElementsByClassName(oElm, strTagName, strClassName){
  /*
      Written by Jonathan Snook, http://www.snook.ca/jonathan
      Add-ons by Robert Nyman, http://www.robertnyman.com
  */
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}
function CalculTotal() {
  var NouveauPrix = getElementsByClassName(document.getElementById("RappelCommande"), "span", "prix");
  var NouveauTotal = 0;
  for (var NP = 0; NP<NouveauPrix.length; NP++) {
    NouveauTotal += parseFloat(NouveauPrix[NP].firstChild.data); // 
  }
  NT = document.createTextNode(NouveauTotal);
  document.getElementById('PrixTotal').replaceChild(NT, document.getElementById('PrixTotal').firstChild);
}

function Commande (selecteur) {
  var ConteneurItem = selecteur.parentNode.parentNode.parentNode;
  var Item = selecteur.name;
  var prix = ConteneurItem.getElementsByTagName("input")[0].value;
  var NbreExemplaires = selecteur.options[selecteur.selectedIndex].value;
  if (NbreExemplaires == '') {
    ConteneurItem.style.backgroundColor = "#fff";
    NbreExemplaires = 0;
  }
  if (NbreExemplaires >= 1) {
    ConteneurItem.style.backgroundColor = "#c2a3cc";
  }

  // singulier ou pluriel pour le texte "exemplaire" ?
  if (NbreExemplaires == 0 || NbreExemplaires == 1 ){var genre = " exemplaire";}
  if (NbreExemplaires > 1) {var genre = " exemplaires";}
  
  // id de l'exemplaire commandé
  var Identifiant = "Item" + Item;
  
  //vérification que l'exemplaire commandé n'existe pas déjà 
  var RappelCommande = document.getElementById('RappelCommande');
  var ItemId = document.getElementById('ListeIdItem').value.split(',');
  for (var i=0; i<ItemId.length; i++) {
    var a = document.getElementById(ItemId[i]);
    if (!a) {continue;}
    if (a.id == Identifiant) {
      a.parentNode.removeChild(a);
    }
  }
  if (NbreExemplaires > 0) {
    var ul = document.createElement("ul");
    ul.id = "ListeVacarmeCommande";
    var li = document.createElement("li");
    var spanPrix = document.createElement("span");
    var spanEuro = document.createElement("span");
    var SsTotal = (NbreExemplaires*prix);
    spanPrix.className = "prix";
    spanEuro.className = "euro";
    li.id = Identifiant;
    var tempPrix = document.createTextNode(SsTotal);
    var tempEuro = document.createTextNode(" \u20AC");
    spanEuro.appendChild(tempEuro);
    spanPrix.appendChild(tempPrix);
    spanPrix.appendChild(spanEuro);
    Item = Item.replace(/Vacarme/i, "Vacarme ");
    var temp = document.createTextNode(Item + " " + NbreExemplaires + genre + " ");
    li.appendChild(temp);
    li.appendChild(spanPrix);
    
//    Le total est-il déjà affiché ?
    if (document.getElementById('Total')) {
      ul = document.getElementById('ListeVacarmeCommande'); // recherche élément ul existant
      ul.appendChild(li);
      CalculTotal();

    }
    else {
      ul.appendChild(li);
      RappelCommande.appendChild(ul);
      // affichage du total
      var pTotal = document.createElement("p");
      var spanTotal = document.createElement("span");
      var spanEuro2 = document.createElement("span");
      var TexteTotal = document.createTextNode("Total (frais de port offerts) : ");
      var PrixTotal = document.createTextNode(SsTotal);
      var Euro = document.createTextNode(" \u20AC");
      spanEuro2.appendChild(Euro);
      pTotal.id = "Total";
      spanTotal.id = "PrixTotal";
      spanTotal.appendChild(PrixTotal);
      pTotal.appendChild(TexteTotal);
      pTotal.appendChild(spanTotal);
      pTotal.appendChild(spanEuro2);
      RappelCommande.appendChild(pTotal);
    }
  }
  if (NbreExemplaires == 0) {
    CalculTotal();
  }
}