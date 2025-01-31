const courses = [
    {
        id: 0,
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        id: 1,
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        id: 2,
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        id: 3,
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        id: 4,
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        id: 5,
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function getClassTemplate(classInfo)
{
    let classTaken="";
    if (classInfo.completed)
        classTaken = "class-taken";
    else
        classTaken = "class-not-taken";
    return `<button class="button open-button ${classTaken}" id=${classInfo.id}>${classInfo.subject} ${classInfo.number}</button>`;

}
function getClassesHtml(classSubject)
{
    const classElement = document.querySelector(".classList");    
    const classCreditElement = document.querySelector(".classCredits");
    if (classSubject == "ALL")
    {
        const classHtml = courses.map(
            (course) => getClassTemplate(course)
        );
        classElement.innerHTML = classHtml.join("");
        let total=0;
        const credits = courses.reduce(
            (total, course) => total + Number(course.credits),0
        );
        classCreditElement.innerHTML= `Total Credits: ${credits}`;
        //createClassCourseDialogs(courses);
    }
    else
    {
        const filteredClasses = courses.filter( 
            (course) =>course.subject == classSubject
        );
        const classHtml = filteredClasses
        .map(
            (course) => getClassTemplate(course));
        classElement.innerHTML = classHtml.join("");
        let total=0;
        const credits = filteredClasses.reduce(
            (total, course) => total + Number(course.credits),0
        );
        classCreditElement.innerHTML= `Total Credits: ${credits}`;
        //createClassCourseDialogs(credits);
    }
}

const allCoursesLink = document.getElementById("all");
const cseCoursesLink = document.getElementById("cse");
const wddCoursesLink = document.getElementById("wdd");
const allCourseLinks = [allCoursesLink, cseCoursesLink, wddCoursesLink];

function removeAllActiveCourse()
{
    allCourseLinks.map(
        (element) => element.classList.remove("active")
    );
}
allCoursesLink.addEventListener('click',() => 
{
    getClassesHtml("ALL");
    removeAllActiveCourse();
    allCoursesLink.classList.add("active");
});
cseCoursesLink.addEventListener('click',() => 
    {
        getClassesHtml("CSE");
        removeAllActiveCourse();
        cseCoursesLink.classList.add("active");
    });
wddCoursesLink.addEventListener('click',() => 
{
    getClassesHtml("WDD");
    removeAllActiveCourse();
    wddCoursesLink.classList.add("active");
});    

getClassesHtml("ALL");
allCoursesLink.classList.add("active");

/*courses*/
const modal = document.querySelector("#modal");
/* this is the id on the dialog*/
const openModal = document.querySelectorAll(".open-button");
/* this is the other button*/
// const closeModal = document.querySelector(".close-button");
/* this is the class on the close button in the dialog*/

function getClassCourseCardHtml(classInfo){
    const technologyString = classInfo.technology.map(
        (tech) => tech
    );
    return `<h2>${classInfo.subject} ${classInfo.number}</h2>
    <p><span class="highlight">${classInfo.title}</span></p>
    <p><span class="highlight">Credits:</span> ${classInfo.credits}</p>
    <p>${classInfo.description}</p>    
    <p><span class="highlight">Technologies:</span> ${technologyString.join(", ")}</p>
    <button class="close-button">X</button>`;
    
}
const dialogContainer = document.querySelector(".dialogContainer");
// modal.innerHTML = getClassCourseCardHtml(courses[0]);
openModal.forEach( (openButton) => {
    openButton.addEventListener("click", (event) => {
  const clickedButtonId = event.target.id;
  const dialogElement = document.createElement("dialog");
  dialogElement.innerHTML = getClassCourseCardHtml(courses[clickedButtonId]);
  dialogContainer.appendChild(dialogElement);
  const closeButton = dialogElement.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    dialogElement.close();
    dialogElement.remove();
  });

  dialogElement.showModal();
});
});


