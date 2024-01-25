// Unsplash API access key
let accessKey = "lDECU4MYPBu2XfOKjQtAngx6hm0WY73orE5po2H7Aw0";

// DOM elements
let input = document.querySelector("#input");
const searchForm = document.querySelector("#searchForm");
let searchBtn = document.querySelector("#searchBtn");
let url = `https://api.unsplash.com/photos/?client_id=${accessKey}`;
let imageContainer = document.querySelector(".imagesContainer");
let searchImages = document.querySelector(".searchImages");
const loadMoreBtn = document.querySelector("#loadMore");
// Initial search page
let pageNo = 1;

// Function to handle the search for images
async function searchImage(e, page) {
  e.preventDefault();
  try {
    // Get the search term from the input and trim any extra whitespace
    let searchTerm = input.value.trim();

    // Build the URL for the Unsplash API search
    let url = `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=20&page=${page}&client_id=${accessKey}`;

    // Clear the existing images in the container
    if (page === 1) {
      imageContainer.innerHTML = "";
    }
   
      // Fetch data from the Unsplash API
      let response = await fetch(url);
      let data = await response.json();

      // Iterate through the results and create image elements for each photo

      if (data.results.length > 0) {
        data.results.forEach((photo) => {
          // Creating Image Element div
          const imageElement = document.createElement("div");
          const description = document.createElement("p");

          // Adding class and innerHtml
          imageElement.classList.add("imageElement");
          imageElement.innerHTML = `<img src= "${photo.urls.regular}" alt= "${photo.alt_description}"/>`;

          // Appending everything to the imageContainer
          // description.innerText = photo.alt_description;
          // imageElement.appendChild(description);

          imageContainer.appendChild(imageElement);
        });

        // We Reached till the last page
        if (data.total_pages === page) {
          loadMoreBtn.style.display = "none";
        } else {
          loadMoreBtn.style.display = "block";
        }
      } else {
        imageContainer.innerHTML = "<h2> No Image found </h2>";
      }
    }
   catch (error) {
    //  any errors that occur during the API request
    imageContainer.innerHTML = "<h2> Please Try Again Later </h2>";
  }
}

// Add an input event listener to the search input for real-time updates
input.addEventListener("input", searchImage);

// Add a submit event listener to the search form, triggering the searchImage function
searchForm.addEventListener("submit", (e) => searchImage(e, pageNo));

// Add A Event Listerner to the loadmore button to fetch more images

loadMoreBtn.addEventListener("click", () => {
  // Get the search term from the input and trim any extra whitespace
  let searchTerm = input.value.trim();

  if (searchTerm === "") {
    imageContainer.innerHTML = "<h2> No Image found </h2>";
  }
  pageNo++; // Increment pageNo before making the API call
  searchImage(event, pageNo); // Pass null as the event parameter, as it's not used in the function
});
