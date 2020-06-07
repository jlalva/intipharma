<?php
	class user extends Controller{

		public function __construct(){
	      if(Session::get('autenticado')){
				$this->functionModel = $this->model('funciones');
				$this->grilla = $this->model('grillaModelo');
				$this->menu();
	      	}else{
	       		$this->redireccionar();
	      	}
			}

	    public function index(){
	    	$rol = $this->select('rol','rol','idrol',1,'');
	    	
			$date=[
				'titulo'=>'Administrar Usuarios',
				'titulotabla'=>'Usuarios',
				'select'=> $rol,
				'url'=> 'user',
				'modulo'=> 'Seguridad'
			];

	      	$js = [
	      		'0'=>'user.js'
	      	];
				$this->viewAdmin('user/index',$js,$date);
		}

		public function grilla(){
			$datos = $this->grilla->usuario();
			$cad ='<table id="datatable" class="table table-striped table-bordered" style="width:100%">
	              <thead>
	                <tr>
	                	<th>Item</th>
		                <th>Nombre</th>
		                <th>Apellido</th>
		                <th>Usuario</th>
		                <th>Rol</th>
		                <th>Acción</th>
	                </tr>
	              </thead>
	              <tbody>';
	        	for ($i=0; $i < count($datos); $i++) { 
	        		$cad .='<tr>';
	        			$cad .='<td>'.($i+1).'</td>';
	        			$cad .='<td>'.$datos[$i]['nombre'].'</td>';
	        			$cad .='<td>'.$datos[$i]['apellido'].'</td>';
	        			$cad .='<td>'.$datos[$i]['usuario'].'</td>';
	        			$cad .='<td>'.$datos[$i]['rol'].'</td>';
	        			$cad .='<td>
	        				<button class="btn btn-success btn-sm" onclick="editarusuario('.$datos[$i]['idusuario'].')" title="Editar"><i class="fa fa-edit"></i></button>
	        				<button class="btn btn-danger btn-sm" onclick="eliminarusuario('.$datos[$i]['idusuario'].')" title="Eliminar"><i class="fa fa-remove"></i></button>
	        				</td>';
	        		$cad .='</tr>';
	        	}

	        $cad .='</tbody>
	            </table>';
	       	echo $cad;
		}

		public function ingresar(){
			$idusuario = $_POST['idusuario'];
			$nombre = trim($_POST['nombre']);
			$apellido = trim($_POST['apellido']);
			$usuario = trim($_POST['usuario']);
			$password = trim($_POST['password']);
			$idrol = $_POST['idrol'];
			$x = null;
			if($idusuario==''){
				$x = $this->functionModel->existe($usuario,'usuario','usuario');
			}
			if(empty($x)){
				if($idusuario==''){
					$data = [
							'nombre'=>$nombre,
							'apellido'=>$apellido,
							'usuario'=>$usuario,
							'password'=>password_hash($password, PASSWORD_DEFAULT),
							'idrol'=>$idrol,
							'estareg'=>1
						];
					$resp = $this->save($data,'usuario');
				}else{
					$data = [
							'idusuario'=>$idusuario,
							'nombre'=>$nombre,
							'apellido'=>$apellido,
							'idrol'=>$idrol
						];
					$resp = $this->update($data,'usuario');
				}
			}else{
				$resp=3;
			}
			echo $resp;
		}

		public function verdatos(){
			$id = $_POST['id'];
			$item = $this->functionModel->verregistro('usuario','idusuario',$id,'');
			$json = ['idusuario'=>$id,
						'nombre'=>trim(utf8_encode($item['nombre'])),
						'apellido'=>trim(utf8_encode($item['apellido'])),
						'usuario'=>trim(utf8_encode($item['usuario'])),
						'idrol'=>$item['idrol']
					];
			echo json_encode($json);
		}

		public function eliminar(){
			$data = [
				'idusuario'=>$_POST['id']
			];
			echo $this->delete($data,'usuario',$_POST['opcion']);
		}
	}
?>