$(function(){
	anio();

	$("#importe_recibo").blur(function(){
		calcularrecibo();
	});
	$("#cargo_fijo").blur(function(){
		calcularrecibo();
	});
	$("#descuento_uno").blur(function(){
		calcularrecibo();
	});
	$("#descuento_dos").blur(function(){
		calcularrecibo();
	});
	$("#mora_uno").blur(function(){
		calcularrecibo();
	});
	$("#mora_dos").blur(function(){
		calcularrecibo();
	});
	$("#otros").blur(function(){
		calcularrecibo();
	});

	$(".grupal").hide();
	$(".individual").hide();

});

function abrirventana(x){
	switch(x){
		case 1:grillaconceptos();break;
	}
}

function grabarnuevoconcepto(){
	var idedificio = $("#edificiogeneral").val()
    var idconcepto = $("#idconcepto").val()
	var codigo = $("#codigo").val()
	var concepto = $("#nuevoconcepto").val()
	var importe = $("#importe").val()
	var idtipoconcepto = $("#idtipoconcepto").val()

	if(codigo==''){
		alertify.error("Ingrese el código del concepto");
		$("#codigo").focus();
		return;
	}

	if(importe==''){
		importe = 0;
	}

	if(concepto==''){
		alertify.error("Ingrese el nombre del concepto");
		$("#concepto").focus();
		return;
	}

	$.ajax({
		url:url+'conceptos/ingresar',
		type:'post',
		data:{idedificio:idedificio,idconcepto:idconcepto,codigo:codigo,concepto:concepto,importe:importe},
		beforeSend:function(){
			bloquear("#btnguardarconcepto",'Cargando...');
		},
		success:function(data){
			if(data==1){
				modal('modalconcepto','','close');
				alertify.success('Datos ingresados correctamente');
				selconcepto();
				grillaconceptos();
			}else{
				if(data==2){
					modal('modalconcepto','','close');
					alertify.success('Datos actualizados correctamente');
					selconcepto();
					grillaconceptos();
				}else{
					if(data==3){
						alertify.warning('El código ingresado ya existe');
						$("#codigo").focus();
					}else{
						alertify.error('Error al registrar información');
					}					
				}				
			}
			desbloquear("#btnguardarconcepto",'Guardar');
		}
	})
}

function selconcepto(){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'conceptos/selconcepto',
		type:'post',
		data:{idedificio:idedificio},
		success:function(data){
			$("#concepto").html(data);
		}
	})
}

function calcularrecibo() {
	var importe = parseFloat($("#importe_recibo").val());
	var cargoFijo = parseFloat($("#cargo_fijo").val());
	var descuento_uno = parseFloat($("#descuento_uno").val());
	var descuento_dos = parseFloat($("#descuento_dos").val());
	var mora_uno = parseFloat($("#mora_uno").val());
	var mora_dos = parseFloat($("#mora_dos").val());
	var otros = parseFloat($("#otros").val());
	var total = importe + cargoFijo + descuento_uno + descuento_dos + mora_uno + mora_dos + otros;
	var igv = (total*(0.18)).toFixed(2);
	var redondeo = parseFloat(total) + parseFloat(igv);
	var calred = (redondeo * 10).toFixed(1);
	calred = (calred+"").split('.');
	redondeo = calred[1];
	if(!redondeo){
		redondeo=0;
	}
	redondeo = redondeo/100;
	if(redondeo!=0){
		redondeo = redondeo*-1;
	}
	redondeo = parseFloat(redondeo).toFixed(2);
	$("#igv").val(igv);
	$("#sub_total").val(total);
	$("#redondeo").val(redondeo);
	var total = parseFloat(total) + parseFloat(igv) + parseFloat(redondeo);
	$("#totalrecibo").val(total.toFixed(2))
}

function abrirmodal(){
	//limpiar();
	modal('modalPeriodo','NUEVO PERIODO','open');
}

function anio(){
	var idedificio = $("#edificiogeneral").val();
	$.ajax({
		url:url+'generacioncuotas/anio',
		type:'post',
		data:{idedificio:idedificio,opcion:1},
		success:function(data){
			$("#anio").html(data);
			$("#anio_manto").html(data);
		}
	})
}

