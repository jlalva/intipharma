<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Last-Modified" content="0">
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
    <meta http-equiv="Pragma" content="no-cache">

    <title><?=$date['titulo']?></title>

    <!-- Bootstrap -->
    <link href="<?=BASE_URL?>vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="<?=BASE_URL?>vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="<?=BASE_URL?>vendors/nprogress/nprogress.css" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="<?=BASE_URL?>build/css/custom.min.css" rel="stylesheet">

    <link href="<?=BASE_URL?>vendors/datatables.net-bs/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="<?=BASE_URL?>vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css" rel="stylesheet">
    <link href="<?=BASE_URL?>vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css" rel="stylesheet">
    <link href="<?=BASE_URL?>vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css" rel="stylesheet">
    <link href="<?=BASE_URL?>vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="<?=BASE_URL?>vendors/x-editable/css/bootstrap-editable.css">

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"/>
    <!--<script src="<?=BASE_URL?>js/jquery.js"></script>-->

    <link href = "https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel = "stylesheet">
    <script src = "https://code.jquery.com/jquery-1.10.2.js"></script>
    <script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

    <script src="<?=BASE_URL?>pagejs/funciones.js?1.1"></script>

    
        <?php if(count($js)>=1){
            for ($i=0; $i < count($js); $i++) {?>
                <script src="<?=BASE_URL?>pagejs/<?=$js[$i]?>?2.0"></script>
            <?php }
        }?>

        <script>
            var url = "<?=BASE_URL?>";
        </script>
        <style type="text/css">
          .error{
            color: #BF5842;
          }
        </style>
  </head>

  <body class="nav-md">
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <div class="left_col scroll-view">
            <div class="clearfix"></div>
            <div class="profile clearfix">
              <div class="profile_pic">
                <img src="<?=BASE_URL?>images/img.jpg" alt="..." class="img-circle profile_img">
              </div>
              <div class="profile_info">
                <span>Bienvenido,</span>
                <h2><?=Session::get('nombre')?></h2>
              </div>
              <div class="clearfix"></div>
            </div>
            <!-- /menu profile quick info -->

            <br />

            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <h3>General</h3>
                <ul class="nav side-menu">
                  <li><a href="<?=BASE_URL?>inicio"><i class="fa fa-home"></i> Inicio</a>
                  </li>

                  <?php
                  $c = 0;
                  $arraymenu = Session::get('menu');
                  if(isset($arraymenu) && count($arraymenu)){
                    $ac = '';
                    for ($i=0; $i < count($arraymenu); $i++) { 
                      if($c == 0){ $descripcion = $arraymenu[$i]['padre']; $c = 1;
                        if($arraymenu[$i]['padre']==$date['modulo']){
                          $ac = 'active';
                        }else{
                          $ac = '';
                        }
                      ?>
                      <li class="<?=$ac?>" style="display: block;">
                        <a href="javascript:void(0)">
                          <i class="<?=$arraymenu[$i]['icono']?>"></i>
                          <span class="title"><?=$arraymenu[$i]['padre']?></span>
                          <i class="icon-arrow"></i>
                        </a>
                        <ul class="nav child_menu">
                      <?php }
                      if($descripcion == $arraymenu[$i]['padre']){ $url = BASE_URL.$arraymenu[$i]['url'];
                            if($arraymenu[$i]['url']==$date['url']){
                              $active = 'active';
                            }else{
                              $active = '';
                            }
                          ?>
                          <li class="<?=$active?>"><a href="<?=$url?>"><?=$arraymenu[$i]['modulo']?></a></li>
                      <?php }else{$c = 0; $i = $i - 1; ?>
                      </ul>
                      </li>
                      <?php  }
                    }
                  }
                ?>

                </ul>
              </div>
            </div>
            <div class="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Configuración">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Bloquear Pantalla">
                <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Salir" href="<?=BASE_URL?>validar_usuario/salir">
                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div>

        <div class="top_nav">
            <div class="nav_menu">
                <div class="nav toggle">
                  <a id="menu_toggle"><i class="fa fa-bars"></i></a>
                </div>
                <nav class="nav navbar-nav">
                <ul class=" navbar-right">
                  <li class="nav-item dropdown open" style="padding-left: 15px;">
                    <a href="javascript:;" class="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                      <img src="images/img.jpg" alt=""><?=Session::get('nombre')?>
                    </a>
                    <div class="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item"  href="javascript:;"> Perfil</a>
                      <a class="dropdown-item"  href="<?=BASE_URL?>validar_usuario/salir"><i class="fa fa-sign-out pull-right"></i> Salir</a>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

        <div class="right_col" role="main">
          <div class="">
              <div class="page-title">
                <div class="title_left">
                  <h3><?=$date['titulotabla']?></h3>
                </div>

                
              </div>