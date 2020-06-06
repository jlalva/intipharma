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
    <link rel="shortcut icon" href="images/icono.ico" />

    <!-- CSS -->
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css"/>

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>

    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/bootstrap.min.css"/>

    <script src="https://code.jquery.com/jquery-3.5.0.js"></script>

    <?php if(count($js)>=1){
        for ($i=0; $i < count($js); $i++) {?>
            <script src="<?=BASE_URL?>pagejs/<?=$js[$i]?>"></script>
        <?php }
    }?>

    <script>
        var url = "<?=BASE_URL?>";
    </script>

    <style type="text/css">
        body{
  background-color: #A8A8A8;
  font-family: 'Roboto', sans-serif;
}

.container{
  /*border:1px solid white;*/
  width: 600px;
  height: 350px;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: inline-flex; 
}
.backbox{  
  background-color: #404040;
  width: 100%;
  height: 80%;
  position: absolute;
  transform: translate(0,-50%);
  top:50%;
  display: inline-flex;
}

.frontbox{
  background-color: white;
  border-radius: 20px;
  height: 100%;
  width: 50%;
  z-index: 10;
  position: absolute;
  right:0;
  margin-right: 3%;
  margin-left: 3%;
  transition: right .8s ease-in-out;
}

.moving{
  right:45%;
}

.loginMsg, .signupMsg{
  width: 50%;
  height: 100%;
  font-size: 15px;
  box-sizing: border-box;
}

.loginMsg .title,
.signupMsg .title{
  font-weight: 300;
  font-size: 23px;
}

.loginMsg p,
.signupMsg p {
  font-weight: 100;
}

.textcontent{
  color:white;
  margin-top:65px;
  margin-left: 12%;
}

.loginMsg button,
.signupMsg button {
  background-color: #404040;
  border: 2px solid white;
  border-radius: 10px;
  color:white;
  font-size: 12px;
  box-sizing: content-box;
  font-weight: 300;
  padding:10px;
  margin-top: 20px;
}

/* front box content*/
.login, .signup{
  padding: 20px;
  text-align: center;
}

.login h2,
.signup h2 {
  color: #35B729;
  font-size:22px;
}

.inputbox{
  margin-top:30px; 
}
.login input, 
.signup input {
  display: block;
  width: 100%;
  height: 40px;
  background-color: #f2f2f2;
  border: none;
  margin-bottom:20px;
  font-size: 12px;
}

.login button,
.signup button{
  background-color: #35B729;
  border: none;
  color:white;
  font-size: 12px;
  font-weight: 300;
  box-sizing: content-box;
  padding:10px;
  border-radius: 10px;
  width: 60px;
  position: absolute;
  right:30px;
  bottom: 30px;
  cursor: pointer;
}

/* Fade In & Out*/
.login p {
  cursor: pointer;
  color:#404040;
  font-size:15px;
}

.loginMsg, .signupMsg{
  /*opacity: 1;*/
  transition: opacity .8s ease-in-out;
}

.visibility{
  opacity: 0;
}

.hide{
  display: none;
}

    </style>
  </head>
  <body>
