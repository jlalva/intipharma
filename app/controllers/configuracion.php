<?php
	class configuracion extends Controller{

		public function __construct(){
			$this->funcionesModel = $this->model('funciones');
		}

		public function index(){}

		public function consultardocumento(){
			$idtipo_documento = $_POST['idtipo_documento'];
			$documento = $_POST['documento'];
			$tabla = $_POST['tabla'];
			$campo = $_POST['campo'];
			$existe = $this->funcionesModel->existe($documento,$tabla,$campo);
			if(empty($existe)){
				$var = array('no existe'=>true);
			}else{
				$var = array('existe'=>true);
			}
			echo json_encode($var);
		}

		public function fijaredificio(){
			$id = $_POST['id'];
			Session::set('idedificio',$id);
			echo 1;
		}

	}
?>