function mes(){
	var idedificio = $("#edificiogeneral").val();
	var anio = $("#anio").val();
	if(idedificio!=0){
		if(anio!=0){
			$.ajax({
				url:url+'generacioncuotas/mes',
				type:'post',
				data:{idedificio:idedificio,anio:anio,opcion:1},
				success:function(data){
					$("#mes").html(data)
				}
			})
		}
	}
}

function mes_manto(){
	var idedificio = $("#edificiogeneral").val();
	var anio = $("#anio_manto").val();
	if(idedificio!=0){
		if(anio!=0){
			$.ajax({
				url:url+'generacioncuotas/mes',
				type:'post',
				data:{idedificio:idedificio,anio:anio},
				success:function(data){
					$("#mes_manto").html(data)
				}
			})
		}
	}
}

function padronlecturas(){
	var idedificio = $("#edificiogeneral").val();
	var anio = $("#anio").val();
	var mes = $("#mes").val();
	if(idedificio!=0){
		$.ajax({
			url:url+'generacioncuotas/padronlecturas',
			type:'post',
			data:{idedificio:idedificio,anio:anio,mes:mes},
			success:function(data){
				$(".padronlecturas").html(data);
				//anio();
			}
		})
	}else{
		$(".padronlecturas").html('');
		$("#anio").html('');
	}
}

function datosrecibo(){
	var idedificio = $("#edificiogeneral").val();
	var anio = $("#anio").val();
	var mes = $("#mes").val();
	if(mes!=0){
		$.ajax({
			url:url+'generacioncuotas/datosrecibo',
			type:'post',
			data:{idedificio:idedificio,anio:anio,mes:mes},
			dataType:'json',
			success:function(data){
				$("#idperiodo").val(data.idperiodo)
				$("#volumen_recibo").val(data.volumen)
				$("#importe_recibo").val(data.importe_soles)
				$("#importe_m3").val(data.importe_metros)
				$("#cargo_fijo").val(data.cargo_fijo)
				$("#descuento_uno").val(data.descuento_uno)
				$("#descuento_dos").val(data.descuento_dos)
				$("#mora_uno").val(data.mora_uno)
				$("#mora_dos").val(data.mora_dos)
				$("#otros").val(data.otros)
				$("#sub_total").val(data.sub_total)
				$("#igv").val(data.igv)
				$("#redondeo").val(data.redondeo)
				totalrecibo();
				padronlecturas();
			}
		})
	}else{
		$("#idperiodo").val('')
		$("#volumen_recibo").val('0')
		$("#importe_recibo").val('0')
		$("#importe_m3").val('0')
		$("#cargo_fijo").val('0')
		$("#descuento_uno").val('0')
		$("#descuento_dos").val('0')
		$("#mora_uno").val('0')
		$("#mora_dos").val('0')
		$("#otros").val('0')
		$("#sub_total").val('0')
		$("#igv").val('0')
		$("#redondeo").val('0')
		$("#totalrecibo").val('0')
		$(".padronlecturas").html('');
	}
}

function totalrecibo() {
	var sub_total = parseFloat($("#sub_total").val());
	var igv = parseFloat($("#igv").val());
	var redondeo = parseFloat($("#redondeo").val());
	var total = sub_total +igv + redondeo;
	if(total==NaN){
		total = 0;
	}
	total = total.toFixed(2);
	$("#totalrecibo").val(total)
}

