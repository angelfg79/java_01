

// function guardarTarea(){

// 	var miTarea = document.getElementById("id_tarea").value;

	
// 	if (localStorage) {
// 		var indice = Date.now();
// 	    localStorage.setItem(indice, miTarea);
// 	    var agregar = localStorage.getItem(indice);

// 	    mostrarLista(indice);

// 	} else {

// 	    alert("No existe localStorage");

// 	}

// 	return true;
// }

function guardarTarea(){

	var vFecha = document.getElementById("id_fechaTarea").value;
	var vTarea = document.getElementById("id_tarea").value;
	var vEstado = document.getElementById("id_combo").value;

	var miTarea = new tarea(vFecha,vTarea,vEstado);

	if (localStorage) {
		var miTareaEditada =JSON.parse(localStorage.getItem("editado"));
	    if (miTareaEditada===null){

		    localStorage.setItem(miTarea.id, JSON.stringify({"id":miTarea.id,"fecha":miTarea.fecha,"descripcion":miTarea.descripcion,"estado":miTarea.estado}));

		    mostrarLista(miTarea.id);
		    inicializar_Valores("","","");

		} else{

			localStorage.removeItem(miTareaEditada.id);
			localStorage.removeItem("editado");
		    localStorage.setItem(miTareaEditada.id, JSON.stringify({"id":miTareaEditada.id,"fecha":miTarea.fecha,"descripcion":miTarea.descripcion,"estado":miTarea.estado}));
		    document.getElementById("lista_tareas").innerHTML='';
		    refrescar_tareas();
		    inicializar_Valores("","","");

		}

	} else {

	    alert("No existe localStorage");

	}

	return true;
}

function tarea(vFecha,vTarea,vEstado){
	this.id=Date.now();
	this.fecha=vFecha;
	this.descripcion=vTarea;
	this.estado=vEstado;
}

function inicializar_Valores(vFecha,vTarea,vEstado){
	
	var vid_fechaTarea=document.getElementById("id_fechaTarea");
	vid_fechaTarea.value= vFecha;
	var vid_tarea=document.getElementById("id_tarea");
	vid_tarea.value=vTarea;
	var vid_combo=document.getElementById("id_combo");
	vid_combo.value=vEstado;
}

function mostrarLista(indice){
	
		var capa = document.getElementById("lista_tareas");
		var vli = document.createElement("li");
		var vBaja = document.createElement("button");
		var vEdita = document.createElement("button");
		var vspan1 = document.createElement("span");
		var vspan2 = document.createElement("span");
		var miTarea =JSON.parse(localStorage.getItem(indice));

		vspan1.id="fecha"+indice;
		vspan1.innerText=miTarea.fecha;
		vspan2.id="estado"+indice;
		vspan2.innerText=miTarea.estado;
	
		vli.id="li"+indice;
		// vli.innerText=localStorage.getItem(indice);
		vli.innerText=miTarea.descripcion;

		vBaja.id="Baja"+indice;
		vBaja.onclick=borrar;
		vBaja.innerHTML="Baja";
		vEdita.id="Edita"+indice;
		vEdita.onclick=editar;
		vEdita.innerHTML="Editar";
		vli.appendChild(vspan1);
		vli.appendChild(vspan2);
		vli.appendChild(vEdita);
		vli.appendChild(vBaja);
		// vli.appendChild(crearCombo(indice));
		// vli.appendChild(crearBoton(indice,"Editar"));
		// vli.appendChild(crearBoton(indice,"Borrar"));
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

// function crearCombo(indice){
// 	var vCombo = document.createElement("select");
// 	var vOpcion1 = document.createElement("option");
// 	var vOpcion2 = document.createElement("option");
// 	var vOpcion3 = document.createElement("option");
// 	vOpcion1.value="Cerrada";
// 	vOpcion1.innerText="Cerrada";
// 	vOpcion2.value="Iniciada";
// 	vOpcion2.innerText="Iniciada";
// 	vOpcion3.value="Pendiente";
// 	vOpcion3.innerText="Pendiente";
// 	vCombo.id="combo"+indice;
// 	vCombo.appendChild(vOpcion1);
// 	vCombo.appendChild(vOpcion2);
// 	vCombo.appendChild(vOpcion3);
// 	return vCombo;
// }

// function crearBoton(indice,accion){
// 	debugger;
// 	var vBoton = document.createElement("button");
// 	vBoton.id=accion+indice;
// 	vBoton.onclick=accion;
// 	vBoton.innerHTML=accion;
// 	return vBoton
// }

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
	// var nueva_tarea=prompt('Ingrese la nueva descripción de la Tarea');
	var miClave=this.id.substr(5,this.id.length);
	var miTarea =JSON.parse(localStorage.getItem(miClave));
	inicializar_Valores(miTarea.fecha,miTarea.descripcion,miTarea.estado)
	localStorage.setItem("editado", JSON.stringify({"id":miTarea.id,"fecha":miTarea.fecha,"descripcion":miTarea.descripcion,"estado":miTarea.estado}));
	// localStorage.removeItem(miClave);
	// localStorage.setItem(miClave, nueva_tarea);
	// document.getElementById("lista_tareas").innerHTML='';
	// refrescar_tareas();
}

function filtrar_Estado(){
	var vfiltro=document.getElementById("id_combo_filtro").value;

	document.getElementById("lista_tareas").innerHTML='';

	var x=0;
	// debugger;
	var bandera=0;
	if (localStorage.length>0){
	
		for(x=0;x<localStorage.length;x++){
			var miClave = JSON.parse(localStorage.getItem(localStorage.key(x)));
			if (vfiltro===miClave.estado){
				mostrarLista(miClave.id);
			}

		}
		
	}
	return true;
}	 

function quitar_filtro() {
	document.getElementById("lista_tareas").innerHTML='';
	refrescar_tareas();	
}

// $( function() {
//     $( "#id_fechaTarea" ).datepicker();
//   } );

function formatear_fecha(vFecha){
	var vano = vFecha.getFullYear().toString();
	var vmes = (vFecha.getMonth().toString().length===1 ? '0'+vFecha.getMonth().toString() : vFecha.getMonth().toString());
	var vdia = (vFecha.getDate().toString().length===1 ? '0'+vFecha.getDate().toString() : vFecha.getDate().toString());
	return vano+'-'+vmes+'-'+vdia;	
}
refrescar_tareas();
var vhoy = new Date();
inicializar_Valores(formatear_fecha(vhoy),"","");