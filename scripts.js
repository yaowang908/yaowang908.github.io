window.onload = function(){
	var container = document.getElementsByClassName("container");
	var stripe    = document.getElementsByClassName("stripe");
	var outstripe = document.getElementsByClassName("outstripe");
	var ghostbutton = document.getElementsByClassName("ghostbutton");
	var ghostbutton_back = document.getElementsByClassName("ghostbutton_back");
	
	for(var i=0;i<container.length;i++){
	
	ghostbutton[i].addEventListener('click',function(){
		this.parentNode.style.marginLeft= "-90%";
		this.parentNode.nextSibling.nextSibling.style.marginLeft= "10%";
		this.style.display = "none";
		this.nextSibling.nextSibling.style.display = "block";
		});
	}
	for(var i=0;i<container.length;i++){
	container[i].addEventListener('mouseleave',function(){
		this.children[0].style.marginLeft= "0";
		this.children[1].style.marginLeft= "100%";
		this.children[0].children[0].style.display = "block";
		this.children[0].children[1].style.display = "none";
		});
	}
	for(var i=0;i<container.length;i++){
	ghostbutton_back[i].addEventListener('click',function(){
		this.parentNode.style.marginLeft= "0";
		this.parentNode.nextSibling.nextSibling.style.marginLeft= "100%";
		this.parentNode.children[0].style.display = "block";
		this.style.display = "none";
		});
	}
	};
