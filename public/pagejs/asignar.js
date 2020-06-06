$(function(){
	$("#dialogpropietario").hide();
	$("#dialogdepartamento").hide();
	$("#dialogalmacen").hide();
	$("#dialogdeposito").hide();
	if($("#iddepartamento").val()){
		departamento($("#iddepartamento").val());
	}else{
		departamento(0);
	}

	if($("#idestacionamiento").val()){
		almacen($("#idestacionamiento").val(),'#mestacionamiento');
		$("#mestacionamiento").val($("#idestacionamiento").val());	
	}else{
		almacen(0,'#mestacionamiento');
	}
	if($("#idestacionamiento2").val()){
		almacen($("#idestacionamiento2").val(),'#mestacionamiento2');
		$("#mestacionamiento2").val($("#idestacionamiento2").val());	
	}else{
		almacen(0,'#mestacionamiento2');
	}
	if($("#idestacionamiento3").val()){
		almacen($("#idestacionamiento3").val(),'#mestacionamiento3');
		$("#mestacionamiento3").val($("#idestacionamiento3").val());	
	}else{
		almacen(0,'#mestacionamiento3');
	}

	if($("#iddeposito").val()){
		deposito($("#iddeposito").val(),'#mdeposito');
		$("#mdeposito").val($("#iddeposito").val());	
	}else{
		deposito(0,'#mdeposito');
	}
	if($("#iddeposito2").val()){
		deposito($("#iddeposito2").val(),'#mdeposito2');
		$("#mdeposito2").val($("#iddeposito2").val());	
	}else{
		deposito(0,'#mdeposito2');
	}
	if($("#iddeposito3").val()){
		deposito($("#iddeposito3").val(),'#mdeposito3');
		$("#mdeposito3").val($("#iddeposito3").val());	
	}else{
		deposito(0,'#mdeposito3');
	}

	$("#m2_ui").blur(function(){
    	var m2_ui = $("#m2_ui").val();
    	var area_total = $("#areaedificio").val();
    	if(m2_ui!=''){
    		var porcen = parseFloat(m2_ui)*100;
			porcen = parseFloat(porcen)/parseFloat(area_total);
			$("#porcentaje").val(porcen.toFixed(2))
    	}
	});

	$("#m2_al").blur(function(){
    	var m2_ui = $("#m2_al").val();
    	var area_total = $("#areaedificio").val();
    	if(m2_ui!=''){
    		var porcen = parseFloat(m2_ui)*100;
			porcen = parseFloat(porcen)/parseFloat(area_total);
			$("#porcentaje_al").val(porcen.toFixed(2))
    	}
	});

	$("#m2_dep").blur(function(){
    	var m2_ui = $("#m2_dep").val();
    	var area_total = $("#areaedificio").val();
    	if(m2_ui!=''){
    		var porcen = parseFloat(m2_ui)*100;
			porcen = parseFloat(porcen)/parseFloat(area_total);
			$("#porcentaje_dep").val(porcen.toFixed(2))
    	}
	});
});
function departamento(id){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'informaciongeneral/selectdepartamento',
		type:'post',
		data:{id:id,tipo:1,idedificio:idedificio},
		success:function(data){
			$("#mdepartamento").html(data);
		}
	})
}

function almacen(id,x=false){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'informaciongeneral/selectdepartamento',
		type:'post',
		data:{id:id,tipo:2,idedificio:idedificio},
		success:function(data){
			if(x==false){
				$(".mestacionamiento").html(data);
			}else{
				$(x).html(data);
			}					
		}
	})
}

