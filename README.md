# SimplePokeAPI JSON

API CRUD en Node.js para usar desde una app Android.

- Sin login
- Persistencia en archivo JSON (`data.json`)
- Controller con CRUD completo
- Gestor de paquetes: PNPM
- Inicio: `pnpm run start`

## Requisitos

- Node.js 18+
- PNPM instalado globalmente

## Instalacion

```bash
pnpm install
```

## Ejecutar

```bash
pnpm run start
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

## Deploy en Render (PNPM)

Para este proyecto (Express sin compilacion), no necesitas `pnpm run build`.

Opciones:

- Usar el archivo `render.yaml` incluido en el repo.
- Configurar manualmente en el dashboard de Render.

### Configuracion manual recomendada

- Runtime: Node
- Build Command: `corepack enable && corepack prepare pnpm@10.33.0 --activate && pnpm install --frozen-lockfile`
- Start Command: `pnpm run start`

Variables de entorno recomendadas:

- `NPM_CONFIG_STORE_DIR=/opt/render/.cache/pnpm`
- `NODE_VERSION=22`

Notas:

- `pnpm start` y `pnpm run start` funcionan parecido, aqui usamos `pnpm run start` para ser explicito.
- Como esta API guarda datos en `data.json`, en Render (filesystem efimero) los datos se pueden perder en reinicios o nuevos deploys.