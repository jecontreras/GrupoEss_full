
#crear servicios
ionic g s services/noticias --skipTests=true

#crear modulo
ionic g m components

#crear components 
ionic g c components/noticias --nospec


#ionic plataform add
ionic cordova platform add android

#ionic plataform remove
ionic cordova platform rm ios


///////////////////////////////////////////////777
deploy pwa

1. firebase login
2. firebase init
3. firevase user --add key del a app firebase
4. firebase deploy
5. ionic build --prod --service--worker
6. firebase deploy

