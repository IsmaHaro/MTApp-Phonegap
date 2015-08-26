<?php
	if(isset($_POST["action"])){
		switch($_POST["action"]){
			case "GetData":
				echo '[{"workStation":"ENSAMBLE DE MECANISMOS","date":"'.date("m/d/y").'","turn":"1","procedure":"Quemacocos A7","operation":"20","machine":"10A","activity":"Limpieza general de herramentales, mangueras, mesa de trabajo, contenedores de material etc..."},{"workStation":"ENSAMBLE DE MECANISMOS","date":"'.date("m/d/y").'","turn":"1","procedure":"Quemacocos A7","operation":"20","machine":"10A","activity":"Verificar que no existan fugas de aire en manqueras, valvulas o pistones."},{"workStation":"ENSAMBLE DE MECANISMOS","date":"'.date("m/d/y").'","turn":"1","procedure":"Quemacocos A7","operation":"20","machine":"10A","activity":"Verificar que lamparas de luz normal no se encuentren fundidas o parpadeando."},{"workStation":"ENSAMBLE DE MECANISMOS","date":"'.date("m/d/y").'","turn":"1","procedure":"Quemacocos A7","operation":"20","machine":"10A","activity":"Verificar funcionamiento de sensores bimanuales y tambien que se encuentren apretados y bien posicionados."},{"workStation":"ENSAMBLE DE MECANISMOS","date":"'.date("m/d/y").'","turn":"1","procedure":"Quemacocos A7","operation":"20","machine":"10A","activity":"Realizar verificación de tapetes, que no se encuentren rotos y que no se encuentren empalmados"},{"workStation":"ENSAMBLE DE MECANISMOS","date":"'.date("m/d/y").'","turn":"1","procedure":"Quemacocos A7","operation":"20","machine":"10A","activity":"Registrar Presion de presostato 87 +/- 7 PSI"},{"workStation":"ENSAMBLE DE MECANISMOS","date":"'.date("m/d/y").'","turn":"1","procedure":"Quemacocos A7","operation":"20","machine":"10A","activity":"Revisar correcto funcionamiento de paro de emergencia"},{"workStation":"ENSAMBLE DE MECANISMOS","date":"'.date("m/d/y").'","turn":"1","procedure":"Quemacocos A7","operation":"20","machine":"10A","activity":"Verificar que clamps se encuentren ajustados y bien posicionados."}]';
				break;
			case "UploadData":
				echo '1';
				break;
			case "UploadImage":
				$ruta_destino = 'fotos/';
				if(move_uploaded_file($_FILES['foto']['tmp_name'], $ruta_destino.$_FILES
		['foto']['name'].'.jpg'))
					echo 1;
				else
					echo 0;
				break;
		}
	}else{
?>
<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		
		<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script>
			$(function(){
				$.ajax({
					method: "POST",
					url: "testapp.aspx",
					data: { action: "GetData" }
				}).done(function( msg ) {
					//msg = JSON.parse(msg);
					alert( msg );
				});
			});
		</script>
	</body>
</html>
<?php
	}
?>