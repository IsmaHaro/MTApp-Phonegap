var mc = {
    captureSuccess: function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;

            // desplegar la foto tomada
            $('#fotoTomada').css('background-image', 'url("'+path+'")');
            $('#fotoTomada').attr("rel", path);
            
        }
    },
    captureError: function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    },
    start: function(){
        fn.cambiarPagina("#fotoProceso");
        navigator.device.capture.captureImage(mc.captureSuccess, mc.captureError, {limit:1});
    }
};