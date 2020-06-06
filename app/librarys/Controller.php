<?php
	class Controller{

		public function model($model){
			require_once '../app/models/'.$model.'.php';
			return new $model();
		}

		public function viewLogin($view,$js=[],$date=[]){
			if(file_exists('../app/views/page/'.$view.'.php')){
				require_once '../app/views/inc/login/header.php';
				require_once '../app/views/page/'.$view.'.php';
				require_once '../app/views/inc/login/footer.php';
			}else{
				die('Vista no creada');
			}
		}

		public function viewAdmin($view,$js=[],$date=[]){
			if(file_exists('../app/views/page/'.$view.'.php')){
				require_once '../app/views/inc/admin/header.php';
				require_once '../app/views/page/'.$view.'.php';
				require_once '../app/views/inc/admin/footer.php';
			}else{
				die('Vista no creada');
			}
		}

		public function redireccionar($ruta = false){
	      if($ruta){
	      	if($ruta=='salir'){
	      		header('location:'.BASE_URL);
	      	}else{
	      		header('location:'.BASE_URL.$ruta);
	      	}	        
	      }else{
	        header('location:'.BASE_URL.'denied');
	      }
	    }

	    protected function library($libreria){
	      $rutaLibreria = $_SERVER['DOCUMENT_ROOT'].BASE_URL.'library/'.$libreria.'.php';
	      if(is_readable($rutaLibreria)){
	        require_once $rutaLibreria;
	      }else{
	        throw new Exception("Error de la Librería");
	      }
	    }

	    protected function img($img){
	      $rutaImg = $_SERVER['DOCUMENT_ROOT'].BASE_URL.'public/images/'.$img;
	      if(is_readable($rutaImg)){
	        return $rutaImg;
	      }else{
	        throw new Exception("No se encontro la imagen");
	      }
	    }

		public function menu(){
			Session::set('menucreado',false);
			if(Session::get('autenticado')){
				$this->menuModel = $this->model('funciones');
				$menu = $this->menuModel->menu(Session::get('idrol'));
				Session::set('menu',$menu);
				Session::set('menucreado',false);
			}
			return;
		}

		public function mestextoabre($mes){
			$mes = intval($mes);
		    $mestexto = [
		        '1'=>'Ene',
		        '2'=>'Feb',
		        '3'=>'Mar',
		        '4'=>'Abr',
		        '5'=>'May',
		        '6'=>'Jun',
		        '7'=>'Jul',
		        '8'=>'Agos',
		        '9'=>'Set',
		        '10'=>'Oct',
		        '11'=>'Nov',
		        '12'=>'Dic'
		    ];
			return $mestexto[$mes];
		}

		public function nombredia($dia){
			$dia = intval($dia);
			switch (date('w', $dia)){
			    case 0: return "Domingo"; break;
			    case 1: return "Lunes"; break;
			    case 2: return "Martes"; break;
			    case 3: return "Miercoles"; break;
			    case 4: return "Jueves"; break;
			    case 5: return "Viernes"; break;
			    case 6: return "Sabado"; break;
			}
		}

		public function mestexto($mes){
			$array = ['1'=>'Enero',
						'2'=>'Febrero',
						'3'=>'Marzo',
						'4'=>'Abril',
						'5'=>'Mayo',
						'6'=>'Junio',
						'7'=>'Julio',
						'8'=>'Agosto',
						'9'=>'Setiembre',
						'10'=>'Octubre',
						'11'=>'Noviembre',
						'12'=>'Diciembre'
					];
			return $array[$mes];
		}

		public function save($data,$tabla){
			$this->saveModel = $this->model('funciones');
			$campos ='';
			$valor ='';
			$objeto = (object) $data;
			foreach ($objeto as $campo => $value){
			    $campos .= $campo.',';
			    $valor .= "'".$value."',";
			}
			$campos = substr($campos, 0,-1);
			$valor = substr($valor, 0,-1);
			return $this->saveModel->save($campos,$valor,$tabla);
		}

		public function update($data,$tabla){
			$this->saveModel = $this->model('funciones');
			$campos ='';
			$valor ='';
			$where='';
			$flag=0;
			$objeto = (object) $data;
			foreach ($objeto as $campo => $value){
				if($flag==0){
					$where =$campo."=".$value;
					$flag=1;
				}else{
					$campos .= $campo."='".$value."',";				    
				}			    
			}
			$campos = substr($campos, 0,-1);
			return $this->saveModel->update($campos,$where,$tabla);
		}

		public function delete($data,$tabla,$opcion){
			$this->saveModel = $this->model('funciones');
			$where='';
			$objeto = (object) $data;
			foreach ($objeto as $campo => $value){
				$where =$campo."=".$value;		    
			}
			if($opcion==0){
				return $this->saveModel->desabled($where,$tabla);
			}else{
				if($opcion==1){
					return $this->saveModel->delete($where,$tabla);
				}else{
					if($opcion==2){
						return $this->saveModel->restore($where,$tabla);
					}
				}					
			}
		}

		public function select($tabla,$campo,$idtabla,$estado,$sql,$select = false){
			$this->selectModel = $this->model('funciones');
			$sel = $this->selectModel->select($tabla,$estado,$sql);
			$com = '<option value="0">--Seleccionar--</option>';
			if(!empty($sel)){
				foreach ($sel as $row) {
					if($select){
						if($select==$row[$idtabla]){
							$com .= '<option selected value="'.$row[$idtabla].'">'.$row[$campo].'</option>';
						}else{
							$com .= '<option value="'.$row[$idtabla].'">'.$row[$campo].'</option>';
						}
					}else{
						$com .= '<option value="'.$row[$idtabla].'">'.$row[$campo].'</option>';
					}					
				}				
			}
			return $com;
		}

		public function selectedificio($tabla,$campo,$idtabla,$estado,$sql,$select = false){
			$this->selectModel = $this->model('funciones');
			$sel = $this->selectModel->select($tabla,$estado,$sql);
			$com = '<option value="0">--Seleccionar Edificio--</option>';
			if(!empty($sel)){
				foreach ($sel as $row) {
					if($select){
						if($select==$row[$idtabla]){
							$com .= '<option selected value="'.$row[$idtabla].'">'.$row[$campo].'</option>';
						}else{
							$com .= '<option value="'.$row[$idtabla].'">'.$row[$campo].'</option>';
						}
					}else{
						$com .= '<option value="'.$row[$idtabla].'">'.$row[$campo].'</option>';
					}					
				}				
			}
			return $com;
		}

		public function Aletra($x){
			$array = ['0'=>'A',
						'1'=>'B',
						'2'=>'C',
						'3'=>'D',
						'4'=>'E',
						'5'=>'F',
						'6'=>'G',
						'7'=>'H',
						'8'=>'I',
						'9'=>'J',
						'10'=>'K',
						'11'=>'L',
						'12'=>'M',
						'13'=>'N',
						'14'=>'O',
						'15'=>'P',
						'16'=>'Q',
						'17'=>'R',
						'18'=>'S',
						'19'=>'T',
						'20'=>'U',
						'21'=>'V',
						'22'=>'W',
						'23'=>'X',
						'24'=>'Y',
						'25'=>'Z'
					];
			return $array[$x];
		}
	}
?>
