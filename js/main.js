var siteNameInput = document.getElementById("bookMarkName")
var siteUrlInput = document.getElementById("bookMarkUrl")
const model =document.querySelector("#model")
const submitForm =document.querySelector('#submit-btn')
const openModel =document.querySelector(".sub-btn")
const closeModel =document.querySelector('.close')

const regexSiteName =/^\w{3,}(\s+\w+)*$/
const regexSiteUrl=/^https:\/\/[a-z]{1,20}.[a-z]{2,9}$/

var siteMark =[]
siteMark = JSON.parse(localStorage.getItem("bookmarks") ,siteMark) || []
display()
openModel.addEventListener('click' ,() =>{
  model.showModal();
})
closeModel.addEventListener('click',() =>{
  model.close();
 
})

submitForm.addEventListener('click' , ()=>{
  var isvalid =validateSiteValue()
  console.log( "the is valid" ,isvalid)
  if(isvalid){
    getSiteInfo()
    model.close();
  }
  else{
    model.showModal();
   
  }

})

function getSiteInfo(){
 
    site ={
      name:siteNameInput.value,
      url:siteUrlInput.value,
    };
    for(var i=0 ;i<siteMark.length ;i++){
      if(site.name ==siteMark[i].name){
        window.alert("The site name is already existes")
        clear()
        return;
      }
      else{
        siteMark.push(site)
        localStorage.setItem("bookmarks" , JSON.stringify(siteMark))
        console.log(siteMark)
       
      display()
      clear()
      }
      
    }
    
}


function clear (){
  siteNameInput.value =""
  siteUrlInput.value =""
    
}
function display(){
  cartona =" "
  for(var i=0 ;i<siteMark.length ;i++){
   cartona +=
`<tr class="mt-3 ">
        <td class=" pt-2"> 
            <span>${i+1}</span>
       </td>
       <td class=" pt-2">
            ${siteMark[i].name}
       </td>
       <td class=" pt-2">
           <button class="btn btn-secondary px-5 " onclick =" VisitSite(${i}) ">Visit</button>
       </td>
       <td class=" pt-2 ">
           <button class="btn btn-danger px-4  " onclick="deleteSite(${i})">Delete</button>
       </td>

      </tr>
`
  }
  document.getElementById('demo').innerHTML =cartona
}

function VisitSite( index){
window.open( siteMark[index].url ,"_blank")
}

function deleteSite(index){
siteMark.splice(index ,1)
localStorage.setItem("bookmarks" , JSON.stringify(siteMark))
display()
}

function existedSiteName(){

}

function validateSiteValue(){
  if(!(regexSiteName.test(siteNameInput.value)) || !(regexSiteUrl.test(siteUrlInput.value))){
    return false
  }
   
   return true
   }
