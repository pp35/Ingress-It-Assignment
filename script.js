// Sample data for contacts
// let extractedData = [{
//   contactName: "Not Available",
//   contactNumber: "+91 93485 20704",
//   lastMessage: "SATYAM‎ GUPTA‎ is inviting‎ you to a scheduled Zoom meeting.\n\nTopic:‎ FIX SALARY‎ JOB &‎ NO‎ INVESTMENT WORK\nTime: Nov‎ 19,‎ 2024 Tonight08:00‎ PM‎ India\n\nJoin‎ Zoom Meeting\nhttps://us06web.zoom.us/j/81551756509\n\nMeeting ID: 815‎ 5175‎ 6509\n\n\nPlease‎ join this important telegram‎ group\nhttps://t.me/+lu2xeBK3tVdiNTQ1\n\nLife changing Work‎‎ From‎ Home‎ job‎ opportunity‎ without any‎ investment*‎‎ \nHost‎‎ :HR Satyam‎ Gupta \nFix‎ Salary‎ Job‎‎ Rs.18,000 to Rs.30,000‎‎ For fresher\nAnd also Available‎ daily‎‎ Base‎ fixed Salary Rs‎ 600‎ per Day\nApne‎‎ job‎ ke‎ liye apply kiya‎ tha‎‎ , yeh‎‎ job‎ opportunity‎ ap‎ miss mat kijiye‎‎ isme apko‎ job‎ ke bare‎ ma‎‎ sab‎‎ btaya‎ jayega yeh‎ telecalling‎ work‎ ha‎ aur‎ fixed salary‎ apko‎‎ di‎‎ jayegi‎ joining‎ letter‎ ke‎‎ sath agar‎ apko‎‎ koi‎‎ bhi‎ dought‎ ho toh apke dought‎‎ meeting‎ ma‎ clear‎ kardiye jayege but meeting‎ miss‎ mat kijiyega meeting‎ sirf‎ 20‎ to‎‎ 30‎ minutes‎ ki‎ rahegi‎ jisme‎ apko sari‎‎ jankari‎‎ di‎‎ jayegi‎‎ agar‎ ap‎‎ intrested‎ ha‎‎ toh‎ meeting ko‎‎ 8:00 pm join‎ kijiyega.‎ IMPORTANT‎‎ Agar apko‎ Link‎ Blue‎ show nhi‎ horaha‎‎ ha toh number‎ ko‎ save‎‎ kijiye‎‎ Thankyou \nNO‎ DEMAT ACCOUNT‎ OPENING‎‎ WORK \nNO‎ FOREVER‎‎ WORK\nNO AFFILIATE‎‎ MARKETING‎‎ \nNO‎ DIGITAL‎ MARKETING‎ \nONLY‎ ‎‎ CALLING‎‎ WORK‎ \nALARM‎‎ SET‎ KIJIYE‎ TAKI‎‎ AP‎ MEETING KO MISS NA‎ KAR SKE ISS‎ MEETING KI‎ APKO‎ KOI‎ RECCORDING NHI‎ MILEGI‎ YEH‎‎ MEETING‎ LIVE‎ HOGI...\n\nplz telegram‎ application download karke‎ rakhiye because meeting ma apko‎ telegram group‎ join karaya jayega ok\n\n\naap‎ job‎ ke liye serious‎ ho ?\n\nYes or‎ No ? \nMsg mee..\n4a"
// },
// {
//   contactName: "Nidhi Pandey Oriental",
//   contactNumber: "Not Available",
//   lastMessage: "No Message"
// },
// {
//   contactName: "Subham",
//   contactNumber: "Not Available",
//   lastMessage: "My le chaluga"
// },
// {
//   contactName: "H",
//   contactNumber: "Not Available",
//   lastMessage: ","
// },];
let extractedData =[]
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
    let lastMessageElement = chat.querySelector("._ak8k"); 
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
// Store extracted data in localStorage
// localStorage.setItem("chatData", JSON.stringify(extractedData));

// Retrieve the stored data
const storedData = localStorage.getItem("chatData");
console.log(storedData)
// Parse the retrieved data
if (storedData) {
  const parsedData = JSON.parse(storedData);
  console.log("Retrieved Chat Data:", parsedData);
} else {
  console.log("No chat data found in localStorage.");
}
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
async function sendToCRM(data, retries = 3, delay = 2000) {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Placeholder API for testing
  console.log("Sending data to CRM:", data);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Data sent successfully:", jsonResponse);
        return jsonResponse; // Return on success
      } else {
        throw new Error(`Failed to send data (Attempt ${attempt})`);
      }
    } catch (error) {
      console.error(`Error on attempt ${attempt}: ${error.message}`);

      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
      } else {
        console.error("Max retries reached. Data could not be sent.");
        throw error; // Throw the error after max retries
      }
    }
  }
}

// Main function to control the flow: generate HTML and send data
async function main() {
  try {
    generateHTML(extractedData);
    await sendToCRM(extractedData);
  } catch (error) {
    console.error("An error occurred in the main function:", error.message);
  }
}

main();