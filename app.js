// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  //linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
    linksContainer.style.backgroundColor = "transparent";
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    console.log("helo");

    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});
// calculate heights

//MENU ////////////////////////////////////////////////////////////////

const menu = [
  {
    id: 1,
    title: "Courtney Smith",
    category: "Accessories",
    price: 12.99,
    img: "accessories/courtney-smith-2bLdOEnf1i8-unsplash.jpg",
    
  },
  {
    id: 2,
    title: "Content Pixie",
    category: "Bags",
    price: 13.00,
    img: "bags/content-pixie-ZB4eQcNqVUs-unsplash.jpg",
    
  },
  {
    id: 3,
    title: "Charles Deluvio",
    category: "Hats",
    price: 65.98,
    img: "hats/charles-deluvio-AQRp2NH-O8k-unsplash.jpg",
    
  },
  {
    id: 4,
    title: "Jocelyn Morales",
    category: "Accessories",
    price: 20.00,
    img: "accessories/jocelyn-morales-Mv7kokwzIMw-unsplash.jpg",
   
  },
  {
    id: 5,
    title: "Laura Chouette",
    category: "Bags",
    price: 21.55,
    img: "bags/laura-chouette-b7kMR1VYAJc-unsplash.jpg",
    
  },
  {
    id: 6,
    title: "Sabina Surzu",
    category: "Hats",
    price: 13.44,
    img: "hats/sabina-sturzu-VwK5_7Gpnpw-unsplash.jpg",
   
  },
  {
    id: 7,
    title: "Laura- Chouette",
    category: "Accessories",
    price: 8.00,
    img: "accessories/laura-chouette-U0aEQNMYcAs-unsplash.jpg",
   
  },
  {
    id: 8,
    title: "Mink Mingle",
    category: "Bags",
    price: 12.51,
    img: "bags/mink-mingle-zGmTRL2zH-s-unsplash.jpg",
   
  },
  {
    id: 9,
    title: "Taylor Brandon",
    category: "Hats",
    price: 19.90,
    img: "hats/taylor-brandon-CNJNvwvhnMc-unsplash.jpg",
   
  },
  
];
// get parent element
const sectionCenter = document.querySelector(".card-container");
const btnContainer = document.querySelector(".container-shop");
// display all items when page loads
window.addEventListener("DOMContentLoaded", function () {
  diplayMenuItems(menu);
  displayMenuButtons();
 
});

function diplayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    // console.log(item);

    return `<article class="menu-item">
      <a href="#" class="product-link"><img class="img" src="${item.img}" alt="${item.title}" style="width:100%; height:33vh"></a>
      
      <div class="product-title">
        <h4>${item.title}</h4>
        <span class="price">$${item.price}</span>
      </div>
    </article>`;

  });
  displayMenu = displayMenu.join("");
  //console.log(displayMenu);

  sectionCenter.innerHTML = displayMenu;
}
function displayMenuButtons() {
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
         
      }
      return values;
     
    },
    ["All"]
    
  );
  
  const categoryBtns = categories
    .map(function (category) {
      return `<button type="button" class="filter-btn" data-id=${category}>
          ${category}
        </button>`;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  const filterBtns = btnContainer.querySelectorAll(".filter-btn");
  
let shopButton=document.getElementById('shop')


  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // console.log(e.currentTarget.dataset);
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(function (menuItem) {
        // console.log(menuItem.category);
        if (menuItem.category === category) {
          return menuItem;
          
        }
      
    //articalCard.style.opacity ="1";
      });
      if (category === "All") {
        shopButton.innerText =category
        diplayMenuItems(menu);
        } else {
        diplayMenuItems(menuCategory);
        shopButton.innerText =category
              
      }
    
  });
  
})
}

