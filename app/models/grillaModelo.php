<?php
	class grillaModelo{
		private $db;

		public function __construct()
		{
			$this->db = new DataBase;
		}

		public function usuario(){
			$this->db->query("SELECT u.idusuario,u.nombre,u.apellido,u.usuario,r.rol FROM usuario u 
							INNER JOIN rol r ON r.idrol=u.idrol
							ORDER BY u.idusuario DESC");
			return $this->db->registers();
		}

		public function rol(){
			$this->db->query("SELECT * FROM rol 
							ORDER BY idrol DESC");
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