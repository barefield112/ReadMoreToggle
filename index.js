// Find all elements with the attribute [gb-readmore="text-block"]
const elementsFound = document.querySelectorAll('[gb-readmore="text-block"]');
const resetFound = document.querySelectorAll('[gb-readmore="reset-button"]');
const listOfElements = [];

// Function to add the CSS class to the document
function addReadMoreDefaultClass() {
    const style = document.createElement('style');
    style.innerHTML = `
        .GB-ReadMore-Default-Class {
            border: none;
            font-size: inherit; 
            font-family: inherit;
            color: inherit;
            line-height: inherit;
            background-color: transparent;
            cursor: pointer;
            padding: 0;
            margin: 0;
        }
    `;
    document.head.appendChild(style);
}

// Call the function to add the class
addReadMoreDefaultClass();

// Define the TextElement class
class TextElement {
    constructor(element, id) {
        const defaultWordCount = 20; // Default word count if not specified
        this.element = element;
        this.fullText = element.textContent;
        this.id = id;
        this.open = false;
        this.className = "GB-ReadMore-Default-Class";

        // Determine the word limit
        if (element.hasAttribute('word-count')) {
            const limitCountValue = element.getAttribute('word-count');
            const limitCountNumber = Number(limitCountValue);
            if (!isNaN(limitCountNumber)) {
                this.wordCount = limitCountNumber;
            } else {
                this.wordCount = defaultWordCount;
            }
        } else {
            this.wordCount = defaultWordCount;
        }

        // Sets Read More Text Content 
        if(element.hasAttribute('read-more-text')){
            this.ReadMoreText = element.getAttribute('read-more-text');
        }
        else{
            this.ReadMoreText = " ...Read More";
        }

        //Sets Read Less Text Content
        if(element.hasAttribute('read-less-text')){
            this.ReadLessText = element.getAttribute('read-less-text');
        }
        else{
            this.ReadLessText = " - Read Less";
        }

        // Adds a custom Class to the clickable element
        if(element.hasAttribute('set-class')){
            this.className= element.getAttribute('set-class');
        }


        // Initialize with reduced text
        this.showReducedText();
    }

    // Method to show reduced text with "Read More" link
    showReducedText() {
        const words = this.fullText.split(' '); // Split text into words
        const reducedText = words.slice(0, this.wordCount).join(' '); // Join words up to the limit

        this.element.textContent = reducedText;

        const readMore = document.createElement("button");
        readMore.classList.add("GB-ReadMore-Default-Class");
        readMore.classList.add(this.className);
        readMore.textContent = this.ReadMoreText;
        readMore.addEventListener('click', () => this.toggleText());
        
        this.element.appendChild(readMore);
    }

    // Method to show full text with "Read Less" link
    showFullText() {
        this.element.textContent = this.fullText;

        const readLess = document.createElement("button");
        readLess.classList.add("GB-ReadMore-Default-Class");
        readLess.classList.add(this.className);
        readLess.textContent = this.ReadLessText;
        readLess.addEventListener('click', () => this.toggleText());
        
        this.element.appendChild(readLess);
    }

    // Method to toggle between full and reduced text
    toggleText() {
        if (this.open) {
            this.showReducedText();
        } else {
            this.showFullText();
        }
        this.open = !this.open; // Toggle the open state
    }
}

// Instantiate TextElement for each found element
elementsFound.forEach((element, id) => {
    const myElement = new TextElement(element, id);
    listOfElements.push(myElement);
});

//resetFound
resetFound.forEach((element) => {
    element.addEventListener('click', () => resetAll());
});

function resetAll(){
    listOfElements.forEach((element) =>{
        element.showReducedText();
    });
}
