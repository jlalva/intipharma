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
                            <div class="col-lg-6">
                                <label class="control-label">RUC <span style="color: red;">*</span></label>
                                <input type="text" class="numeros form-control" name="ruc" id="ruc">
                                <input type="hidden" id="idproveedor" name="idproveedor">
                            </div>
                            <div class="col-lg-6">
                                <label class="control-label">Teléfono <span style="color: red;">*</span></label>
                                <input type="text" class="form-control" name="telefono" id="telefono">
                            </div>
                        </div>
                        <div class="form-group col-lg-12">          
                            <div class="col-lg-12">
                                <label class="control-label">Proveedor <span style="color: red;">*</span></label>
                                <input type="text" class="form-control" name="proveedor" id="proveedor">
                            </div>
                        </div>
                        <div class="form-group col-lg-12">                            
                            <div class="col-lg-6">
                                <label class="control-label">Correo</label>
                                <input class="form-control" name="correo" id="correo">
                            </div>
                            <div class="col-lg-6">
                                <label class="control-label">Departamento <span style="color: red;">*</span></label>
                                <select class="form-control" name="departamento" id="departamento" onchange="ubprovincia('','')"></select>
                            </div>
                        </div>
                        <div class="form-group col-lg-12">                            
                            <div class="col-lg-6">
                                <label class="control-label">Provincia <span style="color: red;">*</span></label>
                                <select class="form-control" name="provincia" id="provincia" onchange="ubdistrito('','')">
                                    <option value="0">--Seleccione--</option>
                                </select>
                            </div>
                            <div class="col-lg-6">
                                <label class="control-label">Distrito <span style="color: red;">*</span></label>
                                <select class="form-control" name="distrito" id="distrito">
                                    <option value="0">--Seleccione--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-lg-12">
                            <div class="col-lg-12">
                                <label class="control-label">Dirección</label>
                                <input class="form-control" name="direccion" id="direccion">
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
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title modalEliminar"></h4>
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

<div class="modal fade" id="modalAcceso">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title modalAcceso"></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div id="listaacceso">
                    
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn width-100 btn-default" data-dismiss="modal">Cancelar</button>
                <button class="btn width-100 btn-primary" id="btnrestablecer" onclick="actualizar()">Actualizar</button>
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