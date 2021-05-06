function fill()
{
    var r=$("#r").val()
    var g=$("#g").val()
    var b=$("#b").val()
    var s=`rgb(${r},${g},${b})`;
    console.log(s);
    $(".rectangle").css("background-color",s);
}
fill();