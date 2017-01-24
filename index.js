function searchF(){
  var input=document.getElementById("searchBar");
  $("#icons").html("<i class='fa fa-search icon' onclick='searchF()'></i><i class='fa fa-times icon' onclick='closeF()'></i>");
  var api= "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&format=json&exsentences=1&exintro=&explaintext=&generator=search&gsrlimit=10&gsrsearch=";
  
  
  var link=api+input.value;
  var html = "";
  var wikilink = 'http://en.wikipedia.org/?curid=';
  
  $.ajax({
    url:link,
    type:"get",
    dataType:"JSONP",
    success:function(data){
      var results = data.query.pages;
      var pgs = Object.keys(results);
      pgs.forEach(function(page){
        var title = results[page].title;
        var text = results[page].extract;
        var pagelink = wikilink+results[page].pageid;
                
        html+="<div class='result'><div class='title'><a href='"+pagelink+"' class='titleLink' target='_blank'>"+title+"</a></div><div class='desc'>"+text+"</div></div>";
            
      });

      $("#display").html(html);
      //$("#display").html(JSON.stringify(data));
      //$("#display").html(JSON.stringify(results));      
    },
    error:function(x,s,e){
      alert(s);
    }
  });
  
  $("#display").addClass("displayResults");
    //$("#display").html(link);
  $("#base").removeClass("topPad");
  
}

function closeF(){
  $("#icons").html("<i class='fa fa-search icon' onclick='searchF()'></i>");
  document.getElementById("searchBar").value="";
  $("#display").html("");
  $("#display").removeClass("displayResults");
  $("#base").addClass("topPad");
}