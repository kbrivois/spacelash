var parametrageNiveau=

  [
		{
				id:"1",
				Ennemis:[
					{
						vitesse:1,
						rotation:0.1
					},
					{
						vitesse:2,
						rotation:0.2
					}
				],
				aireForme:56,
				Points:[
					{
						x:50,
						y:50
					},
					{
						x:250,
						y:50
					},
					{
						x:180,
						y:175
					},
					{
						x:250,
						y:300
					},
					{
						x:50,
						y:300
					},
					{
						x:120,
						y:175
					},
					{
						x:50,
						y:50
					}
					
				]
				
				
		},
		{
				id:"2",
				
				Ennemis:[
					{
						vitesse:1,
						rotation:0.1
					},
					{
						vitesse:2,
						rotation:0.2
					}
				],
				aireForme:56,
				Points:[
					{
						x:0,
						y:300
					},
					{
						x:150,
						y:0
					},
					{
						x:300,
						y:300
					},
					{
						x:150,
						y:150
					},
					{
						x:150,
						y:300
					},
					{
						x:75,
						y:200
					},
					{
						x:0,
						y:300
					}
					
				]
		}
		,
		{
				id:"3",
				
				Ennemis:[
					{
						vitesse:1,
						rotation:0.1
					},
					{
						vitesse:2,
						rotation:0.2
					}
				],
				aireForme:56,
				Points:[
					{
						x:0,
						y:300
					},
					{
						x:150,
						y:0
					},
					{
						x:300,
						y:300
					},
					{
						x:150,
						y:150
					},
					{
						x:150,
						y:300
					},
					{
						x:75,
						y:200
					},
					{
						x:0,
						y:300
					}
					
				]
		}
	];

var indexedDB=window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
/**
 * fonction chargée de créer la base de donnée si elle n'existe pas
 * ou si elle nécessite une mise à jour.
 * Appellée sur le onupgradeneeded à l'ouverture de la base
 */
function createDatabase(event) {
    var db = event.target.transaction.db;
    
    var sauvegardeStore = db.createObjectStore("sauvegarde",{keyPath: "id"});
	var NiveauStore = db.createObjectStore("niveaux",{keyPath: "id"});
	for (var i in parametrageNiveau) {
        NiveauStore.add(parametrageNiveau[i]);   
    }

}

/**
 * le callback quand il y a une erreur à l'ouverture
 */
function errorOpen(event) {
    window.alert("Erreur ouverture !");
}


/**
 * .
 * ajoute ou remplace une sauvegarde dans la base
 */
function saveSauvegarde(id,score,aire) {
    // création d'un objet contenant les données
    // il sert d'"enregistrement" dans la base
    var sauvegarde = {
		id:id,
        score:  score,
        aireMinimaleAtteinte:   aire
    }

    // on ouvre la base, et on déclare les listeners
    var request = indexedDB.open("spacelash2", 1);
    request.onerror = errorOpen;
    request.onupgradeneeded = createDatabase;

    request.onsuccess = function(event) {
        // ici la base a été ouverte avec succés, il faut ajouter l'enregistrement

        // on récupère l'objet database
        var db = event.target.result; 

        // on ouvre une transaction qui permettra d'effectuer
        // les opérations sur la base
        var transaction = db.transaction(["sauvegarde"], "readwrite");
        transaction.oncomplete = function(event) {
            //displayList(db);
            window.alert("Transaction terminée, sauvegarde effectuée");
        };

        transaction.onerror = function(event) {
           window.alert('erreur de transaction ');
        };

        // on récupère l'object store dans lequel on veut stocker l'objet
        var sauvegardeStore = transaction.objectStore("sauvegarde");

        // on créé l'ordre d'ajouter un enregistrement
        // sera effectivement executé lors de la fermeture de la transaction
        var req = sauvegardeStore.put(sauvegarde);
        req.onsuccess = function(event) {
            
        }
        req.onerror = function(event) {
            window.alert('erreur ajout');
        }
    }
}

function readNiveau(idNiveau) {

	// on ouvre la base, et on déclare les listeners
    var request = indexedDB.open("spacelash2", 1);
	var resultat="";
    request.onerror = errorOpen;
    request.onupgradeneeded = createDatabase;

    request.onsuccess = function(event) {
        // ici la base a été ouverte avec succés, il faut ajouter l'enregistrement

        // on récupère l'objet database
        var db = event.target.result; 
		
        // on ouvre une transaction qui permettra d'effectuer
        // les opérations sur la base
        var transaction = db.transaction(["niveaux"], "readwrite");
        transaction.oncomplete = function(event) {
            window.alert("Transaction terminée, sauvegarde effectuée");
        };

        transaction.onerror = function(event) {
           window.alert('erreur de transaction ');
        };

        // on récupère l'object store dans lequel on veut stocker l'objet
        var sauvegardeStore = transaction.objectStore("niveaux");

        // on créé l'ordre d'ajouter un enregistrement
        // sera effectivement executé lors de la fermeture de la transaction
        var req = sauvegardeStore.get(idNiveau);

        req.onsuccess = function(event) {
            if(req.result) {
			resultat= req.result;
			//alert("in: "+resultat.Ennemis[0].rotation);
			oNiveauPartie = resultat;
			} 
			else {
			alert("Bug");  
			}
        }

        req.onerror = function(event) {
            window.alert('erreur ajout');
        }

    }

	
	
}


function readAllNiveau(){

	// on ouvre la base, et on déclare les listeners
    var request = indexedDB.open("spacelash2", 1);
	var resultat="";
    request.onerror = errorOpen;
    request.onupgradeneeded = createDatabase;

    request.onsuccess = function(event) {
	var db = event.target.result; 
	// on ouvre une transaction qui permettra d'effectuer
    // la lecture. uniquement de la lecture -> "readonly"
    var transaction = db.transaction(["niveaux"], "readonly");
    transaction.oncomplete = function(event) {};
    transaction.onerror = function(event) {
       window.alert('erreur de transaction lecture ');
    };

   

    // on récupère l'object store que l'on veut lire
    var niveauStore = transaction.objectStore("niveaux");
    niveauStore.openCursor().onsuccess = function (event) {

    var cursor = event.target.result;
        if (cursor) {
		
            oNiveauPartie.push(cursor.value); // un niveau
			//alert("Dedans "+oNiveauPartie.length);

            cursor.continue();
        }
		
    }
	//alert("Dehors "+oNiveauPartie.length);

}

}



/**
 * fonction qui efface tout le contenu de la base, quand on
 * clique sur le bouton "effacer" de la page
 */
function deleteAllRecords() {
    // on ouvre la base, et on déclare les listeners
    var request = indexedDB.open("spacelash2", 1);
    request.onerror = errorOpen;
    request.onupgradeneeded = createDatabase;

    request.onsuccess = function(event) {
        var db = event.target.result;

        // on ouvre une transaction qui permettra d'effectuer la suppression
        var transaction = db.transaction(["sauvegarde"], "readwrite");
        transaction.oncomplete = function(event) {displayList(db);};
        transaction.onerror = function(event) {
           window.alert('erreur de transaction suppression');
        };

        var sauvegardeStore = transaction.objectStore("sauvegarde");
        var req = sauvegardeStore.clear();
        req.onsuccess = function(event) {
        }
        req.onerror = function(event) {
            window.alert('erreur suppression');
        }
    }
}






