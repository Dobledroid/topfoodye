<?php 
    // require_once $_SERVER['DOCUMENT_ROOT'] . "/crud_mongo/vendor/autoload.php";

    // class Conexion {
    //     public static function conectar() {
    //        try {
    //             $servidor = "127.0.0.1";
    //             $puerto = "27017";
    //             $usuario = "mongoadmin";
    //             $password = "123456";
    //             $BD = "blogNoticias";
    //             $cadenaConexion = "mongodb://" . 
    //                                 $usuario . ":" . 
    //                                 $password . "@". 
    //                                 $servidor .":". 
    //                                 $puerto ."/". 
    //                                 $BD;
    //             $cliente = new MongoDB\Client($cadenaConexion);
    //             return $cliente->selectDatabase($BD);
    //        } catch (\Throwable $th) {
    //            return $th->getMessage();
    //        }
    //     }
    // }

    class Conexion {
        public static function conectar() {
           try {
                $usuario = "dobledroid";
                $password = "dobledroid";
                $BD = "blogNoticias";
                $cadenaConexion = "mongodb+srv://" . 
                                    $usuario . ":" . 
                                    $password . "@cluster1.s0liyu8.mongodb.net/". 
                                    $BD. "?retryWrites=true&w=majority";
                $cliente = new MongoDB\Client($cadenaConexion);
                return $cliente->selectDatabase($BD);
           } catch (\Throwable $th) {
               return $th->getMessage();
           }
        }
    }
    $obj = new Conexion();
    var_dump($obj->conectar());
    
?>