function showError(msg){ document.getElementById("error").innerText = msg; }
function showLoading(show){ 
    const spinner = document.getElementById("spinner");
    if(spinner) spinner.style.display = show ? "block" : "none"; 
}

// ================= LOCAL AUTHENTICATION =================
function signupLocal(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if(!email || !password) return showError("Email and Password required");

  showError(""); showLoading(true);
  auth.createUserWithEmailAndPassword(email,password)
  .then(()=>{ showLoading(false); window.location = "local-form.html"; })
  .catch(e=>{ showLoading(false); showError(e.message); });
}

function loginLocal(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if(!email || !password) return showError("Email and Password required");

  showError(""); showLoading(true);
  auth.signInWithEmailAndPassword(email,password)
  .then(async (cred)=>{
    const doc = await db.collection("users_local").doc(cred.user.uid).get();
    showLoading(false);
    if(doc.exists) window.location = "local-listings.html";
    else window.location = "local-form.html";
  }).catch(e=>{ showLoading(false); showError(e.message); });
}

function saveLocalForm() {
  const user = auth.currentUser;
  if (!user) return alert("User not logged in");
  db.collection("users_local").doc(user.uid).set({
    name: document.getElementById("name").value,
    college: document.getElementById("college").value,
    city: document.getElementById("city").value,
    accommodation: document.getElementById("accommodation").value,
    budget: document.getElementById("budget").value,
    personality: document.getElementById("personality").value,
    cleanliness: document.getElementById("cleanliness").value,
    sleep: document.getElementById("sleep").value,
    phone: document.getElementById("phone").value
  }).then(() => { alert("Local Profile Saved"); window.location = "local-listings.html"; })
  .catch(e => alert(e.message));
}

// ================= GLOBAL AUTHENTICATION =================
function signupGlobal(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if(!email || !password) return showError("Email and Password required");

  showError(""); showLoading(true);
  auth.createUserWithEmailAndPassword(email,password)
  .then(()=>{ showLoading(false); window.location = "global-form.html"; })
  .catch(e=>{ showLoading(false); showError(e.message); });
}

function loginGlobal(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if(!email || !password) return showError("Email and Password required");

  showError(""); showLoading(true);
  auth.signInWithEmailAndPassword(email,password)
  .then(async (cred)=>{
    const doc = await db.collection("users_global").doc(cred.user.uid).get();
    showLoading(false);
    if(doc.exists) window.location = "global-listings.html";
    else window.location = "global-form.html";
  }).catch(e=>{ showLoading(false); showError(e.message); });
}

function saveGlobalForm() {
  const user = auth.currentUser;
  if (!user) return alert("User not logged in");
  db.collection("users_global").doc(user.uid).set({
    name: document.getElementById("name").value,
    university: document.getElementById("university").value,
    countryOfOrigin: document.getElementById("countryOfOrigin").value,
    targetCountry: document.getElementById("targetCountry").value,
    motherTongue: document.getElementById("motherTongue").value,
    accommodation: document.getElementById("accommodation").value,
    budget: document.getElementById("budget").value,
    personality: document.getElementById("personality").value,
    cleanliness: document.getElementById("cleanliness").value,
    phone: document.getElementById("phone").value
  }).then(() => { alert("Global Profile Saved"); window.location = "global-listings.html"; })
  .catch(e => alert(e.message));
}

function logout(){ auth.signOut().then(()=> window.location="index.html"); }

// ================= UTILITIES =================
function calculateTrustScore(userData) {
    let score = 20; 
    if (userData.phone && userData.phone.trim() !== "") score += 25; 
    if (userData.photoURL && userData.photoURL.trim() !== "") score += 15; 
    if (userData.college || userData.university) score += 15; 
    if (userData.city || userData.countryOfOrigin) score += 10; 
    if (userData.personality && userData.cleanliness) score += 15; 
    return Math.min(score, 100); 
}

function filterGlobalMatches(currentUser, allUsers) {
    if (!currentUser) return allUsers;
    return allUsers.filter(user => {
        const sameLanguage = (user.motherTongue || "").toLowerCase() === (currentUser.motherTongue || "").toLowerCase();
        const sameHometown = (user.countryOfOrigin || "").toLowerCase() === (currentUser.countryOfOrigin || "").toLowerCase();
        return sameLanguage || sameHometown;
    });
}