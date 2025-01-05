Pour que l'API fonctionne, voici ce qu'il faut installer : 
	
	npm init -y
	npm pkg set type=module
	npm i express
	npm i -D nodemon
	npm pkg set scripts.dev="nodemon server.js"
	npm run dev
	npm i pg
	npm run backEndProject
	npm i express-promise-router
	npm i dotenv
	npm i argon2
	npm i jsonwebtoken
	npm i --save-dev swagger-jsdoc
	npm pkg set scripts.genDoc="node ./swagger/swagger_jsdoc.js"
	npm run genDoc


Sur Docker :
	docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=root -e POSTGRES_DB=backendproject -p 5432:5432 --rm -d postgres


Ensuite : 
	npm run backEndProject
	npm run dev
