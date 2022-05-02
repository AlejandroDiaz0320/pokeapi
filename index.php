<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
    <title>Aegis - Admin Dashboard Template</title>
    <link rel="stylesheet" href="assets/css/app.min.css">
    <link rel="stylesheet" href="assets/bundles/jqvmap/dist/jqvmap.min.css">
    <link rel="stylesheet" href="assets/bundles/weather-icon/css/weather-icons.min.css">
    <link rel="stylesheet" href="assets/bundles/weather-icon/css/weather-icons-wind.min.css">
    <link rel="stylesheet" href="assets/bundles/summernote/summernote-bs4.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="stylesheet" href="assets/css/custom.css">
    <link rel='shortcut icon' type='image/x-icon' href='assets/img/favicon.ico' />
    <link rel="stylesheet" href="assets/css/style_api.css">
</head>

<body>
    <div class="loader"></div>
    <div id="app">
        <div class="main-wrapper main-wrapper-1">
            <div class="navbar-bg"></div>
            <nav class="navbar navbar-expand-lg main-navbar">
                <div class="form-inline mr-auto">
                    <ul class="navbar-nav mr-3">
                        <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg
									collapse-btn"> <i data-feather="align-justify"></i></a></li>
                        <li><a href="#" class="nav-link nav-link-lg fullscreen-btn">
                                <i data-feather="maximize"></i>
                            </a></li>
                        <li>
                            <form class="form-inline mr-auto">
                                <div class="search-element">
                                    <input class="form-control" type="search" placeholder="Buscar Pokemon" aria-label="Search" id="buscador_pokemon" data-width="200">
                                    <button class="btn" type="button" id="buscar_pokemon">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </li>

                    </ul>
                </div>
                <ul class="navbar-nav navbar-right">

                    <?php
                    if (isset($_SESSION['usuario'])) {
                    ?>
                        <li class="dropdown">
                            <a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">
                                <img alt="image" src="assets/img/user.png" class="user-img-radious-style">
                                <i class="fas fa-sort-down text-dark"></i>
                                <span class="d-sm-none d-lg-inline-block"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right pullDown">
                                <div class="dropdown-title">Hola <?php echo $_SESSION['usuario'] ?></div>
                                <a href="logout.php" class="dropdown-item has-icon text-danger">
                                    <i class="fas fa-sign-out-alt"></i>Cerrar Sesión
                                </a>
                            </div>
                        </li><?php
                            } else {
                                ?>
                        <a href="login.php" class="btn btn-link">Iniciar Sesión</a>
                    <?php
                            }
                    ?>
                </ul>
            </nav>
            <!-- <div class="">
                        
                    </div> -->

            <div class="main-sidebar sidebar-style-2">
                <aside id="sidebar-wrapper">
                    <div class="sidebar-brand">
                        <a href="index.php"> <img alt="image" src="assets/img/logo.png" class="header-logo" /> <span class="logo-name">Pokedex</span>
                        </a>
                    </div>
                    <?php
                    if (isset($_SESSION['usuario'])) {
                    ?>
                        <div class="sidebar-user">
                            <div class="sidebar-user-picture">
                                <img alt="image" src="assets/img/userbig.png">
                            </div>
                            <div class="sidebar-user-details">
                                <div class="user-name"><?php echo $_SESSION['usuario'] ?></div>
                                <div class="user-role">Entrenador</div>
                            </div>
                        </div>
                    <?php
                    }
                    ?>

                    <ul class="sidebar-menu">
                        <li class="dropdown active">
                            <a href="#" class="nav-link has-dropdown"><i data-feather="monitor"></i><span>Regiones</span></a>
                            <ul class="dropdown-menu" id="region-ul"></ul>
                        </li>
                    </ul>
                </aside>
            </div>
            <!-- Main Content -->
            <div class="main-content">
                <section class="section">
                    <div class="d-flex justify-content-end align-items-center mb-4">
                        <h3>Vistas</h3>
                        <button class="btn btn-link" type="button" data-img-api='default'>
                            <img src="assets/img/image/pokeball-1.png" alt="" class="w-75">
                        </button>
                        <button class="btn btn-link" type="button" data-img-api='dream_world'>
                            <img src="assets/img/image/pokeball-2.png" alt="" class="w-75">
                        </button>
                        <button class="btn btn-link" type="button" data-img-api='home'>
                            <img src="assets/img/image/pokeball-3.png" alt="" class="w-75">
                        </button>
                    </div>
                    <div class="row row-cols-1 row-cols-md-3 g-4" id="contenido">

                    </div>
                </section>
            </div>
        </div>
    </div>

    <div class="modal fade" id="datailPokemon" tabindex="-1" role="dialog" aria-labelledby="datailPokemonTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content" id="contenidoModal">

            </div>
        </div>
    </div>



    <div class="modal fade bd-example-modal-lg aa" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">

        <div class="modal-dialog modal-lg">
            <div class="modal-content" >

            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/blob-polyfill/7.0.20220408/Blob.min.js" integrity="sha512-uPm9nh4/QF6a7Mz4Srk0lXfN7T+PhKls/NhWUKpXUbu3xeG4bXhtbw2NCye0BRXopnD0x+SBDMOWXOlHAwqgLw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" integrity="sha512-csNcFYJniKjJxRWRV1R7fvnXrycHP6qDR21mgz1ZP55xY5d+aHLfo9/FcGDQLfn2IfngbAHd8LdfsagcCqgTcQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
    <script src="assets/js/app.min.js"></script>
    <script src="assets/bundles/echart/echarts.js"></script>
    <script src="assets/bundles/chartjs/chart.min.js"></script>
    <script src="assets/js/page/index.js"></script>
    <script src="assets/js/scripts.js"></script>
    <script src="assets/js/custom.js"></script>
    <script src="assets/js/code.js"></script>
</body>


</html>