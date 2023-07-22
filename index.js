
const {Client} = require('@notionhq/client')
require('dotenv').config();

const notion = new Client({auth: process.env.NOTION_KEY}) // ACCESS THROUGH .env

const textInput = document.getElementById('text-input');
const dropdownSelect1 = document.getElementById('dropdown-select1');
const dropdownSelect2 = document.getElementById('dropdown-select2');
const textEntryInput = document.getElementById('text-entry-input');
const myButton = document.getElementById('my-button');

let currentURL;
let inputValue;
let selectedOptionO;
let selectedOptionT;
let Notes;

//Get URL
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
  currentURL = currentTab.url;
  currentURL = "hello.com"
});

// Event listener for text input
textInput.addEventListener('input', () => {
  const inputValue = textInput.value;
  //console.log('Text Input Value:', inputValue);
});

// Event listener for dropdown select 1
dropdownSelect1.addEventListener('change', () => {
  const selectedOptionO = dropdownSelect1.value;
  //console.log('Selected Option in Dropdown 1:', selectedOption);
});

// Event listener for dropdown select 2
dropdownSelect2.addEventListener('change', () => {
  const selectedOptionT = dropdownSelect2.value;
  //console.log('Selected Option in Dropdown 2:', selectedOption);
});

// Event listener for text entry input
textEntryInput.addEventListener('input', () => {
  const Notes = textEntryInput.value;
  //console.log('Text Entry Input Value:', textAreaValue);
});

// Event listener for the button

myButton.addEventListener('click', () => {
  // Code to execute when the button is clicked
  createNotionPage(inputValue,selectedOptionO,currURL,selectedOptionT,Notes)
  //console.log("Sent!")
});

/*myButton.addEventListener('click', async () => { // Add "async" here
  // Code to execute when the button is clicked
  const appName = textInput.value;
  const appProgress = dropdownSelect1.value;
  const timeFrame = dropdownSelect2.value;
  const Note = textEntryInput.value;

  try {
    const response = await createNotionPage(appName, appProgress, currentURL, timeFrame, Notes);
    alert('Notion Page Created Successfully!\n' + JSON.stringify(response));
  } catch (error) {
    alert('Error creating Notion Page:\n' + error.message);
  }

}); */

async function createNotionPage(appName,appProgress,currURL,timeFrame,Notes) {
  
  console.log('Sending data to Notion')
  
    const response = await notion.pages.create({
      "parent" : {
        "type" : "database_id",
        "database_id" : process.env.NOTION_DATABASE_ID
      },
      "properties" : {
        "appName" : {
          "title" : [{
            "type" : "text",
            "text" : {
              "content" : appName
            }
          }]
        },
        "appProgress": {
          "select": {
            "name": appProgress
          }
        },
        "URL": {
          "url": currURL
        },
        "timeFrame": {
          "select": {
            "name": timeFrame
          }
        },"Notes": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": Notes,
                "link": null
              }
            }
          ]
        } // add on URL and notes 
      } 
    })
    console.log(response)
}






