// Unsplash API access key
let accessKey = "lDECU4MYPBu2XfOKjQtAngx6hm0WY73orE5po2H7Aw0";

// DOM elements
let input = document.querySelector("#input");
const searchForm = document.querySelector("#searchForm");
let searchBtn = document.querySelector("#searchBtn");
let url = `https://api.unsplash.com/photos/?client_id=${accessKey}`;
let imageContainer = document.querySelector(".imagesContainer");
let searchImages = document.querySelector(".searchImages");



// Function to handle the search for images
async function searchImage(e) {
  e.preventDefault();

  // Get the search term from the input and trim any extra whitespace
  let searchTerm = input.value.trim();

  // Build the URL for the Unsplash API search
  let url = `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=20&client_id=${accessKey}`;

  // Clear the existing images in the container
  imageContainer.innerHTML = "";

  // Check if the search term is empty
  if (searchTerm === "") {
    // alert("Please Search A Valid Query !!");
  } else {
    try {
      // Fetch data from the Unsplash API
      let response = await fetch(url);
      let data = await response.json();

      console.log(data.results);
      // Iterate through the results and create image elements for each photo
      data.results.forEach((photo) => {
        const imageElement = document.createElement("div");
        const description = document.createElement("p");

        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src= "${photo.urls.regular}" alt= "${photo.alt_description}"/>`;
        // description.textContent = photo.alt_description;
        // imageElement.appendChild(description);
        imageContainer.appendChild(imageElement);
      });
    } catch (error) {
      // Log any errors that occur during the API request
      console.log(error);
    }
  }
}

// Add an input event listener to the search input for real-time updates
input.addEventListener("input", searchImage);

// Add a submit event listener to the search form, triggering the searchImage function
searchForm.addEventListener("submit", searchImage);
