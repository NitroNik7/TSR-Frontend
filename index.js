$(document.body).append(`<button onclick='submitBtn(1,`+ JSON.stringify({title: "title", message: "message"}) + `)'>Submit</button>`);

function submitBtn(edit, notes){
  if(edit)
    $(document.body).append(`<p>`+notes.title+`</p>`);
  else
    console.log(edit);
}

function scaleContainerDiv(){
  $(".container").css(
    {
      "transform" : "scale(2, 2)"
    }
  )
}