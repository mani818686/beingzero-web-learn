var data,checkdata;
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
        $('#item').val("");
    }
    });
});
function filldata()
{
   let code =``
   data=JSON.parse(localStorage["items"]);
//    console.log(data);
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
       code+=`<td> <input type="checkbox" id="${i}" onclick="toggle(${i})" checked></input> <button type="button" class="btn ml-3"onclick="del(${i})"><i class="fas fa-trash-alt"></i></button>`
       else
       code+=` <td><input type="checkbox" id="${i}" onclick="toggle(${i})"></input> <button type="button" class=" btn ml-3"onclick="del(${i})"><i class="fas fa-trash-alt"></i></button>`
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
    for(var i=0;i<data.length;i++)
   {
    if(data[i].id==id)
    {   data[i].iscompleted=!data[i].iscompleted;
        break;
    }
   }
//    console.log(data,id);
   if(data[id].iscompleted)
   $("#v"+id).html(`<del>${data[i].item}</del>`)
   else
   $("#v"+id).html(data[i].item)
   localStorage.setItem("items",JSON.stringify(data));
}
function del(id) {
    // console.log(id);
    data=JSON.parse(localStorage["items"]);
    data.splice(id,1)
    localStorage.setItem("items",JSON.stringify(data));
    filldata()
}
function filter()
{
 checkdata=data.filter((e=>e.iscompleted==true))
//  console.log(checkdata)
 let code =``
 for(let i=0;i<checkdata.length;i++)
   {
       code+=`
       <tr>
   <td scope="row">${i+1}</td>`
   if(checkdata[i].iscompleted)
   code+=`<td id="v${i}"><del>${checkdata[i].item}</del></td>`
   else
   code+=`<td id="v${i}">${checkdata[i].item}</td>`
       if(checkdata[i].iscompleted)
       code+=`<td> <input type="checkbox" id="${i}" onclick="toggle(${i})" checked></input> <button type="button" class="btn ml-3"onclick="del(${i})"><i class="fas fa-trash-alt"></i></button>`
       else
       code+=` <td><input type="checkbox" id="${i}" onclick="toggle(${i})"></input> <button type="button" class=" btn ml-3"onclick="del(${i})"><i class="fas fa-trash-alt"></i></button>`
       code+=`
            </td>
            </tr> 
            `
   }
   $("#fillitems").html(code);   
}