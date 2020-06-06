$(function(){
    grilla();
})

function guardar(){
    var idedificio = $("#edificiogeneral").val()
    var idtipoconcepto = $("#idtipoconcepto").val()
    var descripcion = $("#descripcion").val()

    $.ajax({
        url:url+'tipoconcepto/ingresar',
        type:'post',
        data:{idedificio:idedificio,idtipoconcepto:idtipoconcepto,descripcion:descripcion},
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
    var idedificio = $("#edificiogeneral").val();
    if(idedificio==0){
        alertify.error('Seleccione un edificio para continuar');
        return;
    }
    limpiar();
    modal('modalGuardar','AGREGAR MODALIDAD','open');
}

function limpiar(){
    $("#idtipoconcepto").val('')
    $("#descripcion").val('')
}

function editartipoconcepto(id){
    desbloquear("#btnguardar",'Guardar');
    $.ajax({
        url:url+'tipoconcepto/verdatos',
        type:'post',
        data:{id:id},
        dataType:'json',
        success:function(data){
            $("#idtipoconcepto").val(data.idtipoconcepto),
                $("#descripcion").val(data.descripcion)
            modal('modalGuardar','MODIFICAR MODALIDAD - '+data.descripcion,'open');
        }
    })
}

function eliminartipoconcepto(id){
    $("#idtipoconcepto").val(id)
    modal('modalEliminar','CONFIRMAR!!','open');
}

function confirma_eliminar(){
    var id = $("#idtipoconcepto").val()
    $.ajax({
        url:url+'tipoconcepto/eliminar',
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
    $("#idtipoconcepto").val(id)
    modal('modalRestablecer','CONFIRMAR!!','open');
}

function borrar(id){
    $("#idtipoconcepto").val(id)
    modal('modalBorrar','CONFIRMAR!!','open');
}

function grilla(){
    $.ajax({
        url:url+'tipoconcepto/grilla',
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