function grabarrecibo(){
	var anio = $("#anio").val();
	var mes = $("#mes").val();
	var idperiodo = $("#idperiodo").val();
	var volumen_recibo = $("#volumen_recibo").val();
	var importe_recibo = $("#importe_recibo").val();
	var importe_m3 = $("#importe_m3").val();
	var cargo_fijo = $("#cargo_fijo").val();
	var descuento_uno = $("#descuento_uno").val();
	var descuento_dos = $("#descuento_dos").val();
	var mora_uno = $("#mora_uno").val();
	var mora_dos = $("#mora_dos").val();
	var otros = $("#otros").val();
	var sub_total = $("#sub_total").val();
	var igv = $("#igv").val();
	var redondeo = $("#redondeo").val();
	if(anio==0){
		alertify.warning('Seleccione el año para continuar');
		return;
	}
	if(mes==0){
		alertify.warning('Seleccione el mes para continuar');
		return;
	}
	$.ajax({
		url:url+'generacioncuotas/guardarrecibo',
		type:'post',
		data:{idperiodo:idperiodo,volumen_recibo:volumen_recibo,importe_recibo:importe_recibo,anio:anio,mes:mes,
			importe_m3:importe_m3,cargo_fijo:cargo_fijo,descuento_uno:descuento_uno,descuento_dos:descuento_dos,
			mora_uno:mora_uno,mora_dos:mora_dos,otros:otros,sub_total:sub_total,igv:igv,redondeo:redondeo
		},
		success:function(data){
			if (data==1){
				alertify.success('Los datos del recibo fueron registrados correctamente');
			}else{
				alertify.error('Ocurrio un error al registrar los datos');
			}
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
			
		}
	})
}

function generar(){
	var idedificio = $("#edificiogeneral").val();
	var nuevo_anio = $("#nuevo_anio").val();
	var nuevo_mes = $("#nuevo_mes").val();
	if(idedificio==0){
		alertify.warning('Aún no se seleccionado un edificio.');
		return;
	}
	if(nuevo_anio==0){
		alertify.warning('Ingrese el año del recibo.');
		return;
	}
	if(nuevo_mes==0){
		alertify.warning('Seleccione el mes del recibo.');
		return;
	}
	bloquear("#btngenerar",'Cargando...');
	$.ajax({
		url:url+'generacioncuotas/nuevoperiodo',
		type:'post',
		data:{idedificio:idedificio,nuevo_anio:nuevo_anio,nuevo_mes:nuevo_mes},
		success:function(data){
			if(data==1){
				alertify.success('Periodo agregado correctamente')
				location.reload();
			}else{
				if(data=='existe'){
					alertify.warning('El periodo seleccionado ya existe para el edificio');
				}else{
					alertify.error('Ocurrio un error al agregar el nuevo periodo');
				}				
			}
			desbloquear("#btngenerar",'Generar');
		}
	})
}

function actualizarlectura(idcon){
	var lectura_anterior = $("#lectura_anterior"+idcon).val();
	var lectura = $("#lectura"+idcon).val();
	var extra = $("#extra"+idcon).val();
	if(lectura=='' || lectura==NaN){
		lectura=0;
	}else{
		lectura = parseFloat(lectura); 
	}
	if(extra=='' || extra==NaN){
		extra=0;
	}else{
		extra = parseFloat(extra); 
	}
	if(lectura_anterior=='' || lectura_anterior==NaN){
		lectura_anterior=0;
	}else{
		lectura_anterior = parseFloat(lectura_anterior); 
	}
	var consumo = (lectura + extra) - lectura_anterior;
	$(".consumo"+idcon).html(consumo.toFixed(2));
	$("#lectura"+idcon).val(lectura.toFixed(2))

	$.ajax({
		url:'generacioncuotas/ingresarlectura',
		type:'post',
		data:{idcontometro:idcon,lectura:lectura,extra:extra,consumo:consumo},
		success:function(data){
			if(data==0){
				alertify.error("Ocurrio un error al ingresar la lectura");
			}
		}
	})
	
}

function calcularextra(){
	bloquear("#btnextra",'Calculando <i class="fa fa-spinner fa-spin"></i>');
	var anio = $("#anio").val();
	var mes = $("#mes").val();
	var idedificio = $("#edificiogeneral").val();
	if(idedificio==0){
		alertify.warning('Aún no se seleccionado un edificio.');
		return;
	}
	if(anio==0){
		alertify.warning('Ingrese el año del periodo.');
		return;
	}
	if(mes==0){
		alertify.warning('Seleccione el mes del periodo.');
		return;
	}
	$.ajax({
		url:url+'generacioncuotas/calcularextra',
		type:'post',
		data:{idedificio:idedificio,anio:anio,mes:mes},
		success:function(data){
			if(data==1){
				alertify.success('El consumo extra fue asignado correctamente');
				padronlecturas();
			}else{
				if(data==2){
					alertify.warning('No hay consumo extra por repartir.');
				}else{
					alertify.error('Ocurrio un error al asignar el consumo extra.');
				}
			}
			desbloquear("#btnextra",'CALCULAR CONSUMO EXTRA');
		}
	})

}

