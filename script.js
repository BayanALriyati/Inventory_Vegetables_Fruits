window.onload = function(){
    document.getElementById("download").addEventListener("click" , () =>{
        const table =this.document.getElementById("table");
        console.log(table);
        console.log(window);
        var opt = {
            margin: 1,
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(table).set(opt).save();

    })
}
// validate form inputs before submiting data (التحقق من صحة مدخلات النموذج قبل إرسال البيانات)
function validateForm() {
   var name= document.getElementById("name").value ;
   var required= document.getElementById("required").value ;
   var actual= document.getElementById("actual").value ;

   if (name == ""){
       alert ("الاسم فارغ !!!");
       return false ;
   }

   if (required == ""){
       alert ("!!! يجب الا يكون هذا الحقل فارغ");
       return false ;
   }
   else if (required < 0){
      alert ("!!! يجب الا يكون هذا الحقل اقل من الصفر");
      return false ;
   }

   if (actual == ""){
    alert ("!!! يجب الا يكون هذا الحقل فارغ");
    return false ;
   }
   else if (actual < 0){
      alert ("!!! يجب الا يكون هذا الحقل اقل من الصفر");
      return false ;
   }
   return true ;
}

//  function to show data from local Storage (وظيفة لإظهار البيانات من التخزين المحلي)

function showData(){
    var allList ; 
    if(localStorage.getItem("allList") == null){
        allList = [] ;
    }
    else{
        allList = JSON.parse(localStorage.getItem("allList"));
    }

    var html = "" ;

    allList.forEach(function(element , index ){
        html += "<tr>" ;
        html += '<td><button onclick="deleteData('+index+')"class="btn btn-danger">حذف</button><button onclick="updateData('+index+')"class="btn btn-success m-2">تعديل</button></td>' ;  
        html += "<td>" + element.actual + "</td>" ;
        html += "<td>" + element.name + "</td>" ;
        html += "<td>" + element.required + "</td>" ; 
        html += "</tr>" ;
    });

    document.querySelector("#table tbody").innerHTML = html ; 
}

// loads Alldata from local Storage when document or page loaded (يقوم بتحميل جميع البيانات من التخزين المحلي عند تحميل المستند أو الصفحة)
document.onload = showData();
 
// function to add data to local Storage

function AddData(){
   if (validateForm() == true){ 
    var name= document.getElementById("name").value ;
    var required= document.getElementById("required").value ;
    var actual= document.getElementById("actual").value ;

    var allList ; 
    if(localStorage.getItem("allList") == null){
        allList = [] ;
    }
    else{
        allList = JSON.parse(localStorage.getItem("allList"));
    }

    allList.push({
         name : name , 
         required : required ,
         actual : actual ,
    });

    localStorage.setItem("allList" , JSON.stringify (allList)) ;
    
    showData();

    document.getElementById("name").value = "" ;
    document.getElementById("required").value = "" ;
    document.getElementById("actual").value = "" ;
   }
}

// function to delete data from local Storage

function deleteData(index){
 
     var allList ; 
     if(localStorage.getItem("allList") == null){
         allList = [] ;
     }
     else{
         allList = JSON.parse(localStorage.getItem("allList"));
     }

     allList.splice(index , 1) ;
     localStorage.setItem("allList" , JSON.stringify (allList)) ;
     showData();
}

// function to update/Edit data in local Storage

function updateData(index){
    // submit button will hide and update buttopn will show for updating of data in local Storage (سيتم إخفاء زر الإرسال وسيظهر زر التحديث لتحديث البيانات في وحدة التخزين المحلية)

    document.getElementById("submit").style.display = "none" ;
    document.getElementById("Update").style.display = "block" ;

    var allList ; 
     if(localStorage.getItem("allList") == null){
         allList = [] ;
     }
     else{
         allList = JSON.parse(localStorage.getItem("allList"));
     }

     document.getElementById("name").value = allList[index].name ;
    document.getElementById("required").value = allList[index].required ;
    document.getElementById("actual").value = allList[index].actual ;

    document.querySelector("#Update").onclick = function(){
        if (validateForm() == true){ 
            allList[index].name= document.getElementById("name").value ;
            allList[index].required= document.getElementById("required").value ;
            allList[index].actual= document.getElementById("actual").value ;

            localStorage.setItem("allList" , JSON.stringify (allList)) ;
             
            showData();
            document.getElementById("name").value = "" ;
            document.getElementById("required").value = "" ;
            document.getElementById("actual").value = "" ;

            // update button will hide and submit buttopn will show for updating of data in local Storage (سيتم إخفاء زر التحديث وسيظهر زر الإرسال لتحديث البيانات في وحدة التخزين المحلية)

            document.getElementById("submit").style.display = "block" ;
            document.getElementById("Update").style.display = "none" ;
        
        }
    }
}