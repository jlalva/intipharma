$(function(){
	$("#btnexportar").hide();
	datosedificio();

	$("#m2_ui").blur(function(){
    	var m2_ui = $("#m2_ui").val();
    	var area_total = $("#area_total").val();
    	if(m2_ui!=''){
    		var porcen = parseFloat(m2_ui)*100;
			porcen = parseFloat(porcen)/parseFloat(area_total);
			$("#porcentaje").val(porcen.toFixed(2))
    	}
	});

	$("#m2_al").blur(function(){
    	var m2_ui = $("#m2_al").val();
    	var area_total = $("#area_total").val();
    	if(m2_ui!=''){
    		var porcen = parseFloat(m2_ui)*100;
			porcen = parseFloat(porcen)/parseFloat(area_total);
			$("#porcentaje_al").val(porcen.toFixed(2))
    	}
	});

	$("#m2_dep").blur(function(){
    	var m2_ui = $("#m2_dep").val();
    	var area_total = $("#area_total").val();
    	if(m2_ui!=''){
    		var porcen = parseFloat(m2_ui)*100;
			porcen = parseFloat(porcen)/parseFloat(area_total);
			$("#porcentaje_dep").val(porcen.toFixed(2))
    	}
	});
});

function grabaredificio(){
	var idedificio = $("#edificiogeneral").val();
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
		alertify.error('Ingrese el nro de departamentos');
		$("#nro_departamento").focus();
		return;
	}
	if(nro_estacionamiento==''){
		alertify.error('Ingrese el nro de estacionamientos');
		$("#nro_estacionamiento").focus();
		return;
	}
	if(nro_depositos==''){
		alertify.error('Ingrese el nro de depósitos');
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
	if(idedificio==0){
		$("#btnguardar").hide();
		$("#btnmodal").hide();
	}
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
			$("#btnexportar").show();
			if(idedificio!=0){
				resumen();
			}
			verdetalle();
		}
	})
}

function resumen(){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'nuevoregistro/resumen',
		type:'post',
		data:{id:idedificio},
		dataType:'json',
		success:function(data){
			$("#area_depa").html(data.rarea);
			$("#porc_departamento").html(data.rareap);
			$("#area_esta").html(data.resta);
			$("#porc_estacionamiento").html(data.restap);
			$("#area_depo").html(data.rdepo);
			$("#porc_deposito").html(data.rdepop);
			$("#area_gral").html(data.tgralarea.toFixed(2));
			$("#porc_total").html(data.tgralpor.toFixed(2));
		}
	})
}

function verresumen(){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'nuevoregistro/verdetalle',
		type:'post',
		data:{idedificio:idedificio},
		success:function(data){
			$("#listadetalle").html(data);
			modal('modalDetalle','Detalle de Asignaciones','open');		
		}
	})
}

function exportarexcel(){
	var idedificio = $("#edificiogeneral").val();
	urls =url+'nuevoregistro/exportarexcel?idedif='+idedificio;
	$(location).attr('href',urls);
}

function exportarpdf(){
	var idedificio = $("#edificiogeneral").val();
	link = url+'nuevoregistro/pdf?id='+idedificio;
  	window.open(link, '_blank');
  	return false;
}

function mas(x){
	var prop = parseFloat($("#controlprop").val());
	var est = parseFloat($("#controlest").val());
	var depo = parseFloat($("#controldepo").val());
	if(x==1){
		if(est<=5){
			est++;
			almacen(0,est);
			$(".est"+est).show();
			$("#controlest").val(est)
		}		
	}else{
		if(x==2){
			if(depo<=5){
				depo++;
				deposito(0,depo);
				$(".depo"+depo).show();
				$("#controldepo").val(depo)
			}
		}			
	}
}

function menos(x){
	var prop = parseFloat($("#controlprop").val());
	var est = parseFloat($("#controlest").val());
	var depo = parseFloat($("#controldepo").val());
	if(est>5){
		est=5;
	}
	if(depo>5){
		depo=5;
	}
	if(prop>5){
		prop=5;
	}
	if(x==1){
		$(".est"+est).hide();
		$("#mestacionamiento"+est).val(0);
		$("#marea_esta"+est).val(0);
		$("#mporc_esta"+est).val(0);
		est--;
		$("#controlest").val(est)
		calculararea();
		calcularpor();
	}else{
		if(x==2){
			$(".depo"+depo).hide();
			$("#mdeposito"+depo).val(0);
			$("#marea_depo"+depo).val(0);
			$("#mporc_depo"+depo).val(0);
			depo--;
			$("#controldepo").val(depo)
			calculararea();
			calcularpor();
		}		
	}		
}

