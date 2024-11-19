// Sample data for contacts
let extractedData = [];

// Select all chat containers 
let chatContainers = document.querySelectorAll("div._ak8l");

// Function to check if a string is a phone number
function isPhoneNumber(str) {
  const num = parseInt(str, 10);
  return !isNaN(num) && str.trim().length > 0;
}

// Function to check if the message timestamp is from today
function isToday(timestamp) {
  const today = new Date();
  let chatDate;

  // Check if the timestamp is 'Yesterday' or in a specific time format
  if (timestamp.includes("Yesterday")) {
    chatDate = new Date(today);
    chatDate.setDate(today.getDate() - 1); 
  } else if (timestamp.includes("am") || timestamp.includes("pm")) {
    // This is for specific times like "12:01 am"
    chatDate = new Date(today.toDateString() + " " + timestamp); 
  } else {
    // Handle the case where the timestamp is in a specific date format
    chatDate = new Date(timestamp);
  }

  // Check if the year, month, and day are the same for today's date and the chat timestamp
  return (
    today.getFullYear() === chatDate.getFullYear() &&
    today.getMonth() === chatDate.getMonth() &&
    today.getDate() === chatDate.getDate()
  );
}

// Extract necessary data from each chat container
chatContainers.forEach((chat) => {
  try {
    let contactName = chat.querySelector("._ak8q")?.innerText; 
    let lastMessageElement = chat.querySelector("._ak8j"); 
    let lastMessage = lastMessageElement
      ? lastMessageElement.textContent ||
        lastMessageElement.innerText ||
        "No Message"
      : "No Message";
    let timestampElement = chat.querySelector("._ak8i"); 
    let timestamp = timestampElement ? timestampElement.innerText : ""; 

    // Check if the message is from today
    if (isToday(timestamp)) {
      if (isPhoneNumber(contactName)) {
        extractedData.push({
          contactName: "Not Available", // If it's a phone number, don't show name
          contactNumber: contactName, // Show the phone number
          lastMessage: lastMessage,
        });
      } else {
        extractedData.push({
          contactName: contactName, // Show the contact name
          contactNumber: "Not Available", // No phone number available
          lastMessage: lastMessage,
        });
      }
    }
  } catch (error) {
    console.error("Error extracting chat data:", error);
  }
});

// Output today's extracted chat data
console.log(
  "Today's Chat Data:",
  JSON.stringify(extractedData, null, 2)
);

// Function to create and style HTML for each contact
function generateContactHTML(contact) {
  console.log("Generating HTML for contact:", contact); // Debug: contact data for HTML generation
  return `
        <div class="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-300">
            <div class="flex justify-between items-center mb-2">
                <h2 class="text-lg font-semibold text-green-700">${
                  contact.contactName
                }</h2>
                <span class="text-xs text-gray-400">${
                  contact.messageTime || "Unknown Time"
                }</span>  
            </div>
            <p class="text-sm text-gray-600 mb-1">Phone: ${
              contact.contactNumber || "Not Available"
            }</p>
            <p class="text-sm bg-gray-100 p-2 rounded-md shadow-inner">${
              contact.lastMessage
            }</p>
        </div>
    `;
}

// Function to display all contacts
function generateHTML(data) {
  const container = document.getElementById("content");
  console.log("Generating HTML for all contacts");
  container.classList.add("max-w-md", "mx-auto", "p-4");
  container.innerHTML = "";

  data.forEach((contact) => {
    const contactDiv = generateContactHTML(contact);
    container.innerHTML += contactDiv;
  });
}

// Function to send data to a CRM (simulated with placeholder API)
async function sendToCRM(data) {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Placeholder API for testing
  console.log("Sending data to CRM:", data);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Data sent successfully:", jsonResponse);
    } else {
      throw new Error("Failed to send data");
    }
  } catch (error) {
    console.error("Error sending data:", error.message);
  }
}

// Function to save extracted data as a JSON file
function saveJSONData(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'chat_data.json';
  link.click();
}

// Main function to control the flow: generate HTML, send data, and save JSON
async function main() {
  try {
    generateHTML(extractedData); // Render the contacts
    await sendToCRM(extractedData); // Send the data to CRM (optional)
    saveJSONData(extractedData); // Save the data as JSON file
  } catch (error) {
    console.error("An error occurred in the main function:", error.message);
  }
}

main();
