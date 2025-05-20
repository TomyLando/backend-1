const socket = io();

const form = document.getElementById("product-form");
const deleteForm = document.getElementById("delete-form");
const productList = document.getElementById("product-list");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const price = parseFloat(document.getElementById("price").value);
    socket.emit("new-product", { title, price });
    form.reset();
});

deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("delete-id").value;
    socket.emit("delete-product", id);
    deleteForm.reset();
});

socket.on("products", (products) => {
    productList.innerHTML = "";
    products.forEach(p => {
        const li = document.createElement("li");
        li.innerText = `ID: ${p.id} - ${p.title} ($${p.price})`;
        productList.appendChild(li);
    });
});