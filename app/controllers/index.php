<?php
	class index extends Controller{

		public function __construct(){
		}

		public function index(){
			//$categoria = $this->functionModel->datos();
			$date=[
				'titulo'=>'Panel de Inicio de Sesión'
			];
			$js=[
				'0'=>'login.js'
			];
			$this->viewLogin('login/index',$js,$date);
		}

	}
?>
