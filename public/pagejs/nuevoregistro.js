$(function(){

});

function departamento(id){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'nuevoregistro/selectdepartamento',
		type:'post',
		data:{id:id,tipo:1,idedificio:idedificio},
		success:function(data){
			$("#mdepartamento").html(data);
		}
	})
}

function almacen(id,x = false){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'nuevoregistro/selectdepartamento',
		type:'post',
		data:{id:id,tipo:2,idedificio:idedificio},
		success:function(data){
			if(x==false || x==1){
				$("#mestacionamiento").html(data);
			}else{
				$("#mestacionamiento").html(data);
				for (var i = 2; i <= parseFloat(x); i++) {
					$("#mestacionamiento"+i).html(data);
				}				
			}			
		}
	})
}

function deposito(id,x=false){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'nuevoregistro/selectdepartamento',
		type:'post',
		data:{id:id,tipo:3,idedificio:idedificio},
		success:function(data){
			if(x==false){
				$("#mdeposito").html(data);
			}else{
				$("#mdeposito").html(data);
				for (var i = 2; i <= parseFloat(x); i++) {
					$("#mdeposito"+i).html(data);
				}				
			}			
		}
	})
}

function limpiar(){
	$("#idinmueble").val('')
	$("#nombre_edificio").val('')
	$("#area_total").val('')
	$("#presupuesto_mensual").val('')
	$("#direccion").val('')
	$("#observacion").val('')
	$("#tipo_asignacion").val(0)
}

function grabaredificio(){
	var idedificio = 0;
	var nombre_edificio = $("#nombre_edificio").val();
	var direccion = $("#direccion").val();
	var partida_registral = $("#partida_registral").val();
	var ppto_mensual = $("#ppto_mensual").val();
	var tipo_ppto = $('input:radio[name=tipo_ppto]:checked').val();
	var area_total = $("#area_total").val();
	var condicion = $('input:radio[name=condicion]:checked').val();
	var nro_departamento = $("#nro_departamento").val();
	var nro_estacionamiento = $("#nro_estacionamiento").val();
	var nro_depositos = $("#nro_depositos").val();
	var siglas = $("#siglas").val();
	if(nombre_edificio==''){
		alertify.error('Ingrese el nombre del edificio');
		$("#nombre_edificio").focus();
		return;
	}
	if(direccion==''){
		alertify.error('Ingrese la dirección del edificio');
		$("#direccion").focus();
		return;
	}
	if(nro_departamento==''){
		notificacion.error('Ingrese el nro de departamentos');
		$("#nro_departamento").focus();
		return;
	}
	if(nro_estacionamiento==''){
		notificacion.error('Ingrese el nro de estacionamientos');
		$("#nro_estacionamiento").focus();
		return;
	}
	if(nro_depositos==''){
		notificacion.error('Ingrese el nro de depósitos');
		$("#nro_depositos").focus();
		return;
	}
	$.ajax({
		url:url+'nuevoregistro/ingresar',
		type:'post',
		data:{idedificio:idedificio,nombre_edificio:nombre_edificio,direccion:direccion,partida_registral:partida_registral,
			ppto_mensual:ppto_mensual,tipo_ppto:tipo_ppto,area_total:area_total,condicion:condicion,nro_departamento:nro_departamento,
			nro_estacionamiento:nro_estacionamiento,nro_depositos:nro_depositos,siglas:siglas},
		beforeSend:function(){
			bloquear("#btnguardar",'Cargando...');
		},
		success:function(data){
			if(data==1){
				modal('modalGuardar','','close');
				alertify.success('Datos ingresados correctamente');
				location.reload();
			}else{
				if(data==2){
					modal('modalGuardar','','close');
					alertify.success('Datos actualizados correctamente');
					location.reload();
				}else{
					alertify.error('Error al registrar información');				
				}				
			}
			desbloquear("#btnguardar",'ACTUALIZAR');
		}
	})
}

