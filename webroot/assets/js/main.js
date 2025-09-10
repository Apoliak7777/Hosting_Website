/* Foxed on Scroll */
document.addEventListener("DOMContentLoaded", function(){
    
    window.addEventListener('scroll', function() {
         
      if (window.scrollY > 200) {
        document.getElementById('fixedR').classList.add('fixed-top');
        // add padding top to show content behind navbar
        navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = navbar_height + 'px';
      } else {
        document.getElementById('fixedR').classList.remove('fixed-top');
         // remove padding top from body
        document.body.style.paddingTop = '0';
      } 
    });
  }); 

/* Set Coupon Code Expires */
var countDownDate = new Date("December 25, 2022 00:00:00").getTime();
var x=setInterval(function(){var e=countDownDate-new Date().getTime();$("#sale-d").html(Math.floor(e/864e5)),$("#sale-h").html(Math.floor(e%864e5/36e5)),$("#sale-m").html(Math.floor(e%36e5/6e4)),$("#sale-s").html(Math.floor(e%6e4/1e3)),e<0&&(clearInterval(x),$(".sale-banner").remove())},1e3);$("#btnCode").click(function(){var e=$("<input>");$("body").append(e),e.val($("#btnCode span").text()).select(),document.execCommand("copy"),e.remove(),Swal.fire("Good job!","You clicked the button!","success"),Swal.fire({title:"Successful",text:"Coupon has been copied to clipboard!",icon:"success",button:"Exit"})});

/* Web Site Policies */
window.addEventListener("load",function(){window.wpcc.init({"colors":{"popup":{"background":"#1A1C1E","text":"#FFFFFF","border":"#1873D3"},"button":{"background":"#1873D3","text":"#FFFFFF"}},"corners":"small","transparency":"100","content":{"href":"hhtps://yoursite.com/legal/"},"position":"bottom-right"})});
