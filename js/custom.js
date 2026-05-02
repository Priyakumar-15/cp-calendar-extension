/* so first we connect html to js by using getelementbyid and queryslectorall they return the element by given id and input type */

const btn = document.getElementById(`toggle`);
const sidebar = document.getElementById(`sidebar`);
const rest = document.getElementById(`rest`);
const tc = document.getElementById(`tableContent`);
const checkboxElems = document.querySelectorAll("input[type='checkbox']");
const radioElems = document.querySelectorAll("input[type='radio']");
/**
 then me create a map to map website link with given image when the contest card created 
 */
const mapcp = new Map();
mapcp.set("codechef.com", "codechef.png");
mapcp.set("codeforces.com", "codeforces.svg");
mapcp.set("atcoder.jp", "atcoder.png");
mapcp.set("geeksforgeeks.org", "GeeksforGeeks.svg");
mapcp.set("naukri.com/code360", "naukri.jpg");
mapcp.set("leetcode.com", "leetcode.png");
mapcp.set("topcoder.com", "topcoder.png");
/* then on toglle button we add a eventlistner when sidebar contains inactive then on click we have to remove whenbarinactive from list and add baractive and vice versa
the rest class is chnaged and css is applied accordingly
*/
btn.addEventListener("click", function (e) {
  if (sidebar.classList.contains("inactive")) {
    sidebar.classList.remove("inactive");
    rest.classList.remove("whenBarInActive");
    rest.classList.add("whenBarActive");
    
  } else {
    sidebar.classList.add("inactive");
    rest.classList.remove("whenBarActive");
    rest.classList.add("whenBarInActive");
  }
});

/* Without this:

❌ After refresh → all checkboxes reset
❌ User loses selection

👉With this:

✔ UI restores previous state
✔ Better user experience */
var host;
if (localStorage.getItem("hosts") === null) {
  host = [`codeforces.com`];
  document.getElementById("btncheck1").checked = true;
} else {
  host = JSON.parse(localStorage.getItem("hosts"));
  host.forEach(function (name) {
    document.getElementsByName(`${name}`)[0].checked = true;
  });
}
var now = new Date();
const nowString =
  now.toISOString().substring(0, 11) + now.toISOString().substring(11, 19);
var today = false;
var todayStart = new Date();
todayStart.setDate(todayStart.getDate() - 32);
todayStart.setHours(0,0,0);

var todayStartString =
  todayStart.toISOString().substring(0, 11) +
  todayStart.toISOString().substring(11, 19);
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0,0,0);
const apiURL2 = `https://clist.by:443/api/v4/contest/?username=karanarjunjr&api_key=32b0dc3d2ed2ee0e8ad5eb7dfe37c47e4da8abb4&format=json&order_by=start&limit=1000`;

