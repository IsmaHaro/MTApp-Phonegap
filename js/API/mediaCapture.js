var mc = {
    captureSuccess: function(mediaFiles) {
        // var i, path, len;
        // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        //     path = mediaFiles[i].fullPath;

            // desplegar la foto tomada

        fn.cambiarPagina("#fotoProceso");
        $('#fotoTomada').css('background-image', 'url("'+mediaFiles[0].fullPath+'")');
        $('#fotoTomada').attr("rel", mediaFiles[0].fullPath);
            
        // }
    },
    captureError: function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    },
    start: function(){
        navigator.device.capture.captureImage(mc.captureSuccess, mc.captureError, {limit:1});
    }
};