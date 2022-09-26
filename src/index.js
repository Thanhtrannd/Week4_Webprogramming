import "./styles.css";

const MainBody = document.getElementById("main");
const SearchButton = document.getElementById("submit-data");
const SearchInput = document.getElementById("input-show");
const BaseURL = "https://api.tvmaze.com/search/shows?q=";

SearchButton.addEventListener("click", function () {
  let SearchKey = SearchInput.value;
  let SrcURL = BaseURL + SearchKey;
  LoadData(SrcURL);
});

async function LoadData(URL) {
  let loadURL = await fetch(URL);
  let loadeddata = await loadURL.json();

  for (let key in loadeddata) {
    let Show = loadeddata[key];
    console.log(Show);
    let ShowName = Show.show.name;
    let ShowImgObj = Show.show.image;
    let ShowImg;
    if (ShowImgObj != null) {
      ShowImg = Show.show.image.medium;
    }
    let ShowSummaryObj = Show.show.summary;
    AppendData(ShowName, ShowImg, ShowSummaryObj);
  }
}

function AppendData(ShowName, ShowImg, ShowSummaryObj) {
  let parentDiv = document.createElement("div");
  parentDiv.className = "show-data";

  let img = document.createElement("img");
  img.src = ShowImg;

  let childDiv = document.createElement("div");
  childDiv.className = "show-list";

  let header = document.createElement("h1");
  header.innerText = ShowName;

  let summary = ShowSummaryObj;

  childDiv.appendChild(header);
  childDiv.innerHTML = summary;
  parentDiv.appendChild(img);
  parentDiv.appendChild(childDiv);
  MainBody.appendChild(parentDiv);
}
