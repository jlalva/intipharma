$(function(){
	grillapropietario();
})

function abrirmodal(){
	var idedificio = $("#edificiogeneral").val();
	if(idedificio==0){
		notificacion('error','','Seleccione un edificio para continuar');
		return;
	}
	limpiar();
	modal('modalGuardar','AGREGAR PROPIETARIO','open');
}

function guardarpropietario(){
	var idedificio = $("#edificiogeneral").val();
    var idusuario = $("#idusuario").val();
	var tipo_documeto = $("#tipo_documeto").val();
	var documento = $("#documento").val();
	var nombre = $("#nombre").val();
	var apellido = $("#apellido").val();
	var telefono = $("#telefono").val();
	var correo = $("#correo").val();
	if(tipo_documeto=='D.N.I'){
		if(documento!=''){
			if (documento.length != 8  || isNaN(documento)) {
				alertify.error('El número de D.N.I ingresado es inválido');
				$("#documento").focus();
				return;
			}
		}else{
			alertify.error('El número de DNI es obligatorio');
			$("#documento").focus();
			return;
		}		
	}else{
		if(tipo_documeto=='R.U.C') {
			if (documento.length != 11 || isNaN(documento)) {
				alertify.error('El número de R.U.C ingresado es inválido');
				$("#documento").focus();
				return;
			}else{
				alertify.error('El número de RUC es obligatorio');
				$("#documento").focus();
				return;
			}	
		}else{
			if(documento==''){
				alertify.error('El número de documento es obligatorio');
				$("#documento").focus();
				return;
			}
		}
	}
	$.ajax({
		url:url+'owner/ingresar',
		type:'post',
		data:{idedificio:idedificio,idusuario:idusuario,nombre:nombre,apellido:apellido,telefono:telefono,correo:correo,tipo_documeto:tipo_documeto,documento:documento},
		beforeSend:function(){
			bloquear("#btnguardar",'Cargando...');
		},
		success:function(data){
			if(data==1){
				modal('modalGuardar','','close');
				grillapropietario();
				alertify.success('Datos ingresados correctamente');
			}else{
				if(data==2){
					modal('modalGuardar','','close');
					grillapropietario();
					alertify.success('Datos actualizados correctamente');
				}else{
					if(data==3){
						alertify.warning('El propietario ingresado ya existe');
					}else{
						alertify.error('Error al registrar información');
					}					
				}				
			}
			desbloquear("#btnguardar",'Guardar');
		}
	})
}

function limpiar(){
	$("#idusuario").val(''),
	$("#tipo_documeto").val(0),
	$("#documento").val(''),
	$("#nombre").val(''),
	$("#apellido").val(''),
	$("#telefono").val(''),
	$("#correo").val('')
	$("#btnguardar").attr('disabled',false);
	$("#btnguardar").html('Guardar');
}


function editarpropietario(id){
	desbloquear("#btnguardar",'Guardar');
	$.ajax({
		url:url+'owner/verdatos',
		type:'post',
		data:{id:id},
		dataType:'json',
		success:function(data){
			$("#idusuario").val(data.idusuario),
			$("#nombre").val(data.nombre),
			$("#apellido").val(data.apellido),
			$("#telefono").val(data.telefono),
			$("#correo").val(data.correo),
			$("#tipo_documeto").val(data.tipo_documento),
			$("#documento").val(data.documento)
			modal('modalGuardar','MODIFICAR PROPIETARIO-'+data.nombre,'open');
		}
	})
}

function eliminarpropietario(id){
	$("#idusuario").val(id)
	modal('modalEliminar','CONFIRMAR!!','open');
}

function confirma_eliminar(){
	bloquear("#btneliminar",'Eliminando...');
	var id = $("#idusuario").val()
	$.ajax({
		url:url+'owner/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==1){
				alertify.warning('Registro desabilitado!!');
				modal('modalEliminar','','close');
				grillapropietario();
				desbloquear("#btneliminar","Continuar");
			}else{
				if(data==4){
					alertify.warning('Registro eliminado!!');
					modal('modalEliminar','','close');
					grillapropietario();
					desbloquear("#btneliminar","Continuar");
				}else{
					alertify.error('Error al eliminar!!');
					desbloquear("#btneliminar","Continuar");
				}				
			}
		}
	})
}

function restablecer(id){
	$("#idusuario").val(id)
	modal('modalRestablecer','CONFIRMAR!!','open');
}

function confirma_restablecer(){
	var id = $("#idusuario").val()
	$.ajax({
		url:url+'owner/eliminar',
		type:'post',
		data:{id:id,opcion:2},
		success:function(data){
			if(data==4){
				notificacion('warning','','Registro habilitado!!');
				modal('modalRestablecer','','close');
				changePagination(0);
			}else{
				notificacion('error','','Error al habilitar!!');			
			}
		}
	})
}

function borrar(id){
	$("#idusuario").val(id)
	modal('modalBorrar','CONFIRMAR!!','open');
}

function confirma_borrar(){
	var id = $("#idusuario").val()
	$.ajax({
		url:url+'owner/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==4){
				alertify.error('Registro eliminado!!');
				modal('modalBorrar','','close');
				grillapropietario();
			}else{
				alertify.error('Error al eliminar!!');			
			}
		}
	})
}

function grillapropietario(){
	$.ajax({
		url:url+'owner/grilla',
		success:function(data){
			$("#tabla").html(data);
			tabla();
		}
	})
}

function tabla(){
	$('#grillapropie').DataTable({
		ordering: false,
	    language: {
	        "decimal": "",
	        "emptyTable": "No hay información",
	        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
	        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
	        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
	        "infoPostFix": "",
	        "thousands": ",",
	        "lengthMenu": "Mostrar _MENU_ Entradas",
	        "loadingRecords": "Cargando...",
	        "processing": "Procesando...",
	        "search": "Buscar:",
	        "zeroRecords": "Sin resultados encontrados",
	        "paginate": {
	            "first": "Primero",
	            "last": "Ultimo",
	            "next": "Siguiente",
	            "previous": "Anterior"
	        }
	    }
	});
}