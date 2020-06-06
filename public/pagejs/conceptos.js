$(function(){
	grilla();
})

function abrirmodal(){
	var idedificio = $("#edificiogeneral").val();
	if(idedificio==0){
		notificacion('error','','Seleccione un edificio para continuar');
		return;
	}
	limpiar();
	modal('modalGuardar','AGREGAR CONCEPTO','open');
}

function guardar(){
	var idedificio = $("#edificiogeneral").val()
    var idconcepto = $("#idconcepto").val()
	var codigo = $("#codigo").val()
	var concepto = $("#concepto").val()
	var importe = $("#importe").val()
	var idtipoconcepto = $("#idtipoconcepto").val()

	$.ajax({
		url:url+'conceptos/ingresar',
		type:'post',
		data:{idedificio:idedificio,idconcepto:idconcepto,codigo:codigo,concepto:concepto,importe:importe},
		beforeSend:function(){
			bloquear("#btnguardar",'Cargando...');
		},
		success:function(data){
			if(data==1){
				modal('modalGuardar','','close');
				grilla();
				alertify.success('Datos ingresados correctamente');
			}else{
				if(data==2){
					modal('modalGuardar','','close');
					grilla();
					alertify.success('Datos actualizados correctamente');
				}else{
					if(data==3){
						alertify.warning('El código ingresado ya existe');
						$("#codigo").focus();
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
	$("#idconcepto").val('')
	$("#codigo").val('')
	$("#concepto").val('')
	$("#importe").val('0.00')	
}

function editarconcepto(id){
	desbloquear("#btnguardar",'Guardar');
	$.ajax({
		url:url+'conceptos/verdatos',
		type:'post',
		data:{id:id},
		dataType:'json',
		success:function(data){
			$("#idconcepto").val(data.idconcepto),
			$("#codigo").val(data.codigo),
			$("#concepto").val(data.concepto),
			$("#importe").val(data.importe)
			modal('modalGuardar','MODIFICAR COCEPTO-'+data.codigo,'open');
		}
	})
}

function eliminarconcepto(id){
	$("#idconcepto").val(id)
	modal('modalEliminar','CONFIRMAR!!','open');
}

function confirma_eliminar(){
	var id = $("#idconcepto").val()
	$.ajax({
		url:url+'conceptos/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==3){
				alertify.warning('Registro desabilitado!!');
				modal('modalEliminar','','close');
				grilla();
			}else{
				if(data==4){
					alertify.warning('Registro eliminado!!');
					modal('modalEliminar','','close');
					grilla();
				}else{
					alertify.error('Error al eliminar!!');
				}				
			}
		}
	})
}

function restablecer(id){
	$("#idconcepto").val(id)
	modal('modalRestablecer','CONFIRMAR!!','open');
}

function confirma_restablecer(){
	var id = $("#idconcepto").val()
	$.ajax({
		url:url+'conceptos/eliminar',
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
	$("#idconcepto").val(id)
	modal('modalBorrar','CONFIRMAR!!','open');
}

function confirma_borrar(){
	var id = $("#idconcepto").val()
	$.ajax({
		url:url+'conceptos/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==4){
				notificacion('error','','Registro eliminado!!');
				modal('modalBorrar','','close');
				changePagination(0);
			}else{
				notificacion('error','','Error al eliminar!!');			
			}
		}
	})
}

function grilla(){
	$.ajax({
		url:url+'conceptos/grilla',
		success:function(data){
			$("#tabla").html(data);
			tabla();
		}
	})
}

function tabla(){
	$('#grilla').DataTable({
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