function deposito(id,x=false){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'informaciongeneral/selectdepartamento',
		type:'post',
		data:{id:id,tipo:3,idedificio:idedificio},
		success:function(data){
			if(x==false){
				$(".mdeposito").html(data);
			}else{
				$(x).html(data);
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
		for (var i = 1; i <= 3; i++) {
			if(i!=1){
				xx=i;
			}
			if(xx!=y){
				if($("#mestacionamiento"+xx).val()==departamento){
					alertify.error('El estacionamiento seleccionado ya se encuentra asignado');
					$("#mestacionamiento"+y).val(0)
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
		for (var i = 1; i <= 3; i++) {
			if(i!=1){
				xx=i;
			}
			if(xx!=y){
				if($("#mdeposito"+xx).val()==departamento){
					alertify.error('El depósito seleccionado ya se encuentra asignado');
					$("#mdeposito"+y).val(0)
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

function calculararea(){
	var marea_depa = parseFloat($("#marea_depa").val())?parseFloat($("#marea_depa").val()):0;
	var marea_esta = parseFloat($("#marea_esta").val())?parseFloat($("#marea_esta").val()):0;
	var marea_esta2 = parseFloat($("#marea_esta2").val())?parseFloat($("#marea_esta2").val()):0;
	var marea_esta3 = parseFloat($("#marea_esta3").val())?parseFloat($("#marea_esta3").val()):0;
	var marea_depo = parseFloat($("#marea_depo").val())?parseFloat($("#marea_depo").val()):0;
	var marea_depo2 = parseFloat($("#marea_depo2").val())?parseFloat($("#marea_depo2").val()):0;
	var marea_depo3 = parseFloat($("#marea_depo3").val())?parseFloat($("#marea_depo3").val()):0;
	var total = marea_depa + marea_esta + marea_esta2 + marea_esta3  + marea_depo + marea_depo2 + marea_depo3;
	$("#mtotal").val(total.toFixed(2))
}

function calcularpor(){
	var mporc_depa = parseFloat($("#mporc_depa").val())?parseFloat($("#mporc_depa").val()):0;
	var mporc_esta = parseFloat($("#mporc_esta").val())?parseFloat($("#mporc_esta").val()):0;
	var mporc_esta2 = parseFloat($("#mporc_esta2").val())?parseFloat($("#mporc_esta2").val()):0;
	var mporc_esta3 = parseFloat($("#mporc_esta3").val())?parseFloat($("#mporc_esta3").val()):0;
	var mporc_depo = parseFloat($("#mporc_depo").val())?parseFloat($("#mporc_depo").val()):0;
	var mporc_depo2 = parseFloat($("#mporc_depo2").val())?parseFloat($("#mporc_depo2").val()):0;
	var mporc_depo3 = parseFloat($("#mporc_depo3").val())?parseFloat($("#mporc_depo3").val()):0;

	var total = mporc_depa + mporc_esta + mporc_esta2 + mporc_esta3 + mporc_depo + mporc_depo2 + mporc_depo3;
	$("#mtotalporc").val(total.toFixed(2))
}

function abrirventana(x){
	switch(x){
		case 1:limpiarpropietario();nuevopropietario();break;
		case 2:limpiardepar();nombreui(1);break;
		case 3:limpiaralmacen();nombreui(2);break;
		case 4:limpiardeposito();nombreui(3);break;
		case 5:modalbusqueda();break;
		case 6:grillapropietario();break;
		case 7:grilladepartamentos();break;
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
				nuevodepartamento();
				return;
			}
			if(tipo==2){
				$("#nombre_al").val(data.nombre)
				nuevoalmacen();
				return;
			}
			if(tipo==3){
				$("#nombre_dep").val(data.nombre)
				nuevodeposito();
				return;
			}			
		}
	})
}

function nuevopropietario(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   	var dWidth = $(window).width() * 0.8;
    	var dHeight = $(window).height() * 1;
	}else{
		var dWidth = $(window).width() * 0.5;
    	var dHeight = $(window).height() * 0.55; 
	}
	$( "#dialogpropietario" ).dialog({
        autoOpen: true,
        draggable: true,
        width: dWidth,
        height: dHeight,
        buttons: [
        {
            text: "CANCELAR",
            open: function() {
                $(this).addClass('btn-warning');
            },
            click: function() {
                $( this ).dialog( "close" );
            }
        },
        {
            text: "GUARDAR",
            id:"btnguardarpropietario",
            open: function() {
                $(this).addClass('btn-primary');
            },
            click: function() {
                guardarpropietario();
            }
        }        
    ]
    }).prev(".ui-dialog-titlebar").css("background","skyblue");;
}

function nuevodepartamento(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   	var dWidth = $(window).width() * 0.8;
    	var dHeight = $(window).height() * 0.3;
	}else{
		var dWidth = $(window).width() * 0.5;
    	var dHeight = $(window).height() * 0.3; 
	}
	$( "#dialogdepartamento" ).dialog({
        autoOpen: true,
        draggable: true,
        width: dWidth,
        height: dHeight,
        buttons: [
        {
            text: "CANCELAR",
            open: function() {
                $(this).addClass('btn-warning');
            },
            click: function() {
                $( this ).dialog( "close" );
            }
        },
        {
            text: "GUARDAR",
            id:"btnguardardepartamento",
            open: function() {
                $(this).addClass('btn-primary');
            },
            click: function() {
                guardardepartamento();
            }
        }        
    ]
    }).prev(".ui-dialog-titlebar").css("background","skyblue");;
}

function nuevoalmacen(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   	var dWidth = $(window).width() * 0.8;
    	var dHeight = $(window).height() * 0.3;
	}else{
		var dWidth = $(window).width() * 0.5;
    	var dHeight = $(window).height() * 0.3; 
	}
	$( "#dialogalmacen" ).dialog({
        autoOpen: true,
        draggable: true,
        width: dWidth,
        height: dHeight,
        buttons: [
        {
            text: "CANCELAR",
            open: function() {
                $(this).addClass('btn-warning');
            },
            click: function() {
                $( this ).dialog( "close" );
            }
        },
        {
            text: "GUARDAR",
            id:"btnguardaralmacen",
            open: function() {
                $(this).addClass('btn-primary');
            },
            click: function() {
                guardaralmacen();
            }
        }        
    ]
    }).prev(".ui-dialog-titlebar").css("background","skyblue");;
}

function nuevodeposito(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   	var dWidth = $(window).width() * 0.8;
    	var dHeight = $(window).height() * 0.3;
	}else{
		var dWidth = $(window).width() * 0.5;
    	var dHeight = $(window).height() * 0.3; 
	}
	$( "#dialogdeposito" ).dialog({
        autoOpen: true,
        draggable: true,
        width: dWidth,
        height: dHeight,
        buttons: [
        {
            text: "CANCELAR",
            open: function() {
                $(this).addClass('btn-warning');
            },
            click: function() {
                $( this ).dialog( "close" );
            }
        },
        {
            text: "GUARDAR",
            id:"btnguardardeposito",
            open: function() {
                $(this).addClass('btn-primary');
            },
            click: function() {
                guardardeposito();
            }
        }        
    ]
    }).prev(".ui-dialog-titlebar").css("background","skyblue");
}

function guardarpropietario(){
	var idedificio = $("#edificiogeneral").val();
	var idusuario = $("#idnusuario").val();
	var tipo_documeto = $("#tipo_documeto").val();
	var documento = $("#documento").val();
	var nombre = $("#nombre").val();
	var apellido = $("#apellido").val();
	var telefono = $("#telefono").val();
	var correo = $("#correo").val();
	if(tipo_documeto==0){
		alertify.error('Seleccione el tipo de documento');
		return;
	}
	if(documento==''){
		alertify.warning('Ingrese el número de documento');
		$("#documento").focus();
		return;
	}else{
		if(tipo_documeto=='D.N.I'){
			if(documento!=''){
				if (documento.length != 8  || isNaN(documento)) {
					alertify.warning('El número de D.N.I ingresado es inválido');
					$("#documento").focus();
					return;
				}
			}			
		}else{
			if(tipo_documeto=='R.U.C') {
				if (documento.length != 11 || isNaN(documento)) {
					alertify.warning('El número de R.U.C ingresado es inválido');
					$("#documento").focus();
					return;
				}
			}
		}
	}
	if(nombre==''){
		alertify.error('Ingrese el nombre');
		$("#nombre").focus();
		return;
	}
	if(apellido==''){
		alertify.error('Ingrese el apellido');
		$("#apellido").focus();
		return;
	}
	$.ajax({
		url:url+'nuevoregistro/ingresarpropietario',
		type:'post',
		data:{idedificio:idedificio,idusuario:idusuario,nombre:nombre,apellido:apellido,telefono:telefono,correo:correo,tipo_documeto:tipo_documeto,documento:documento},
		beforeSend:function(){
			bloquear("#btnguardarpropietario",'Cargando...');
		},
		success:function(data){
			if(data==1){
				$("#dialogpropietario").dialog( "close" );
				alertify.success('Datos ingresados correctamente');
				limpiarpropietario();
			}else{
				if(data==2){
					$("#dialogpropietario").dialog( "close" );
					alertify.success('Datos actualizados correctamente');
					limpiarpropietario();
					grillapropietario();
				}else{
					if(data==3){
						alertify.warning('El propietario ingresado ya existe');
					}else{
						alertify.error('Error al registrar información');
					}					
				}				
			}
			desbloquear("#btnguardarpropietario",'GUARDAR');
		}
	})
}

function guardardepartamento(){
	var id_ui = $("#id_ui").val();
	var idedificio = $("#edificiogeneral").val();
	var id_tipo_ui = 1;
	var m2_ui = $("#m2_ui").val();
	var nombre_ui = $("#nombre_ui").val();
	var porcentaje = $("#porcentaje").val();
	if(nombre_ui==''){
		alertify.error('Ingrese el nombre del departamento');
		$("#nombre_ui").focus();
		return;
	}
	if(m2_ui==''){
		alertify.error('Ingrese los M2 del departamento');
		$("#m2_ui").focus();
		return;
	}
	if(porcentaje==''){
		alertify.error('Ingrese el porcentaje del departamento');
		$("#porcentaje").focus();
		return;
	}

	$.ajax({
		url:url+'nuevoregistro/ingresardepar',
		type:'post',
		data:{id_ui:id_ui,idedificio:idedificio,id_tipo_ui:id_tipo_ui,m2_ui:m2_ui,nombre_ui:nombre_ui,
			porcentaje:porcentaje
		},
		beforeSend:function(){
			bloquear("#btnguardardepartamento",'Cargando...');
		},
		success:function(data){
			if(data==1){
				$("#dialogdepartamento").dialog( "close" );
				alertify.success('Datos ingresados correctamente');
				limpiardepar();
				departamento(0);
			}else{
				if(data==2){
					$("#dialogdepartamento").dialog( "close" );
					alertify.success('Datos actualizados correctamente');
					limpiardepar();
					departamento(0);
				}else{
					if(data==3){
						alertify.warning('El código de departamento ya fue registrado para el edificio');
					}else{
						alertify.error('Error al registrar información');
					}			
				}				
			}
			desbloquear("#btnguardardepartamento",'Guardar');
		}
	})
}

function guardaralmacen(){
	var id_ui = $("#id_ui").val();
	var idedificio = $("#edificiogeneral").val();
	var id_tipo_ui = 2;
	var m2_ui = $("#m2_al").val();
	var nombre_ui = $("#nombre_al").val();
	var porcentaje = $("#porcentaje_al").val();
	if(nombre_ui==''){
		alertify.error('Ingrese el nombre del almacén');
		$("#nombre_al").focus();
		return;
	}
	if(m2_ui==''){
		alertify.error('Ingrese los M2 del almacén');
		$("#m2_al").focus();
		return;
	}
	if(porcentaje==''){
		alertify.error('Ingrese el porcentaje del almacén');
		$("#porcentaje_al").focus();
		return;
	}

	$.ajax({
		url:url+'nuevoregistro/ingresardepar',
		type:'post',
		data:{id_ui:id_ui,idedificio:idedificio,id_tipo_ui:id_tipo_ui,m2_ui:m2_ui,nombre_ui:nombre_ui,
			porcentaje:porcentaje
		},
		beforeSend:function(){
			bloquear("#btnguardaralmacen",'Cargando...');
		},
		success:function(data){
			if(data==1){
				$("#dialogalmacen").dialog('close');
				alertify.success('Datos ingresados correctamente');
				limpiaralmacen();
				almacen(0);
			}else{
				if(data==2){
					$("#dialogalmacen").dialog('close');
					alertify.success('Datos actualizados correctamente');
					limpiaralma();
					almacen(0);
				}else{
					if(data==3){
						alertify.warning('El código de almacén ya fue registrado para el edificio');
					}else{
						alertify.error('Error al registrar información');
					}				
				}				
			}
			desbloquear("#btnguardaralmacen",'GUARDAR');
		}
	})
}

function guardardeposito(){
	var id_ui = $("#id_ui").val();
	var idedificio = $("#edificiogeneral").val();
	var id_tipo_ui = 3;
	var m2_ui = $("#m2_dep").val();
	var nombre_ui = $("#nombre_dep").val();
	var porcentaje = $("#porcentaje_dep").val();
	if(nombre_ui==''){
		alertify.error('Ingrese el nombre del depósito');
		$("#nombre_dep").focus();
		return;
	}
	if(m2_ui==''){
		alertify.error('Ingrese los M2 del depósito');
		$("#m2_dep").focus();
		return;
	}
	if(porcentaje==''){
		alertify.error('Ingrese el porcentaje del depósito');
		$("#porcentaje_dep").focus();
		return;
	}

	$.ajax({
		url:url+'nuevoregistro/ingresardepar',
		type:'post',
		data:{id_ui:id_ui,idedificio:idedificio,id_tipo_ui:id_tipo_ui,m2_ui:m2_ui,nombre_ui:nombre_ui,
			porcentaje:porcentaje
		},
		beforeSend:function(){
			bloquear("#btnguardardeposito",'Cargando...');
		},
		success:function(data){
			if(data==1){
				$("#dialogdeposito").dialog('close');
				alertify.success('Datos ingresados correctamente');
				limpiardeposito();
				deposito(0);
			}else{
				if(data==2){
					$("#dialogdeposito").dialog('close');
					alertify.success('Datos actualizados correctamente');
					limpiardeposito();
					deposito(0);
					grilladepartamentos();
				}else{
					if(data==3){
						alertify.warning('El código de depósito ya fue registrado para el edificio');
					}else{
						alertify.error('Error al registrar información');
					}				
				}				
			}
			desbloquear("#btnguardardeposito",'GUARDAR');
		}
	})
}

function limpiarpropietario(){
	$("#idnusuario").val(''),
	$("#tipo_documeto").val(0),
	$("#documento").val(''),
	$("#nombre").val(''),
	$("#apellido").val(''),
	$("#telefono").val(''),
	$("#correo").val('')
	$("#btnguardarpropietario").attr('disabled',false);
	$("#btnguardarpropietario").html('Guardar');
}

function limpiardepar(){
	$("#id_ui").val('')
	$("#m2_ui").val('')
	$("#nombre_ui").val('')
	$("#porcentaje").val('')
}

function limpiaralmacen(){
	$("#id_ui").val('')
	$("#m2_al").val('')
	$("#nombre_al").val('')
	$("#porcentaje_al").val('')
}

function limpiardeposito(){
	$("#id_ui").val('')
	$("#m2_dep").val('')
	$("#nombre_dep").val('')
	$("#porcentaje_dep").val('')
}

function buscarpropietario(x){
	var nrodoc = $("#nrodoc"+x).val();
	var xx='';
	if(nrodoc!=''){
		for (var i = 1; i <= 3; i++) {
			if(i!=1){
				xx=i;
			}
			if(xx!=x){
				if($("#nrodoc"+xx).val()==nrodoc){
					alertify.error('El propietario ya se encuentra seleccionado');
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
				}else{
					$("#idusuario"+x).val('')
					$("#mpropietario"+x).val('')
					$("#nro_telefono"+x).val('')
					$("#mresidente"+x).val('')
					$("#documento").val(nrodoc)
					abrirventana(1)
				}				
			}
		})
	}
}

function buscarnombre(x){
	$.ajax({
		url:url+'nuevoregistro/buscarnombre',
		success:function(data){
			$(".seleccionarpropietario").html(data+'<input type="hidden" id="numnombre" name="numnombre" value="'+x+'">');
			modalbusqueda();
		}
	})
}

function modalbusqueda(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   	var dWidth = $(window).width() * 0.8;
    	var dHeight = $(window).height() * 0.4;
	}else{
		var dWidth = $(window).width() * 0.5;
    	var dHeight = $(window).height() * 0.7; 
	}
	$( "#dialogbusqueda" ).dialog({
        autoOpen: true,
        draggable: true,
        width: dWidth,
        height: dHeight,
        buttons: [
	        {
	            text: "CERRAR",
	            open: function() {
	                $(this).addClass('btn-warning');
	            },
	            click: function() {
	                $( this ).dialog( "close" );
	            }
	        }      
	    ]
    }).prev(".ui-dialog-titlebar").css("background","skyblue");
}

