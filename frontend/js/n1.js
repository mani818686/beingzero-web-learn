var i=0,b;
function myfun()
{
  document.getElementById("test").innerHTML=i
  i+=1
  if(i==11)
    clearTimeout(b);

}

function doit()
{
  b=setInterval(myfun,1000);
}