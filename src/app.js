const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const path = require("path");
const viewsRouter = require("./routes/views.router");
const ProductManager = require("./productsManager");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const manager = new ProductManager();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/", viewsRouter);

io.on("connection", (socket) => {
    socket.emit("products", manager.getProducts());

    socket.on("new-product", (data) => {
        manager.addProduct(data);
        io.emit("products", manager.getProducts());
    });

    socket.on("delete-product", (id) => {
        manager.deleteProduct(id);
        io.emit("products", manager.getProducts());
    });
});

httpServer.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));