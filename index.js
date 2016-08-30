

function guardarTarea(){

	var miTarea = document.getElementById("id_tarea").value;;

	
	if (localStorage) {
		var indice = Date.now();
	    localStorage.setItem(indice, miTarea);
	    var agregar = localStorage.getItem(indice);

	    mostrarLista(indice);

	} else {

	    alert("No existe localStorage");

	}

	return true;
}

function mostrarLista(indice){
		
		var capa = document.getElementById("lista_tareas");
		var vli = document.createElement("li");
		var vBaja = document.createElement("button");
		var vEdita = document.createElement("button");
		vli.id="li"+indice;
		vli.innerText=localStorage.getItem(indice);
		vBaja.id="Baja"+indice;
		vBaja.onclick=borrar;
		vBaja.innerHTML="Baja";
		vEdita.id="Edita"+indice;
		vEdita.onclick=editar;
		vEdita.innerHTML="Editar";
		vli.appendChild(vBaja);
		vli.appendChild(vEdita);
		capa.appendChild(vli);

	return true;
}

function refrescar_tareas(){
	var x=0;
	// debugger;
	var bandera=0;
	if (localStorage.length>0){
	
		for(x=0;x<localStorage.length;x++){
			var miClave = localStorage.key(x);
			mostrarLista(miClave);
		}
		
	}
}

function limpiarTareas(){
	localStorage.clear();
	document.getElementById("lista_tareas").innerHTML='';
	refrescar_tareas();
	return true;
}

function borrar(){

	var miClave=this.id.substr(4,this.id.length);
	miClave="li"+miClave;
	document.getElementById(miClave).remove();
	localStorage.removeItem(miClave.substr(2,miClave.length));
}

function editar(){
	var nueva_tarea=prompt('Ingrese la nueva descripción de la Tarea');
	var miClave=this.id.substr(5,this.id.length);
	localStorage.removeItem(miClave);
	localStorage.setItem(miClave, nueva_tarea);
	document.getElementById("lista_tareas").innerHTML='';
	refrescar_tareas();
}

refrescar_tareas();