function modalidad(){
	var modalidad = $("#modalidad").val();
	if(modalidad==1){
		$(".individual").hide();
		$("#id_ui").val(0);
		$(".grupal").show();
	}else{
		if(modalidad==2){
			$(".grupal").hide();
			$("#tipo").val(0);
			$(".individual").show();
		}else{
			$("#id_ui").val(0);
			$("#tipo").val(0);
			$(".grupal").hide();
			$(".individual").hide();
		}
	}
}

function mostrarcuota(){
	var idedificio = $("#edificiogeneral").val();
	var anio = $("#anio_manto").val();
	var mes = $("#mes_manto").val();
	if(idedificio==0){
		alertify.warning("No se a seleccionado un edificio");
		return;
	}
	if(anio==0){
		alertify.warning("Seleccione al año");
		return;
	}
	if(mes==0){
		alertify.warning("Seleccione al mes");
		return;
	}
	$.ajax({
		url:'generacioncuotas/mostrarcuota',
		type:'post',
		data:{idedificio:idedificio,anio:anio,mes:mes},
		beforeSend:function(){
			bloquear("#btngenerar",'Generando...');
		},
		success:function(data){
			if(data==0){
				alertify.error('Ocurrio un error inesperado');
			}else{
				$(".detrecibo").html(data);
				editar();
			}			
			desbloquear("#btngenerar",'MOSTRAR');
		}
	})
}

function agregarconcepto(){
	bloquear("#btnagregar",'Generando...');
	var idedificio = $("#edificiogeneral").val();
	var anio = $("#anio_manto").val();
	var mes = $("#mes_manto").val();
	var modalidad = $("#modalidad").val();
	var concepto = $("#concepto").val();	
	var presupuesto = $("#presupuesto").val();
	if(modalidad==1){
		var id_ui = 0;
		var tipo = $("#tipo").val();
		var solodepar = $('input:checkbox[name=solodepartamento]:checked').val();
		if(solodepar==undefined){
			solodepar = 0;
		}
	}else{
		var id_ui = $("#id_ui").val();
		var tipo = 0;
		var solodepar = 0;
	}
	if(idedificio==0){
		alertify.warning('Aún no se selecciono un edificio principal');
		desbloquear("#btnagregar",'AGREGAR');
		return;
	}
	if(anio==0){
		alertify.warning('Seleccione el año del periodo de la asignación');
		desbloquear("#btnagregar",'AGREGAR');
		return;
	}
	if(mes==0){
		alertify.warning('Seleccione el mes del periodo de la asignación');
		desbloquear("#btnagregar",'AGREGAR');
		return;
	}
	if(modalidad==0){
		alertify.warning('Seleccione la modalidad de la asignación');
		desbloquear("#btnagregar",'AGREGAR');
		return;
	}
	if(concepto==0){
		alertify.warning('Seleccione el concepto a asignar');
		desbloquear("#btnagregar",'AGREGAR');
		return;
	}

	if(presupuesto=='' || presupuesto==0){
		alertify.warning('Ingrese el presupuesto del concepto');
		desbloquear("#btnagregar",'AGREGAR');
		return;
	}

	if(modalidad==2){
		if(id_ui==0){
			alertify.warning('Seleccione el departamento a asignar');
			desbloquear("#btnagregar",'AGREGAR');
			return;
		}
	}else{
		if(tipo==0){
			alertify.warning('Seleccione el tipo de asignación grupal');
			desbloquear("#btnagregar",'AGREGAR');
			return;
		}
	}

	$.ajax({
		url:url+'generacioncuotas/asignarconceptonuevo',
		type:'post',
		data:{idedificio:idedificio,anio:anio,mes:mes,modalidad:modalidad,concepto:concepto,id_ui:id_ui,presupuesto:presupuesto,tipo:tipo,solodepar:solodepar},
		success:function(data){
			if(data!=0){
				mostrarcuota();
			}else{
				alertify.error('Ocurrio un error al asignar el concepto');
			}
			desbloquear("#btnagregar",'AGREGAR');
		}
	})
}

