 </div>
        </div>
        <!-- /page content -->

        <!-- footer content -->
        <footer>
          <div class="pull-right">
            GWM - Desarrollado por <a href="#">SiincoWeb</a>
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
      </div>
    </div>

    <!-- jQuery -->
    <!--<script src="<?=BASE_URL?>vendors/jquery/dist/jquery.min.js"></script>-->
    <!-- Bootstrap -->
   <script src="<?=BASE_URL?>vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <!-- FastClick -->
    <script src="<?=BASE_URL?>vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="<?=BASE_URL?>vendors/nprogress/nprogress.js"></script>

    <script src="<?=BASE_URL?>vendors/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-buttons/js/buttons.flash.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js"></script>
    <script src="<?=BASE_URL?>vendors/datatables.net-scroller/js/dataTables.scroller.min.js"></script>

    <script src="<?=BASE_URL?>vendors/x-editable/js/bootstrap-editable.min.js"></script>
    
    <!-- Custom Theme Scripts -->
    <script src="<?=BASE_URL?>build/js/custom.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>
  </body>
</html>

<!--
    <script>
      jQuery(document).ready(function() {
        Main.init();        
        changePagination(0);
      });

      function changePagination(pageId){
         $(".ltabla").fadeIn(400).html('Cargando datos...');
         var inner = 0;
         var tbuscar = $("#buscador").val();
         if(!tbuscar){
            tbuscar="";
         }
         var dataString = {pageId: pageId,sql:"<?=$fgrilla[0]?>",total:"<?=$fgrilla[10]?>",columnas:"<?=$fgrilla[1]?>",ancho:"<?=$fgrilla[2]?>",botones:"<?=$fgrilla[9]?>",buscar:"<?=$fgrilla[8]?>",where:"<?=$fgrilla[6]?>",order:"<?=$fgrilla[7]?>",txtbuscar:tbuscar};
           $.ajax({
             type: "POST",
             url: url+"grilla/tabla",
             data: dataString,
             cache: false,
             success: function(result){
             $(".ltabla").html(result);
             }
           });
      }      
    </script>
  </body>
</html>-->