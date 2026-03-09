const cardCount = document.getElementById('card-count');
let allCardCount;
let openCardCount;
let closedCardCount;
const cardContainer = document.getElementById('card-container');
const openCardContainer = document.getElementById('open-card-container');
const closedCardContainer = document.getElementById('closed-card-container');
// get all  3 tab buttons
const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
// creating function for change tabs
const toggleStyle = (id) => {
    allBtn.classList.remove('btn-primary');
    openBtn.classList.remove('btn-primary');
    closeBtn.classList.remove('btn-primary');

    allBtn.classList.add('text-[#64748B]');
    openBtn.classList.add('text-[#64748B]');
    closeBtn.classList.add('text-[#64748B]');

    const selected = document.getElementById(id);
    selected.classList.remove('text-[#64748B]');
    selected.classList.add('btn-primary');

    if(selected === allBtn ){
        cardContainer.classList.remove('hidden');
        openCardContainer.classList.add('hidden');
        closedCardContainer.classList.add('hidden');
        console.log("click1");
        cardCount.innerText = allCardCount;
    }
    else if (selected === openBtn){
        openCardContainer.classList.remove('hidden');
        cardContainer.classList.add('hidden');
        closedCardContainer.classList.add('hidden');
        console.log("click1");
         cardCount.innerText = openCardCount;
    }
    else{
        closedCardContainer.classList.remove('hidden');
        cardContainer.classList.add('hidden');
        openCardContainer.classList.add('hidden');
        console.log("click1");
         cardCount.innerText = closedCardCount;
    }
}

// fetch all cards
const loadCards = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then(res => res.json())
        .then(data => displayCards(data.data));
};



// demo object
// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

const loadCardDetails = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(details => displayCardDetails(details.data));
};


