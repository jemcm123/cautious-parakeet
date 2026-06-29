function toggleStyle() {
    const element = document.getElementById("mainStyleSheet");
    let file = element.getAttribute("href");
    if(file === "CSS-files/DayBloom.css"){
		file = "CSS-files/FarmersFight.css";	
	}
	else {
		file = "CSS-files/DayBloom.css";
	}
    element.setAttribute("href", file);
    localStorage.setItem("style", file);
}
window.onload = function(){
    localStorage.setItem("style", "CSS-files/DayBloom.css");
    let file = localStorage.getItem("style");
    const element = document.getElementById("mainStyleSheet");
    element.setAttribute("href", file);
}