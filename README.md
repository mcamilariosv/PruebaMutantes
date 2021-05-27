# PruebaMutantes
 - Este codigo fuente esta escrito en Node Js.
 - El codigo fuente se encuentra alojado en github: (Para Nivel 2 y 3)
    https://github.com/mcamilariosv/PruebaMutantes
 - La base de datos se encuentra alojada en el Cosmos DB Atlas.
 - De esta API se crean dos funciones LAMBDA en AWS (POST -/mutant , GET- /stats):
    - para desplegar se uso el comando: sls deploy --stage dev --verbose
        configurando previamente las credencias IAM de aws-cli en mi maquina personal
    - tambien se uso otro servicio de AWS, S3, para alojar el archivo comprimido que se crea a la hora de desplegar cada funcion LAMBDA.
 - Las URLs para las APIs o funciones son: (Para Nivel 2 y 3)
    POST - https://0z5y9yc9wk.execute-api.us-east-1.amazonaws.com/dev/mutant
    GET - https://0z5y9yc9wk.execute-api.us-east-1.amazonaws.com/dev/stats
 - Los servicios tambien cuentan con documentacion Swagger para cada uno, los cuales se encuentran
     en la siguiente ubicacion del repositorio:
        https://github.com/mcamilariosv/PruebaMutantes/tree/master/oas
    en dichos archivos se encuentra la especificacion del api donde se dan las instrucciones de cómo ejecutar el programa o la API. (Para Nivel 2 y 3)