function seleccionar(id,propietario,dni){
	var x = parseFloat($("#numnombre").val());	
	if(x==0){
		x = '';
	}
	$("#idusuario"+x).val(id)
	$("#nrodoc"+x).val(dni)
	$("#mpropietario"+x).val(propietario)
	$("#dialogbusqueda").dialog( "close" );
}

function guardarasignacion(){
	var conprop = $("#controlprop").val();
	var idedificio = $("#edificiogeneral").val();
	var mdepartamento = $("#mdepartamento").val();
	var mestacionamiento = $("#mestacionamiento").val();
	var mdeposito = $("#mdeposito").val();
	var mestacionamiento2 = $("#mestacionamiento2").val();
	var mdeposito2 = $("#mdeposito2").val();
	var mestacionamiento3 = $("#mestacionamiento3").val();
	var mdeposito3 = $("#mdeposito3").val();
	var mdeposito5 = $("#mdeposito5").val();
	var idusuario = $("#idusuario").val();
	var idusuario2 = $("#idusuario2").val();
	var idusuario3 = $("#idusuario3").val();
	var marea_depa = $("#marea_depa").val();
	var mporc_depa = $("#mporc_depa").val();
	var marea_esta = $("#marea_esta").val();
	var mporc_esta = $("#mporc_esta").val();
	var marea_esta2 = $("#marea_esta2").val();
	var mporc_esta2 = $("#mporc_esta2").val();
	var marea_esta3 = $("#marea_esta3").val();
	var mporc_esta3 = $("#mporc_esta3").val();
	var marea_depo = $("#marea_depo").val();
	var mporc_depo = $("#mporc_depo").val();
	var marea_depo2 = $("#marea_depo2").val();
	var mporc_depo2 = $("#mporc_depo2").val();
	var marea_depo3 = $("#marea_depo3").val();
	var mporc_depo3 = $("#mporc_depo3").val();
	var mresidente = $("#mresidente").val();
	var mresidente2 = $("#mresidente2").val();
	var mresidente3 = $("#mresidente3").val();
	
	if(mdepartamento==0 && mestacionamiento==0 && mdeposito==0){
		alertify.error('Seleccione al menos una unidad inmobiliaria');
		return;
	}
	if(idusuario==''){
		alertify.error('Ingrese el propietario');
		$("#nrodoc").focus();
		return;
	}
	$.ajax({
		url:url+'nuevoregistro/guardarasignacion',
		type:'post',
		data:{idusuario:idusuario,idedificio:idedificio,mdepartamento:mdepartamento,mestacionamiento:mestacionamiento,
			mdeposito:mdeposito,marea_depa:marea_depa,mporc_depa:mporc_depa,marea_esta:marea_esta,
			mporc_esta:mporc_esta,marea_depo:marea_depo,mporc_depo:mporc_depo,mresidente:mresidente,
			mestacionamiento2:mestacionamiento2,mestacionamiento3:mestacionamiento3,mdeposito2:mdeposito2,mdeposito3:mdeposito3,
			marea_esta2:marea_esta2,marea_esta3:marea_esta3,mporc_esta2:mporc_esta2,mporc_esta3:mporc_esta3,marea_depo2:marea_depo2,
			marea_depo3:marea_depo3,mporc_depo2:mporc_depo2,mporc_depo3:mporc_depo3,idusuario2:idusuario2,idusuario3:idusuario3,
			mresidente2:mresidente2,mresidente3:mresidente3},
		beforeSend:function(){
			bloquear("#btnguardarasignacion",'Cargando...');
		},
		success:function(data){
			if(data==1){
				alertify.success("Asignación ingresada correctamente");
				link = url + "informaciongeneral";
				$(location).attr('href',link);
			}else{
				alertify.error("Ocurrio un error al asignar!!!");
				desbloquear("#btnguardarasignacion",'GRABAR');
			}			
		}
	})
}

