<?php

declare(strict_types=1);

require __DIR__ . "/functions.php";
require __DIR__ . "/../../vendor/autoload.php";

use App\Config\Paths;
use Framework\App;
use function App\Config\registerRoutes;

$app = new App(Paths::SOURCE . "App/container-definitions.php");

registerRoutes($app);


return $app;