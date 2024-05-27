const list=document.querySelector(".list");
const inputs=document.querySelectorAll('input');
const add=document.querySelector("button");
const url='https://6654150f1c6af63f46765399.mockapi.io/users';
async function getUsers(){
    const res=await fetch(url);
    const data=await res.json();
    console.log(data);
    renderUsers(data)
}
getUsers()

function renderUsers(arr){
    for (const user of arr) {
        list.innerHTML+=`<li>
        <h3>${user.name}</h3>
        <img src=${user.avatar}/>
        <br/>
        <button onclick="delUser(${user.id})">delete</button>
        <button onclick="changeUser(${user.id})">put</button>
        </li>`
    }
}

async function delUser(id){
    console.log(id);
    const res=await fetch(url+'/'+id, {
        method:"DELETE",
        headers:{
            'Content-type':'application/json; charset=UTF-8',
        },
    });
    const data=await res.json()
    getUsers()
}
async function changeUser(id){
    const newName=prompt('Enter new name')
    const newAvatar=prompt("Enter new image")
    const res=await fetch(url+'/'+id, {
        method:"PUT",
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        },
        body:JSON.stringify({
            name:newName,
            avatar:newAvatar
        })
    })
}
async function addUser(){
    const name=document.querySelector('input[placeholder="Enter name"]').value;
    const avatarUrl=document.querySelector('input[placeholder="Avatar url"]').value;

    if(!name||!avatarUrl){
        alert("имя и ссылка")
        return;
    }

    const res=await fetch(url,{
    method:"POST",
    headers:{
        "Content-type": "application/json; charset=UTF-8",
    },
    body:JSON.stringify({
        name:name,
        avatar:avatarUrl,
    }),
    });

    const data=await res.json();
    getUsers();
}
add.onclick=()=>{
    addUser();
}