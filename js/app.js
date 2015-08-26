var fn = {

    actividades: null,
    numActividades: 3,

	init: function(){

        $("html").find("div.page").addClass("inactive");
        $("html").find("div.page#principal").removeClass("inactive").addClass("active");

		$("#ingresar").click(fn.login);

        $(".signout").click(fn.logout);

        $("#verNosotros").click(fn.nosotros);
        
        // Este es la accion para cuando se compile
        $("#tomarFoto").click(mc.start);

        //Se sustituye la accion de arriba solo para hacer pruebas
        //$("#tomarFoto").click(fn.pruebaFoto);

        $("#verificarProceso").click(fn.verificarProceso);

        $("#cancelarProceso").click(fn.cancelarProceso);

	},

	deviceready: function(){
		document.addEventListener("deviceready", fn.init, false);
    },

    login: function(){
    	var password = $("#password").val();

        // Verificar datos existentes en la BD
        if(password == "demo"){
        	console.log("Haciendo login...");

            // cargar los datos del proceso
            // de acuerdo al usuario
            numActividad = fn.cargarDatos();

            fn.cambiarPagina("#proceso",""+numActividad+"");
            $("#password").val("");
        
        }else{
            console.log("Usuario o password incorrecta");
            $("#password").val("");
            $(".usuarioIncorrecto").css("opacity","1");
        }

    }, 

    logout: function(){
        fn.cambiarPagina("#principal");
    }, 

    nosotros: function(){
        fn.cambiarPagina("#nosotros");
    },

    cambiarPagina: function(pagina , numActividad){
        $("html").find("div.page").removeClass("active")
                                  .addClass("inactive");
        $("div"+pagina).addClass("transition active");

        // Si tiene argumento numActividad es porque
        // vamos a agregar el numero de proceso al h2
        if(numActividad){
            $("div"+pagina).find("#numActividad").html(numActividad);
        }
    },

    cargarDatos: function(){
        // cargar los datos de la BD
        // y desplegarlos en la vista de "proceso"
        var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"];

        //var mydata = JSON.parse(data);
        var i;
        for(i=0;i<5;i++){
            if(!data[i].resuelto){
                break;
            }
        }

        date        = new Date();
        fecha       = date.getDate()+" - "+monthNames[date.getMonth()]+" - "+date.getFullYear();
        numActividad  = data[i].numero;
        descripcion = data[i].descripcion;

        $("#datosProceso .fecha").text(fecha);
        $("#datosProceso .descripcion").text(descripcion);

        // retornar el numero de proceso
        return numActividad;
    },

    verificarProceso: function(){
        // Enviar a la BD la foto y la informacion del proceso
        numActividad = $("#numActividad").text();

        data[numActividad-1].resuelto = true;

        // Despues cargar datos del siguiente proceso (si existe)
        // en la pagina proceso y volver a ella.

        numActividad = fn.cargarDatos();

        if(numActividad != fn.numActividades){
            fn.cargadorAjax("#proceso", numActividad);

        }else{
            fn.cargadorAjax("#fin");
            setTimeout(function(){
                fn.cambiarPagina("#principal");
                location.reload();
            },4500);
        }


//------------Estos datos son solo de prueba

        // Sino hay siguiente proceso quiere decir
        // que termino su dia, mostrar pagina de finalizar dia
    },

    cargadorAjax: function(target, activityName){
        
        if(!activityName){
            activityName = null;
        }

        $(".loader").addClass('mostrar').removeClass('escondido');

        setTimeout(function(){
            $(".loader").addClass('escondido').removeClass('mostrar');
            fn.cambiarPagina(target, activityName);
        }, 2000);
    },

    cancelarProceso: function(){

        // en caso de cancelacion solo volver a 
        // la pagina del proceso
        fn.cambiarPagina("#proceso");
    },

    pruebaFoto: function(event){

        numActividad = $("#numActividad").text();

        // desplegar la foto tomada
        $('#fotoTomada').css('background-image', 'url("img/fotoProceso.jpg")');
        fn.cambiarPagina("#fotoProceso", numActividad);

    }
}

$(fn.deviceready);

//fn.init();