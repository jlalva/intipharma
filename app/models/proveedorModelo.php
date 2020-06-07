<?php
class proveedorModelo{
	private $db;

	public function __construct(){
		$this->db = new DataBase;
	}

	public function departamento(){
		$this->db->query("SELECT * FROM ubdepartamento");
		return $this->db->registers();
	}

	public function provincia($depar){
		$this->db->query("SELECT * FROM ubprovincia WHERE iddepartamento=$depar");
		return $this->db->registers();
	}

	public function distrito($prov){
		$this->db->query("SELECT * FROM ubdistrito WHERE idprovincia=$prov");
		return $this->db->registers();
	}

}
?>