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

    if(selected === )
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






const displayCards = (items) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    items.forEach((item) => {
        console.log(item);
        // check condition on priority 
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
             ${item.status == "open" ? `<div class="bg-white shadow-lg rounded-md py-4 px-4 space-y-4 border-t-7 border-green-500">` : `<div class="bg-white shadow-lg rounded-md py-4 px-4 space-y-4 border-t-7 border-purple-500">`}
                <div class="flex justify-between items-center">
                    ${item.status == "open" ? `<img src="assets/Open-Status.png" alt="">` : `<img src="assets/Closed- Status .png" alt="">` }
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
    })
}
loadCards();