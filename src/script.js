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
let prevScrollPos = window.scrollY;
window.onscroll = function (e) {
  let currScrollPos = window.scrollY;
  nav.style.top = currScrollPos < prevScrollPos ? '0px' : '-50px';
  prevScrollPos = currScrollPos;
};

//Navigation bar smooth scrolling
document.querySelector('.nav-links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav_link')) {
    let id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
