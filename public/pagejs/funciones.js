$(function(){
    $("#buscador").keypress(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code==13){
          var tbuscar = $("#buscador").val();
            changePagination(0);
      }
    });

    $('.decimal').on('input', function () { 
      this.value = this.value.replace(/[^0-9^.^-]/g,'');
    });

    $('.numeros').on('input', function () { 
      this.value = this.value.replace(/[^0-9]/g,'');
    });
})

function modal(modal,titulo,opcion){
    if(opcion=='open'){
      $("."+modal).html(titulo)
      $("#"+modal).modal({backdrop: 'static', keyboard: false})  
    }else{
      if(opcion=='close'){
        $("#"+modal).modal('hide')
      } 
    }    
}

function bloquear(boton,mensaje){
    $(boton).attr('disabled',true);
    $(boton).html(mensaje);
}

function desbloquear(boton,mensaje){
    $(boton).attr('disabled',false);
    $(boton).html(mensaje);
}

function fijaredificio(){
    var idedificio = $("#edificiogeneral").val();
    $.ajax({
        url:url+'configuracion/fijaredificio',
        type:'post',
        data:{id:idedificio},
        dataType:'json',
        success:function(data){
            location.reload();
        }
    })
}

function notificacion(color,titulo,mensaje){
	var i = -1;
        var toastCount = 0;
        var $toastlast;

            var shortCutFunction = color || 'warning';
            var msg = mensaje;
            var title = titulo;
            var $showDuration = 800;
            var $hideDuration = 800;
            var $timeOut = 3000;
            var $extendedTimeOut = 800;
            var $showEasing = 'swing';
            var $hideEasing = 'linear';
            var $showMethod = 'fadeIn';
            var $hideMethod ='fadeOut';
            var toastIndex = toastCount++;

            toastr.options = {
                closeButton: '',
                debug: '',
                positionClass: 'toast-top-right',
                onclick: null
            };

            if ($showDuration.length) {
                toastr.options.showDuration = $showDuration;
            }

            if ($hideDuration.length) {
                toastr.options.hideDuration = $hideDuration;
            }

            if ($timeOut.length) {
                toastr.options.timeOut = $timeOut;
            }

            if ($extendedTimeOut.length) {
                toastr.options.extendedTimeOut = $extendedTimeOut;
            }

            if ($showEasing.length) {
                toastr.options.showEasing = $showEasing;
            }

            if ($hideEasing.length) {
                toastr.options.hideEasing = $hideEasing;
            }

            if ($showMethod.length) {
                toastr.options.showMethod = $showMethod;
            }

            if ($hideMethod.length) {
                toastr.options.hideMethod = $hideMethod;
            }

            if (!msg) {
                msg = getMessage();
            }            

            var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
            $toastlast = $toast;
            if ($toast.find('#okBtn').length) {
                $toast.delegate('#okBtn', 'click', function () {
                    alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
                    $toast.remove();
                });
            }
            if ($toast.find('#surpriseBtn').length) {
                $toast.delegate('#surpriseBtn', 'click', function () {
                    alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
                });
            }
        
}

function  getMessage  () {
    var i = -1;
    var msgs = ['Alerta. El mensaje no fue definido!'
    ];
    i++;
    if (i === msgs.length) {
        i = 0;
    }

    return msgs[i];
};