<!DOCTYPE html>
<html lang="es">


<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
    <title>Aegis - Admin Dashboard Template</title>
    <link rel="stylesheet" href="assets/css/app.min.css">
    <link rel="stylesheet" href="assets/bundles/bootstrap-social/bootstrap-social.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/custom.css">
    <link rel='shortcut icon' type='image/x-icon' href='assets/img/favicon.ico' />
</head>

<body>
    <div class="loader"></div>
    <div id="app">
        <section class="section">
            <div class="container mt-5">
                <div class="row">
                    <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <div class="card card-primary">
                            <div class="card-header">
                                <h4>Login</h4>
                            </div>
                            <div class="card-body">
                                <form method="POST" action="includes/validacion.php" class="needs-validation">
                                    <div class="form-group">
                                        <label for="email">Correo</label>
                                        <input id="email" type="email" class="form-control" name="email" tabindex="1" required autofocus>
                                    </div>
                                    <div class="form-group">
                                        <label for="password" class="control-label">Contraseña</label>
                                        <input id="password" type="password" class="form-control" name="password" tabindex="2" required>
                                    </div>
                                    <?php
                                    if (isset($_GET['error'])) {
                                    ?>
                                        <div class="alert alert-danger">
                                            Los datos de acceso no concuerdan
                                        </div>
                                    <?php
                                    }
                                    ?>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4">
                                            Ingresar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="mt-5 text-muted text-center">
                            No tienes una cuenta? <a href="#">Crear una</a>
                        </div>
                        <div class="mt-5 text-muted text-center">
                            <a href="index.php">Volver a la pokedex</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <script src="assets/js/app.min.js"></script>
    <script src="assets/js/scripts.js"></script>
    <script src="assets/js/custom.js"></script>
</body>


</html>