function verdetalle(){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'informaciongeneral/verdetalle',
		type:'post',
		data:{idedificio:idedificio},
		success:function(data){
			$("#listatabla").html(data);	
		}
	})
}


function editar(id,datosdepar,datosest,datosdepo,nrodoc,idpropie,propie,res,tel,emal,nroa,fu,fe,fd,daprosec){
	for (var i = 2; i <= 5; i++) {
		$(".est"+i).hide();
		$(".depo"+i).hide();
		$(".prop"+i).hide();
		almacen(0,i);
		deposito(0,i);
	}
	var prosec = daprosec.split(',');
	var depart = datosdepar.split(',');
	var esta = datosest.split(',');
	var depos = datosdepo.split(',');
	var tarea = 0;
	var tpor = 0;
	for (var i = 0; i <= 5; i++){
		if(prosec[0]!=''){
			for (var j = 0; j < prosec.length; j++){
				var datos = prosec[j].split('//');
				var yy = (j+2);
				if(datos[4]!=''){
					$("#nrodoc"+yy).val(datos[0])
					$("#mpropietario"+yy).val(datos[1])
					$("#mresidente"+yy).val(datos[3])
					$(".prop"+yy).show();
				}else{
					$("#nrodoc"+yy).val('')
					$("#mpropietario"+yy).val('')
					$("#mresidente"+yy).val('')
				}
				
			}
		}
	}

	for (var i = 1; i <= fu; i++){
		for (var j = 0; j < depart.length; j++){
			var datos = depart[j].split('//');
			var y = (j+1);
			var yy = (j+1);
			if((j+1)==1){
				y = false;
				yy = '';
			}
			departamento(datos[0],y)
			$("#id_ui_anterior"+yy).val(datos[0])
			$("#marea_depa"+yy).val(datos[1])
			$("#mporc_depa"+yy).val(datos[2])
			$("#idasignacion_iddepar"+yy).val(datos[3])
		}
	}

	for (var i = 1; i <= fe; i++) {
		for (var j = 0; j < esta.length; j++){
			var datos = esta[j].split('//');
			var y = (j+1);
			var yy = (j+1);
			if((j+1)==1){
				y = false;
				yy = '';
			}
			almacen(datos[0],y)
			$("#id_est_ant"+yy).val(datos[0])
			$("#marea_esta"+yy).val(datos[1])
			$("#mporc_esta"+yy).val(datos[2])
			$("#idasignacion_idest"+yy).val(datos[3])
			$(".est"+yy).show();
		}
	}

	for (var i = 1; i <= fd; i++) {
		for (var j = 0; j < depos.length; j++){
			var datos = depos[j].split('//');
			var y = (j+1);
			var yy = (j+1);
			if((j+1)==1){
				y = false;
				yy = '';
			}
			deposito(datos[0],y)
			$("#id_depo_ant"+yy).val(datos[0])
			$("#marea_depo"+yy).val(datos[1])
			$("#mporc_depo"+yy).val(datos[2])
			$("#idasignacion_iddepo"+yy).val(datos[3])
			$(".depo"+yy).show();
		}
	}
	$("#controlest").val(fe)
	$("#controldepo").val(fd)
	$("#nrodoc").val(nrodoc)
	$("#idusuario").val(idpropie)
	$("#mpropietario").val(propie)
	$("#mresidente").val(res)
	$("#nro_telefono").val(tel)
	$("#memail").val(emal)
	$("#idasignacion").val(id)
	$("#nroasignacion").val(nroa)
	calculararea();
	calcularpor();
	modal('modalAsignar','EDITAR ASIGNACIÓN DE UNIDADES','open');
}

function exportarpdf(){
	var idedificio = $("#edificiogeneral").val();
	link = url+'nuevoregistro/pdf?id='+idedificio;
  	window.open(link, '_blank');
  	return false;
}

function exportarexcel(){
	var idedificio = $("#edificiogeneral").val();
	urls =url+'nuevoregistro/exportarexcel?idedif='+idedificio;
	$(location).attr('href',urls);
}

