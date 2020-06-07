<div class="col-md-12 col-sm-12 ">
    <div class="x_panel">
        <div class="x_title">
            <h2>Tabla de datos</h2>
            <ul class="nav navbar-right panel_toolbox">
                <li><a class="btn btn-xs" onclick="abrirmodal()"><i class="fa fa-plus"></i> NUEVO</a></li>
                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
                <li><a class="close-link"><i class="fa fa-close"></i></a></li>
            </ul>
            <div class="clearfix"></div>
        </div>
      <div class="x_content">
        <div class="row">
          <div class="col-sm-12">
            <div class="card-box table-responsive">
              <div id="tabla"></div>            
            </div>
        </div>
      </div>
    </div>
    </div>
</div>

<div class="modal fade" id="modalGuardar">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title modalGuardar"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>    
            <form class="form-usuario" onsubmit="return false;">        
                <div class="modal-body">
                    <fieldset>                        
                        <div class="form-group col-lg-12">
                            <div class="errorHandler alert alert-danger no-display">
                                <span class="mensaje"></span>
                            </div>
                        </div>                        
                        <div class="form-group col-lg-12">                            
                            <div class="col-lg-6">
                                <label class="control-label">Nombre</label>
                                <input type="text" class="form-control" name="nombre" id="nombre">
                                <input type="hidden" id="idusuario" name="idusuario">
                            </div>
                            <div class="col-lg-6">
                                <label class="control-label">Apellido</label>
                                <input type="text" class="form-control" name="apellido" id="apellido">
                            </div>
                        </div>
                        <div class="form-group col-lg-12">
                            <div class="col-lg-6">
                                <label class="control-label">Usuario</label>
                                <input type="text" class="form-control" name="usuario" id="usuario">
                            </div>
                            <div class="col-lg-6">
                                <label class="control-label">Password</label>
                                <input type="password" class="form-control" name="password" id="password">
                            </div>
                        </div>
                        <div class="form-group col-lg-12">
                            <div class="col-lg-12">
                                <label class="control-label">Rol</label>
                                <select id="idrol" name="idrol" class="form-control"> <?=$date['select']?></select>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    <button class="btn btn-primary" type="" id="btnguardar" onclick="guardar()">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="modalEliminar">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title modalEliminar"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger m-b-0">
                    <p><b>Confirmación:</b> Está tratando de eliminar un registro, desea continuar?</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn width-100 btn-default" data-dismiss="modal">Cancelar</button>
                <button class="btn width-100 btn-danger" id="btneliminar" onclick="confirma_eliminar()">Continuar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalRestablecer">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title modalRestablecer"></h4>
            </div>
            <div class="modal-body">
                <div class="alert alert-warning m-b-0">
                    <p><b>Confirmación:</b> Está tratando de restablecer un registro, desea continuar?</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn width-100 btn-default" data-dismiss="modal">Cancelar</button>
                <button class="btn width-100 btn-warning" id="btnrestablecer" onclick="confirma_restablecer()">Continuar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalBorrar">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title modalBorrar"></h4>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger m-b-0">
                    <p><b>Alto:</b> Está opción eliminará por completo el registro y no se podrá restablecer, desea continuar?</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn width-100 btn-default" data-dismiss="modal">Cancelar</button>
                <button class="btn width-100 btn-danger" id="btneliminar" onclick="confirma_borrar()">Continuar</button>
            </div>
        </div>
    </div>
</div>