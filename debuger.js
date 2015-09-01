debug = function(){
  var disable = false;
  var verbose = false;
  get = function(){return verbose;}
  set = function(verb){verbose = boolean(verb);}

  var execute = function(a, b){
    //log(b);
    if(verbose){
      if(b.length){
        var param = "param : " + b[0].toString();
        for(var i=1; i<b.length; i++){
          param +=  ", " + b[i].toString();
        }
      }
      else{
        var param = "<no parameters>";
      }
     
      var append = "fname : ";
      if(!a.name)
        append += "<anonymous>";

      log(append + a.name, param);
      
    }
    return a.apply(this, b);
  }

  return function(){
    if(!disable){return;}
    var last = 0;
    var lastf;
    var lastres = [];
    var lastresLength = 0;
    var argCouple = 1;
    var isArgCouple = false;
    var arrArg = [];
    for (var i=0; i<arguments.length; i++){
      
      if(typeof(arguments[i]) == "function"){
        
        if(!lastf){lastf=i;}
        
       if(typeof(arguments[i-1]) == "string" && arguments[i-1][0] == '-' && arguments[i-1][1] == '-' ){
              argCouple = parseInt(arguments[i-1].substr(2, (arguments[i-1].length-2)));
              isArgCouple = true;
        }


        if(i == (lastf + (isArgCouple?2:1) ) ){

          for(var j=0;  j<lastresLength; j+=argCouple){
            
             if(argCouple)
              for(var k=0; k<argCouple; k++){
                arrArg[k] = lastres[j+k];
              }
            else{
              arrArg = []
              argCouple = Infinity;
            }

            lastres[j] = execute(arguments[i], arrArg);
            lastresLength = j+1;
          }

        }

        else{
          lastres = [];
          
           

          for(var j=last; j<i-(isArgCouple?1:0); j+=argCouple){

          //console.log(" fu:: " + arguments[i]);
          //console.log(arguments[j]);
            if(argCouple)
              for(var k=0; k<argCouple; k++){
                arrArg[k] = arguments[j+k];
              }
            else{
              arrArg = []
              argCouple = Infinity;
            }

            lastres[j-last] = execute(arguments[i], arrArg);
            lastresLength = j-last+1;
          }

      }
        last = i+1;
        lastf = i;
        argCouple = 1;
        arrArg = [];
        isArgCouple = false;
      }
      
    }
  };
}();

log = function(){ 
    var exec = 0;
  
return function(){ 
  exec++;  
  
  for(var i=0; i<arguments.length; i++){
    //console.log(arguments);
    if(arguments[i])
    console.log(exec + " : " + arguments[i]);
  }
}
}();
/* test functions */
mul = function(a){return a*1000;}
div = function(b){return b/9;}
add = function(){var sum = 0; for(var i=0; i<arguments.length; i++){sum+=arguments[i]};  return sum;}//var strum = "";for (f in arguments) {strum+= arguments[f].toString() + ",";};log("LOOK: " + strum); var sum = 0; 
/* sample statements */
debug("1", "2", "3", mul, "--3", add, log)//, "2+1;", "3+4", "3+7", eval, mul, div, log);
 //                                           , '--param'
debug("test 1", "test 2", "--2", log, "2+1", "3+4", "3+7","--1", eval, mul, div, log);

debug("test 1", "test 2", "test 3", log);

debug("1", "2", "3", mul, "--3", add, log)//, "2+1;", "3+4", "3+7", eval, mul, div, log);
 //                                           , '--param'
debug("test 1", "test 2", "--2", log)//, "2+1;", "3+4", "3+7", eval, mul, div, log);

debug("test 1", "test 2", "test 3", log);
