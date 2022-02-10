import React from "react";

var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}



export default function TempéramentCheckBox(){
    return(
        <form>
            <div class="multiselect">
                <div class="selectBox" onclick="showCheckboxes()">
                <select>
                    <option>Select an option</option>
                </select>
                <div class="overSelect"></div>
                </div>
                <div id="checkboxes">
                <label for="one">
                    <input type="checkbox" id="one" />First checkbox</label>
                <label for="two">
                    <input type="checkbox" id="two" />Second checkbox</label>
                <label for="three">
                    <input type="checkbox" id="three" />Third checkbox</label>
                </div>
            </div>
        </form>
    )
}