function datosedificio(){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'nuevoregistro/verdatos',
		type:'post',
		data:{id:idedificio},
		dataType:'json',
		success:function(data){
			$("#nombre_edificio").val(data.nombre_edificio);
			$("#direccion").val(data.direccion);
			$("#partida_registral").val(data.partida_registral);
			$("#ppto_mensual").val(data.ppto_mensual);
			if(data.tipo_ppto=='F'){
				$("#fijo").attr('checked',true);
			}else{
				if(data.tipo_ppto=='V'){
					$("#variable").attr('checked',true);
				}				
			}
			
			$("#area_total").val(data.area_total);
			switch(parseFloat(data.condicion)) {
			  case 1:$("#ocupada").attr('checked',true);break;
			  case 2:$("#tachada").attr('checked',true);break;
			  case 3:$("#mixta").attr('checked',true);break;
			  case 4:$("#flat").attr('checked',true);break;
			}
			
			$("#nro_departamento").val(data.nro_departamento);
			$("#nro_estacionamiento").val(data.nro_estacionamiento);
			$("#nro_depositos").val(data.nro_depositos);
			$("#siglas").val(data.siglas);
			resumen();		
		}
	})
}

function eliminar(id){
	$("#idinmueble").val(id)
	modal('modalEliminar','CONFIRMAR!!','open');
}

function confirma_eliminar(){
	var id = $("#idinmueble").val()
	$.ajax({
		url:url+'nuevoregistro/eliminar',
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
	$("#idinmueble").val(id)
	modal('modalRestablecer','CONFIRMAR!!','open');
}

function confirma_restablecer(){
	var id = $("#idinmueble").val()
	$.ajax({
		url:url+'nuevoregistro/eliminar',
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


function datodepartamento(){
	var departamento = $("#mdepartamento").val();
	if(departamento!=0){
		$.ajax({
			url:url+'nuevoregistro/datodepartamento',
			type:'post',
			data:{id_ui:departamento},
			dataType:'json',
			success:function(data){
				$("#marea_depa").val(data.area);
				$("#mporc_depa").val(data.porcentaje);
				calculararea();
				calcularpor();
			}
		})
	}else{
		$("#marea_depa").val(0);
		$("#mporc_depa").val(0);
		calculararea();
		calcularpor();
	}
}

function datoestacionamiento(x=false){
	if(x==false){
		var y = '';
	}else{
		var y = x;
	}
	var departamento = $("#mestacionamiento"+y).val();
	var xx = '';
	if(departamento!=0){
		for (var i = 1; i <= 5; i++) {
			if(i!=1){
				xx=i;
			}
			if(xx!=y){
				if($("#mestacionamiento"+xx).val()==departamento){
					notificacion('error','','El estacionamiento seleccionado ya se encuentra asignado');
					return;
				}
			}
		}
		$.ajax({
			url:url+'nuevoregistro/datodepartamento',
			type:'post',
			data:{id_ui:departamento},
			dataType:'json',
			success:function(data){
				if(x==false){
					$("#marea_esta").val(data.area);
					$("#mporc_esta").val(data.porcentaje);
				}else{
					$("#marea_esta"+x).val(data.area);
					$("#mporc_esta"+x).val(data.porcentaje);
				}			
				calculararea();
				calcularpor();
			}
		})
	}else{
		if(x==false){
			$("#marea_esta").val(0);
			$("#mporc_esta").val(0);
		}else{
			$("#marea_esta"+x).val(0);
			$("#mporc_esta"+x).val(0);
		}
		calculararea();
		calcularpor();
	}
}

function datodeposito(x=false){
	if(x==false){
		var y = '';
	}else{
		var y = x;
	}
	var departamento = $("#mdeposito"+y).val();
	var xx = '';
	if(departamento!=0){
		for (var i = 1; i <= 5; i++) {
			if(i!=1){
				xx=i;
			}
			if(xx!=y){
				if($("#mdeposito"+xx).val()==departamento){
					notificacion('error','','El depósito seleccionado ya se encuentra asignado');
					return;
				}
			}
		}
		$.ajax({
			url:url+'nuevoregistro/datodepartamento',
			type:'post',
			data:{id_ui:departamento},
			dataType:'json',
			success:function(data){
				if(x==false){
					$("#marea_depo").val(data.area);
					$("#mporc_depo").val(data.porcentaje);
				}else{
					$("#marea_depo"+x).val(data.area);
					$("#mporc_depo"+x).val(data.porcentaje);
				}
				calculararea();
				calcularpor();
			}
		})
	}else{
		if(x==false){
			$("#marea_depo").val(0);
			$("#mporc_depo").val(0);
		}else{
			$("#marea_depo"+x).val(0);
			$("#mporc_depo"+x).val(0);
		}
		calculararea();
		calcularpor();
	}
}

function edificio(){
	$.ajax({
		url:'nuevoregistro/edificio',
		success:function(data){
			$("$edificiogeneral").html(data);
		}
	})
}