function borrarnombre(x){
	$("#idusuario"+x).val('')
	$("#nrodoc"+x).val('')
	$("#mpropietario"+x).val('')
	$("#mresidente"+x).val('')
}

function editarasignacion(){
	var idasignacion_iddepar = $("#idasignacion_iddepar").val();
	var idasignacion_idest = $("#idasignacion_idest").val();
	var idasignacion_idest2 = $("#idasignacion_idest2").val();
	var idasignacion_idest3 = $("#idasignacion_idest3").val();
	var idasignacion_iddepo = $("#idasignacion_iddepo").val();
	var idasignacion_iddepo2 = $("#idasignacion_iddepo2").val();
	var idasignacion_iddepo3 = $("#idasignacion_iddepo3").val();
	var idedificio = $("#edificiogeneral").val();
	var idasignacion = $("#idasignacion").val();
	var nroasignacion = $("#nroasignacion").val();
	var mdepartamento = $("#mdepartamento").val();
	var id_ui_anterior = $("#id_ui_anterior").val();
	var id_est_anterior = $("#id_est_ant").val();
	var id_est_anterior2 = $("#id_est_ant2").val();
	var id_est_anterior3 = $("#id_est_ant3").val();
	var id_dep_anterior = $("#id_depo_ant").val();
	var id_dep_anterior2 = $("#id_depo_ant2").val();
	var id_dep_anterior3 = $("#id_depo_ant3").val();
	var mestacionamiento = $("#mestacionamiento").val();
	var mestacionamiento2 = $("#mestacionamiento2").val();
	var mestacionamiento3 = $("#mestacionamiento3").val();
	var mdeposito = $("#mdeposito").val();
	var mdeposito2 = $("#mdeposito2").val();
	var mdeposito3 = $("#mdeposito3").val();
	var idusuario = $("#idusuario").val();
	var idusuario2 = $("#idusuario2").val();
	var idusuario3 = $("#idusuario3").val();
	var idnusuario = $("#idnusuario").val();
	var idnusuario2 = $("#idnusuario2").val();
	var idnusuario3 = $("#idnusuario3").val();
	var marea_depa = $("#marea_depa").val();
	var mporc_depa = $("#mporc_depa").val();
	var marea_esta = $("#marea_esta").val();
	var marea_esta2 = $("#marea_esta2").val();
	var marea_esta3 = $("#marea_esta3").val();
	var mporc_esta = $("#mporc_esta").val();
	var mporc_esta2 = $("#mporc_esta2").val();
	var mporc_esta3 = $("#mporc_esta3").val();
	var marea_depo = $("#marea_depo").val();
	var marea_depo2 = $("#marea_depo2").val();
	var marea_depo3 = $("#marea_depo3").val();
	var mporc_depo = $("#mporc_depo").val();
	var mporc_depo2 = $("#mporc_depo2").val();
	var mporc_depo3 = $("#mporc_depo3").val();
	var mresidente = $("#mresidente").val();
	var mresidente2 = $("#mresidente2").val();
	var mresidente3 = $("#mresidente3").val();

	$.ajax({
		url:url+'informaciongeneral/editarasignacion',
		type:'post',
		data:{idusuario:idusuario,idedificio:idedificio,mdepartamento:mdepartamento,mestacionamiento:mestacionamiento,
			mdeposito:mdeposito,marea_depa:marea_depa,mporc_depa:mporc_depa,marea_esta:marea_esta,
			mporc_esta:mporc_esta,marea_depo:marea_depo,mporc_depo:mporc_depo,mresidente:mresidente,
			idasignacion:idasignacion,id_ui_anterior:id_ui_anterior,id_est_anterior:id_est_anterior,id_dep_anterior:id_dep_anterior,
			nroasignacion:nroasignacion,id_est_anterior2:id_est_anterior2,id_est_anterior3:id_est_anterior3,
			id_dep_anterior2:id_dep_anterior2,id_dep_anterior3:id_dep_anterior3,mestacionamiento2:mestacionamiento2,
			mestacionamiento3:mestacionamiento3,mdeposito2:mdeposito2,mdeposito3:mdeposito3,
			marea_esta2:marea_esta2,marea_esta3:marea_esta3,mporc_esta2:mporc_esta2,mporc_esta3:mporc_esta3,
			marea_depo2:marea_depo2,marea_depo3:marea_depo3,mporc_depo2:mporc_depo2,mporc_depo3:mporc_depo3,
			idasignacion_iddepar:idasignacion_iddepar,idasignacion_idest:idasignacion_idest,idasignacion_idest2:idasignacion_idest2,
			idasignacion_idest3:idasignacion_idest3,idasignacion_iddepo:idasignacion_iddepo,idasignacion_iddepo2:idasignacion_iddepo2,
			idasignacion_iddepo3:idasignacion_iddepo3,idnusuario:idnusuario,idnusuario2:idnusuario2,idnusuario3:idnusuario3,
			mresidente2:mresidente2,mresidente3:mresidente3,idusuario2:idusuario2,idusuario3:idusuario3
		},
		beforeSend:function(){
			bloquear("#btnguardarasignacion",'Cargando...');
		},
		success:function(data){
			if(data==1){
				alertify.success("Asignación actualizada correctamente");
				desbloquear("#btnguardarasignacion",'Guardar');
				link = url + "informaciongeneral";
				$(location).attr('href',link);
			}else{
				alertify.error("Ocurrio un error al actualizar!!!");
				desbloquear("#btnguardarasignacion",'Guardar');
			}			
		}
	})
}

