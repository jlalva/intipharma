<?php
	class grillaModelo{
		private $db;

		public function __construct()
		{
			$this->db = new DataBase;
		}

		public function ui($idedificio){
			$this->db->query("SELECT tu.descripcion_tipo_ui,uu.m2_ui,uu.nombre_ui,CASE WHEN uu.ocupado=0 THEN 'Sin 				asignar' ELSE 'Asignado' END as condicion ,uu.estareg,uu.id_ui 	
							FROM ui uu 
							INNER JOIN tipo_ui tu on tu.id_tipo_ui=uu.id_tipo_ui
							WHERE uu.idinmueble=$idedificio");
			return $this->db->registers();
		}

		public function conceptos($idedificio){
			$this->db->query("SELECT codigo,concepto,importe,idconcepto,estareg FROM concepto
							WHERE idedificio=$idedificio
							ORDER BY idconcepto DESC");
			return $this->db->registers();
		}

		public function tipoconcepto($idedificio){
			$this->db->query("SELECT descripcion,idtipoconcepto,estareg FROM tipoconcepto
							WHERE idedificio=$idedificio
							ORDER BY idtipoconcepto DESC");
			return $this->db->registers();
		}

		public function menu($idrol){
			$this->db->query("SELECT m.idmodulo,mp.modulo as padre,m.modulo,m.modulo_padre,mp.orden,m.orden ordenmenu,m.url,mp.icono
											FROM modulo m
											INNER JOIN permisos p ON m.idmodulo=p.idmodulo
											INNER JOIN rol r ON r.idrol=p.idrol
											INNER JOIN modulo mp ON m.modulo_padre=mp.idmodulo
											where r.idrol=$idrol
											order by mp.orden,m.orden ASC");
			return $this->db->registers();
		}
	}
?>