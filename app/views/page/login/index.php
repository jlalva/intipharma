<div class="container">
    <div class="backbox">
      <div class="loginMsg">
        <div class="textcontent">
          <!--<p class="title">No tienes una cuenta?</p>
          <p>Registrese para poder ingresar.</p>
          <button id="switch1">Registrarse</button>-->
          <p class="title">Tienes una cuenta</p>
          <p>Inicie sesión para ingresar.</p>
        </div>
      </div>
      <div class="signupMsg visibility">
        <div class="textcontent">
          <p class="title">Tienes una cuenta?</p>
          <p>Inicie sesión para ingresar.</p>
          <button id="switch2">Iniciar Sesión</button>
        </div>
      </div>
    </div>
    <!-- backbox -->

    <div class="frontbox">
      <div class="login">
        <h2>IDENTIFIQUESE</h2>
        <div class="inputbox">
          <input type="text" name="usuario" id="usuario" placeholder="USUARIO">
          <input type="password" id="password" name="password" placeholder="PASSWORD">
        </div>
        <!--<p>OLVIDÓ SU CONTRASEÑA?</p>-->
        <button onclick="ingresar()" id="btningresar">INICIAR</button>
      </div>

      <!--<div class="signup hide">
        <h2>SIGN UP</h2>
        <div class="inputbox">
          <input type="text" name="fullname" placeholder="  FULLNAME">
          <input type="text" name="email" placeholder="  EMAIL">
          <input type="password" id="password" name="password" placeholder="  PASSWORD">
        </div>
        <button>SIGN UP</button>
      </div>-->

    </div>
    <!-- frontbox -->
  </div>

<!--<div class="box-login">
    <h3>Iniciar sesión en su cuenta.</h3>
    <p>
        Ingrese su usuario y contraseña para iniciar sesión.
    </p>
    <form class="form-login" onsubmit="return false;">
        <div class="errorHandler alert alert-danger no-display">
            <span class="mensaje"></span>
        </div>
        <div class="correcto alert alert-success no-display">
            <span class="mensajec"></span>
        </div>
        <fieldset>
            <div class="form-group">
                <span class="input-icon">
                    <input type="text" class="form-control" name="username" id="username" placeholder="Usuario">
                    <i class="fa fa-user"></i> </span>
            </div>
            <div class="form-group form-actions">
                <span class="input-icon">
                    <input type="password" class="form-control password" id="clave" name="password" placeholder="Contraseña">
                    <i class="fa fa-lock"></i>
                    <a class="forgot" href="#">
                        Olvidé mi contraseña
                    </a> </span>
            </div>
            <div class="form-actions">
                <label for="remember" class="checkbox-inline">
                    <input type="checkbox" class="grey remember" id="remember" name="remember">
                    Mantenme registrado
                </label>
                <button class="btn btn-green pull-right" id="btningresar">
                    Ingresar <i class="fa fa-arrow-circle-right"></i>
                </button>
            </div>
        </fieldset>
    </form>
    <div class="copyright">
        <?=date('Y')?> &copy; SIINCOWEB.
    </div>
</div>
<div class="box-forgot">
    <h3>Contraseña olvidada?</h3>
    <p>
        Ingrese su dirección de correo electrónico a continuación para restablecer su contraseña.
    </p>
    <form class="form-forgot">
        <div class="errorHandler alert alert-danger no-display">
            <i class="fa fa-remove-sign"></i> Tienes algunos errores de forma. Por favor, consulte a continuación.
        </div>
        <fieldset>
            <div class="form-group">
                <span class="input-icon">
                    <input type="email" class="form-control" name="email" placeholder="Email">
                    <i class="fa fa-envelope"></i> </span>
            </div>
            <div class="form-actions">
                <a class="btn btn-light-grey go-back">
                    <i class="fa fa-chevron-circle-left"></i> Ingresar
                </a>
                <button type="submit" class="btn btn-green pull-right">
                    Enviar <i class="fa fa-arrow-circle-right"></i>
                </button>
            </div>
        </fieldset>
    </form>
    <div class="copyright">
        2014 &copy; Rapido by cliptheme.
    </div>
</div>
<div class="box-register">
    <h3>Sign Up</h3>
    <p>
        Enter your personal details below:
    </p>
    <form class="form-register">
        <div class="errorHandler alert alert-danger no-display">
            <i class="fa fa-remove-sign"></i> You have some form errors. Please check below.
        </div>
        <fieldset>
            <div class="form-group">
                <input type="text" class="form-control" name="full_name" placeholder="Full Name">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="address" placeholder="Address">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="city" placeholder="City">
            </div>
            <div class="form-group">
                <div>
                    <label class="radio-inline">
                        <input type="radio" class="grey" value="F" name="gender">
                        Female
                    </label>
                    <label class="radio-inline">
                        <input type="radio" class="grey" value="M" name="gender">
                        Male
                    </label>
                </div>
            </div>
            <p>
                Enter your account details below:
            </p>
            <div class="form-group">
                <span class="input-icon">
                    <input type="email" class="form-control" name="email" placeholder="Email">
                    <i class="fa fa-envelope"></i> </span>
            </div>
            <div class="form-group">
                <span class="input-icon">
                    <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                    <i class="fa fa-lock"></i> </span>
            </div>
            <div class="form-group">
                <span class="input-icon">
                    <input type="password" class="form-control" name="password_again" placeholder="Password Again">
                    <i class="fa fa-lock"></i> </span>
            </div>
            <div class="form-group">
                <div>
                    <label for="agree" class="checkbox-inline">
                        <input type="checkbox" class="grey agree" id="agree" name="agree">
                        I agree to the Terms of Service and Privacy Policy
                    </label>
                </div>
            </div>
            <div class="form-actions">
                Already have an account?
                <a href="#" class="go-back">
                    Log-in
                </a>
                <button type="submit" class="btn btn-green pull-right">
                    Submit <i class="fa fa-arrow-circle-right"></i>
                </button>
            </div>
        </fieldset>
    </form>
    <div class="copyright">
        <?=date('Y')?> &copy; SIINCOWEB.
    </div>
</div>-->