function modalpropietarios(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   	var dWidth = $(window).width() * 0.8;
    	var dHeight = $(window).height() * 0.4;
	}else{
		var dWidth = $(window).width() * 0.6;
    	var dHeight = $(window).height() * 0.7; 
	}
	$( "#dialogviewpropietario" ).dialog({
        autoOpen: true,
        draggable: true,
        width: dWidth,
        height: dHeight,
        buttons: [
	        {
	            text: "CERRAR",
	            open: function() {
	                $(this).addClass('btn-warning');
	            },
	            click: function() {
	                $( this ).dialog( "close" );
	            }
	        }      
	    ]
    }).prev(".ui-dialog-titlebar").css("background","skyblue");
}

function grillapropietario(){
	$.ajax({
		url:url+'owner/grilla',
		success:function(data){
			$("#tablapropietario").html(data);
			tabla();
			modalpropietarios();
		}
	})
}

function editarpropietario(id){
	$.ajax({
		url:url+'owner/verdatos',
		type:'post',
		data:{id:id},
		dataType:'json',
		success:function(data){
			$("#idnusuario").val(data.idusuario),
			$("#nombre").val(data.nombre),
			$("#apellido").val(data.apellido),
			$("#telefono").val(data.telefono),
			$("#correo").val(data.correo),
			$("#tipo_documeto").val(data.tipo_documento),
			$("#documento").val(data.documento)
			nuevopropietario();
		}
	})
}