var apiData;
/* used to display contest */
function display() {
  var inner = ``;

  apiData.data.objects.forEach(function (contest) {
    var contStart = new Date(contest.start + `.000Z`);
    var contEnd = new Date(contest.end + `.000Z`);
    if (today) {
      if (
        host.includes(contest.resource) &&
        contEnd > now &&
        contStart < tomorrow
      ) {
        const minutes = (parseInt(contest.duration) / 60) % 60;
        const hours = parseInt((parseInt(contest.duration) / 3600) % 24);
        const days = parseInt(parseInt(contest.duration) / 3600 / 24);
        var dur = ``;
        if (days > 0) {
          dur += `${days} days `;
        }
        if (hours > 0) {
          dur += `${hours} hours `;
        }
        if (minutes > 0) {
          dur += `${minutes} minutes `;
        }
        var start = new Date(contest.start + `.000Z`);
        start = start.toLocaleString("en-US");
        const time = start.split(", ");
        const date = time[0].split("/");
        var temp = `
					<a class="contest btn btn-lg btn-light mx-4 my-3" href="${
            contest.href
          }" target="_blank">
						<div class="left">
							<span><strong>${contest.event}</strong></span>
							<span>Start date: ${date[1]}/${date[0]}/${date[2]}</span>
							<span>Start time: ${time[1]}</span>
							<span>Duration: ${dur}</span>
						</div>
						<div class="right">
							<img class="logo" src="images/${mapcp.get(contest.resource)}" alt="codechef">
						</div>
					</a>
					
				`;

        inner += temp;
      }
    } else {
      if (host.includes(contest.resource) && contStart > now) {
        const minutes = (parseInt(contest.duration) / 60) % 60;
        const hours = parseInt((parseInt(contest.duration) / 3600) % 24);
        const days = parseInt(parseInt(contest.duration) / 3600 / 24);
        var dur = ``;
        if (days > 0) {
          dur += `${days} days `;
        }
        if (hours > 0) {
          dur += `${hours} hours `;
        }
        if (minutes > 0) {
          dur += `${minutes} minutes `;
        }
        var start = new Date(contest.start + `.000Z`);
        start = start.toLocaleString("en-US");
        const time = start.split(", ");
        const date = time[0].split("/");
        var temp = `
					<a class="contest btn btn-lg btn-light mx-4 my-3" href="${
            contest.href
          }" target="_blank">
						<div class="left">
							<span><strong>${contest.event}</strong></span>
							<span>Start date: ${date[1]}/${date[0]}/${date[2]}</span>
							<span>Start time: ${time[1]}</span>
							<span>Duration: ${dur}</span>
						</div>
						<div class="right">
							<img class="logo" src="images/${mapcp.get(contest.resource)}" alt="codechef">
						</div>
					</a>
					
				`;

        inner += temp;
      }
    }
  });
  tc.innerHTML = inner;
  if (inner === ``) {
    tc.innerHTML = `
			<p id="load1">(⌣̩̩́_⌣̩̩̀)</p>
			<p id="load2">"First In First Out" says Queue,</p>
			<p id="load3">We have nothing to show you!</p>
		`;
  }
  btn.disabled = false;
}

async function callAPI() {
  const response = await fetch(
    apiURL2 + `&end__gt=${nowString}&start__gt=${todayStartString}`
  );
  const data = await response.json();
  console.log(await response);

  return {
    data,
  };
}
/* to track which item is clicked and  The event listener is triggered every time user clicks*/
function addEventListeners() {
  for (var i = 0; i < checkboxElems.length; i++) {
    checkboxElems[i].addEventListener("click", function (e) {
      if (e.target.checked) {
        if (!host.includes(e.target.name)) {
          host.push(e.target.name);
        }
      } else {
        /* remove if unchecked using splice*/
        const index = host.indexOf(e.target.name);
        if (index > -1) {
          host.splice(index, 1);
        }
      }
      display();
      localStorage.setItem("hosts", JSON.stringify(host)); /* last check store*/
    });
  }

  for (var i = 0; i < radioElems.length; i++) {
    radioElems[i].addEventListener("click", function (e) {
      if (e.target.id === "btncheck9") {
        today = true;
        display();
      } else {
        today = false;
        display();
      }
    });
  }
}
/* get today date and last u[dated time */
var todayStart = new Date();
todayStart.setHours(0,0,0);

const TS = new Date(localStorage.getItem("timeStamp"));
/* if local storage not contains contest or if last updated is before the todaystart then we need new data from api*/
if (localStorage.getItem("contests") === null || TS < todayStart) {
  /* call api result store in data*/
  callAPI().then((data) => {
    apiData = data;
    const timeStamp = new Date(); /* track last updated */
    localStorage.setItem("contests", JSON.stringify(data));
    localStorage.setItem("timeStamp", timeStamp);
    display(); /*display on screen  */
    addEventListeners(); /* updated hosts to track selected platform and today or upcoming  */
  });
} else {/* if we used it today before then no need to call api again first call add event listner if user check another add in host */
  addEventListeners();
  apiData = JSON.parse(localStorage.getItem("contests"));/* apidta from local storage*/
  display();/* then display*/
}