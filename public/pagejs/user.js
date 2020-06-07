$(function(){
	grilla();
})

function guardar(){
	var idusuario = $("#idusuario").val();
	var nombre = $("#nombre").val();
	var apellido = $("#apellido").val();
	var usuario = $("#usuario").val();
	var password = $("#password").val();
	var idrol = $("#idrol").val();
	if(nombre==''){
		alertify.error("Ingrese el nombre del usuario");
		$("#nombre").focus();
		return;
	}
	if(apellido==''){
		alertify.error("Ingrese el apellido del usuario");
		$("#apellido").focus();
		return;
	}
	if(usuario==''){
		alertify.error("Ingrese el usuario");
		$("#usuario").focus();
		return;
	}
	if(password==''){
		alertify.error("Ingrese el password");
		$("#password").focus();
		return;
	}
    if(idrol==0){
		alertify.error('Seleccione el rol del usuario');
		return;
	}
    $.ajax({
		url:url+'user/ingresar',
		type:'post',
		data:{idusuario:idusuario,nombre:nombre,apellido:apellido,usuario:usuario,password:password,idrol:idrol},
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
						alertify.warning('El usuario ingresado ya existe');
						$("#usuario").val('');
						$("#usuario").focus();
					}else{
						alertify.error('Error al registrar datos');
					}					
				}				
			}
			desbloquear("#btnguardar",'Guardar');
		}
	})
}

function abrirmodal(){
	limpiar();
	modal('modalGuardar','AGREGAR USUARIO','open');
}

function limpiar(){
	$("#idusuario").val(''),
	$("#nombre").val(''),
	$("#apellido").val(''),
	$("#usuario").val(''),
	$("#password").val(''),
	$("#idrol").val(0)
	$("#usuario").attr('readonly',false);
	$("#password").attr('readonly',false);
	$("#btnguardar").attr('disabled',false);
	$("#btnguardar").html('Guardar');
	$('.errorHandler').hide();
	$(".error").html('');
}


function editarusuario(id){
	desbloquear("#btnguardar",'Guardar');
	$.ajax({
		url:url+'user/verdatos',
		type:'post',
		data:{id:id},
		dataType:'json',
		success:function(data){
			$("#idusuario").val(data.idusuario),
			$("#nombre").val(data.nombre),
			$("#apellido").val(data.apellido),
			$("#usuario").val(data.usuario),
			$("#password").val('xxxxxx'),
			$("#idrol").val(data.idrol)
			$("#usuario").attr('readonly',true);
			$("#password").attr('readonly',true);
			$('.errorHandler').hide();
			$(".error").html('');
			modal('modalGuardar','MODIFICAR USUARIO-'+data.usuario,'open');
		}
	})
}

function eliminarusuario(id){
	$("#idusuario").val(id)
	modal('modalEliminar','CONFIRMAR!!','open');
}

function confirma_eliminar(){
	var id = $("#idusuario").val()
	$.ajax({
		url:url+'user/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==3){
				alertify.warning('Registro eliminado!!');
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
	$("#idusuario").val(id)
	modal('modalRestablecer','CONFIRMAR!!','open');
}

function confirma_restablecer(){
	var id = $("#idusuario").val()
	$.ajax({
		url:url+'user/eliminar',
		type:'post',
		data:{id:id,opcion:2},
		success:function(data){
			if(data==4){
				alertify.error('Registro habilitado!!');
				modal('modalRestablecer','','close');
				grilla();
			}else{
				alertify.error('Error al habilitar!!');			
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
		url:url+'user/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==4){
				alertify.error('Registro eliminado!!');
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
		url:url+'user/grilla',
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