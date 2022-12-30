//Dom Elements
let notesData =JSON.parse(localStorage.getItem("myNotes"))||[]
let newNotesButton = document.querySelector(".notesNew")
let notesModal = document.querySelector(".notesModal")
let notesForm = document.querySelector(".notesForm")
let closeForm = document.querySelector(".closeForm")
let notesList = document.querySelector(".notesList")





//open model
newNotesButton.addEventListener('click', function(){
    notesModal.classList.add("active")
})

//Hide model
closeForm.addEventListener('click',function(){
    notesModal.classList.remove("active")
})

//Handle Notes form
notesForm.addEventListener("submit",function(e){
        e.preventDefault()
        //handle notes data
        let title= e.target.noteTitle.value
        let content= e.target.noteEntry.value
        let objNote=createNoteObj(title,content)
        notesData.push(objNote)
        localStorage.setItem("myNotes",JSON.stringify(notesData))

        //populate function
        populateNote(notesData)
        notesModal.classList.remove("active")
        e.target.reset()
        console.log(notesData);
})

function populateNote(notesData){
  let allNotes=  notesData.map(note=>{
        return `
        <div class="notesItem">
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <div class="notesMeta">
          <button class="notesDelete" data-id="${note.id}"> <img src="/assets/trash.svg" height="12" alt=""> Delete</button>
        </div>
        </div> `
    }).join("")

    notesList.innerHTML=allNotes   
   
//console.log(allNotes)
}

populateNote(notesData)
//create objNote function
function createNoteObj(title,content){
    let newNote={
        title:title,
        content:content,
        id:crypto.randomUUID()
    }
    return newNote

}

//Delete note 
document.addEventListener("click",function(e){
    if(e.target.classList.contains("notesDelete")){
        let id = e.target.dataset.id

        let shouldDelete=confirm("Are you sure to confirm delete")
        if(shouldDelete){
            notesData=notesData.filter(function(note){
                return note.id!==id
                         
        })
        localStorage.setItem("myNotes",JSON.stringify(notesData))
        populateNote(notesData)
        console.log(id);
    }
}
})