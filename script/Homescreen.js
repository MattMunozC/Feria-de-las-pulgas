
// Import the functions you need from the SDKs you need

 // Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";

import { getDatabase,onValue, ref, set, get,child} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js"

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {

    apiKey: "AIzaSyDkZNACE_pEWc4qGtD4O6-ZfzX49ozNiRo",

    authDomain: "feria-de-las-pulgas-7d2f9.firebaseapp.com",

    databaseURL: "https://feria-de-las-pulgas-7d2f9-default-rtdb.firebaseio.com",

    projectId: "feria-de-las-pulgas-7d2f9",

    storageBucket: "feria-de-las-pulgas-7d2f9.appspot.com",

    messagingSenderId: "240389025891",

    appId: "1:240389025891:web:ba4d42721c52058eb2c856",

    measurementId: "G-YN8XB9X2MV"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);


const db=getDatabase(app);
var participants_match=[]
const root=ref(db,"/");

function addParticipant(game,icon_url,name){
  var game=ref(db,`${game}/participants/${name}`)
  set(game,icon_url)
}

document.getElementById("start").addEventListener('click',()=>{
    document.getElementById("startGame").style.display="block"
    var gamecode=ref(db,"/New_code")
    get(gamecode).then((snapshot)=>{
        //var code=snapshot.val()
        code=28
        document.getElementById("code").innerText=String(code).padStart(6,"0")
        //set(gamecode,code+1)
        var game=ref(db,`/${code}/`)    
        set(game,"participants")
        onValue(game,(snapshot)=>{
          var participants=snapshot.val().participants
          var table=document.getElementById("match")
          for (const key in participants){
            if (participants.hasOwnProperty(key) && !participants_match.includes(key)){
              table.tBodies[0].innerHTML+=`<tr class="new_challenger"><td>${key}</td><td>${participants[key]}</td></tr>`
            }
            participants_match.push(key)
            console.log(participants_match)
          }

        })
    })
    
})
document.getElementById("join").addEventListener('click',()=>{
    addParticipant(28,"a",Math.floor(Math.random() * 10))
})
