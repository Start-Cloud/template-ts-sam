#  AWS SAM Template

## Configuración
* samconfig.toml
1. stack_name: Nombre del stack, se debe registrar uno por cada ambiente.
2. s3_prefix: Prefijo del bucket donde se almacenará el código fuente de la aplicación.
3. resolve_s3: Si se desea que el bucket sea creado por el CLI de SAM.
4. region: Región donde se desplegará la aplicación.
5. capabilities: Permisos que se le darán al rol de la aplicación.
6. confirm_changeset: Si se desea que el CLI de SAM muestre los cambios antes de desplegarlos.
7. disable_rollback: Si se desea que el CLI de SAM no haga rollback en caso de error.
8. parameter_overrides: Parámetros que se le pasarán al template de CloudFormation.
9. lint: Si se desea que el CLI de SAM haga lint al template de CloudFormation.
10. parallel: Si se desea que el CLI de SAM haga el despliegue en paralelo.

* template.yaml
1. Parameters: Parámetros que se le pasarán al template CloudFormation. Se debe modificar los valores default para los parámetros company y project. El parámetro stage se sobreescribe en el archivo samconfig.toml.

## Construcción
```bash
sam build
```

## Despliegue
```bash
sam deploy --config-env "dev" --no-confirm-changeset
```
