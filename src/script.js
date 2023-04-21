/////////////////////////////////////
/////////Selectors//////////////

//General
const nav = document.querySelector('#navbar');
const welcomeSection = document.querySelector('#welcome-section');

//Projects
const projectContainer = document.querySelector('#projects');
const projectTabs = document.querySelectorAll('.project_content_container');
const projectButtons = document.querySelectorAll('.project_button');

//////////////////////////
///////Page behavior//////
//sticky nav bar
const welcomeObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const obsCallback = function (entries, observer) {
  const entry = entries[0];
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else nav.classList.add('sticky');
};

const welcomeObserver = new IntersectionObserver(
  obsCallback,
  welcomeObsOptions
);
welcomeObserver.observe(welcomeSection);

//Navigation bar smooth scrolling
document.querySelector('.nav-links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav_link')) {
    let id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
