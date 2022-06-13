# Getting Started with Drip house server

In the project directory, you can run:

### `npm install`

then

### `npm start`

Or use Docker:

- Create docker image:

```bash
docker build -f Dockerfile -t drip-house-server .
```

- then run the docker container:

```bash
docker run -it -p 8080:8080 drip-house-server
```

The app now runs localy development mode.\
Open [http://localhost:8080/api-docs](http://localhost:8080/api-docs) to view it in your browser.

### Live URL

https://drip-house-server.herokuapp.com/api-docs

