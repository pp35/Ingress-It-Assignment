
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

  function generateHTML(data) {
    const container = document.getElementById("content");
    
    data.forEach(contact => {
      const contactDiv = document.createElement('div');
      contactDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'mb-4');
      
      contactDiv.innerHTML = `
        <h2 class="text-2xl font-semibold text-gray-700">${contact.contactName}</h2>
        <p class="text-sm text-gray-600">Phone: <a href="tel:${contact.phoneNumber}" class="text-blue-600">${contact.phoneNumber}</a></p>
        <p class="mt-2 text-gray-800">Last Message: <span class="italic">${contact.lastMessage}</span></p>
      `;
      
      container.appendChild(contactDiv);
    });
  }
  

  async function sendToCRM(data) {
    try {
      console.log('Simulating API Call to send data to CRM...');
      
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Data sent successfully:", jsonResponse);
      } else {
        console.error("Failed to send data. Response not OK.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
   
    }
  }
  
  
  async function main() {
   
    generateHTML(extractedData);
    

    await sendToCRM(extractedData);
  }
  
  
  main();
  