function nuevoconcepto(){
	$("#idconcepto").val('')
	$("#codigo").val('')
	$("#nuevoconcepto").val('')
	$("#importe").val('0.00')	
	modal('modalconcepto','NUEVO CONCEPTO','open');
}

function confirmar(){
	var idedificio = $("#edificiogeneral").val();
	if(idedificio==0){
		alertify.warning('Aun no a seleccionado un edificio principal');
		return;
	}
	modal('modalConfirmar','CONFIRMAR GENERAR DE CUOTAS','open');
}

function confirmar_cuota(){
	bloquear("#btnconfirmarcuota",'Generando...');
	var idedificio = $("#edificiogeneral").val();
	var anio = $("#anio_manto").val();
	var mes = $("#mes_manto").val();
	$.ajax({
		url:url+'generacioncuotas/confirmar_cuota',
		type:'post',
		data:{idedificio:idedificio,anio:anio,mes:mes},
		success:function(data){
			if(data==1){
				alertify.success('Las cuotas fueron confirmados exitosamente');
				modal('modalConfirmar','','close');
				mostrarcuota();
			}else{
				alertify.error('Ocurrio un error al confirmar las cuotas');
				modal('modalConfirmar','','close');
			}
			desbloquear("#btnconfirmarcuota",'Continuar');
		}
	})
}

function exportar(){
	var idedificio = $("#edificiogeneral").val();
	var anio = $("#anio_manto").val();
	var mes = $("#mes_manto").val();
	nueva = url + 'generacioncuotas/exportar?idedificio='+idedificio+'&anio='+anio+'&mes='+mes;
    window.open(nueva, '_blank');
    return false;
}

function editar(){
	$('#tablacuotas .editable').editable('toggleDisabled');
}

function modificar(id){
    $.fn.editable.defaults.mode = 'inline';
	$("#detcuota"+id).editable({
           url: url+'generacioncuotas/editar',
           type: 'post',
           pk: id,
           title: 'Modificar Importe'
    });
}

function seleccionartodo(){
	if( $('#marcatodos').prop('checked')){
	    $(".marcado").prop("checked", true);  
	}else{
		$(".marcado").prop("checked", false);
	}
}

function generarpdf(){
	var selected = '';    
        $('#formcuotas input[type=checkbox]').each(function(){
            if (this.checked) {
                selected += $(this).val()+', ';
            }
        });
        if (selected != ''){
            link = url+'generacioncuotas/generarpdf/'+selected;
		    window.open(link, '_blank');
		    return false;  
        }else{
            alertify.warning("Seleccion al menos un registro para generar");
        }
        return;
}

function grillaconceptos(){
	$.ajax({
		url:url+'conceptos/grilla',
		success:function(data){
			$("#tablagrilla").html(data);
			tablaconceptos();
			verconceptos();
		}
	})
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
			$("#nuevoconcepto").val(data.concepto),
			$("#importe").val(data.importe)
			modal('modalconcepto','MODIFICAR COCEPTO-'+data.codigo,'open');
		}
	})
}

function verconceptos(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	   	var dWidth = $(window).width() * 0.8;
    	var dHeight = $(window).height() * 1;
	}else{
		var dWidth = $(window).width() * 0.7;
    	var dHeight = $(window).height() * 0.8; 
	}
	$( "#dialogconceptos" ).dialog({
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
    }).prev(".ui-dialog-titlebar").css("background","skyblue");;
}

function eliminarconcepto(id){
	$("#idconcepto").val(id)
	modal('modalEliminarConcepto','CONFIRMAR!!','open');
}

function confirma_eliminar_concepto(){
	var id = $("#idconcepto").val()
	$.ajax({
		url:url+'conceptos/eliminar',
		type:'post',
		data:{id:id,opcion:1},
		success:function(data){
			if(data==3){
				alertify.warning('Registro desabilitado!!');
				modal('modalEliminarConcepto','','close');
				grillaconceptos();
			}else{
				if(data==4){
					alertify.warning('Registro eliminado!!');
					modal('modalEliminarConcepto','','close');
					grillaconceptos();
				}else{
					alertify.error('Error al eliminar!!');
				}				
			}
		}
	})
}

function tablaconceptos(){
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