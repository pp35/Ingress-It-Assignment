// Sample data for contacts extracted from WhatsApp Web
const extractedData = [
  {
    contactName: "John Doe",
    phoneNumber: "+1-234-567-8901",
    lastMessage: "Hi, are you available"
  },
  {
    contactName: "Jane Smith",
    phoneNumber: "+1-987-654-3210",
    lastMessage: "Could you send me?"
  },
  {
    contactName: "Charlie Brown",
    phoneNumber: "+1-555-555-5555",
    lastMessage: "Let's schedule the meeting"
  }
];

// Function to create and style HTML for each contact
function generateContactHTML(contact) {
  const contactDiv = document.createElement('div');
  contactDiv.classList.add(
    'bg-gray-100', 
    'p-4',         
    'rounded-lg', 
    'shadow-sm',  
    'mb-4',        
    'border',      
    'border-gray-200' 
  );

  const phone = contact.phoneNumber 
      ? `<a href="tel:${contact.phoneNumber}" class="text-green-600 font-medium">${contact.phoneNumber}</a>` 
      : "Phone number not available";
  const lastMessage = contact.lastMessage 
      ? `<span class="italic text-gray-600">${contact.lastMessage}</span>` 
      : "No messages available";

  contactDiv.innerHTML = `
    <h2 class="text-lg font-bold text-green-700 mb-1">${contact.contactName}</h2> <!-- Contact name -->
    <p class="text-sm text-gray-500 mb-2">Phone: ${phone}</p> <!-- Phone number -->
    <p class="text-base text-gray-800 bg-white p-2 rounded-lg shadow-inner">Last Message: ${lastMessage}</p> <!-- Last message bubble -->
  `;
  return contactDiv;
}

// Function to generate and append HTML for all contacts

function generateContactHTML(contact) {
  const contactDiv = document.createElement('div');
  contactDiv.classList.add(
    'bg-white',       
    'p-4',            
    'rounded-lg',    
    'shadow-md',      
    'mb-4',          
    'border',         
    'border-gray-300' 
  );

  
  const phone = contact.phoneNumber 
      ? `<a href="tel:${contact.phoneNumber}" class="text-green-600 font-medium flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7 7 7-7"/>
           </svg>${contact.phoneNumber}</a>` 
      : "<span class='text-gray-500'>Phone number not available</span>";
  
  const lastMessage = contact.lastMessage 
      ? `<div class="text-gray-800 flex items-center truncate">
           <span class="mr-1">Last Message:</span>
           <span class="italic truncate">${contact.lastMessage}</span>
         </div>`
      : "<span class='text-gray-500'>No messages available</span>";
  
  contactDiv.innerHTML = `
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-green-700">${contact.contactName}</h2>
      <span class="text-xs text-gray-400">Today, 11:20 AM</span> <!-- Placeholder for timestamp -->
    </div>
    <p class="text-sm text-gray-600 mb-1">Phone: ${phone}</p>
    <p class="text-sm bg-gray-100 p-2 rounded-md shadow-inner">${lastMessage}</p>
  `;
  return contactDiv;
}

// Function to generate and append HTML for all contacts
function generateHTML(data) {
  const container = document.getElementById("content");
  container.classList.add(
    'max-w-md', 
    'mx-auto',  
    'p-4'       
  );
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