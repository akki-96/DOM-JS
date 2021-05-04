const api = `https://randomuser.me/api`;

const addUser = document.getElementById("user-btn");
const userSort = document.getElementById("ascsort");
const userSort2 = document.getElementById("dscsort");
const search = document.getElementById("search");
const userList = document.getElementById("user-list");
const appState = [];

class User {
  constructor(title, firstName, lastName, gender, email) {
    this.title = `${title}`;
    this.name = `${firstName} ${lastName}`;
    this.gender = gender;
    this.email = email;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const user = await userData.json();
  const userName = user.results[0];
  const classUser = new User(
    userName.name.title,
    userName.name.first,
    userName.name.last,
    userName.gender,
    userName.email
  );
  appState.push(classUser);
  console.log(appState);
  domRender(appState);
});

const domRender = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEle = document.createElement("div");
    userEle.setAttribute("class", "card1");
    userEle.innerHTML = `<div class="card" > 
        Name : ${userObj.title} ${userObj.name} <br>
        Gender : ${userObj.gender} <br> 
        Email  : ${userObj.email}
        </div>`;
    userList.appendChild(userEle);
  });
};

search.addEventListener("keyup", (e) => {
  const filtedName = appState.filter(
    (userName) =>
      userName.name.toLowerCase().includes(search.value.toLowerCase()) ||
      userName.gender.toLowerCase().includes(search.value.toLowerCase()) ||
      userName.email.toLowerCase().includes(search.value.toLowerCase())
  );
  domRender(filtedName);
});

userSort.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
  domRender(appStateCopy);
});

userSort2.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name > b.name ? -1 : 1));
  domRender(appStateCopy);
});
