Pour que l'API fonctionne, voici ce qu'il d'abord installer les dependances via le terminal : 
	
npm install

ensuite ouvrir docker.

dans le terminal mettre ceci :

docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=root -e POSTGRES_DB=backendproject -p 5432:5432 --rm -d postgres


Ensuite : 
	npm run backEndProject
	npm run dev