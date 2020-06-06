<?php
	class validar_usuarioModelo{
		private $db;

		public function __construct()
		{
			$this->db = new DataBase;
		}

		public function validardatos($usuario){
	      $this->db->query("SELECT * FROM usuario WHERE usuario='$usuario' OR email='$usuario'");
	      return $this->db->register();
		}

		public function grilla($idedificio){
	      $this->db->query("SELECT * FROM usuario WHERE idrol=2 AND idedificio=$idedificio");
	      return $this->db->registers();
		}

		public function desasignar($idpropietario){
			try {
				$this->db->transaccion();
				$this->db->query("SELECT nroasignacion,idedificio FROM asignacion WHERE idpropietario=$idpropietario AND estareg=1 GROUP BY nroasignacion");
				$data = $this->db->registers();
				if(!empty($data)){
					for ($i=0; $i < count($data); $i++) {	
						$this->db->query("SELECT * FROM propietario_secundario WHERE nroasignacion=".$data[$i]['nroasignacion']." LIMIT 1");
							$prop = $this->db->register();
						if(!empty($prop)){
							$this->db->query("UPDATE asignacion SET idpropietario=".$prop['idpropietario'].", residente='".$prop['residente']."' WHERE nroasignacion=".$prop['nroasignacion']." AND estareg=1");
							$this->db->execute();							
							$this->db->query("DELETE FROM propietario_secundario WHERE idprop_sec=".$prop['idprop_sec']);
							$this->db->execute();
						}else{
							$this->db->query("SELECT nombre_edificio FROM edificio WHERE idedificio=".Session::get('idedificio'));
							$edif = $this->db->register();
							$this->db->query("UPDATE asignacion SET idpropietario=0, residente='".$edif['nombre_edificio']."' WHERE idpropietario=$idpropietario AND estareg=1");
							$this->db->execute();
						}
						/*$this->db->query("INSERT INTO log_asignacion(idusuario,fecha,idedificio, nroasignacion,estareg,concepto) VALUES(".Session::get('idusuario').",'".date('Y-m-d H:i:s')."',".Session::get('idedificio').",".$data['nroasignacion'].",1,'Eliminado desde mantenimiento')");
						$this->db->execute();*/
					}					
				}else{
					$this->db->query("SELECT nombre_edificio FROM edificio WHERE idedificio=".Session::get('idedificio'));
					$edif = $this->db->register();
					$this->db->query("UPDATE asignacion SET idpropietario=0, residente='".$edif['nombre_edificio']."' WHERE idpropietario=$idpropietario AND estareg=1");
					$this->db->execute();
				}
			$this->db->commit();
			return 1;		
			} catch (Exception $e) {
			    $this->db->rollBack();
				return $e->getMessage();
			}
		}
	}
?>
