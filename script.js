var btnTxt = document.querySelector(".btn-txt");
var btnLoader = document.querySelector(".btn-loader");

btnLoader.style.display = "none";

document.getElementById("generateSeoKeyword").addEventListener("click", () => {
  const businessInput = document.getElementById("businessField").value;

  if (!businessInput) {
    alert("Please provide a business description.");
    return;
  }

  btnTxt.style.display = "none";
  btnLoader.style.display = "block";

  const apiUrl =
    "https://n8n.owlapplicationbuilder.com/webhook/ai-tool-seo-keyword";
  const requestBody = {
    business: businessInput
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(requestBody)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      var ul = document.querySelector(".listKeywords");
      ul.innerHTML = `
                  <li>${responseData.response1}</li>
                  <li>${responseData.response2}</li>
                  <li>${responseData.response3}</li>
                  <li>${responseData.response4}</li>
                  <li>${responseData.response5}</li>
                  <li>${responseData.response6}</li>
                  <li>${responseData.response7}</li>
                  <li>${responseData.response8}</li>
                  <li>${responseData.response9}</li>
                  <li>${responseData.response10}</li>
                `;

      btnTxt.style.display = "block";
      btnLoader.style.display = "none";

      // Add a click event listener to the entire list of keywords
      ul.addEventListener("click", (event) => {
        const clickedListItem = event.target.closest("li");
        if (!clickedListItem) return; // Ignore clicks on elements other than list items

        // Get the text content of the clicked list item
        const textToCopy = clickedListItem.textContent.trim();

        // Create a temporary input element to copy the text
        const tempInput = document.createElement("textarea");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);

        // Select the text in the input element
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices

        // Copy the selected text to the clipboard
        document.execCommand("copy");

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        // Provide visual feedback by changing the background color
        clickedListItem.style.backgroundColor = "#B6F4B4"; // Change to a desired color
        clickedListItem.style.color = "#129310";
        setTimeout(() => {
          clickedListItem.style.backgroundColor = ""; // Reset the background color
          clickedListItem.style.color = "";
        }, 1000); // Reset after 1 second (adjust the timing as needed)
      });
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
});
