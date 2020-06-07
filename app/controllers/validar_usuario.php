<?php
	class validar_usuario extends Controller{

		public function __construct(){
			$this->validarModel = $this->model('validar_usuarioModelo');
		}

		public function index(){
		}

		public function validar(){
			$usuario = $_POST['usuario'];
			$password = $_POST['password'];
			$datos = $this->validarModel->validardatos(trim($usuario));
			if(!empty($datos)){
				if(password_verify($password,$datos['password'])){
					Session::set('autenticado',true);
					Session::set('idrol',$datos['idrol']);
					Session::set('idusuario',$datos['idusuario']);
					Session::set('usuario',$datos['usuario']);
					Session::set('nombre',$datos['nombre']);
					Session::set('apellido',$datos['apellido']);
					$data['mensaje'] ='Ingresando al sistema';
					$data['res']=1;
				}else{
					$data['mensaje'] ='La contraseña es incorrecta';
					$data['res']=2;
				}
			}else{
				$data['mensaje'] ='El usuario ingresado no existe';
				$data['res']=3;
			}
			echo json_encode($data);
		}

		public function salir(){
			Session_destroy();
			$this->redireccionar('salir');
		}
	}
?>
