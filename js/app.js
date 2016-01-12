var fn = {

    actividades: null,
    numActividades: 3,
    numActividad: null,
	init: function(){

        $("div.page").addClass("inactive");
        $("div.page#principal").removeClass("inactive").addClass("active");

		$("#ingresar").click(fn.login);

        $(".menu-bars").click(fn.menu);

        $('html').click(function(e) {
            if(!$(e.target).hasClass('menu-bars')){
console.log(e.target);
                $(".menu").addClass('hidden').removeClass('visible');
            }
            
        });

        $('.menu').click(function(event){
            event.stopPropagation();
        });

        $(".menu").on('clickoutside touchendoutside', function () {
console.log("OUTSIDE");
            if (!($this.hasClass('hidden'))) { 
                $this.addClass('hidden'); 
            }
        });

        $(".signout").click(fn.logout);

        $("#verNosotros").click(fn.nosotros);
        
        // Este es la accion para cuando se compile
        //$("#tomarFoto").click(mc.start);

        //Se sustituye la accion de arriba solo para hacer pruebas
        $("#tomarFoto").click(fn.pruebaFoto);

        $("#verificarProceso").click(fn.verificarProceso);

        $("#cancelarProceso").click(fn.cancelarProceso);

	},

    menu: function(){
        $menu = $(".menu");
        if($menu.hasClass('hidden')){
            $menu.removeClass('hidden').addClass('visible');

        }else{
            $menu.removeClass('visible').addClass('hidden');
        }
    },

	deviceready: function(){
		document.addEventListener("deviceready", fn.init, false);
    },

    login: function(){
    	var password = $("#password").val();

        // Verificar datos existentes en la BD
        if(password == "demo"){
            // cargar los datos del proceso
            // de acuerdo al usuario
            fn.cargarDatos();

            $(".numActividad").html(fn.numActividad);
            fn.cambiarPagina("#proceso");
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
        $("div.page").removeClass("active transition")
                     .addClass("inactive");
        $("div"+pagina).addClass("transition active");

        // Si tiene argumento numActividad es porque
        // vamos a agregar el numero de actividad al h2
        if(numActividad){
            $(".numActividad").html(numActividad);
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
        fn.numActividad  = data[i].numero;
        descripcion = data[i].descripcion;

        $("#datosProceso .fecha").text(fecha);
        $("#datosProceso .descripcion").text(descripcion);

        // retornar el numero de proceso
        return fn.numActividad;
    },

    verificarProceso: function(){
        // Enviar a la BD la foto y la informacion del proceso
        data[fn.numActividad-1].resuelto = true;

        // Despues cargar datos del siguiente proceso (si existe)
        // en la pagina proceso y volver a ella.

        fn.cargarDatos();

        if(fn.numActividad != fn.numActividades){
            fn.cargadorAjax("#proceso",fn.numActividad);

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

        // desplegar la foto tomada
        $('#fotoTomada').css('background-image', 'url("img/fotoProceso.jpg")');
        $(".numActividad").html(fn.numActividad);
        fn.cambiarPagina("#fotoProceso");

    }
}

//$(fn.deviceready);

fn.init();