

var submitbtn = document.getElementById("submitTask");
var updatebtn = document.getElementById("updateTask");
var priority = document.getElementById("priority");
var Status = document.getElementById("status");
// for pagebtn start
var home = document.getElementById("home");
var addActivity = document.getElementById("addActivity");
var showActivity = document.getElementById("showActivity");
var calender = document.getElementById("calender");

// for pagebtn end
localData=""


// for pages start 
var secondndpage = document.getElementById("2ndpage");
var thirdpage = document.getElementById("3rdpage");
var forthpage = document.getElementById("4thpage")
forthpage.style.display = "none"
secondndpage.style.display = "none"
thirdpage.style.display = 'none'
// for pages start end


// for change display start
home.addEventListener("click", (e) => {
  e.preventDefault()
  secondndpage.style.display = "none"
  thirdpage.style.display = 'none'
  forthpage.style.display = "none"
})
addActivity.addEventListener("click", (e) => {
  e.preventDefault()
  secondndpage.style.display = ""
  thirdpage.style.display = 'none'
  forthpage.style.display = "none"

})

showActivity.addEventListener("click", (e) => {
  e.preventDefault()
  // for showing data
  document.getElementById("form1").style.display = "none"
  secondndpage.style.display = "none"
  thirdpage.style.display = ''
  forthpage.style.display = "none"
  showallData()
})
calender.addEventListener("click", () => {

  secondndpage.style.display = "none"
  thirdpage.style.display = 'none'
  forthpage.style.display = ""
})


// for change display end
var localData = JSON.parse(localStorage.getItem("data"))
updatebtn.style.display = "none"
var activity_DetailsArray = [
]
document.getElementById("submitTask").addEventListener("click", (e) => {
  e.preventDefault();
  var activity_Details = {}
  activity_Details.task = (document.getElementById("task").value);
  for (var i = 1; i < Status.options.length; i++) {
    if (Status[i].selected == true) {
      activity_Details.Status = Status[i].value
    }
  }
  for (var i = 1; i < priority.options.length; i++) {
    if (priority[i].selected == true) {
      activity_Details.priority = (priority[i].value)
    }
  }
  activity_Details.date = (document.getElementById("date").value)


  if (localData) {
    localData.push(activity_Details)
    localStorage.setItem('data', JSON.stringify(localData))
    clearInput()
  }
  else {
    activity_DetailsArray.push(activity_Details)
    localStorage.setItem('data', JSON.stringify(activity_DetailsArray))
    clearInput()
  }

  showingActivity_data()
})
var datefilter = new Date()
// calling table
var tbody = document.getElementById("tbody")
function showingActivity_data() {
  var row = ''
  localData.map((data, index) => {
    if ((data.date).slice(8, 10) == datefilter.getDate()) {

      row += `
              <tr>
                   <td>${data.task}</td>
                   <td>${data.Status}</td>
                   <td>${data.priority}</td>
                   <td>${data.date}</td>
                   <td onclick="editData(${index})">edit</td>
                   <td onclick="deleteData(${index})">delete</td>
              </tr>
              `  }
  })
  tbody.innerHTML = row
}
// for delecting row
function deleteData(index) {
  localData.splice(index, 1)
  localStorage.setItem('data', JSON.stringify(localData))

  showingActivity_data()
  showallData()
}
var indexno
function editData(index) {
  indexno = index
  updatebtn.style.display = ''
  submitbtn.style.display = "none"
  document.getElementById("task").value = localData[index].task
  // document.getElementById("priority").options
  document.getElementById("date").value = localData[index].date
}
updatebtn.addEventListener("click", (e) => {
  e.preventDefault()
  localData[indexno].task = document.getElementById("task").value
  for (var i = 1; i < Status.options.length; i++) {
    if (Status[i].selected == true) {
      localData[indexno].Status = (Status[i].value)
    }
  }
  for (var i = 1; i < priority.options.length; i++) {
    if (priority[i].selected == true) {
      localData[indexno].priority = (priority[i].value)
    }
  }
  localData[indexno].date = document.getElementById("date").value
  localStorage.setItem('data', JSON.stringify(localData))
  updatebtn.style.display = 'none'
  submitbtn.style.display = ''
  showingActivity_data()

  clearInput()
})
//   for refresh value
function clearInput() {
  document.getElementById("task").value = null
  //  plese refress he select box
  document.getElementById("date").value = null
}
// showing data in all data show
function showallData() {
  var tbody1 = document.getElementById("tbody1")
  var row = ''
  localData.map((data, index) => {
    row += `<tr>
                <td>${data.task}</td>
                <td>${data.Status}</td>
                <td>${data.priority}</td>
                <td>${data.date}</td>
                <td onclick="editData1(${index})">edit</td>
                <td onclick="deleteData(${index})">delete</td>
              </tr>`
  })
  tbody1.innerHTML = row
}
var indexno1;
function editData1(index) {
  indexno1 = index
  document.getElementById("form1").style.display = ""
  document.getElementById("task1").value = localData[index].task
  // document.getElementById("priority").options
  document.getElementById("date1").value = localData[index].date

}
var updatebtn1 = document.getElementById("updateTask1")
updatebtn1.addEventListener("click", (e) => {
  e.preventDefault()
  localData[indexno1].task = document.getElementById("task1").value
  for (var i = 1; i < Status.options.length; i++) {
    if (Status[i].selected == true) {
      localData[indexno1].Status = (Status[i].value)
    }
  }
  for (var i = 1; i < priority.options.length; i++) {
    if (priority1[i].selected == true) {
      localData[indexno1].priority = (priority1[i].value)
    }
  }
  localData[indexno1].date = document.getElementById("date1").value
  localStorage.setItem('data', JSON.stringify(localData))

  updatebtn.style.display = 'none'

  document.getElementById("form1").style.display = "none"
  showingActivity_data()
  showallData()

  clearInput()
})
showingActivity_data()
document.getElementById("form1").style.display = "none"



// for calender

var Eventarr = []
var id = 1


localData.map(data => {
  var we = {}
  id += 1 * 2.2
  we.id = id
  we.name = data.task
  we.date = data.date
  if (data.priority == "high") {
    we.color = "red"
  }
  else if (data.priority == "medium") {
    we.color = "orange"

  }
  else if (data.priority == "low") {
    we.color = "green"
  }
  we.type = "hpliday"
  we.description = `priority:- ${data.priority} <br/>    status:- ${data.Status}`
  Eventarr.push(we)
})



$(document).ready(function () {
  $('#calendar').evoCalendar({
    calendarEvents: Eventarr

  })
})
