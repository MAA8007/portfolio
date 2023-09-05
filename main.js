const custom_cursor = document.getElementById('cursor');
const pointer = document.getElementById('pointer');

const animateCursor = (event, interacting, interactable) => {
  let cursorX = `calc(${event.clientX}px - 1.125rem)`,
      cursorY = `calc(${event.clientY}px - 1.125rem)`;
  
  let pointerX = `calc(${event.clientX}px - 0.25rem)`,
      pointerY = `calc(${event.clientY}px - 0.25rem)`;
  
  pointer.style.transform = `translate(${pointerX}, ${pointerY})`;
  
  const dimensions = interacting ? interactable.getBoundingClientRect() : null;
  const radius = interacting ? '0px' : '50%';
  
  if (interacting) {
    cursorX = (dimensions.x - 2) + 'px';
    cursorY = (dimensions.y - 2) + 'px';
  };
  
  const cursor_keyframes = {
    transform: `translate(${cursorX}, ${cursorY})`,
    width: interacting ? `${dimensions.width}px` : '2rem',
    height: interacting ? `${dimensions.height}px` : '2rem',
    borderRadius: radius,
  };
  
  custom_cursor.animate(cursor_keyframes, { 
    duration: 400, 
    fill: 'forwards' 
  });
};

window.onmousemove = (event) => {
  const interactable = event.target.closest('.interactable'),
        interacting = (interactable !== null);
  
  animateCursor(event, interacting, interactable);
};

window.onmousemove = (event) => {
  const interactable = event.target.closest('.interactable'),
        interacting = (interactable !== null);

  // Check if the cursor is hovering over a nav-link
  if (event.target.closest('.nav-link')) {
    custom_cursor.style.opacity = 0;
    pointer.style.opacity = 0;
  } else {
    custom_cursor.style.opacity = 1;
    pointer.style.opacity = 1;
  }

  animateCursor(event, interacting, interactable);
};


function toggleDescription(id) {
  var element = document.getElementById(id);
  if(element.style.display === "none" || element.style.display === "") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filter-button");
  const projects = document.querySelectorAll(".project");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      projects.forEach(function (project) {
        const category = project.getAttribute("data-category");
        
        if (filter === "all" || category === filter) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      });
    });
  });
});


// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');

// Add click event listeners to each navigation link
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    // Prevent default link behavior
    event.preventDefault();

    // Get the target section's ID from the link's href attribute
    const targetId = link.getAttribute('href');

    // Scroll to the target section
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});
