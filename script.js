const resources = [
    {
        title: "C++",
        description: "Learn the basics of programming with C++, Adel nasim",
        category: "Programming",
        platform: "Youtube",
        url: "https://youtube.com/playlist?list=PLCInYL3l2AajFAiw4s1U4QbGszcQ-rAb3&si=ykzEIPcXm-Ed1HQe"
    },
    {
        title: "C++",
        description: "Learn the basics of programming with C++, Elzero",
        category: "Programming",
        platform: "Youtube",
        url: "https://youtube.com/playlist?list=PLDoPjvoNmBAwy-rS6WKudwVeb_x63EzgS&si=i_WFv3_5r947y_Oq"
    },
    {
        title: "Programming fundamentals",
        description: "A comprehensive roadmap to learn programming from scratch.",
        category: "Programming",
        platform: "Programming advices",
        url: "https://programmingadvices.com/l/dashboard"
    },
    {
        title: "Data Structures and Algorithms",
        description: "Striver A2Z is a complete roadmap to master DSA & Algorithms, from basics to advanced problems, helping you excel in coding interviews.",
        category: "Programming",
        platform: "Take U forward",
        url: "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z"
    },
    {
        title: "ICPC Assiut Materials (CP Sheet)",
        description: "A curated list of competitive programming resources and problem sets to help you prepare for ICPC contests.",
        category: "Competitive Programming",
        platform: "google sheets",
        url: "https://docs.google.com/spreadsheets/d/11fKm_fgpxhnNM2ApQ09tUzOeC-W2VPIa/edit?usp=sharing&ouid=100232340501315286976&rtpof=true&sd=true"
    },
    {
        title: "competitive Programmer’s Handbook - Antti Laaksonen",
        description: "A comprehensive guide to competitive programming, covering essential algorithms and data structures.",
        category: "Competitive Programming",
        platform: "PDF",
        url: "https://drive.google.com/file/d/11SJ1IRe91cl0hsiBRxrI-kg_OQbGcBRd/view?usp=drive_link"
    },
    {
        title: "Podcast - Mohamed Al-Sharif",
        description: "Engineer Mohamed Al-Sharif shares tips, stories, and insights about engineering, tech, and carer growth in a simple and engaging way.",
        category: "Technology & Engineering",
        platform: "Youtube",
        url: "https://youtube.com/playlist?list=PLJYBTsbldfv98tQGoFchRd-IwsjLM3efz&si=-WjfdsT9prkrfgad"
    },

];

let currentCategory = 'All';
let searchText = '';

const form = document.getElementById("loginForm");
if (form) {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("message");

    const user = {
        username: "admin",
        password: "1234"
    };

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            showMessage("Please fill in all fields", "red");
            return;
        }

        if (username === user.username && password === user.password) {
            setTimeout(() => {
                window.location.href = "Home.html";
            }, 1000);
        } else {
            showMessage("Username or password is incorrect", "red");
        }
    });

    function showMessage(text, color) {
        message.textContent = text;
        message.style.color = color;
    }
}

const resourcesGrid = document.getElementById('resourcesGrid');
if (resourcesGrid) {
    function getCategories() {
        const cats = resources.map(r => r.category);
        return ['All', ...new Set(cats)];
    }

    function createButtons() {
        const container = document.getElementById('filterButtons');
        const categories = getCategories();
        
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.textContent = cat;
            btn.className = 'filter-btn' + (cat === 'All' ? ' active' : '');
            btn.onclick = () => filterByCategory(cat);
            container.appendChild(btn);
        });
    }

    function filterByCategory(category) {
        currentCategory = category;
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === category) {
                btn.classList.add('active');
            }
        });
        
        showResources();
    }

    function showResources() {
        const grid = document.getElementById('resourcesGrid');
        const empty = document.getElementById('emptyState');
        
        let filtered = resources;
        
        if (currentCategory !== 'All') {
            filtered = filtered.filter(r => r.category === currentCategory);
        }
        
        if (searchText) {
            filtered = filtered.filter(r => 
                r.title.toLowerCase().includes(searchText) ||
                r.description.toLowerCase().includes(searchText)
            );
        }
        
        grid.innerHTML = '';
        
        if (filtered.length === 0) {
            empty.style.display = 'block';
            return;
        }
        
        empty.style.display = 'none';
        
        filtered.forEach(resource => {
            const card = document.createElement('div');
            card.className = 'resource-card';
            card.innerHTML = `
                <div class="card-content">
                    <span class="category-tag">${resource.category}</span>
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <span class="platform">${resource.platform}</span>
                    <a href="${resource.url}" target="_blank">Learn More →</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchText = e.target.value.toLowerCase();
            showResources();
        });
    }

    createButtons();
    showResources();
}