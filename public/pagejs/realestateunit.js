$(function(){
	grilla();

	$("#m2_ui").blur(function(){
		var idedificio = $("#edificiogeneral").val();
		if(idedificio!=0){
			var m2_ui = $("#m2_ui").val();
			if(m2_ui!=''){
				$.ajax({
					url:'realestateunit/mtotal',
					type:'post',
					data:{idedificio:idedificio},
					success:function(data){
						var area_total = data;	    	
			    		var porcen = parseFloat(m2_ui)*100;
						porcen = parseFloat(porcen)/parseFloat(area_total);
						$("#porcentaje").val(porcen.toFixed(2))
					}
				})	
	    	}
		}else{
			notificacion('warning','',"No se ha seleccionado un edificio");
			return;
		}    	
	});
});

function guardarui(){
	var id_ui = $("#id_ui").val();
	var idedificio = $("#edificiogeneral").val();
	var id_tipo_ui = $("#id_tipo_ui").val();
	var m2_ui = $("#m2_ui").val();
	var nombre_ui = $("#nombre_ui").val();
	var porcentaje = $("#porcentaje").val();

	if(idedificio==0){
		alertify.error('Seleccione el edificio general');
		return;
	}

	if(id_tipo_ui==0){
		alertify.error('Seleccione el tipo de inmueble');
		return;
	}

	if(nombre_ui==''){
		alertify.error('Ingrese el nombre de la unidad');
		$("#nombre_ui").focus();
		return;
	}

	if(m2_ui==''){
		alertify.error('Ingrese los metros cuadrados de la unidad');
		$("#m2_ui").focus();
		return;
	}

	$.ajax({
		url:url+'realestateunit/ingresar',
		type:'post',
		data:{id_ui:id_ui,idedificio:idedificio,id_tipo_ui:id_tipo_ui,m2_ui:m2_ui,nombre_ui:nombre_ui,
			porcentaje:porcentaje
		},
		beforeSend:function(){
			bloquear("#btndepar",'Cargando...');
		},
		success:function(data){
			if(data==1){
				modal('modalGuardar','','close');
				notificacion('success','','Datos ingresados correctamente');
				limpiar();
				changePagination(0);
			}else{
				if(data==2){
					modal('modalGuardar','','close');
					notificacion('success','','Datos actualizados correctamente');
					limpiar();
					changePagination(0);
				}else{
					if(data==3){
						notificacion('warning','','El nombre de departamento ya existe en el edificio.');	
					}else{
						notificacion('error','','Error al registrar información');	
					}									
				}				
			}
			desbloquear("#btndepar",'Guardar');
		}
	})
}

function abrirmodal(){
	limpiar();
	modal('modalGuardar','AGREGAR UNIDAD INMOBILIARIA','open');
}

function limpiar(){
	$("#id_ui").val('')
	$("#id_tipo_ui").val(0)
	$("#m2_ui").val('')
	$("#numero_ui").val('')
	$("#nombre_ui").val('')
	$("#porcentaje").val('')
	desbloquear("#btndepar",'Guardar');
}

function datosui(){
	var idedificio = $("#edificiogeneral").val();
	var id_tipo_ui = $("#id_tipo_ui").val();
	if(idedificio==0){
		notificacion('warning','',"No se ha seleccionado un edificio");
		return;
	}
	if(id_tipo_ui!=0){
		$.ajax({
			url:'realestateunit/nombreui',
			type:'post',
			data:{idedificio:idedificio,tipo:id_tipo_ui},
			dataType:'json',
			success:function(data){
				$("#nombre_ui").val(data.nombre)
			}
		})
	}
}

function editar(id){
	desbloquear("#btnguardar",'Guardar');
	$.ajax({
		url:url+'realestateunit/verdatos',
		type:'post',
		data:{id:id},
		dataType:'json',
		success:function(data){
			$("#id_ui").val(data.id_ui)
			$("#idinmueble").val(data.idinmueble)
			$("#id_tipo_ui").val(data.id_tipo_ui)
			$("#m2_ui").val(data.m2_ui)
			$("#nombre_ui").val(data.nombre_ui)
			$("#porcentaje").val(data.porcentaje)
			modal('modalGuardar','MODIFICAR UNIDAD INMOBILIARIA','open');
		}
	})
}

function eliminar(id){
	$("#id_ui").val(id)
	modal('modalEliminar','CONFIRMAR!!','open');
}

function confirma_eliminar(){
	var id = $("#id_ui").val()
	$.ajax({
		url:url+'realestateunit/eliminar',
		type:'post',
		data:{id:id,opcion:0},
		success:function(data){
			if(data==3){
				notificacion('warning','','Registro desabilitado!!');
				modal('modalEliminar','','close');
				changePagination(0);
			}else{
				if(data==4){
					notificacion('warning','','Registro eliminado!!');
					modal('modalEliminar','','close');
					changePagination(0);
				}else{
					notificacion('error','','Error al eliminar!!');
				}				
			}
		}
	})
}

function restablecer(id){
	$("#id_ui").val(id)
	modal('modalRestablecer','CONFIRMAR!!','open');
}

function confirma_restablecer(){
	var id = $("#id_ui").val()
	$.ajax({
		url:url+'realestateunit/eliminar',
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

function exportarexcel(){
	urls =url+'realestateunit/exportarexcel';
	$(location).attr('href',urls);
}

function borrar(id){
	$("#id_ui").val(id)
	modal('modalBorrar','CONFIRMAR!!','open');
}

function confirma_borrar(){
	var id = $("#id_ui").val()
	$.ajax({
		url:url+'realestateunit/eliminar',
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
		url:url+'realestateunit/grilla',
		success:function(data){
			$("#tabla").html(data);
			tabla();
		}
	})
}

function tabla(){
	$('#grillaui').DataTable({
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