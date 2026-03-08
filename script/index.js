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
        const card = document.createElement('div');
        card.innerHTML = `
            <div class="bg-white shadow-lg rounded-md py-4 px-4 space-y-4">
                <div class="flex justify-between items-center">
                    <img src="assets/Open-Status.png" alt="">
                    <div class="rounded-full h-6 w-20 flex justify-center items-center bg-red-200 font-medium text-[12px] text-[#EF4444]">HIGH</div>
                </div>

                <div class="space-y-4">
                    <h3 class="font-semibold  text-[#1F2937]">Fix navigation menu on mobile devices</h3>
                    <p class="text-[14px] text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices...</p>
                    <div>
                        <span class="text-[#EF4444] bg-red-200 py-1 px-3 rounded-full">BUG</span>
                        <span class="text-[#D97706] bg-orange-200 py-1 px-3 rounded-full">HELP WANTED</span>
                    </div>
                </div>
                <div class="divider "></div>
                <div class="space-y-3">
                    <p class="text-[#64748B]">#1 by john_doe</p>
                    <p class="text-[#64748B]">1/15/2024</p>
                </div>
                        
            </div>
        `
    })
}
loadCards();