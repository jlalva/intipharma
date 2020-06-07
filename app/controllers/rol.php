<?php
	class rol extends Controller{

		public function __construct(){
	      if(Session::get('autenticado')){
				$this->functionModel = $this->model('funciones');
				$this->grilla = $this->model('grillaModelo');
				$this->rolModel = $this->model('rolModelo');
				$this->menu();
	      	}else{
	       		$this->redireccionar();
	      	}
		}

    	public function index(){
			$date=[
				'titulo'=>'Roles',
				'titulotabla'=>'Roles',
				'url'=> 'rol',
				'modulo'=> 'Seguridad'
			];

	      	$js = [
	      		'0'=>'rol.js'
	      	];
			$this->viewAdmin('rol/index',$js,$date);
		}

		public function grilla(){
			$datos = $this->grilla->rol();
			$cad ='<table id="datatable" class="table table-striped table-bordered" style="width:100%">
	              <thead>
	                <tr>
	                	<th width="10">Item</th>
		                <th width="190">Rol</th>
		                <th width="30">Acción</th>
	                </tr>
	              </thead>
	              <tbody>';
	        	for ($i=0; $i < count($datos); $i++) { 
	        		$cad .='<tr>';
	        			$cad .='<td>'.($i+1).'</td>';
	        			$cad .='<td>'.$datos[$i]['rol'].'</td>';
	        			$cad .='<td>
	        				<button class="btn btn-success btn-sm" onclick="editarrol('.$datos[$i]['idrol'].')" title="Editar"><i class="fa fa-edit"></i></button>
	        				<button class="btn btn-primary btn-sm" onclick="acceso('.$datos[$i]['idrol'].')" title="Acceso"><i class="fa fa-list"></i></button>
	        				<button class="btn btn-danger btn-sm" onclick="eliminarrol('.$datos[$i]['idrol'].')" title="Eliminar"><i class="fa fa-remove"></i></button>
	        				</td>';
	        		$cad .='</tr>';
	        	}

	        $cad .='</tbody>
	            </table>';
	       	echo $cad;
		}

		public function verdatos(){
			$id = $_POST['id'];
			$item = $this->functionModel->verregistro('rol','idrol',$id,'');
			$json = ['idrol'=>$id,
						'rol'=>trim(utf8_encode($item['rol']))
					];
			echo json_encode($json);
		}

		public function ingresar(){
			$idrol = $_POST['idrol'];
			$rol = $_POST['rol'];
			if($idrol==''){
				$data = [
							'rol'=>$rol,
							'estareg'=>1
						];
				$resp = $this->save($data,'rol');
			}else{
				$data = [
							'idrol'=>$idrol,
							'rol'=>$rol
						];
				$resp = $this->update($data,'rol');
			}
			echo $resp;
		}

		public function eliminar(){
			$data = [
				'idrol'=>$_POST['id']
			];
			echo $this->delete($data,'rol',$_POST['opcion']);
		}

		public function listaacceso(){
			$idrol = $_POST['idrol'];
			$rol = $this->rolModel->nombrerol($idrol);
			$datos = $this->rolModel->modulopadre();
			$cad = '<div class="panel-group accordion" id="accordion">';
			foreach ($datos as $row) {
				$cad .= '<div class="panel panel-white">

                            <div class="panel-heading">
                                <h5 class="panel-title">
                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion"  href="#'.$row['idmodulo'].'">
                                        <i class="icon-arrow"></i>'.$row['modulo'].'
                                    </a>
                                </h5>
                            </div>
                            <div id="'.$row['idmodulo'].'" class="panel-collapse collapse">';
                                $modulo = $this->rolModel->modulos($row['idmodulo']);
                                foreach ($modulo as $mod) {
                                	$seleccionar = $this->rolModel->seleccionar($mod['idmodulo'],$idrol);
                                	$checked ='';
                                	$checkver = '';
                                	$checkeditar = '';
                                	$checkcrear  = '';
                                	$checkeliminr = '';
                                	$idpermiso = '';
                                	if(!empty($seleccionar)){
                                		//$checked = 'checked';
                                		if($seleccionar['ver']==1){
                                			$checkver = 'checked';
                                		}
                                		if($seleccionar['editar']==1){
                                			$checkeditar = 'checked';
                                		}
                                		if($seleccionar['crear']==1){
                                			$checkcrear = 'checked';
                                		}
                                		if($seleccionar['eliminar']==1){
                                			$checkeliminr = 'checked';
                                		}
                                		$idpermiso = $seleccionar['idpermiso'];
                                	}
                                	$cad .="<div class='panel-body'>
                                			<div class='col-lg-12'>                        				
					                            <input type='checkbox' class='grey checkbox-callback' ".$checked." onclick='daracceso(".$mod['idmodulo'].")' id='modulo".$mod['idmodulo']."'> ".$mod['modulo']."
					                            	<div class='col-lg-12'>
					                            		<input type='checkbox' ".$checkver." id='ver".$idpermiso."' onclick='opcioncrud(".$idpermiso.",1)'> Ver
					                            		<input type='checkbox' ".$checkeditar." id='editar".$idpermiso."' onclick='opcioncrud(".$idpermiso.",2)'> Editar
					                            		<input type='checkbox' ".$checkcrear." id='crear".$idpermiso."' onclick='opcioncrud(".$idpermiso.",3)'> Crear
					                            		<input type='checkbox' ".$checkeliminr." id='eliminar".$idpermiso."' onclick='opcioncrud(".$idpermiso.",4)'> Eliminar
					                            	</div>
					                        </div></div>";
                                }                           
                $cad .=	    	'</div>
                        </div>';
			}
			$cad .='</div>';
			$arr = array('cad'=>$cad,'nombre'=>$rol['rol']);
			echo json_encode($arr);	
		}

		public function daracceso(){
			$idrol = $_POST['idrol'];
			$idmodulo = $_POST['idmodulo'];
			$this->rolModel->daracceso($idrol,$idmodulo);
		}

		public function quitaracceso(){
			$idrol = $_POST['idrol'];
			$idmodulo = $_POST['idmodulo'];
			$this->rolModel->quitaracceso($idrol,$idmodulo);
		}

		public function opcioncrud(){
			$idpermiso = $_POST['idpermiso'];
			$opcion = $_POST['opcion'];
			$est = $_POST['est'];
			$crud = '';
			switch ($opcion) {
				case 1:$crud='ver';break;
				case 2:$crud='editar';break;
				case 3:$crud='crear';break;
				case 4:$crud='eliminar';break;
			}
			$data = [
						'idpermiso'=>$idpermiso,
						$crud=>$est
					];
			$resp = $this->update($data,'permisos');
			echo $resp;
		}
	}
?>