function eliminarpropietario(id){
	$("#idnusuario").val(id)
	modal('modalEliminarpropietario','CONFIRMAR!!','open');
}

function confirma_eliminar_propietario(){
	bloquear("#btneliminarpropietario",'Eliminando...');
	var id = $("#idnusuario").val()
	$.ajax({
		url:url+'owner/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==1){
				alertify.warning('Registro desabilitado!!');
				desbloquear("#btneliminarpropietario","Continuar");
				modal('modalEliminarpropietario','','close');
				grillapropietario();
			}else{
				if(data==4){
					alertify.warning('Registro eliminado!!');
					desbloquear("#btneliminarpropietario","Continuar");
					modal('modalEliminarpropietario','','close');
					grillapropietario();
				}else{
					desbloquear("#btneliminarpropietario","Continuar");
					alertify.error('Error al eliminar!!');
				}				
			}
		}
	})
}

function grilladepartamentos(){
	$.ajax({
		url:url+'realestateunit/grilla',
		success:function(data){
			$("#tablaui").html(data);
			tablaui();
			modalui();
		}
	})
}

function modalui(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   	var dWidth = $(window).width() * 0.8;
    	var dHeight = $(window).height() * 0.4;
	}else{
		var dWidth = $(window).width() * 0.7;
    	var dHeight = $(window).height() * 0.8; 
	}
	$( "#dialogviewui" ).dialog({
        autoOpen: true,
        draggable: true,
        width: dWidth,
        height: dHeight,
        buttons: [
	        {
	            text: "CERRAR",
	            open: function() {
	                $(this).addClass('btn-warning');
	            },
	            click: function() {
	                $( this ).dialog( "close" );
	            }
	        }      
	    ]
    }).prev(".ui-dialog-titlebar").css("background","skyblue");
}

