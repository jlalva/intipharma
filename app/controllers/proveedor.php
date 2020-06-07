<?php
class proveedor extends Controller{

	public function __construct(){
      if(Session::get('autenticado')){
			$this->functionModel = $this->model('funciones');
			$this->proveedor = $this->model('proveedorModelo');
			$this->grilla = $this->model('grillaModelo');
			$this->menu();

      	}else{
       		$this->redireccionar();
      	}
	}

    public function index(){
		$date=[
			'titulo'=>'PROVEEDOR',
			'titulotabla'=>'PROVEEDORES',
			'url'=>'proveedor',
			'modulo'=>'Almacen'
		];
      	$js = ['0'=>'proveedor.js'];
		$this->viewAdmin('proveedor/index',$js,$date);
	}

	public function consultaruc(){
		$ruc = $_POST['ruc'];
		$url = "https://dniruc.apisperu.com/api/v1/ruc/".$ruc."?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imppbm9hbHZhQGdtYWlsLmNvbSJ9.l05bL9cP03k-e-D-Rm9rOVSG2IEFlBqcD29T6meGEOc";
		$arrContextOptions=array(
		    "ssl"=>array(
		        "verify_peer"=>false,
		        "verify_peer_name"=>false,
		    ),
		);
		$response = file_get_contents($url, false, stream_context_create($arrContextOptions));
		print_r($response);
	}

	public function departamento(){
		$x = $this->proveedor->departamento();
		$select = $_POST['select'];
		if($select==''){
			$select = 15;
		}
		$com ='<option value="">--Departamento-</option>';
		for ($i=0; $i < count($x); $i++) { 
			if($x[$i]['iddepartamento']==$select){
				$check = "selected='selected'";
			}else{
				$check = '';
			}
			$com .='<option value="'.$x[$i]['iddepartamento'].'" '.$check.'>'.$x[$i]['departamento'].'</option>';
		}
		echo $com;
	}

	public function provincia(){
		$depar = $_POST['departamento'];
		$select = $_POST['select'];
		$x = $this->proveedor->provincia($depar);
		$com ='<option value="">--Provincia--</option>';
		for ($i=0; $i < count($x); $i++) {
			if($x[$i]['idprovincia']==$select){
				$check = "selected='selected'";
			}else{
				$check = '';
			}
			$com .='<option value="'.$x[$i]['idprovincia'].'" '.$check.'>'.$x[$i]['provincia'].'</option>';
		}
		echo $com;
	}

	public function distrito(){
		$prov = $_POST['provincia'];
		$select = $_POST['select'];
		$x = $this->proveedor->distrito($prov);
		$com ='<option value="">--Distrito--</option>';
		for ($i=0; $i < count($x); $i++) {
			if($x[$i]['iddistrito']==$select){
				$check = "selected='selected'";
			}else{
				$check = '';
			}
			$com .='<option value="'.$x[$i]['iddistrito'].'" '.$check.'>'.$x[$i]['distrito'].'</option>';
		}
		echo $com;
	}
}
?>
