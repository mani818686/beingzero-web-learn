var data;
$(document).ready(function(){
    
    $('#item').keypress(function(e){
      if(e.keyCode==13)
    { 
        if(localStorage["items"]===undefined)
        {
            var item={'id':0,'item':$('#item').val(),'iscompleted':false}
            data=[item];
            localStorage.setItem("items",JSON.stringify([item]))
        }
        else
        {   data=JSON.parse(localStorage["items"]);
            var item={'id':data.length,'item':$('#item').val(),'iscompleted':false}
            data.push(item);
            localStorage.setItem("items",JSON.stringify(data));
        }
        filldata();
    }
    });
});
function filldata()
{
   let code =``
   data=JSON.parse(localStorage["items"]);
   console.log(data);
   for(let i=0;i<data.length;i++)
   {
       code+=`
       <tr>
   <td scope="row">${i+1}</td>`
   if(data[i].iscompleted)
   code+=`<td id="v${i}"><del>${data[i].item}</del></td>`
   else
   code+=`<td id="v${i}">${data[i].item}</td>`
       if(data[i].iscompleted)
       code+=`<td> <input type="checkbox" id="${i}" onclick="toggle(${i})" checked></input>`
       else
       code+=` <td><input type="checkbox" id="${i}" onclick="toggle(${i})"></input>`
       code+=`
            </td>
            </tr> 
            `
   }
   $("#fillitems").html(code);
}
filldata();
function toggle(id)
{
    //console.log(id,data);
    for(var i=0;i<data.length;i++)
   {
    if(data[i].id==id)
    {   data[i].iscompleted=!data[i].iscompleted;
        break;
    }
   }
   console.log(data,id);
   if(data[id].iscompleted)
   $("#v"+id).html(`<del>${data[i].item}</del>`)
   else
   $("#v"+id).html(data[i].item)
   localStorage.setItem("items",JSON.stringify(data));
}