const displayCardDetails = (item) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
            
                        <h3 class="font-bold text-xl  text-[#1F2937]">${item.title}</h3>
                        <div class="mt-3 mb-7 space-x-3">
                            ${item.status === "open" ? `<span class="text-white font-medium text-[12px] bg-green-500 py-1 px-3 rounded-full">Opened</span>` : `<span class="text-white font-medium text-[12px] bg-red-200 py-1 px-3 rounded-full">Closed</span>` }
                            <span class="text-[12px] text-[#64748B]">.</span>
                            <span class="text-[12px] text-[#64748B]">Opened by ${item.assignee}</span>
                            <span class="text-[12px] text-[#64748B]">.</span>
                            <span class="text-[12px] text-[#64748B]">${item.updatedAt}</span>
                            
                            
                    
                        </div>

                        <div class="my-4">
                                ${item.labels[0] ? `<span class="text-[#EF4444] bg-red-200 py-1 px-3 rounded-full">${item.labels[0]}</span>` : ''}
                                ${item.labels[1] ? `<span class="text-[#D97706] bg-orange-200 py-1 px-3 rounded-full">${item.labels[1]}</span>` : ''}
                        </div>
                        <div>
                            <p class="text-[14px] text-[#64748B]">${item.description}</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl px-8 py-5 flex items-center gap-20 shadow-sm mt-6">
                            <div class="flex flex-col gap-1">
                                <span class="text-sm text-gray-400">Assignee:</span>
                                <span class="text-base font-semibold text-gray-800">${item.assignee}</span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="text-sm text-gray-400">Priority:</span>
                                <span class="bg-red-500 text-white text-xs font-bold  px-3 py-1 rounded-full">${item.priority}</span>
                            </div>
                        </div>
                        
            </div>
        `;
          document.getElementById('my_modal_5').showModal();             
                        

}
 



const displayCards = (items) => {
    const openCards = items.filter(item => item.status === "open");
    const closedCards = items.filter(item => item.status === "closed");
    cardContainer.innerHTML = "";
    items.forEach((item) => {
        // console.log(item);
        // check condition on priority for all tab 
        let priorityBg = '' ;
        let priorityColor = '';
        if(item.priority == "high"){
            priorityBg = 'bg-red-200';
            priorityColor =  'text-[#EF4444]';
        }
        else if(item.priority == "medium"){
            priorityBg = 'bg-orange-200';
            priorityColor =  'text-[#D97706]';
        }
        else{
            priorityBg = 'bg-gray-200';
            priorityColor =  'text-[#64748B]';
             
        }
        const card = document.createElement('div');
        card.innerHTML = `
             ${item.status === "open" ? `<div onclick="loadCardDetails(${item.id})" class="bg-white shadow-lg rounded-md py-4 px-4 space-y-4 border-t-7 border-green-500">` : `<div onclick="loadCardDetails(${item.id})" class="bg-white shadow-lg rounded-md py-4 px-4 space-y-4 border-t-7 border-purple-500">`}
                <div class="flex justify-between items-center">
                    ${item.status === "open" ? `<img src="assets/Open-Status.png" alt="">` : `<img src="assets/Closed- Status .png" alt="">` }
                    <div  class="rounded-full h-6 w-20 flex justify-center items-center font-medium text-[12px] ${priorityBg} ${priorityColor} ">${item.priority}</div>
                </div>

                <div class="space-y-4">
                    <h3 class="font-semibold  text-[#1F2937]">${item.title}</h3>
                    <p class="text-[14px] text-[#64748B]">${item.description}</p>
                    <div>
                        
                        ${item.labels[0] ? `<span class="text-[#EF4444] bg-red-200 py-1 px-3 rounded-full">${item.labels[0]}</span>` : ''}
                        ${item.labels[1] ? `<span class="text-[#D97706] bg-orange-200 py-1 px-3 rounded-full">${item.labels[1]}</span>` : ''}
                        
                    </div>
                </div>
                <div class="divider "></div>
                <div class="space-y-3">
                    
                    <p class="text-[#64748B]">#${item.id} by ${item.author}</p>
                    <p class="text-[#64748B]">${item.createdAt}</p>
                </div>
                        
            </div>
        `
        
        cardContainer.appendChild(card);
    });

        
    // loop through from open card array
    
    openCards.forEach(item => {

        // check condition on priority for open tab 
        let priorityBg = '' ;
        let priorityColor = '';
        if(item.priority == "high"){
            priorityBg = 'bg-red-200';
            priorityColor =  'text-[#EF4444]';
        }
        else if(item.priority == "medium"){
            priorityBg = 'bg-orange-200';
            priorityColor =  'text-[#D97706]';
        }
        else{
            priorityBg = 'bg-gray-200';
            priorityColor =  'text-[#64748B]';
             
        }
        const openCard = document.createElement('div');
        openCard.innerHTML = `
             ${item.status === "open" ? `<div class="bg-white shadow-lg rounded-md py-4 px-4 space-y-4 border-t-7 border-green-500">` : `<div class="bg-white shadow-lg rounded-md py-4 px-4 space-y-4 border-t-7 border-purple-500">`}
                <div class="flex justify-between items-center">
                    ${item.status === "open" ? `<img src="assets/Open-Status.png" alt="">` : `<img src="assets/Closed- Status .png" alt="">` }
                    <div  class="rounded-full h-6 w-20 flex justify-center items-center font-medium text-[12px] ${priorityBg} ${priorityColor} ">${item.priority}</div>
                </div>

                <div class="space-y-4">
                    <h3 class="font-semibold  text-[#1F2937]">${item.title}</h3>
                    <p class="text-[14px] text-[#64748B]">${item.description}</p>
                    <div>
                        
                        ${item.labels[0] ? `<span class="text-[#EF4444] bg-red-200 py-1 px-3 rounded-full">${item.labels[0]}</span>` : ''}
                        ${item.labels[1] ? `<span class="text-[#D97706] bg-orange-200 py-1 px-3 rounded-full">${item.labels[1]}</span>` : ''}
                        
                    </div>
                </div>
                <div class="divider "></div>
                <div class="space-y-3">
                    
                    <p class="text-[#64748B]">#${item.id} by ${item.author}</p>
                    <p class="text-[#64748B]">${item.createdAt}</p>
                </div>
                        
            </div>
        `
        
        openCardContainer.appendChild(openCard);
    });




    // loop through from closed card array
    
    closedCards.forEach(item => {

        // check condition on priority for closed tab 
        let priorityBg = '' ;
        let priorityColor = '';
        if(item.priority == "high"){
            priorityBg = 'bg-red-200';
            priorityColor =  'text-[#EF4444]';
        }
        else if(item.priority == "medium"){
            priorityBg = 'bg-orange-200';
            priorityColor =  'text-[#D97706]';
        }
        else{
            priorityBg = 'bg-gray-200';
            priorityColor =  'text-[#64748B]';
             
        }
        const closedCard = document.createElement('div');
        closedCard.innerHTML = `
             ${item.status === "open" ? `<div class="bg-white shadow-lg rounded-md py-4 px-4 space-y-4 border-t-7 border-green-500">` : `<div class="bg-white shadow-lg rounded-md py-4 px-4 space-y-4 border-t-7 border-purple-500">`}
                <div class="flex justify-between items-center">
                    ${item.status === "open" ? `<img src="assets/Open-Status.png" alt="">` : `<img src="assets/Closed- Status .png" alt="">` }
                    <div  class="rounded-full h-6 w-20 flex justify-center items-center font-medium text-[12px] ${priorityBg} ${priorityColor} ">${item.priority}</div>
                </div>

                <div class="space-y-4">
                    <h3 class="font-semibold  text-[#1F2937]">${item.title}</h3>
                    <p class="text-[14px] text-[#64748B]">${item.description}</p>
                    <div>
                        
                        ${item.labels[0] ? `<span class="text-[#EF4444] bg-red-200 py-1 px-3 rounded-full">${item.labels[0]}</span>` : ''}
                        ${item.labels[1] ? `<span class="text-[#D97706] bg-orange-200 py-1 px-3 rounded-full">${item.labels[1]}</span>` : ''}
                        
                    </div>
                </div>
                <div class="divider "></div>
                <div class="space-y-3">
                    
                    <p class="text-[#64748B]">#${item.id} by ${item.author}</p>
                    <p class="text-[#64748B]">${item.createdAt}</p>
                </div>
                        
            </div>
        `
        
        closedCardContainer.appendChild(closedCard);
    });



     allCardCount = cardContainer.children.length ;
     openCardCount = openCardContainer.children.length;
     closedCardCount = closedCardContainer.children.length;
    console.log(allCardCount);
    console.log(openCardCount);
    console.log(closedCardCount);



         
}

loadCards();







