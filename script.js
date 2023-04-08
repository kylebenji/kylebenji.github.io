/////////////////////////////////////
/////////Selectors//////////////

//General
const nav = document.querySelector('#navbar');
const welcomeSection = document.querySelector('#welcome-section');

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