function buscarpropietario(x){
	var nrodoc = $("#nrodoc"+x).val();
	var xx='';
	if(nrodoc!=''){
		for (var i = 1; i <= 5; i++) {
			if(i!=1){
				xx=i;
			}
			if(xx!=x){
				if($("#nrodoc"+xx).val()==nrodoc){
					notificacion('warning','','El propietario ya se encuentra seleccionado');
					return;
				}
			}
		}
		$.ajax({
			url:url+'nuevoregistro/consultarpropietario',
			type:'post',
			data:{documento:nrodoc},
			dataType:'json',
			success:function(data){
				if(data.idpropietario>0){
					$("#idusuario"+x).val(data.idpropietario)
					$("#mpropietario"+x).val(data.propietario)
					//$("#nro_telefono"+x).val(data.telefono)
					//$("#memail").val(data.email)
				}else{
					$("#idusuario"+x).val('')
					$("#mpropietario"+x).val('')
					$("#nro_telefono"+x).val('')
					$("#documento").val(nrodoc)
					//$("#memail").val('')
					modal('modalPropietario','Registro de Nuevo Propietario','open');
				}				
			}
		})
	}
}

function cerrarmodal(x){
	switch(x) {
		case 1:modal('modalPropietario','','close');break;
		case 2:modal('modalDepar','','close');break;
		case 3:modal('modalAlmacen','','close');break;
		case 4:modal('modalDeposito','','close');break;
		case 5:modal('modalDetalle','','close');break;
		case 6:modal('modalBusqueda','','close');break;
	}
}

function agregarui(x){
	switch(x) {
	  case 1:nombreui(1);break;
	  case 2:nombreui(2);break;
	  case 3:nombreui(3);break;
	}
}

function nombreui(tipo){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'nuevoregistro/nombreui',
		type:'post',
		data:{idedificio:idedificio,tipo:tipo},
		dataType:'json',
		success:function(data){
			if(tipo==1){
				$("#nombre_ui").val(data.nombre)
				$("#numero_ui").val(data.numero)
				modal('modalDepar','Registro Departamento','open')
				return;
			}
			if(tipo==2){
				$("#nombre_al").val(data.nombre)
				$("#numero_ui").val(data.numero)
				modal('modalAlmacen','Registro de Estacionamiento','open')
				return;
			}
			if(tipo==3){
				$("#nombre_dep").val(data.nombre)
				$("#numero_ui").val(data.numero)
				modal('modalDeposito','Registro de Depósito','open')
				return;
			}			
		}
	})
}

function guardardepar(){
	var id_ui = $("#id_ui").val();
	var idedificio = $("#edificiogeneral").val();
	var id_tipo_ui = 1;
	var m2_ui = $("#m2_ui").val();
	var nombre_ui = $("#nombre_ui").val();
	var numero_ui = $("#numero_ui").val();
	var porcentaje = $("#porcentaje").val();
	if(nombre_ui==''){
		notificacion('error','','Ingrese el nombre del departamento');
		$("#nombre_ui").focus();
		return;
	}
	if(m2_ui==''){
		notificacion('error','','Ingrese los M2 del departamento');
		$("#m2_ui").focus();
		return;
	}
	if(porcentaje==''){
		notificacion('error','','Ingrese el porcentaje del departamento');
		$("#porcentaje").focus();
		return;
	}

	$.ajax({
		url:url+'nuevoregistro/ingresardepar',
		type:'post',
		data:{id_ui:id_ui,idedificio:idedificio,id_tipo_ui:id_tipo_ui,m2_ui:m2_ui,nombre_ui:nombre_ui,
			porcentaje:porcentaje,numero_ui:numero_ui
		},
		beforeSend:function(){
			bloquear("#btndepar",'Cargando...');
		},
		success:function(data){
			if(data==1){
				modal('modalDepar','','close');
				notificacion('success','','Datos ingresados correctamente');
				limpiardepar();
				departamento(0);
			}else{
				if(data==2){
					modal('modalDepar','','close');
					notificacion('success','','Datos actualizados correctamente');
					limpiardepar();
					departamento(0);
				}else{
					notificacion('error','','Error al registrar información');				
				}				
			}
			desbloquear("#btndepar",'Guardar');
		}
	})
}

