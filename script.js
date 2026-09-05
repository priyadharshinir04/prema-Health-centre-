// Initialize animation library and page startup behavior.
AOS.init({duration:700,once:true,easing:"ease-out-cubic",offset:60});
window.addEventListener("load",function(){setTimeout(function(){document.getElementById("loader").classList.add("hidden");},700);});

// Update scroll progress bar, nav state, and back-to-top button visibility.
window.addEventListener("scroll",function(){
var s=window.scrollY,d=document.documentElement.scrollHeight-window.innerHeight;
document.getElementById("scroll-progress").style.width=(d>0?(s/d)*100:0)+"%";
document.getElementById("navbar").classList.toggle("scrolled",s>80);
document.getElementById("back-top").classList.toggle("visible",s>400);
updateNav();
});

// Highlight the active menu item based on the current section in view.
function updateNav(){
var secs=["hero","problems","techniques","doctor","why","process","testimonials","faq","contact"];
var links=document.querySelectorAll(".nav-links a");
var y=window.scrollY+120;var cur="hero";
secs.forEach(function(id){var el=document.getElementById(id);if(el&&el.offsetTop<=y)cur=id;});
links.forEach(function(l){l.classList.toggle("active",l.getAttribute("href")==="#"+cur);});
}
document.getElementById("navtoggle").addEventListener("click",function(){document.getElementById("mobmenu").classList.add("open");document.body.style.overflow="hidden";});
document.getElementById("mobclose").addEventListener("click",closeM);
function closeM(){document.getElementById("mobmenu").classList.remove("open");document.body.style.overflow="";}
// Animate stats numbers when the counters section enters the viewport.
function animCnt(el){var t=parseInt(el.getAttribute("data-target")),step=t/110,cur=0,ti=setInterval(function(){cur+=step;if(cur>=t){cur=t;clearInterval(ti);}el.textContent=Math.floor(cur);},16);}
document.querySelectorAll(".cv").forEach(animCnt);
var obs=false;
new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting&&!obs){obs=true;document.querySelectorAll(".cnt").forEach(animCnt);}});},{threshold:.3}).observe(document.getElementById("counters"));

// FAQ accordion behavior.
document.querySelectorAll(".faq-btn").forEach(function(btn){
btn.addEventListener("click",function(){
var item=this.closest(".faq-item");var open=item.classList.contains("open");
document.querySelectorAll(".faq-item").forEach(function(i){i.classList.remove("open");i.querySelector(".faq-btn").setAttribute("aria-expanded","false");});
if(!open){item.classList.add("open");this.setAttribute("aria-expanded","true");}
});
});

// Testimonial slider controls.
var track=document.getElementById("ttrack");
var cards=track?track.querySelectorAll(".t-card"):[];
var cur=0,spv=3,total=cards.length,tmr;
function getSpv(){return window.innerWidth<=768?1:window.innerWidth<=1024?2:3;}
function upd(i){spv=getSpv();var max=total-spv;if(i<0)i=0;if(i>max)i=max;cur=i;
var w=cards[0]?cards[0].offsetWidth+24:0;
track.style.transform="translateX(-"+(cur*w)+"px)";
document.querySelectorAll(".s-dot").forEach(function(d,idx){d.classList.toggle("active",idx===cur);});
}
function mkDots(){spv=getSpv();var max=total-spv;var c=document.getElementById("sdots");if(!c)return;c.innerHTML="";
for(var i=0;i<=max;i++){(function(idx){var d=document.createElement("div");d.className="s-dot"+(idx===0?" active":"");d.addEventListener("click",function(){upd(idx);rst();});c.appendChild(d);})(i);}
}
function rst(){clearInterval(tmr);tmr=setInterval(function(){spv=getSpv();var max=total-spv;cur=cur>=max?0:cur+1;upd(cur);},4500);}
var pb=document.getElementById("pbtn"),nb=document.getElementById("nbtn");
if(pb)pb.addEventListener("click",function(){upd(cur-1);rst();});
if(nb)nb.addEventListener("click",function(){upd(cur+1);rst();});
window.addEventListener("resize",function(){mkDots();upd(0);});
mkDots();upd(0);rst();
document.querySelectorAll("a[href^=\"#\"]").forEach(function(a){
a.addEventListener("click",function(e){var t=document.querySelector(this.getAttribute("href"));if(t){e.preventDefault();window.scrollTo({top:t.offsetTop-80,behavior:"smooth"});}});
});
