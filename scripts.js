window.onload = function(){
	var container = document.getElementsByClassName("container");
	var stripe    = document.getElementsByClassName("stripe");
	var outstripe = document.getElementsByClassName("outstripe");
	var ghostbutton = document.getElementsByClassName("ghostbutton");
	var ghostbutton_back = document.getElementsByClassName("ghostbutton_back");
	var aboutme = document.getElementById("aboutme");
	var t = document.getElementById("t");
	var closeicon = document.getElementById("close");
	
	for(var i=0;i<container.length;i++){
	ghostbutton[i].addEventListener('click',function(){
		this.parentNode.style.marginLeft= "-90%";
		this.parentNode.nextSibling.nextSibling.style.marginLeft= "10%";
		this.style.display = "none";
		this.nextSibling.nextSibling.style.display = "block";
		});
	}
	
//	for(var n=0;n<container.length;n++){
//	container[n].addEventListener('mouseleave',function(){
//		this.children[0].style.marginLeft= "0";
//		this.children[1].style.marginLeft= "100%";
//		this.children[0].children[0].style.display = "block";
//		this.children[0].children[1].style.display = "none";
//		});
//	}
	
	for(var m=0;m<container.length;m++){
	ghostbutton_back[m].addEventListener('click',function(){
		this.parentNode.style.marginLeft= "0";
		this.parentNode.nextSibling.nextSibling.style.marginLeft= "100%";
		this.parentNode.children[0].style.display = "block";
		this.style.display = "none";
		});
	}
	aboutme.addEventListener('click',function(){
		t.style.display="block";
		});
	closeicon.addEventListener('click',function(){
		t.style.display="none";
		});
	
};
