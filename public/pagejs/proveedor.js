$(function(){
	departamento('');
    ubprovincia(15,'');
	$("#ruc").blur(function(){
	var ruc = $("#ruc").val();
	if(ruc!=''){
        if(ruc.length!=11){
            alertify.error("El número de RUC es inválido");
            return;
        }
		$.ajax({
			url:url+'proveedor/consultaruc',
			type:'post',
			data:{ruc:ruc},
			dataType:'json',
			success:function(data){
                $("#proveedor").val(data.razonSocial)
                $("#direccion").val(data.direccion)
			}
		})
	}
});
})

function departamento(sel){
    $.ajax({
        url:url+'proveedor/departamento',
        type:'post',
        data:{select:sel},
        success:function(data){
            $("#departamento").html(data);
        }
    })
}

function ubprovincia(de,sel){
    var departamento = $("#departamento").val();
    if(de!=''){
        departamento = de;
    }
    $.ajax({
        url:url+'proveedor/provincia',
        type:'post',
        data:{departamento:departamento,select:sel},
        success:function(data){
            $("#provincia").html(data);
        }
    })
}

function ubdistrito(de,sel){
    var provincia = $("#provincia").val();
     if(de!=''){
        provincia = de;
    }
    $.ajax({
        url:url+'proveedor/distrito',
        type:'post',
        data:{provincia:provincia,select:sel},
        success:function(data){
            $("#distrito").html(data);
        }
    })
}

function abrirmodal(){
	//limpiar();
	modal('modalGuardar','NUEVO PROVEEDOR','open');
}

function guardar(){
	var idproveedor = $("#idproveedor").val();
	var ruc = $("#ruc").val();
	var proveedor = $("#proveedor").val();
	var telefono = $("#telefono").val();
	var departamento = $("#departamento").val();
	var provincia = $("#provincia").val();
	var distrito = $("#distrito").val();
	if(ruc==''){
		alertify.error("Ingrese el RUC del proveedor");
		$("#ruc").focus();
		return;
	}else{
		if(ruc.length!=11){
			$("#ruc").focus();
            return;
        }
	}
	if(telefono==''){
		alertify.error("Ingrese el teléfono del proveedor");
		$("#telefono").focus();
		return;
	}
	if(proveedor==''){
		alertify.error("Ingrese el proveedor");
		$("#proveedor").focus();
		return;
	}
	if(departamento==0){
		alertify.error("Seleccione el departamento");
		return;
	}
	if(provincia==0){
		alertify.error("Seleccione la provincia");
		return;
	}
	if(distrito==0){
		alertify.error("Seleccione el distrito");
		return;
	}
}