function guardaralma(){
	var est = $("#controlest").val();
	var id_ui = $("#id_ui").val();
	var idedificio = $("#edificiogeneral").val();
	var id_tipo_ui = 2;
	var m2_ui = $("#m2_al").val();
	var nombre_ui = $("#nombre_al").val();
	var numero_ui = $("#numero_ui").val();
	var porcentaje = $("#porcentaje_al").val();
	if(nombre_ui==''){
		notificacion('error','','Ingrese el nombre del almacén');
		$("#nombre_al").focus();
		return;
	}
	if(m2_ui==''){
		notificacion('error','','Ingrese los M2 del almacén');
		$("#m2_al").focus();
		return;
	}
	if(porcentaje==''){
		notificacion('error','','Ingrese el porcentaje del almacén');
		$("#porcentaje_al").focus();
		return;
	}

	$.ajax({
		url:url+'nuevoregistro/ingresardepar',
		type:'post',
		data:{id_ui:id_ui,idedificio:idedificio,id_tipo_ui:id_tipo_ui,m2_ui:m2_ui,nombre_ui:nombre_ui,
			porcentaje:porcentaje,numero_ui:numero_ui
		},
		beforeSend:function(){
			bloquear("#btnalma",'Cargando...');
		},
		success:function(data){
			if(data==1){
				modal('modalAlmacen','','close');
				notificacion('success','','Datos ingresados correctamente');
				limpiaralma();
				almacen(0,est);
			}else{
				if(data==2){
					modal('modalAlmacen','','close');
					notificacion('success','','Datos actualizados correctamente');
					limpiaralma();
					almacen(0,est);
				}else{
					notificacion('error','','Error al registrar información');				
				}				
			}
			desbloquear("#btnalma",'Guardar');
		}
	})
}

function guardardep(){
	var depo = $("#controldepo").val();
	var id_ui = $("#id_ui").val();
	var idedificio = $("#edificiogeneral").val();
	var id_tipo_ui = 3;
	var m2_ui = $("#m2_dep").val();
	var nombre_ui = $("#nombre_dep").val();
	var numero_ui = $("#numero_ui").val();
	var porcentaje = $("#porcentaje_dep").val();
	if(nombre_ui==''){
		notificacion('warning','','Ingrese el nombre del depósito');
		$("#nombre_dep").focus();
		return;
	}
	if(m2_ui==''){
		notificacion('warning','','Ingrese los M2 del depósito');
		$("#m2_dep").focus();
		return;
	}
	if(porcentaje==''){
		notificacion('warning','','Ingrese el porcentaje del depósito');
		$("#porcentaje_dep").focus();
		return;
	}

	$.ajax({
		url:url+'nuevoregistro/ingresardepar',
		type:'post',
		data:{id_ui:id_ui,idedificio:idedificio,id_tipo_ui:id_tipo_ui,m2_ui:m2_ui,nombre_ui:nombre_ui,
			porcentaje:porcentaje,numero_ui:numero_ui
		},
		beforeSend:function(){
			bloquear("#btndep",'Cargando...');
		},
		success:function(data){
			if(data==1){
				modal('modalDeposito','','close');
				notificacion('success','','Datos ingresados correctamente');
				limpiardep();
				deposito(0,depo);
			}else{
				if(data==2){
					modal('modalDeposito','','close');
					notificacion('success','','Datos actualizados correctamente');
					limpiardep();
					deposito(0,depo);
				}else{
					notificacion('error','','Error al registrar información');				
				}				
			}
			desbloquear("#btndep",'Guardar');
		}
	})
}

function limpiardepar(){
	$("#id_ui").val('')
	$("#m2_ui").val('')
	$("#nombre_ui").val('')
	$("#numero_ui").val('')
	$("#porcentaje").val('')
}

function limpiaralma(){
	$("#id_ui").val('')
	$("#m2_al").val('')
	$("#nombre_al").val('')
	$("#numero_ui").val('')
	$("#porcentaje_al").val('')
}

function limpiardep(){
	$("#id_ui").val('')
	$("#m2_dep").val('')
	$("#nombre_dep").val('')
	$("#numero_ui").val('')
	$("#porcentaje_dep").val('')
}

function buscarnombre(x){
	$.ajax({
		url:url+'nuevoregistro/buscarnombre',
		success:function(data){
			$(".seleccionarpropietario").html(data+'<input type="hidden" id="numnombre" name="numnombre" value="'+x+'">');
			modal('modalBusqueda','BUSCAR PROPIETARIO','open');
		}
	})
}

function seleccionar(id,propietario,dni){
	var x = parseFloat($("#numnombre").val());	
	if(x==0){
		x = '';
	}
	$("#idusuario"+x).val(id)
	$("#nrodoc"+x).val(dni)
	$("#mpropietario"+x).val(propietario)
	$("#mresidente"+x).val(propietario)
	modal('modalBusqueda','BUSCAR PROPIETARIO','close');
}