


document.getElementsByTagName("form")[0].style.display="none"
       
document.getElementsByTagName("select")[0].addEventListener("change",(event)=>{
    
    if(event.target.value == -1)
    document.getElementsByTagName("form")[0].style.display="none"

    else if(event.target.value == 0){
        document.getElementById("rollNo").value=0;
        document.getElementById("rollNo").hidden=true
        document.getElementsByTagName("form")[0].style.display="block"
    }

    else if(event.target.value == 1){
        document.getElementsByTagName("form")[0].style.display="block"
        document.getElementById("rollNo").hidden=false
        document.getElementById("rollNo").value=""

    }

 });

document.getElementsByTagName("form")[0].addEventListener("submit",(event)=>{

      event.preventDefault();

      fetch("http://localhost:5000/saveBill",{
        method:"post",
        body:JSON.stringify({
            type:document.getElementsByTagName("select")[0].value,
            rollNo:document.getElementById("rollNo").value,
            service:document.getElementById("service").value,
            amount:document.getElementById("amount").value
        }),
        headers:{
            "Content-Type":"application/json"
        }
      }).then(async (resp)=>{

          let billDetail = await resp.json()

          try{
             alert(JSON.stringify(billDetail))
             location.href=location.href
          }

          catch(err){
            console.log(err)
            alert("Cant print")
          }
        
      }).catch((err)=>{
         
        console.log(err);
        alert(err)

      })

     // location.href=location.href
})