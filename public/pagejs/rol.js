$(function(){
	grilla();

	$('input.checkbox-callback').on('ifChecked', function(event) {
			alert('Checked');
	});
	$('input.checkbox-callback').on('ifUnchecked', function(event) {
		alert('Unchecked');
	});
})

function guardar(){
	bloquear("#btnguardar",'Cargando...');
	var idrol = $("#idrol").val();
	var rol = $("#rol").val();
	var rolvalidar = $("#rolvalidar").val();
	if(rol==''){
		alertify.warning('Ingrese el rol');
		$("#rol").focus();
		desbloquear("#btnguardar",'Guardar');
		return;
	}
	if(rolvalidar==rol){
		alertify.warning('No realizó ninguna modificación');
		$("#rol").focus();
		desbloquear("#btnguardar",'Guardar');
		return;
	}
	$.ajax({
		url:url+'rol/ingresar',
		type:'post',
		data:{idrol:idrol,rol:rol},
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
					alertify.error('Error al registrar información');
				}				
			}
			desbloquear("#btnguardar",'Guardar');
		}
	})
}

function abrirmodal(){
	limpiar();
	modal('modalGuardar','AGREGAR ROL','open');
}

function editarrol(id){
	desbloquear("#btnguardar",'Guardar');
	$.ajax({
		url:url+'rol/verdatos',
		type:'post',
		data:{id:id},
		dataType:'json',
		success:function(data){
			$("#idrol").val(data.idrol),
			$("#rol").val(data.rol),
			$("#rolvalidar").val(data.rol)
			$('.errorHandler').hide();
			$(".error").html('');
			modal('modalGuardar','MODIFICAR ROL','open');
		}
	})
}

function restablecer(id){
	$("#idrol").val(id)
	modal('modalRestablecer','CONFIRMAR!!','open');
}

function confirma_restablecer(){
	var id = $("#idrol").val()
	$.ajax({
		url:url+'rol/eliminar',
		type:'post',
		data:{id:id,opcion:2},
		success:function(data){
			if(data==4){
				alertify.warning('Registro habilitado!!');
				modal('modalRestablecer','','close');
				grilla();
			}else{
				alertify.error('Error al habilitar!!');			
			}
		}
	})
}

function eliminarrol(id){
	$("#idrol").val(id)
	modal('modalEliminar','CONFIRMAR!!','open');
}

function confirma_eliminar(){
	var id = $("#idrol").val()
	$.ajax({
		url:url+'rol/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==3){
				alertify.warning('Registro desabilitado!!');
				modal('modalEliminar','','close');
				grilla();
			}else{
				if(data==4){
					alertify.error('Registro eliminado!!');
					modal('modalEliminar','','close');
					grilla();
				}else{
					alertify.error('Error al eliminar!!');
				}				
			}
		}
	})
}

function limpiar(){
	$("#idrol").val(''),
	$("#rol").val(''),
	$("#rolvalidar").val('')
	$("#btnguardar").attr('disabled',false);
	$("#btnguardar").html('Guardar');
	$('.errorHandler').hide();
	$(".error").html('');
}

function acceso(id){
	$("#idrol").val(id)
	$.ajax({
		url:url+'rol/listaacceso',
		type:'post',
		data:{idrol:id},
		dataType:'json',
		success:function(data){
			$("#listaacceso").html(data.cad);
			modal('modalAcceso','ACTUALIZAR ACCESOS-'+data.nombre,'open');
		}
	})
}

function daracceso(idmodulo){
	var idrol = $("#idrol").val();
	if( $('#modulo'+idmodulo).prop('checked') ) {
	    $.post(url+"rol/daracceso",{idmodulo:idmodulo,idrol:idrol}, function(data){});
	}else{
		$.post(url+"rol/quitaracceso",{idmodulo:idmodulo,idrol:idrol}, function(data){});
	}
}

function actualizar(){
	location.reload();
}

function opcioncrud(idpermiso,opcion){
	var crud = '';
	var est = 0;
	switch(opcion){
		case 1:crud='ver';break;
		case 2:crud='editar';break;
		case 3:crud='crear';break;
		case 4:crud='eliminar';break;
	}
	if( $('#'+crud+idpermiso).prop('checked') ) {
		est = 1;
	}
	$.post(url+"rol/opcioncrud",{idpermiso:idpermiso,opcion:opcion,est:est}, function(data){});
}

function borrar(id){
	$("#idrol").val(id)
	modal('modalBorrar','CONFIRMAR!!','open');
}

function confirma_borrar(){
	var id = $("#idrol").val()
	$.ajax({
		url:url+'rol/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==4){
				alertify.warning('Registro eliminado!!');
				modal('modalBorrar','','close');
				grilla();
			}else{
				alertify.error('Error al eliminar!!');			
			}
		}
	})
}

function grilla(){
	$.ajax({
		url:url+'rol/grilla',
		success:function(data){
			$("#tabla").html(data);
			tabla();
		}
	})
}

function tabla(){
	$('#datatable').DataTable({
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