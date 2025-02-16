import { setupMenuButton, createNavigation } from './menu.js';
import { populateFooterWithDates } from './footer.js';
import { saveCalorieTargetToLocalStorage } from './calorie-calculator.js';

setupMenuButton();
populateFooterWithDates();
const navigationElement = document.querySelector("#animate-me");
navigationElement.innerHTML = createNavigation("home");

const goalElement = document.querySelector("#goal");
const weightElement = document.querySelector("#weight");
const caloriesElement = document.querySelector("#calories");
let weightGoal = "weightLoss";
let weight = 160;
populateGoalElement();

function populateGoalElement()
{
    const form = document.createElement("form");
    form.id = "calculate-goal";

    form.append(createInput("weightLoss","Weight Loss", true));
    form.append(createInput("maintenance","Maintenance", false));
    form.append(createInput("weightGain","Weight Gain", false));

    const button = document.createElement("button");
    button.id = "submit-weight-goal";
    button.textContent = "Next";

    button.setAttribute("type", "button");
    form.append(button);
    button.addEventListener("click", () => 
    {
        populateWeightElement();
        const selectedGoal = document.querySelector('input[name="calculateGoal"]:checked');
        if (selectedGoal) {
            weightGoal = selectedGoal.value;
            console.log("Selected goal:", selectedGoal.value);  // Log the selected value (e.g., "weightLoss")
            // You can now use selectedGoal.value for further processing
        } else {
            console.log("No goal selected");
        }

    });    
    goalElement.appendChild(form);   
}
function createInput(value, label, checked)
{
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "calculateGoal");
    input.setAttribute("value", value);
    if (checked)
        input.setAttribute("checked", "checked");
    input.setAttribute("required", "required");
    const labelElement = document.createElement("label");
    labelElement.textContent = label;
    
    // Append the input to the label
    labelElement.prepend(input);
    return labelElement;
}
function populateWeightElement()
{
    const form = document.createElement("form");
    form.id = "calculate-weight";
    const label = document.createElement("label");
    label.textContent = "What is your weight?";
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("name", "weight");
    input.setAttribute("id", "weight-entered");
    input.setAttribute("required", "required");
    label.appendChild(input);


    const button = document.createElement("button");
    button.id = "submit-weight";
    button.setAttribute("type", "button");
    button.textContent = "Calculate";

    form.append(label);
    form.append(button);
    button.addEventListener("click", () => 
    {
        //in case they change the selection
        const selectedGoal = document.querySelector('input[name="calculateGoal"]:checked');
        if (selectedGoal) {
            weightGoal = selectedGoal.value;
            console.log("Selected goal:", selectedGoal.value);  // Log the selected value (e.g., "weightLoss")
            // You can now use selectedGoal.value for further processing
        }

        weight = document.getElementById("weight-entered").value; 
        if (!weight)
            console.log("enter a weight");
        //TODO Log the error for the user
        else
        {
            
            populateCalorieGoalElement();
        }
    });    
    weightElement.replaceChildren(form);
}
function populateCalorieGoalElement()
{
    let calorieGoal = 1800;
    const baseline = weight * 11
    const dailyNeeds = baseline + 400;
    
    if (weightGoal == "weightLoss")
    {
        calorieGoal = dailyNeeds - 750;
        if (calorieGoal < 1200)
            calorieGoal = 1200;
        //set it
    }
    else if (weightGoal == "maintenance")
    {
        calorieGoal = dailyNeeds;
        if (calorieGoal < 1200)
            calorieGoal = 1200;
    }
    else if (weightGoal == "weightGain")
    {
        calorieGoal = dailyNeeds + 900;
        if (calorieGoal < 1200)
            calorieGoal = 1200;
    }
    const p = document.createElement("p");
    p.textContent = `Your calorie goal should be ${calorieGoal}`;
    caloriesElement.replaceChildren(p);
    saveCalorieTargetToLocalStorage(calorieGoal);
}

/*
A. Take your current body weight in pounds and multiply that number by 11 to calculate your baseline calories.

B. Then, add 400 to your baseline calories to equal your daily caloric needs.

C. And then, subtract 750 from your caloric needs – this equals your calorie target.

If you wanted to maintain weight, use this equation:

Multiply your body weight by 11 and add 400 calories.

If you wanted to gain weight, use this:

Multiply your body weight by 11 and add 900 calories.

How to factor in activity level
*/