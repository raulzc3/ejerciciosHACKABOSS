//Creo las variables de los elementos que necesito
const form = document.querySelector("form");
const tweets = document.querySelector("#tweets");
const newTweet = document.querySelector("input");
const newPic = document.querySelector("#tweetBox .userPic img");
//Variable de usuario como objeto vacío
let user = {};
//Llamamos a la función que crea el primer usuario
firstUser();

//Cada vez que se envíe el formulario, ejecutamos la función tweet
form.addEventListener("submit", tweet);

//Función que crea y añade un tweet a la página
async function tweet(e) {
    //Evitamos que se recarge la página al realizar un submit en el formulario
    e.preventDefault();


    //Guardo en variables los datos que necesito del usuario
    const fullName = `${user.name.first} ${user.name.last}`
    const username = user.login.username;
    const userPic = user.picture.medium;

    //Creamos el próximo usuario para utilizar su foto en la caja de escritura del tweet
    user = await getUser();
    newPic.setAttribute("src", user.picture.medium);

    //Creo todos los elementos que necesitaré
    const tweetContent = newTweet.value;
    const container = document.createDocumentFragment();
    const divBox = document.createElement("div");
    const divPic = document.createElement("div");
    const divData = document.createElement("div");
    const divUser = document.createElement("div");
    const divText = document.createElement("div");

    //Asigno clases a los elementos
    divBox.setAttribute("class", "tweet");
    divPic.setAttribute("class", "userPic");
    divData.setAttribute("class", "data");
    divUser.setAttribute("class", "userName");
    divText.setAttribute("class", "twText");

    //Asigno el contenido a cada div
    divPic.innerHTML = `<img src=${userPic} alt="profile picture">`;
    divUser.innerHTML = `<span class="fullName">${fullName}</span><span class="username">@${username}</span>`
    divText.innerHTML = `<p>${tweetContent}</p>`;


    //Añado el contenido al contenedor, y luego a la página
    divData.append(divUser, divText)
    divBox.append(divPic, divData);
    container.append(divBox);
    tweets.prepend(container);

    //Vacío el input para escribir un nuevo tweet
    newTweet.value = "";
}

//Función que obtiene un usuario aleatorio
async function getUser() {
    try {
        const response = await fetch(
            `https://randomuser.me/api`
        );
        const data = await response.json();

        return data.results[0];
    } catch (error) {
        console.error(error);
    }
}

//Función que genera el primer usuario
async function firstUser() {
    user = await getUser();
    newPic.setAttribute("src", user.picture.medium);

}