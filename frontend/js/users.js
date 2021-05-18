var userid,data;
function showdata()
 {
    $.ajax({
        url: "/api/user",
        method: "GET",
        success: function(result) {
          console.log(result);
          data=result
            var r="<table>";
            r+="<tr>"
            r+="<td>"+"Username"+"</td>";
            r+="<td>"+"Age"+"</td>";
            r+="<td>"+"email"+"</td>";
            r+="<td>"+"Actions"+"</td>";
            r+="</tr>";
            for(var row in result)
            {   r+="<tr>";
                r+="<td>"+result[row].username+"</td>";
                r+="<td>"+result[row].age+"</td>";
                r+="<td>"+result[row].email+"</td>";
                r+=`<td><button class="btn btn-success" type="button" data-toggle="modal" onclick="assign('${row}')" data-target="#showquestions">Update</button> 
                <button class="btn btn-danger" type="button"  onclick="del('${result[row]._id}')">Delete</button> </td>`
                r+="</tr>";
            }
            r+="</table>";
            $("#table").html(r);
        },
        error: function(err) {
          console.log(err);
        }
      });
     
     $("button").click(function(){
        $("#messages").css("display","inline");
 })}
 showdata();
 function assign(indx){
   indx=parseInt(indx)
  userid=data[indx]._id;
  $("#name").val(data[indx].username);
 $("#pass").val(data[indx].password);
 $("#uemail").val(data[indx].email);
 $("#uage").val(data[indx].age);
 }
 function updatedata(){
 let username,password,email,age;
 username=$("#name").val();
 password=$("#pass").val();
 email=$("#uemail").val();
 age=$("#uage").val();
 data={"username": username, "password": password,"email": email, "age": parseInt(age)}
 $.ajax({
  url: "/api/user/"+userid,
  method: "PATCH",
  data:data,
  success: function(result) {
    location.href="/users"
  },
  error: function(err) {
    console.log(err);
  }
});
}
function del(id)
{  
  console.log(id);
  $.ajax({
    url: "/api/user/"+id,
    method: "delete",
    success: function(result) {
      location.href="/users"
    },
    error: function(err) {
      console.log(err);
    }
  });
}