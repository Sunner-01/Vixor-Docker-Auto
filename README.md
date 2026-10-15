# Vixor: Docker y GitHub Actions

Practica universitaria: pagina Next.js ejecutada dentro de Docker en una VM Oracle Cloud.

Flujo: commit convencional -> push a main -> GitHub Actions construye y prueba -> Docker Hub almacena -> VM descarga y ejecuta.

## Preparacion local

El repositorio GitHub de destino es https://github.com/Sunner-01/Vixor-Docker-Auto.
El ejemplo DockerHubRepo usa HTML con Nginx; este proyecto usa Node.js 22 y Next.js.
El Dockerfile conserva la configuracion de Next.js y ejecuta el servidor como usuario node en el puerto 3000.
No se exporta la pagina como HTML para servirla con Nginx.

## 1. Credenciales (navegador de tu computadora)

En Docker Home -> Account settings -> Personal access tokens, genera un token para GitHub Actions con permisos Read & Write y una fecha de expiracion apropiada para la practica.
Guarda el token directamente en GitHub. No lo pegues en el chat ni en archivos del repositorio.

En GitHub -> Vixor-Docker-Auto -> Settings -> Secrets and variables -> Actions -> New repository secret, agrega:

| Nombre | Valor |
|---|---|
| DOCKER_USERNAME | sunner01 |
| DOCKER_PASSWORD | El token personal de Docker Hub, no la contrasena |

Los secretos del repositorio de ejemplo no se transfieren automaticamente a este repositorio.
El workflow usa el mismo nombre de secretos que el ejemplo.

## 2. Subir el codigo (Warp local / PowerShell, NO la VM)

Abre una terminal local en la carpeta que contiene este README:

```powershell
git status
git remote -v
git log --oneline -3
git push -u origin main
```

El remoto ya debe apuntar a https://github.com/Sunner-01/Vixor-Docker-Auto.git.
Si Git solicita autenticacion, inicia sesion en GitHub mediante el navegador.
No uses force push. Si el remoto ya tiene commits, revisa el estado antes de continuar.

## 3. Comprobar GitHub Actions (navegador)

En la pestana Actions abre Build, test and publish Vixor.
Espera a que todos los pasos esten verdes antes de desplegar.
El flujo prueba HTTP y las rutas /, /privacidad y /terminos dentro del contenedor.
Solo publica si la prueba termina correctamente.

El script crea automaticamente el repositorio PUBLICO sunner01/vixor-docker-auto si no existe.
Si existe, lo reutiliza sin cambiar su privacidad.
Se publican dos etiquetas: latest y el SHA completo del commit.
La imagen anterior sunner01/vixor-web:practica no se sobrescribe.

En Docker Hub abre https://hub.docker.com/r/sunner01/vixor-docker-auto/tags.
La publicacion no cambia por si sola el contenedor que ya corre en la VM.

## 4. Descargar y probar (Warp, conectado por SSH a la VM)

Primero conecta desde tu computadora:

```powershell
ssh -i "C:\Users\irisc\Downloads\ssh-key-2026-10-05.key" ubuntu@132.226.255.249
```

Los siguientes comandos son de Ubuntu, dentro de esa conexion:

```bash
sudo docker pull sunner01/vixor-docker-auto:latest
sudo docker run -d --name vixor-auto-prueba -p 127.0.0.1:8080:3000 sunner01/vixor-docker-auto:latest
sudo docker logs --tail 20 vixor-auto-prueba
curl -I --max-time 15 http://127.0.0.1:8080
```

Espera a Ready antes de curl. Debe responder 200 OK. Si falla, no detengas el contenedor anterior.
Si el repositorio es privado, ejecuta sudo docker login antes de pull.
Para una presentacion reproducible se puede usar el SHA de Actions en vez de latest.

## 5. Reemplazar el contenedor (SOLO despues de probar)

En Ubuntu comprueba primero los nombres:

```bash
sudo docker ps -a
```

Estos comandos asumen que el contenedor actual se llama vixor-web y que NO existe vixor-web-anterior:

```bash
sudo docker rm -f vixor-auto-prueba
sudo docker stop vixor-web
sudo docker rename vixor-web vixor-web-anterior
sudo docker update --restart=no vixor-web-anterior
sudo docker run -d --name vixor-web --restart unless-stopped --log-opt max-size=10m --log-opt max-file=3 -p 80:3000 sunner01/vixor-docker-auto:latest
sudo docker logs --tail 20 vixor-web
curl -I --max-time 15 http://127.0.0.1:80
```

Si falla el reemplazo, restaura el anterior (estos comandos eliminan solo el contenedor nuevo):

```bash
sudo docker rm -f vixor-web
sudo docker rename vixor-web-anterior vixor-web
sudo docker update --restart=unless-stopped vixor-web
sudo docker start vixor-web
```

Abre http://132.226.255.249 en tu navegador, con HTTP.
El contenedor corre en segundo plano; cerrar Warp no lo detiene.

## 6. Demostrar que la VM usa la imagen descargada

En Ubuntu:

```bash
sudo docker inspect --format '{{.Config.Image}}' vixor-web
sudo docker image inspect --format '{{json .RepoDigests}}' sunner01/vixor-docker-auto:latest
sudo docker ps
```

La primera salida debe mostrar sunner01/vixor-docker-auto:latest.
El digest identifica el contenido descargado desde Docker Hub.
El label org.opencontainers.image.revision guarda el commit de GitHub.

## Commits convencionales

- feat(web): importar pagina Vixor para la practica
- ci(docker): automatizar pruebas y publicacion en Docker Hub
- docs(deploy): documentar secretos y despliegue en Oracle Cloud

Para cambios posteriores usa feat, fix, ci, docs o chore, seguidos de un alcance opcional y una descripcion.
Ejemplo: fix(web): corregir enlace de descarga.

## Referencias

- https://docs.docker.com/build/ci/github-actions/
- https://docs.docker.com/reference/api/hub/latest/operations/CreateRepository/
- https://docs.docker.com/reference/api/hub/latest/operations/AuthCreateAccessToken/
- https://nextjs.org/docs/14/app/building-your-application/deploying
