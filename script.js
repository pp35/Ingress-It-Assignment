// Sample data for contacts extracted from WhatsApp Web
const extractedData = [
  {
    contactName: "John Doe",
    phoneNumber: "+1-234-567-8901",
    lastMessage: "Hi, are you available for a call today?"
  },
  {
    contactName: "Jane Smith",
    phoneNumber: "+1-987-654-3210",
    lastMessage: "Could you send me the updated report?"
  },
  {
    contactName: "Charlie Brown",
    phoneNumber: "+1-555-555-5555",
    lastMessage: "Let's schedule the meeting for tomorrow."
  }
];

// Function to create and style HTML for each contact
function generateContactHTML(contact) {
  const contactDiv = document.createElement('div');
  contactDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'mb-4');

  const phone = contact.phoneNumber ? 
      `<a href="tel:${contact.phoneNumber}" class="text-blue-600">${contact.phoneNumber}</a>` : 
      "Phone number not available";
  const lastMessage = contact.lastMessage ? 
      `<span class="italic">${contact.lastMessage}</span>` : 
      "No messages available";

  contactDiv.innerHTML = `
    <h2 class="text-2xl font-semibold text-gray-700">${contact.contactName}</h2>
    <p class="text-sm text-gray-600">Phone: ${phone}</p>
    <p class="mt-2 text-gray-800">Last Message: ${lastMessage}</p>
  `;
  return contactDiv;
}

// Function to generate and append HTML for all contacts
function generateHTML(data) {
  const container = document.getElementById("content");
  container.innerHTML = ''; 

  data.forEach(contact => {
    const contactDiv = generateContactHTML(contact);
    container.appendChild(contactDiv);
  });
}

// Function to send data to a CRM (simulated with placeholder API), with retry logic
async function sendToCRM(data, retries = 3) {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  const sendRequest = async () => {
    try {
      console.log('Attempting to send data to CRM...');
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Data sent successfully:", jsonResponse);
        return jsonResponse;
      } else {
        throw new Error("Failed to send data. Response not OK.");
      }
    } catch (error) {
      console.error("Error in API request:", error.message);
      if (retries > 1) {
        console.log(`Retrying... attempts remaining: ${retries - 1}`);
        return sendToCRM(data, retries - 1);  
      } else {
        console.error("Failed to send data after multiple attempts.");
        alert("An issue occurred while processing. Please try again later.");
        throw new Error("Failed to send data after multiple attempts.");
      }
    }
  };

  return await sendRequest();
}

// Main function to control flow: generate HTML and send data
async function main() {
  try {
    console.log("Starting contact HTML generation...");
    generateHTML(extractedData);  

    console.log("Attempting to send extracted data to CRM...");
    await sendToCRM(extractedData); 
    console.log("Process complete.");

  } catch (error) {
    console.error("An error occurred in the main function:", error.message);
  }
}

main();