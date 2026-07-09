# SimplePokeAPI JSON

API CRUD en Node.js para usar desde una app Android.

- Sin login
- Persistencia en archivo JSON (`data.json`)
- Controller con CRUD completo
- Gestor de paquetes: Yarn
- Inicio: `yarn run start`

## Requisitos

- Node.js 18+
- Yarn instalado globalmente

## Instalacion

```bash
yarn install
```

## Ejecutar

```bash
yarn run start
```

Servidor por defecto: `http://localhost:3000`

## Endpoints

Base URL: `http://localhost:3000/api/pokemons`

- `GET /api/pokemons` -> lista todos
- `GET /api/pokemons/:id` -> obtiene uno por id
- `POST /api/pokemons` -> crea uno
- `PUT /api/pokemons/:id` -> actualiza uno completo o parcial
- `PATCH /api/pokemons/:id` -> actualiza uno parcial
- `DELETE /api/pokemons/:id` -> elimina uno

## Ejemplos

Crear:

```bash
curl -X POST http://localhost:3000/api/pokemons \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Pikachu",
		"type": "Electric",
		"imageUrl": "https://img.pokemondb.net/artwork/pikachu.jpg"
	}'
```

Listar:

```bash
curl http://localhost:3000/api/pokemons
```

Actualizar:

```bash
curl -X PATCH http://localhost:3000/api/pokemons/1 \
	-H "Content-Type: application/json" \
	-d '{ "type": "Electric/Mouse" }'
```

Eliminar:

```bash
curl -X DELETE http://localhost:3000/api/pokemons/1
```

## Deploy en Render (Yarn)

Para este proyecto (Express sin compilacion), no necesitas una etapa de build real, pero se incluye `yarn run build` para compatibilidad de plataforma.

Opciones:

- Usar el archivo `render.yaml` incluido en el repo.
- Configurar manualmente en el dashboard de Render.

### Configuracion manual recomendada

- Runtime: Node
- Build Command: `corepack enable && corepack prepare yarn@1.22.22 --activate && yarn install --frozen-lockfile && yarn run build`
- Start Command: `yarn run start`

Variables de entorno recomendadas:

- `NODE_VERSION=22`

Notas:

- `yarn start` y `yarn run start` funcionan parecido, aqui usamos `yarn run start` para ser explicito.
- Como esta API guarda datos en `data.json`, en Render (filesystem efimero) los datos se pueden perder en reinicios o nuevos deploys.