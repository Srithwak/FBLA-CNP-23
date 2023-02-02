function toggleIcon() {
   const icon = document.querySelector('i');
   const state = icon.getAttribute('data-state');
   if (state === 'closed') {
     icon.classList.remove('fa-bars');
     icon.classList.add('fa-times');
     icon.setAttribute('data-state', 'open');
   } else {
     icon.classList.remove('fa-times');
     icon.classList.add('fa-bars');
     icon.setAttribute('data-state', 'closed');
   }
 }

 function toggleNav() {
   document.body.classList.toggle("nav-open");
   toggleIcon();
 }