function editar(id){
	$.ajax({
		url:url+'realestateunit/verdatos',
		type:'post',
		data:{id:id},
		dataType:'json',
		success:function(data){			
			$("#idinmueble").val(data.idinmueble)
			$("#id_ui").val(data.id_ui)		
			switch(parseFloat(data.id_tipo_ui)){
				case 1:
						$("#nombre_ui").val(data.nombre_ui)
						$("#m2_ui").val(data.m2_ui)
						$("#porcentaje").val(data.porcentaje)
					nuevodepartamento();break;
				case 2:
						$("#nombre_al").val(data.nombre_ui)
						$("#m2_al").val(data.m2_ui)
						$("#porcentaje_al").val(data.porcentaje)
					nuevoalmacen();break;
				case 3:
						$("#nombre_dep").val(data.nombre_ui)
						$("#m2_dep").val(data.m2_ui)
						$("#porcentaje_dep").val(data.porcentaje)
					nuevodeposito();break;
			}
		}
	})
}

function eliminar(id){
	$("#id_ui").val(id)
	modal('modalEliminarUi','CONFIRMAR!!','open');
}

function confirma_eliminar(){
	var id = $("#id_ui").val()
	$.ajax({
		url:url+'realestateunit/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==3){
				alertify.warning('Registro desabilitado!!');
				modal('modalEliminarUi','','close');
				grilladepartamentos();
			}else{
				if(data==4){
					alertify.warning('Registro eliminado!!');
					modal('modalEliminarUi','','close');
					grilladepartamentos();
				}else{
					alertify.error('Error al eliminar!!');
				}				
			}
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

function tablaui(){
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